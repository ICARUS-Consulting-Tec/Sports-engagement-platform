import { Card } from "@heroui/react";
import MembersPerWeekChart from "../reportsC/ChartCard";
import StatsCard from "../reportsC/StatsCard";
import SectionCard from "../reportsC/SectionCard";
import PostsPerDayChart from "../reportsC/PostPerDayChart";
import PostsByCategoryChart from "../reportsC/PostsByCatChart";


import "../../styles/admin.css";
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
            <div className="stats-grid">
                <StatsCard/>
                <StatsCard/>
                <StatsCard/>
                <StatsCard/>
            </div>
            <div className="two-col">
                <SectionCard/>
                <MembersPerWeekChart />
            </div>
            <div className="two-col">
                <SectionCard/>
                <PostsPerDayChart />
            </div>
            <div className="horizontal-section">
                <PostsByCategoryChart />
            </div>
        </div>
       
      </Card>
    </div>
  );
}
