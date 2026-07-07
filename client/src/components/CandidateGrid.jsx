import CandidateCard from "./CandidateCard";

// Groups candidates by their `group` number, sorts groups ascending,
// and sorts each group's members with Leader first. This is what
// makes it a "directory" instead of a random pile of cards.
function groupCandidates(candidates) {
  const groups = {};

  for (const candidate of candidates) {
    const key = candidate.group;
    if (!groups[key]) groups[key] = [];
    groups[key].push(candidate);
  }

  const sortedGroupKeys = Object.keys(groups).sort((a, b) => Number(a) - Number(b));

  for (const key of sortedGroupKeys) {
    groups[key].sort((a, b) => {
      if (a.role === b.role) return a.name.localeCompare(b.name);
      return a.role === "Leader" ? -1 : 1;
    });
  }

  return sortedGroupKeys.map((key) => ({
    group: key,
    members: groups[key],
  }));
}

export default function CandidateGrid({ candidates, onEdit, onDelete }) {
  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <p className="font-display text-lg text-charcoal">
          No candidates yet
        </p>
        <p className="font-body text-sm text-charcoal-soft mt-1">
          Add your first candidate to start building the directory.
        </p>
      </div>
    );
  }

  const grouped = groupCandidates(candidates);

  return (
    <div className="flex flex-col gap-8">
      {grouped.map(({ group, members }) => (
        <section key={group}>
          <div className="flex items-baseline gap-2 mb-3 pb-2 border-b border-cream-dark">
            <h2 className="font-display text-lg text-charcoal">
              Group {group}
            </h2>
            <span className="font-body text-xs text-charcoal-soft">
              {members.length} member{members.length !== 1 && "s"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {members.map((candidate) => (
              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}