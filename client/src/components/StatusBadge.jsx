// Colors map to the candidate's taskStatus. Kept semantic:
// pending = amber (waiting), in progress = mango (active),
// completed = guava green (done).
const STYLES = {
  Pending: "bg-papaya-light text-papaya",
  "In Progress": "bg-mango-light text-mango-dark",
  Completed: "bg-guava-light text-guava",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || "bg-cream-dark text-charcoal-soft";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body ${style}`}
    >
      {status}
    </span>
  );
}
