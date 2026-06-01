import { useCallback, useEffect, useRef, useState } from "react";
import { Auth } from "../../context/AuthContext";
import UnityGameCard from "../unity/UnityGameCard";
import type { UnityGameEmbedProps } from "../unity/UnityGameEmbed";
import TitansTossLeaderboard from "./TitansTossLeaderboard";
import {
  getTitansTossConfig,
  getTitansTossLeaderboard,
  saveTitansTossSession,
} from "../../services/titansTossService";
import type {
  TitansTossCompletePayload,
  TitansTossConfig,
  TitansTossLeaderboardResponse,
} from "../../types/titansToss";

interface TitansTossPanelProps {
  unityConfig: UnityGameEmbedProps;
}

function TitansTossPanel({ unityConfig }: TitansTossPanelProps) {
  const { session } = Auth();
  const [config, setConfig] = useState<TitansTossConfig | null>(null);
  const [leaderboard, setLeaderboard] = useState<TitansTossLeaderboardResponse | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const sessionStartedAtRef = useRef<number | null>(null);

  const loadTitansTossData = useCallback(async () => {
    setLoadingData(true);
    setLoadError(null);

    try {
      const tossConfig = await getTitansTossConfig();
      const tossLeaderboard = await getTitansTossLeaderboard(tossConfig.puzzleDate);

      setConfig(tossConfig);
      setLeaderboard(tossLeaderboard);
    } catch (error) {
      console.error("Error loading Titans Toss data:", error);
      setLoadError(
        error instanceof Error
          ? error.message
          : "A database error occurred while loading Titans Toss.",
      );
    } finally {
      setLoadingData(false);
    }
  }, []);

  const handleTossComplete = useCallback(
    async ({ distanceYards }: TitansTossCompletePayload) => {
      if (!config) {
        return;
      }

      if (!session?.access_token) {
        setSaveError(
          "Play as a guest or sign in to save your score on the leaderboard.",
        );
        return;
      }

      setIsSaving(true);
      setSaveError(null);

      try {
        const playtimeSeconds = Math.max(
          0,
          Math.ceil(
            (Date.now() - (sessionStartedAtRef.current ?? Date.now())) / 1000,
          ),
        );

        const response = await saveTitansTossSession(
          {
            distance_yards: distanceYards,
            playtime_seconds: playtimeSeconds,
            puzzle_date: config.puzzleDate,
          },
          session.access_token,
        );

        setLeaderboard(response.leaderboard);
        sessionStartedAtRef.current = null;
      } catch (error) {
        console.error("Error saving Titans Toss session:", error);
        setSaveError(
          error instanceof Error ? error.message : "Could not save your session.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [config, session],
  );

  useEffect(() => {
    void loadTitansTossData();
  }, [loadTitansTossData]);

  useEffect(() => {
    window.__titansTossOnComplete = (payload) => {
      sessionStartedAtRef.current ??= Date.now();
      void handleTossComplete(payload);
    };

    return () => {
      delete window.__titansTossOnComplete;
    };
  }, [handleTossComplete]);

  return (
    <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.85fr)] items-start gap-5 max-[900px]:grid-cols-1">
      <UnityGameCard unityConfig={unityConfig} />

      <TitansTossLeaderboard
        entries={leaderboard?.entries ?? []}
        puzzleDate={config?.puzzleDate ?? leaderboard?.puzzleDate ?? null}
        isLoading={loadingData}
        isSaving={isSaving}
        errorMessage={loadError}
        saveMessage={saveError}
      />
    </div>
  );
}

export default TitansTossPanel;
