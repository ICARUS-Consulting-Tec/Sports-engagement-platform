import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { getNewsArticles } from "../../services/newsService";

function NewsCard() {
  const [newsData, setNewsData] = useState([
    {
      url: "",
      title: "",
      urlToImage: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const articles = await getNewsArticles();

        if (isMounted) {
          setNewsData(articles);
        }
      } catch (err) {
        console.error("Error loading news:", err);

        if (isMounted) {
          setError("No se pudieron cargar las noticias.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-muted">Loading news...</p>;
  }

  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  if (newsData.length === 0) {
    return <p className="text-sm text-muted">No news available right now.</p>;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {newsData.map((article, index) => (
        <a
          key={`${article.url}-${index}`}
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <Card className="h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <img
                alt={article.title}
                className="h-full w-full object-cover"
                loading="lazy"
                src={article.urlToImage || "https://placehold.co/800x450?text=News"}
              />
            </div>

            <Card.Header className="gap-2">
              <Card.Title className="line-clamp-2">{article.title}</Card.Title>
              <Card.Description className="line-clamp-3">
                {article.description || "No description available."}
              </Card.Description>
            </Card.Header>
          </Card>
        </a>
      ))}
    </section>
  );
}

export default NewsCard;