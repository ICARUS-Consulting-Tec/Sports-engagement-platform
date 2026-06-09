import { useState } from "react";

interface Props {
  onClose: () => void;
}

const PAGES = [
  {
    title: "The Goal",
    content: (
      <div className="space-y-4 text-base text-gray-700">
        <p className="text-lg font-bold text-[#0B2A55]">
          3 Game Managers · <span className="text-[#0f3d78]">10 rounds</span> · highest score wins
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <strong>Your hand:</strong> up to 6 player cards (1–5 pts each by tier).
          </li>
          <li>
            <strong>Secret agendas:</strong> pick 2 before the game, bonus if you hit them at the end, penalty if you miss.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Your Turn — 45 seconds",
    content: (
      <div className="space-y-3 text-base text-gray-700">
        <p>On your turn, pick <strong>one</strong> action:</p>
        <div className="space-y-2">
          <div className="rounded-xl border-2 border-[#0f3d78]/30 bg-[#0f3d78]/5 p-3">
            <p className="font-black text-[#0B2A55]">Breaking News</p>
            <p className="text-sm text-gray-600">TitanCash goes up or down.</p>
          </div>
          <div className="rounded-xl border-2 border-[#0f3d78]/30 bg-[#0f3d78]/5 p-3">
            <p className="font-black text-[#0B2A55]">Buy Player — 5 TitanCash</p>
            <p className="text-sm text-gray-600">See 3 players, add 1 (discard if you have 6).</p>
          </div>
          <div className="rounded-xl border-2 border-[#0f3d78]/30 bg-[#0f3d78]/5 p-3">
            <p className="font-black text-[#0B2A55]">Negotiate</p>
            <p className="text-sm text-gray-600">1-for-1 trade + optional TitanCash. Rival has 15s. Max 2 tries per turn.</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">Timer hits 0 → your turn is skipped.</p>
      </div>
    ),
  },
  {
    title: "How You Win",
    content: (
      <div className="space-y-4 text-base text-gray-700">
        <div className="rounded-xl bg-[#0B2A55] text-white p-4 space-y-2 text-center">
          <p className="text-sm opacity-80">Final score</p>
          <p className="text-xl font-black">Hand points (+ agendas)  or (− agendas) </p>
        </div>
        <p className="text-center font-bold text-[#0B2A55]">Highest score wins. Good luck!</p>
      </div>
    ),
  },
];

export function WarRoomTutorialModal({ onClose }: Props) {
  const [page, setPage] = useState(0);
  const current = PAGES[page];
  const isLast = page === PAGES.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[linear-gradient(90deg,#0B2A55_0%,#1D4E89_100%)] px-6 py-4">
          <p className="text-[10px] font-extrabold tracking-widest text-blue-300 uppercase mb-1">
            How to Play — {page + 1} / {PAGES.length}
          </p>
          <h2 className="text-xl font-black text-white">
            {current.title}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-[#0f3d78] transition-all duration-300"
            style={{ width: `${((page + 1) / PAGES.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 min-h-[120px]">{current.content}</div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#0f3d78] px-4 py-3 text-sm font-bold text-white hover:bg-[#0B2A55] transition-colors"
            >
              Got it — Back to Lobby
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="flex-1 rounded-xl bg-[#0f3d78] px-4 py-3 text-sm font-bold text-white hover:bg-[#0B2A55] transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {/* Skip */}
        {!isLast && (
          <div className="px-6 pb-4 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Skip tutorial
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
