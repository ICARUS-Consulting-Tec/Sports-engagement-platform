export default function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  // change status filter
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-7 py-2.5 text-base font-semibold transition ${
        active
          ? "border-[#0d1f3c] bg-[#0d1f3c] text-white"
          : "border-[#d0d4e0] bg-white text-[#3a4560]"
      }`}
    >
      {label}
    </button>
  );
}
