import Navbar from "../components/layout/Navbar";
import { SignOutButton } from "../components/auth/Signout";

export default function AdminPage() {
  return (
    <div className="home-page">
      <main className="home-container">
        <Navbar />

        <section className="home-hero">
          <div>
            <h1 className="home-title">ADMIN PANEL</h1>
            <p className="home-subtitle">
              Manage the platform and sign out securely.
            </p>
          </div>

          <SignOutButton />
        </section>
      </main>
    </div>
  );
}
