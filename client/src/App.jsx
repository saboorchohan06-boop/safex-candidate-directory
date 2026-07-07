import { useEffect, useMemo, useState } from "react";
import api from "./api/axios";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import CandidateGrid from "./components/CandidateGrid";
import CandidateForm from "./components/CandidateForm";
import SearchFilterBar from "./components/SearchFilterBar";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);

  // Day 3: search + filter state
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [taskStatusFilter, setTaskStatusFilter] = useState("");

  async function fetchCandidates() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/");
      setCandidates(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  function openAddForm() {
    setEditingCandidate(null);
    setIsFormOpen(true);
  }

  function openEditForm(candidate) {
    setEditingCandidate(candidate);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingCandidate(null);
  }

  async function handleFormSubmit(payload) {
    try {
      if (editingCandidate) {
        await api.put(`/${editingCandidate._id}`, payload);
      } else {
        await api.post("/", payload);
      }
      closeForm();
      fetchCandidates();
    } catch (err) {
      alert(`Save failed: ${err.response?.data?.message || err.message}`);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this candidate? This can't be undone."
    );
    if (!confirmed) return;

    try {
      await api.delete(`/${id}`);
      setCandidates((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(`Delete failed: ${err.response?.data?.message || err.message}`);
    }
  }

  // Unique, sorted group numbers for the dropdown — derived from real data,
  // so it always matches whatever groups actually exist in the database.
  const groupOptions = useMemo(() => {
    const unique = [...new Set(candidates.map((c) => c.group))];
    return unique.sort((a, b) => a - b);
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch = c.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesGroup = groupFilter === "" || c.group === Number(groupFilter);
      const matchesRole = roleFilter === "" || c.role === roleFilter;
      const matchesTaskStatus =
        taskStatusFilter === "" || c.taskStatus === taskStatusFilter;

      return matchesSearch && matchesGroup && matchesRole && matchesTaskStatus;
    });
  }, [candidates, search, groupFilter, roleFilter, taskStatusFilter]);

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-cream-dark bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-charcoal">
              SafeX Candidate Directory
            </h1>
            <p className="font-body text-sm text-charcoal-soft mt-0.5">
              {filteredCandidates.length} of {candidates.length} candidate
              {candidates.length !== 1 && "s"}
            </p>
          </div>
          <button
            onClick={openAddForm}
            className="px-4 py-2.5 rounded-lg bg-mango text-white font-body text-sm font-medium hover:bg-mango-dark transition-colors shrink-0"
          >
            + Add Candidate
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!loading && !error && (
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            group={groupFilter}
            onGroupChange={setGroupFilter}
            role={roleFilter}
            onRoleChange={setRoleFilter}
            taskStatus={taskStatusFilter}
            onTaskStatusChange={setTaskStatusFilter}
            groupOptions={groupOptions}
          />
        )}

        {loading && <Loader />}
        {!loading && error && (
          <ErrorMessage message={error} onRetry={fetchCandidates} />
        )}
        {!loading && !error && (
          <CandidateGrid
            candidates={filteredCandidates}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </main>

      {isFormOpen && (
        <CandidateForm
          initialData={editingCandidate}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}