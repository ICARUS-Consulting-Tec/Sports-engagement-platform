import { TeamCardsDemo } from "../components/team/TeamCardsDemo";
import Navbar from "../components/layout/Navbar";

function TeamCardsPage() {
  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <Navbar />
        <TeamCardsDemo />
      </main>
    </div>
  );
}

export default TeamCardsPage;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F4F5F7",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
  },
};
