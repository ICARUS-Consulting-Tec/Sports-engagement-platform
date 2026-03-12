import Navbar from "../components/layout/Navbar";
import TeamCardsDemo from "../components/team/TeamCardsDemo";
import "../styles/offseason.css";

function TeamPage() {
  return (
    <div className="offseason-page">
      <main className="offseason-container">
        <Navbar />

        <section className="offseason-hero">
          <p className="offseason-hero-kicker">TEAM CARDS</p>
          <h1 className="offseason-hero-title">Titan Roster Collection</h1>
          <p className="offseason-hero-copy">
            Collectible roster cards with hover motion, unlock state, and stat view.
          </p>
        </section>

        <TeamCardsDemo />
      </main>
    </div>
  );
}

export default TeamPage;
