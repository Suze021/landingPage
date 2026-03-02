"use strict";

module.exports = (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ ok: true });
};
