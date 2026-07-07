// A 5-segment rating bar. Deliberately not stars — every reference
// dashboard used stars, so this reads as distinct while still being
// instantly understandable at a glance.
export default function RatingBar({ rating = 0 }) {
  const segments = [0, 1, 2, 3, 4];
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {segments.map((i) => (
          <span
            key={i}
            className={`h-2 w-4 rounded-sm ${
              i < filled ? "bg-mango" : "bg-cream-dark"
            }`}
          />
        ))}
      </div>
      <span className="font-body text-xs text-charcoal-soft">
        {rating ? rating.toFixed(1) : "Not rated"}
      </span>
    </div>
  );
}
