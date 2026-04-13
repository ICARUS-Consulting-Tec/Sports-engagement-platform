import  NewsCard from "../components/news/NewsCard";
import Navbar from "../components/layout/Navbar";
import "../styles/news.css";
import NewsCardHorizontal from "../components/news/NewsCardHorizontal";

function NewsPage() {
  return (
    <div className="team-page">
        <main className="team-container">
        <Navbar />

        <section className="news-section">
          <h1 className="news-title">Titans News & Updates</h1>
        </section>

        <NewsCardHorizontal/>

        <section className="news-subsection">
          <h1 className="news-subtitle">Latest News</h1>
        </section>


        <NewsCard/>
      </main>
    </div>
  );
}

export default NewsPage;