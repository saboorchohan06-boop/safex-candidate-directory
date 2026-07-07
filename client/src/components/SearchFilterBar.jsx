// Search by name, filter by group (dropdown, not free text — group is a
// fixed category, so a dropdown is more precise and matches how the
// research on filter UX recommends handling categorical data at scale),
// filter by role, filter by task status.
export default function SearchFilterBar({
  search,
  onSearchChange,
  group,
  onGroupChange,
  role,
  onRoleChange,
  taskStatus,
  onTaskStatusChange,
  groupOptions,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Search by name…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="input flex-1"
      />

      <select
        value={group}
        onChange={(e) => onGroupChange(e.target.value)}
        className="input sm:w-40"
      >
        <option value="">All Groups</option>
        {groupOptions.map((g) => (
          <option key={g} value={g}>
            Group {g}
          </option>
        ))}
      </select>

      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="input sm:w-36"
      >
        <option value="">All Roles</option>
        <option value="Leader">Leader</option>
        <option value="Member">Member</option>
      </select>

      <select
        value={taskStatus}
        onChange={(e) => onTaskStatusChange(e.target.value)}
        className="input sm:w-44"
      >
        <option value="">All Task Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}