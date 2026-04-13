const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4009;
const NEWS_API_BASE_URL = process.env.NEWS_API_BASE_URL || "https://newsapi.org/v2/everything";
const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;
const NEWS_QUERY = process.env.NEWS_QUERY || "tennessee-titans";
const NEWS_PAGE_SIZE = Number.parseInt(process.env.NEWS_PAGE_SIZE || "24", 10);
const NEWS_SORT = process.env.NEWS_SORT || "publishedAt";
const NEWS_LANGUAGE = process.env.NEWS_LANGUAGE || "en";

function normalizeArticle(article) {
  return {
    url: article.url || "",
    title: article.title || "",
    urlToImage: article.urlToImage || "",
    description: article.description || "",
    publishedAt: article.publishedAt || ""
  };
}

function buildNewsUrl(options = {}) {
  const pageSize = options.pageSize || NEWS_PAGE_SIZE;
  const sortBy = options.sortBy || NEWS_SORT;
  const url = new URL(NEWS_API_BASE_URL);

  url.searchParams.set("q", NEWS_QUERY);
  url.searchParams.set("apiKey", NEWS_API_KEY || "");
  url.searchParams.set("pageSize", String(pageSize));
  url.searchParams.set("sortBy", sortBy);
  url.searchParams.set("language", NEWS_LANGUAGE);

  return url;
}

async function fetchArticles(options = {}) {
  if (!NEWS_API_KEY) {
    throw new Error("Missing NEWS_API_KEY environment variable.");
  }

  const response = await fetch(buildNewsUrl(options).toString());
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error ${response.status}`);
  }

  return Array.isArray(data.articles) ? data.articles.map(normalizeArticle) : [];
}

app.get("/health", (req, res) => {
  res.json({
    service: "news-service",
    status: "ok",
    apiKeyConfigured: Boolean(NEWS_API_KEY),
    query: NEWS_QUERY,
    pageSize: NEWS_PAGE_SIZE,
    sortBy: NEWS_SORT
  });
});

app.get("/", async (req, res) => {
  try {
    const articles = await fetchArticles({
      pageSize: 24
    });
    res.json({
      service: "news-service",
      query: NEWS_QUERY,
      articles
    });
  } catch (error) {
    res.status(500).json({
      service: "news-service",
      status: "error",
      error: error.message
    });
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await fetchArticles({
      pageSize: 24
    });

    res.json({
      service: "news-service",
      query: NEWS_QUERY,
      articles
    });
  } catch (error) {
    res.status(500).json({
      service: "news-service",
      status: "error",
      error: error.message
    });
  }
});

app.get("/popular-one", async (req, res) => {
  try {
    const articles = await fetchArticles({
      pageSize: 1,
      sortBy: "relevancy",
      q: "tennessee-titans"
    });

    res.json({
      service: "news-service",
      query: NEWS_QUERY,
      sortBy: "relevancy",
      q: "tennessee-titans",
      pageSize: 1,
      articles
    });
  } catch (error) {
    res.status(500).json({
      service: "news-service",
      status: "error",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`news-service listening on port ${PORT}`);
});