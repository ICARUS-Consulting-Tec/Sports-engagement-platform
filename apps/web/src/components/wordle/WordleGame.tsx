import { useCallback, useEffect, useRef, useState } from "react";
import { useWordle } from "../../hooks/useWordle";
import {
  getWordleConfig,
  getWordleLeaderboard,
  saveWordleSession,
} from "../../services/wordleService";
import type {
  WordleConfig,
  WordleLeaderboardResponse,
} from "../../types/wordle";
import WordleGrid from "./WordleGrid";
import WordleKeyboard from "./WordleKeyboard";
import WordleStats from "./WordleStats";

function WordleGame() {
  const [config, setConfig] = useState<WordleConfig | null>(null);
  const [leaderboard, setLeaderboard] = useState<WordleLeaderboardResponse | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const sessionStartedAtRef = useRef<number>(Date.now());

  const loadWordleData = useCallback(async () => {
    setLoadingData(true);
    setLoadingMessage(null);

    try {
      const wordleConfig = await getWordleConfig();
      const wordleLeaderboard = await getWordleLeaderboard(wordleConfig.puzzleDate);

      setConfig(wordleConfig);
      setLeaderboard(wordleLeaderboard);
    } catch (error) {
      console.error("Error loading Wordle data:", error);
      setLoadingMessage(error instanceof Error ? error.message : "No se pudo cargar Wordle.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  const handleGameFinished = useCallback(async ({
    attemptCount,
    puzzleDate,
  }: {
    attemptCount: number;
    gameStatus: "won" | "lost";
    puzzleDate: string;
    targetWord: string;
  }) => {
    if (!config) {
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const playtimeSeconds = Math.max(
        1,
        Math.round((Date.now() - sessionStartedAtRef.current) / 1000),
      );
      const response = await saveWordleSession({
        user_id: config.userId,
        attempt_count: attemptCount,
        playtime_seconds: playtimeSeconds,
        puzzle_date: puzzleDate,
      });

      setLeaderboard(response.leaderboard);
    } catch (error) {
      console.error("Error saving Wordle session:", error);
      setSaveError(error instanceof Error ? error.message : "No se pudo guardar la sesion.");
    } finally {
      setIsSaving(false);
    }
  }, [config]);

  const {
    attempt,
    board,
    gameStatus,
    handleInput,
    keyboardStatus,
    maxAttempts,
    message,
    puzzleDate,
    targetWord,
  } = useWordle({
    onGameFinished: handleGameFinished,
    puzzleDate: config?.puzzleDate,
  });

  useEffect(() => {
    loadWordleData();
  }, [loadWordleData]);

  useEffect(() => {
    const intervalId = window.setInterval(async () => {
      try {
        const latestConfig = await getWordleConfig();

        setConfig((currentConfig) => {
          if (currentConfig?.puzzleDate === latestConfig.puzzleDate) {
            return currentConfig;
          }

          sessionStartedAtRef.current = Date.now();
          setLeaderboard(null);
          setSaveError(null);
          setLoadingMessage(null);
          getWordleLeaderboard(latestConfig.puzzleDate)
            .then((nextLeaderboard) => {
              setLeaderboard(nextLeaderboard);
            })
            .catch((error) => {
              console.error("Error refreshing daily Wordle leaderboard:", error);
              setLoadingMessage(
                error instanceof Error ? error.message : "No se pudo actualizar el puzzle diario.",
              );
            });

          return latestConfig;
        });
      } catch (error) {
        console.error("Error checking daily Wordle config:", error);
      }
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Backspace") {
        handleInput("BACKSPACE");
        return;
      }

      if (event.key === "Enter") {
        handleInput("ENTER");
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        handleInput(event.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleInput]);

  return (
    <section className="wordle-card">
      <header className="wordle-card-header">
        <p className="wordle-card-kicker">WORDLE</p>
        <h2 className="wordle-card-title">Off-Season Word Challenge</h2>
        <p className="wordle-card-copy">
          Un minijuego de 5 letras dentro del mismo apartado de Offseason.
        </p>
        {loadingMessage ? <p className="wordle-message">{loadingMessage}</p> : null}
        {saveError ? <p className="wordle-message">{saveError}</p> : null}
        {isSaving ? <p className="wordle-message">Guardando resultado...</p> : null}
      </header>

      <div className="wordle-layout">
        <div className="wordle-main">
          <WordleGrid board={board} />
          <p className="wordle-message">{message}</p>
          <p className="wordle-message">
            Puzzle diario: {puzzleDate} · Intento {Math.min(attempt + 1, maxAttempts)} de {maxAttempts}
          </p>

          <div className="wordle-keyboard-shell">
            <WordleKeyboard keyboardStatus={keyboardStatus} onKeyPress={handleInput} />
          </div>

          {gameStatus !== "playing" ? (
            <p className="wordle-answer">Palabra: {targetWord}</p>
          ) : null}
        </div>

        <aside className="wordle-sidebar">
          <WordleStats
            entries={leaderboard?.entries ?? []}
            errorMessage={loadingMessage}
            isLoading={loadingData}
            puzzleDate={leaderboard?.puzzleDate ?? config?.puzzleDate ?? null}
          />
        </aside>
      </div>
    </section>
  );
}

export default WordleGame;
