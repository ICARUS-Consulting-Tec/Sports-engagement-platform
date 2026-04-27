import { Card } from "@heroui/react";
import "../../styles/profile.css";

export default function Dashboard() {
  return (
    <div className="personal-info-section">
      <div className="personal-info-header">
        <h2>DASHBOARD</h2>
        <p>Admin overview and management tools will appear here</p>
      </div>

      <Card className="personal-info-card">
        <div className="personal-info-card-body">
          <div className="profile-photo-row">
            <div className="photo-text">
              <h4>Dashboard Template</h4>
              <p>This section is ready for admin widgets, stats, and actions.</p>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
}
