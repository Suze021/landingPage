const API_BASE = "/api";
const REQUEST_TIMEOUT_MS = 8000;
const SUPPORTED_LANGUAGES = new Set(["en", "pt-BR"]);

function normalizeLanguage(language) {
  if (typeof language !== "string") {
    return "en";
  }

  const trimmed = language.trim();
  return SUPPORTED_LANGUAGES.has(trimmed) ? trimmed : "en";
}

export async function fetchPortfolioContent(language) {
  const lang = normalizeLanguage(language);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${API_BASE}/portfolio?lang=${encodeURIComponent(lang)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        signal: controller.signal
      }
    );

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

