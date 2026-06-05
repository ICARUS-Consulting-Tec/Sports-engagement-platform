import { useCallback, useEffect, useRef, useState } from "react";
import { Auth } from "../../context/AuthContext";
import UnityGameEmbed, { type UnityGameEmbedProps } from "../unity/UnityGameEmbed";
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
    <section className="rounded-2xl border border-[#d8dee5] bg-white p-6 shadow-[0_24px_50px_rgba(15,39,70,0.08)]">
      <header className="mb-5">
        <p className="mb-2 text-[12px] font-extrabold tracking-[0.18em] text-[#d62839]">
          TITANS TOSS
        </p>
        <h2 className="mb-2 text-[32px] font-bold text-[#0b2a55] max-[900px]:text-[26px]">
          Titans Toss
        </h2>
        <p className="m-0 max-w-3xl leading-[1.6] text-[#516173]">
          Practice your skills throwing the ball and become a Titan.
        </p>
      </header>

      <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(280px,0.9fr)] items-start gap-4 max-[1100px]:grid-cols-1">
        <UnityGameEmbed {...unityConfig} />

        <TitansTossLeaderboard
          entries={leaderboard?.entries ?? []}
          puzzleDate={config?.puzzleDate ?? leaderboard?.puzzleDate ?? null}
          isLoading={loadingData}
          isSaving={isSaving}
          errorMessage={loadError}
          saveMessage={saveError}
        />
      </div>
    </section>
  );
}

export default TitansTossPanel;
