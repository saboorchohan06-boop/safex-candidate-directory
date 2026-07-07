import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  email: "",
  university: "",
  degree: "",
  field: "",
  group: "",
  role: "Member",
  rating: "",
  taskStatus: "Pending",
};

// initialData: null for "Add", a candidate object for "Edit".
// onSubmit receives a cleaned payload matching the Candidate schema.
export default function CandidateForm({ initialData, onSubmit, onCancel }) {
  const isEditing = Boolean(initialData);
  const [form, setForm] = useState(
    initialData
      ? {
          ...EMPTY_FORM,
          ...initialData,
          rating: initialData.rating ?? "",
        }
      : EMPTY_FORM
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      group: Number(form.group),
      rating: form.rating === "" ? 0 : Number(form.rating),
    });
  }

  return (
    <div className="fixed inset-0 bg-charcoal/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-cream-dark">
          <h2 className="font-display text-xl text-charcoal">
            {isEditing ? "Edit Candidate" : "Add Candidate"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <Field label="Full name">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="University">
              <input
                name="university"
                value={form.university}
                onChange={handleChange}
                required
                className="input"
              />
            </Field>
            <Field label="Degree">
              <input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                required
                className="input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Field">
              <input
                name="field"
                value={form.field}
                onChange={handleChange}
                required
                className="input"
              />
            </Field>
            <Field label="Group">
              <input
                type="number"
                name="group"
                value={form.group}
                onChange={handleChange}
                required
                className="input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Role">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input"
              >
                <option value="Member">Member</option>
                <option value="Leader">Leader</option>
              </select>
            </Field>
            <Field label="Task status">
              <select
                name="taskStatus"
                value={form.taskStatus}
                onChange={handleChange}
                className="input"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </Field>
          </div>

          <Field label="Rating (0–5)">
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              value={form.rating}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-lg font-body text-sm font-medium text-charcoal-soft bg-cream-dark hover:bg-cream-dark/70 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg font-body text-sm font-medium text-white bg-mango hover:bg-mango-dark transition-colors"
            >
              {isEditing ? "Save changes" : "Add candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-body text-xs font-medium text-charcoal-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
