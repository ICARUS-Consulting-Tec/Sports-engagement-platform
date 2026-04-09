import { useEffect, useMemo, useState } from "react";
import type { TimelineEvent } from "../../data/HistoryMockData";

type TimelineStoryModalProps = {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
};

function TimelineStoryModal({
  event,
  isOpen,
  onClose,
}: TimelineStoryModalProps) {
  const imageSources = useMemo(
    () =>
      [event?.imageReferenceUrl, event?.image].filter(
        (source, index, sources): source is string =>
          Boolean(source) && sources.indexOf(source) === index,
      ),
    [event?.image, event?.imageReferenceUrl],
  );
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscape(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setImageIndex(0);
  }, [event?.id, event?.image, event?.imageReferenceUrl]);

  if (!isOpen || !event) {
    return null;
  }

  const facts = event.facts?.slice(0, 3) ?? [];
  const storyParagraphs = event.fullStory.split("\n\n").slice(0, 2);
  const currentImageSrc = imageSources[imageIndex];

  return (
    <div
      aria-modal="true"
      onClick={onClose}
      role="dialog"
      style={styles.overlay}
    >
      <div
        onClick={(mouseEvent) => mouseEvent.stopPropagation()}
        style={styles.modal}
      >
        <button
          aria-label="Close timeline story modal"
          onClick={onClose}
          style={styles.closeButton}
          type="button"
        >
          ×
        </button>

        <div style={styles.mediaPanel}>
          {currentImageSrc ? (
            <img
              alt={event.alt}
              onError={() => setImageIndex((current) => current + 1)}
              src={currentImageSrc}
              style={styles.heroImage}
            />
          ) : (
            <div style={{ ...styles.heroImage, ...styles.imageFallback }}>
              {event.year}
            </div>
          )}
        </div>

        <div style={styles.contentPanel}>
          <div style={styles.headerRow}>
            <span style={styles.yearBadge}>{event.year}</span>
          </div>

          <div style={styles.textGroup}>
            <h3 id={`timeline-story-title-${event.id}`} style={styles.title}>
              {event.title}
            </h3>
            <p style={styles.summary}>{event.description}</p>
          </div>

          <div style={styles.storyBlock}>
            {storyParagraphs.map((paragraph) => (
              <p key={paragraph} style={styles.storyParagraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={styles.significanceCard}>
            <span style={styles.significanceLabel}>Historical Significance</span>
            <p style={styles.significanceText}>{event.significance}</p>
          </div>

          {facts.length > 0 ? (
            <div style={styles.factsBlock}>
              <h4 style={styles.factsTitle}>Key Facts</h4>
              <ul style={styles.factsList}>
                {facts.map((fact) => (
                  <li key={fact} style={styles.factItem}>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(12, 35, 64, 0.54)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    zIndex: 1000,
  },
  modal: {
    width: "100%",
    maxWidth: "880px",
    maxHeight: "88vh",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    border: "1px solid #dbe3ef",
    boxShadow: "0 28px 90px rgba(12, 35, 64, 0.22)",
    display: "grid",
    gridTemplateColumns: "0.8fr 1fr",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    border: "1px solid #d8e1ed",
    backgroundColor: "#ffffff",
    color: "#0C2340",
    fontSize: "24px",
    lineHeight: 1,
    cursor: "pointer",
    zIndex: 2,
  },
  mediaPanel: {
    padding: "22px",
    borderRight: "1px solid #edf2f7",
    background:
      "linear-gradient(180deg, rgba(12,35,64,0.03) 0%, rgba(75,146,219,0.08) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    minHeight: "250px",
    maxHeight: "360px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
    objectPosition: "center",
    margin: "0 auto",
  },
  imageFallback: {
    background: "linear-gradient(135deg, #153865 0%, #4B92DB 100%)",
    color: "#ffffff",
    fontSize: "48px",
    fontWeight: 800,
  },
  contentPanel: {
    padding: "30px 30px 26px",
    display: "grid",
    gap: "22px",
    alignContent: "start",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  yearBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "68px",
    height: "32px",
    borderRadius: "999px",
    backgroundColor: "#0C2340",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.08em",
  },
  textGroup: {
    display: "grid",
    gap: "10px",
  },
  title: {
    color: "#0C2340",
    fontSize: "30px",
    lineHeight: 1.1,
    fontWeight: 800,
    margin: 0,
  },
  summary: {
    color: "#5b6777",
    fontSize: "14px",
    lineHeight: 1.65,
    margin: 0,
  },
  storyBlock: {
    display: "grid",
    gap: "14px",
  },
  storyParagraph: {
    color: "#334155",
    fontSize: "14px",
    lineHeight: 1.75,
    margin: 0,
  },
  significanceCard: {
    background: "#f8fbff",
    color: "#0C2340",
    border: "1px solid #dce8f7",
    borderRadius: "18px",
    padding: "18px",
    display: "grid",
    gap: "8px",
  },
  significanceLabel: {
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#4B92DB",
  },
  significanceText: {
    fontSize: "14px",
    lineHeight: 1.65,
    margin: 0,
  },
  factsBlock: {
    display: "grid",
    gap: "10px",
  },
  factsTitle: {
    color: "#0C2340",
    fontSize: "15px",
    fontWeight: 800,
    margin: 0,
  },
  factsList: {
    margin: 0,
    paddingLeft: "18px",
    color: "#475569",
    display: "grid",
    gap: "8px",
  },
  factItem: {
    fontSize: "13px",
    lineHeight: 1.6,
  },
};

export default TimelineStoryModal;
