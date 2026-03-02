"use strict";

const { getPortfolioContent, normalizeLanguage } = require("../server/portfolioData");

module.exports = (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const langFromQuery = typeof req.query?.lang === "string" ? req.query.lang : undefined;
  const langFromUrl = new URL(req.url || "/", "http://localhost").searchParams.get("lang");
  const language = normalizeLanguage(langFromQuery || langFromUrl || "en");

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    language,
    ...getPortfolioContent(language)
  });
};
