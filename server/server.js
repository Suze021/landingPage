"use strict";

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const { getPortfolioContent, normalizeLanguage } = require("./portfolioData");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const INDEX_ROOT = path.resolve(__dirname, "../index");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function setSecurityHeaders(res) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto:; upgrade-insecure-requests; block-all-mixed-content"
  );
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
}

function redirect(res, location, statusCode = 308) {
  res.writeHead(statusCode, {
    Location: location,
    "Cache-Control": "no-store"
  });
  res.end();
}

function sendJson(req, res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(body);
}

function sendText(req, res, statusCode, message) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(message);
}

async function sendFile(req, res, absolutePath) {
  const ext = path.extname(absolutePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  let data;
  try {
    data = await fs.readFile(absolutePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      sendText(req, res, 404, "Not found");
      return;
    }

    sendText(req, res, 500, "Internal server error");
    return;
  }

  const cacheHeader = ext === ".html"
    ? "no-cache, no-store, must-revalidate"
    : "public, max-age=31536000, immutable";

  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": cacheHeader
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  res.end(data);
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/health") {
    sendJson(req, res, 200, { ok: true });
    return true;
  }

  if (url.pathname === "/api/portfolio") {
    const language = normalizeLanguage(url.searchParams.get("lang"));
    const content = getPortfolioContent(language);
    sendJson(req, res, 200, { language, ...content });
    return true;
  }

  return false;
}

async function handleStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname);
  const relativePath = pathname === "/" ? "/index.html" : pathname;
  const resolvedPath = path.resolve(path.join(INDEX_ROOT, `.${relativePath}`));

  if (!resolvedPath.startsWith(INDEX_ROOT)) {
    sendText(req, res, 403, "Forbidden");
    return;
  }

  try {
    const stats = await fs.stat(resolvedPath);
    if (stats.isDirectory()) {
      await sendFile(req, res, path.join(resolvedPath, "index.html"));
      return;
    }

    await sendFile(req, res, resolvedPath);
    return;
  } catch (error) {
    if (error.code !== "ENOENT") {
      sendText(req, res, 500, "Internal server error");
      return;
    }
  }

  if (!path.extname(relativePath)) {
    await sendFile(req, res, path.join(INDEX_ROOT, "index.html"));
    return;
  }

  sendText(req, res, 404, "Not found");
}

const server = http.createServer(async (req, res) => {
  setSecurityHeaders(res);

  if (req.method !== "GET" && req.method !== "HEAD") {
    sendText(req, res, 405, "Method not allowed");
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  // Canonical URL policy: keep UI paths clean and hide internal "index" folder.
  if (
    url.pathname === "/index.html" ||
    url.pathname === "/index/index.html" ||
    url.pathname === "/frontend/index.html"
  ) {
    redirect(res, "/");
    return;
  }

  if (url.pathname.startsWith("/index/") || url.pathname.startsWith("/frontend/")) {
    const cleanPath = url.pathname
      .replace(/^\/index/, "")
      .replace(/^\/frontend/, "") || "/";
    const destination = `${cleanPath}${url.search}`;
    redirect(res, destination);
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    const handled = await handleApi(req, res, url);
    if (!handled) {
      sendText(req, res, 404, "Not found");
    }
    return;
  }

  await handleStatic(req, res, url);
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`Server running at http://${HOST}:${PORT}\n`);
});

