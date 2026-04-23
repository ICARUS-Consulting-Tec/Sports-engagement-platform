import { useEffect, useMemo, useState } from "react";
import type { TimelineEvent } from "../../types/history";

type TimelineItemProps = {
  event: TimelineEvent;
  index: number;
  onOpenStory: (event: TimelineEvent) => void;
};

function TimelineItem({ event, index, onOpenStory }: TimelineItemProps) {
  const imageSources = useMemo(
    () =>
      [event.imageReferenceUrl, event.image].filter(
        (source, sourceIndex, sources): source is string =>
          Boolean(source) && sources.indexOf(source) === sourceIndex,
      ),
    [event.image, event.imageReferenceUrl],
  );
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [event.id, event.image, event.imageReferenceUrl]);

  function handleOpenStory() {
    onOpenStory(event);
  }

  function handleKeyDown(keyboardEvent: React.KeyboardEvent<HTMLElement>) {
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      keyboardEvent.preventDefault();
      handleOpenStory();
    }
  }

  const currentImageSrc = imageSources[imageIndex];
  const isLeft = index % 2 === 0;

  const imageBlock = currentImageSrc ? (
    <div className="w-[100px] shrink-0">
      <img
        alt={event.alt}
        className="h-full w-full object-cover"
        onError={() => setImageIndex((i) => i + 1)}
        src={currentImageSrc}
      />
    </div>
  ) : (
    <div className="flex w-[80px] shrink-0 items-center justify-center bg-[linear-gradient(135deg,#153865_0%,#4B92DB_100%)]">
      <span className="text-[12px] font-extrabold tracking-[0.06em] text-white">
        {event.year}
      </span>
    </div>
  );

  const card = (
    <article
      aria-label={`Open full story for ${event.title}`}
      className={`flex min-h-[88px] w-full cursor-pointer overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.07)] outline-none transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)] focus-visible:ring-2 focus-visible:ring-[#0C2340] focus-visible:ring-offset-1${!isLeft ? " flex-row-reverse" : ""}`}
      onClick={handleOpenStory}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 p-3">
        <h3 className="text-[13px] font-bold leading-snug text-[#0C2340]">
          {event.title}
        </h3>
        <p className="line-clamp-2 text-[11px] leading-[1.5] text-slate-500">
          {event.description}
        </p>
        <button
          className="mt-1 inline-flex items-center gap-1 border-none bg-transparent p-0 text-[11px] font-bold text-[#4B92DB]"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenStory();
          }}
          type="button"
        >
          {event.linkLabel}
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 12 12"
          >
            <path d="M2.5 6h7m-3-3 3 3-3 3" />
          </svg>
        </button>
      </div>
      {imageBlock}
    </article>
  );

  return (
    <div className="relative mb-4 md:mb-7">
      {/* Mobile: left spine with year badge + card */}
      <div className="flex items-start gap-3 md:hidden">
        <div className="flex flex-col items-center pt-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0C2340] shadow-md ring-2 ring-[#e6e9ef]">
            <span className="text-center text-[8px] font-extrabold leading-tight tracking-wide text-white">
              {event.year}
            </span>
          </div>
          <div className="mt-1 w-px flex-1 bg-[#dde3ec]" />
        </div>
        <div className="flex-1 pb-3">{card}</div>
      </div>

      {/* Desktop: alternating left/right with center year badge */}
      <div className="hidden md:grid md:grid-cols-[1fr_64px_1fr] md:items-center">
        <div className="flex justify-end pr-4">
          {isLeft ? card : null}
        </div>
        <div className="flex items-center justify-center">
          <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0C2340] shadow-[0_4px_12px_rgba(12,35,64,0.28)] ring-4 ring-white">
            <span className="text-center text-[10px] font-extrabold leading-tight tracking-wider text-white">
              {event.year}
            </span>
          </div>
        </div>
        <div className="flex justify-start pl-4">
          {!isLeft ? card : null}
        </div>
      </div>
    </div>
  );
}

export default TimelineItem;
