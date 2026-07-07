import RatingBar from "./RatingBar";
import StatusBadge from "./StatusBadge";

// Left-edge color maps to taskStatus — a quiet, scannable signal
// that doesn't need reading the badge text to register.
const ACCENT = {
  Pending: "border-l-papaya",
  "In Progress": "border-l-mango",
  Completed: "border-l-guava",
};

export default function CandidateCard({ candidate, onEdit, onDelete }) {
  const accent = ACCENT[candidate.taskStatus] || "border-l-cream-dark";

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-cream-dark border-l-4 ${accent} p-5 flex flex-col gap-3 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg text-charcoal leading-tight">
            {candidate.name}
          </h3>
          <p className="font-body text-xs text-charcoal-soft mt-0.5">
            {candidate.degree} · {candidate.university}
          </p>
        </div>
        <span
          className={`shrink-0 px-2 py-1 rounded-md text-xs font-medium font-body ${
            candidate.role === "Leader"
              ? "bg-fig text-white"
              : "bg-cream-dark text-charcoal-soft"
          }`}
        >
          {candidate.role}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-body text-charcoal-soft">
        <span className="px-2 py-1 rounded-md bg-cream-dark">
          Group {candidate.group}
        </span>
        <span className="px-2 py-1 rounded-md bg-cream-dark">
          {candidate.field}
        </span>
        <StatusBadge status={candidate.taskStatus} />
      </div>

      <RatingBar rating={candidate.rating} />

      <div className="flex gap-2 pt-2 mt-auto border-t border-cream-dark">
        <button
          onClick={() => onEdit(candidate)}
          className="flex-1 py-2 rounded-lg text-sm font-medium font-body text-mango-dark bg-mango-light hover:bg-mango hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(candidate._id)}
          className="flex-1 py-2 rounded-lg text-sm font-medium font-body text-blood bg-blood-light hover:bg-blood hover:text-white transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
