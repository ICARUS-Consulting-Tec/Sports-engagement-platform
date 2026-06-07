import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import RarityBadge from "./RarityBadge";
import { positionAndJersey } from "../../utils/jerseyDisplay";
import type { PackOpenResult } from "../../types";

/** Minimum envelope animation time before showing pulls (ms). */
const ENVELOPE_REVEAL_MS = 1900;

interface PackOpeningExperienceProps {
  result: PackOpenResult | null;
  onClose: () => void;
}

export default function PackOpeningExperience({ result, onClose }: PackOpeningExperienceProps) {
  const [flapOpen, setFlapOpen] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const openedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    openedAtRef.current = Date.now();
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flapDelay = prefersReduce ? 80 : 550;
    const flapId = window.setTimeout(() => setFlapOpen(true), flapDelay);
    return () => window.clearTimeout(flapId);
  }, []);

  useEffect(() => {
    if (!result) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      setShowRewards(true);
      return;
    }
    const elapsed = Date.now() - openedAtRef.current;
    const wait = Math.max(0, ENVELOPE_REVEAL_MS - elapsed);
    const id = window.setTimeout(() => setShowRewards(true), wait);
    return () => window.clearTimeout(id);
  }, [result]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md motion-reduce:backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pack-opening-title"
    >
      <button
        type="button"
        className="absolute right-3 top-3 z-[110] rounded-lg px-3 py-1.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
        onClick={onClose}
      >
        Close
      </button>

      {!showRewards ? (
        <div className="flex w-full max-w-sm flex-col items-center gap-5 py-8">
          <h2 id="pack-opening-title" className="text-center text-lg font-bold tracking-wide text-white">
            {result ? "Your pack is ready" : "Opening your pack…"}
          </h2>

          <div className="[perspective:1100px]">
            <div
              className="relative h-44 w-[min(16rem,78vw)] motion-reduce:scale-100 sm:h-52 sm:w-[min(18rem,85vw)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`absolute inset-[10%] top-[24%] rounded-md bg-gradient-to-b from-amber-400/25 via-[#4B90CD]/20 to-transparent transition-opacity duration-500 ${
                  flapOpen ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />

              <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-br from-[#1a2a42] to-[#0f1b2d] shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10" />

              <div
                className="absolute bottom-0 left-0 right-0 z-[5] h-[58%] rounded-b-lg bg-gradient-to-b from-[#243652] to-[#152238] shadow-inner"
                style={{
                  clipPath: "polygon(0 12%, 50% 0, 100% 12%, 100% 100%, 0 100%)",
                }}
                aria-hidden
              />

              <div
                className={`absolute left-1/2 top-[42%] z-[30] flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#8b2942] to-[#5c1528] shadow-lg ring-2 ring-[#c94d6a]/50 transition-all duration-500 motion-reduce:duration-150 sm:size-14 ${
                  flapOpen ? "scale-75 opacity-0" : "opacity-100"
                }`}
                style={{ transform: "translate3d(-50%, -50%, 10px)" }}
                aria-hidden
              >
                <span className="text-base font-black text-[#f5d0a8] sm:text-lg">TC</span>
              </div>

              <div
                className="absolute left-0 right-0 top-0 h-[48%] origin-top transition-transform duration-[1000ms] motion-reduce:duration-200 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flapOpen ? "rotateX(178deg) translateZ(2px)" : "rotateX(0deg) translateZ(1px)",
                }}
              >
                <div
                  className="h-full w-full bg-gradient-to-br from-[#3d5270] to-[#2a3d56] shadow-md ring-1 ring-white/5 [backface-visibility:hidden]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              </div>

              {!result && (
                <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center">
                  <div
                    className="size-6 animate-spin rounded-full border-2 border-white/20 border-t-[#4B90CD]"
                    aria-hidden
                  />
                </div>
              )}
            </div>
          </div>

          <p className="max-w-xs text-center text-sm text-gray-400">
            {result
              ? "Slide the cards out of the envelope."
              : "Tearing the seal and revealing your pulls…"}
          </p>
        </div>
      ) : null}

      {showRewards && result ? (
        <div className="my-auto w-full max-w-[min(100%,22rem)] animate-[pack-reward-in_0.55s_ease-out_both] rounded-2xl border border-gray-600/80 bg-gradient-to-b from-[#0f1b2d] to-[#1a2d47] p-4 shadow-2xl sm:max-w-md sm:p-6">
          <div className="mb-4 text-center sm:mb-6">
            <h3 className="text-xl font-black text-white sm:text-2xl">PACK OPENED!</h3>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              You unlocked {result.cards_unlocked.length} new card
              {result.cards_unlocked.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {result.cards_unlocked.map((card, i) => (
              <div
                key={card.card_id}
                className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl border border-gray-600 bg-gray-800/90 p-2.5 opacity-0 animate-[pack-card-pop_0.45s_ease-out_both] sm:gap-2 sm:p-4"
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                <RarityBadge rarity={card.rarity} />
                <p className="line-clamp-2 w-full text-center text-[11px] font-bold leading-tight text-white sm:text-sm">
                  {card.display_name}
                </p>
                <p className="text-center text-[10px] text-gray-400 sm:text-xs">
                  {positionAndJersey(card.position, card.jersey_num)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-gray-400 sm:mt-6 sm:text-sm">
            {result.packs_remaining} packs remaining
          </p>

          <div className="mt-4 flex justify-center sm:mt-6">
            <Button
              size="lg"
              className="w-full bg-white px-8 font-bold text-[#0f1b2d] sm:w-auto sm:px-12"
              onPress={onClose}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes pack-reward-in {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pack-card-pop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
