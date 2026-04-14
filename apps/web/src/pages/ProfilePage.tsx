import { useEffect, useState } from "react";
import { Auth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import SidebarMenu from "../components/Profile/SidebarMenu";
import PersonalInfo from "../components/Profile/PersonalInfo";
import Addresses from "../components/Profile/Addresses";
import Badges from "../components/Profile/Badges";
import "../styles/profile.css";



function ProfilePage() {
  const { session } = Auth();

  const [activeTab, setActiveTab] = useState<string>("personal");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8081/profile/me", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        const data = await res.json();

        if (data.status === "success") {
          setProfile(data.profile);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="profile-page">
        <main className="profile-container">
        <Navbar />
        <div className="profile-page-wrapper">
          <p>Loading profile...</p>
        </div>
      </main>
      </div>
    );
  }

  return (
  <div className="profile-page">
    <main className="profile-container">
      <Navbar />

      <section className="profile-header">
        <h1 className="profile-title">MY PROFILE</h1>
        <p className="profile-subtitle">
          Manage your account, preferences, and fan achievements
        </p>
      </section>

      {!loading && (
        <section className="profile-layout">
          <SidebarMenu
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="profile-content">
            {activeTab === "personal" && <PersonalInfo profile={profile} />}
            {activeTab === "addresses" && <Addresses />}
            {activeTab === "badges" && <Badges />}
          </div>
        </section>
      )}
    </main>
  </div>
);
}

export default ProfilePage;