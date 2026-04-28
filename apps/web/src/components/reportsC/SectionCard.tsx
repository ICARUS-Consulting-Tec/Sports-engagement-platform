import "../../styles/admin.css";

export type SectionCardItem = {
  id: string | number;
  text: string;
  timeLabel: string;
  color?: "green" | "yellow" | "navy" | "red";
};

type SectionCardProps = {
  title?: string;
  items?: SectionCardItem[];
};

const DEFAULT_ITEMS: SectionCardItem[] = [
  {
    id: 1,
    text: "@jramos joined the community",
    timeLabel: "Hace 5 min",
    color: "green",
  },
  {
    id: 2,
    text: "New post reported in the general forum",
    timeLabel: "Hace 18 min",
    color: "yellow",
  },
  {
    id: 3,
    text: "@carlosm made a purchase in the store",
    timeLabel: "Hace 34 min",
    color: "navy",
  },
  {
    id: 4,
    text: "Account @xxspammer99 flagged for multiple reports",
    timeLabel: "Hace 1 hr",
    color: "red",
  },
  {
    id: 5,
    text: "Suggestion #42 marked as completed",
    timeLabel: "Hace 2 hrs",
    color: "green",
  },
];

function SectionCard({
  title = "Recent Activity",
  items = DEFAULT_ITEMS,
}: SectionCardProps) {
  return (
    <section className="admin-section-card">
      <header className="admin-section-card-header">
        <h3 className="admin-section-card-title">{title}</h3>
      </header>

      <div className="admin-section-card-list">
        {items.map((item) => (
          <article key={item.id} className="admin-section-card-item">
            <div className={`admin-section-card-dot admin-section-card-dot-${item.color ?? "green"}`} />

            <p className="admin-section-card-text">{item.text}</p>

            <span className="admin-section-card-time">{item.timeLabel}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SectionCard;
