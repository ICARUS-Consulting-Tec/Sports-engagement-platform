import { useEffect, useState } from "react";
import { Button, Card } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getMatches } from "../../services/matchesService";
import type { ApiMatch } from "../../types";
import { parseAbbrsFromShortName, teamLogoUrl } from "../../utils/teamLogo";
import "../../styles/home.css";

type MatchesCardProps = {
  statusLabel?: string;
  title?: string;
  dateText?: string;
  homeTeam?: string;
  homeLabel?: string;
  awayTeam?: string;
  awayLabel?: string;
  daysLeft?: string | number;
  buttonLabel?: string;
};

function selectFeaturedMatch(matches: ApiMatch[]): ApiMatch | null {
  if (matches.length === 0) {
    return null;
  }

  const now = Date.now();

  const liveMatch = matches.find((match) => isLiveMatch(match));

  if (liveMatch) {
    return liveMatch;
  }

  const upcomingMatches = matches
    .filter((match) => {
      if (!match.start_time) {
        return false;
      }

      return new Date(match.start_time).getTime() >= now;
    })
    .sort((a, b) => {
      const firstTime = new Date(a.start_time || "").getTime();
      const secondTime = new Date(b.start_time || "").getTime();

      return firstTime - secondTime;
    });

  return upcomingMatches[0] ?? matches[0];
}

function isLiveMatch(match?: ApiMatch | null): boolean {
  const status = String(match?.status || "").toLowerCase();

  return (
    status.includes("live") ||
    status.includes("in_progress") ||
    status.includes("in progress")
  );
}

function formatMatchDate(value?: string): string {
  if (!value) {
    return "Schedule to be confirmed";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Schedule to be confirmed";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(parsedDate);
}

function getDaysUntilMatch(value?: string): number {
  if (!value) {
    return 0;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return 0;
  }

  const difference = parsedDate.getTime() - Date.now();

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getHomeAwayLabel(match: ApiMatch | null, side: "home" | "away"): string {
  if (!match) {
    return side === "home" ? "Home" : "Away";
  }

  return side === "home" ? "Home" : "Away";
}

function MatchesCard({
  title = "Next Match",
  dateText,
  homeTeam,
  homeLabel,
  awayTeam,
  awayLabel,
  daysLeft,
  buttonLabel = "Enter Match Room",
}: MatchesCardProps) {
  const navigate = useNavigate();
  const [featuredMatch, setFeaturedMatch] = useState<ApiMatch | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMatches() {
      try {
        const matches = await getMatches();

        if (!isMounted) {
          return;
        }

        setFeaturedMatch(selectFeaturedMatch(matches));
      } catch (error) {
        console.error("Error loading matches card data:", error);
      }
    }

    void loadMatches();

    return () => {
      isMounted = false;
    };
  }, []);

  const resolvedDateText =
    dateText ?? formatMatchDate(featuredMatch?.start_time);
  const resolvedHomeTeam = homeTeam ?? featuredMatch?.home_team ?? "Tennessee Titans";
  const resolvedHomeLabel =
    homeLabel ?? getHomeAwayLabel(featuredMatch, "home");
  const resolvedAwayTeam = awayTeam ?? featuredMatch?.away_team ?? "Houston Texans";
  const resolvedAwayLabel =
    awayLabel ?? getHomeAwayLabel(featuredMatch, "away");
  const resolvedDaysLeft =
    daysLeft ?? getDaysUntilMatch(featuredMatch?.start_time);

  const { home: abbrHome, away: abbrAway } = parseAbbrsFromShortName(
    featuredMatch?.short_name
  );
  const homeLogoAbbr = abbrHome ?? "TEN";
  const awayLogoAbbr = abbrAway ?? "HOU";

  function openMatchRoom() {
    navigate("/matches");
  }

  return (
    <section className="matches-card-wrapper">
      <Card className="matches-card">
        <div className="matches-card-bubble" aria-hidden />

        <div className="matches-card-days">
          <span className="matches-card-days-number">{resolvedDaysLeft}</span>
          <span className="matches-card-days-label">Days Left</span>
        </div>

        <Card.Content className="matches-card-content">
          <div className="matches-card-header">
            <h2 className="matches-card-title">{title}</h2>
            <p className="matches-card-date">{resolvedDateText}</p>
          </div>

          <div className="matches-card-teams">
            <div className="matches-card-team">
              <div className="matches-card-logo">
                <img
                  src={teamLogoUrl(homeLogoAbbr)}
                  alt=""
                  className="matches-card-logo-img"
                />
              </div>
              <div className="matches-card-team-text">
                <h3 className="matches-card-team-name">{resolvedHomeTeam}</h3>
                <p className="matches-card-team-label">{resolvedHomeLabel}</p>
              </div>
            </div>

            <div className="matches-card-vs">VS</div>

            <div className="matches-card-team">
              <div className="matches-card-logo">
                <img
                  src={teamLogoUrl(awayLogoAbbr)}
                  alt=""
                  className="matches-card-logo-img"
                />
              </div>
              <div className="matches-card-team-text">
                <h3 className="matches-card-team-name">{resolvedAwayTeam}</h3>
                <p className="matches-card-team-label">{resolvedAwayLabel}</p>
              </div>
            </div>
          </div>

          <Button className="matches-card-cta" onPress={openMatchRoom}>
            {buttonLabel}
            <FiArrowRight className="matches-card-cta-icon" />
          </Button>
        </Card.Content>
      </Card>
    </section>
  );
}

export default MatchesCard;
