import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Statistics from "../components/Statistics";
import { formatDate } from "../utils/dateUtils";
import {
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../services/homeworkService";

const emptyForm = {
  date: "",
  nafisCompleted: "true",
  tamimCompleted: "true",
  nafisNote: "",
  tamimNote: "",
};

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const existingRecord = useMemo(
    () => records.find((r) => r.date === form.date),
    [records, form.date]
  );
  const isEditing = Boolean(existingRecord);

  const loadRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllRecords();
      setRecords(data);
    } catch (err) {
      setError("Unable to load records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    if (existingRecord) {
      setForm({
        date: existingRecord.date,
        nafisCompleted: String(existingRecord.nafisCompleted),
        tamimCompleted: String(existingRecord.tamimCompleted),
        nafisNote: existingRecord.nafisNote || "",
        tamimNote: existingRecord.tamimNote || "",
      });
    }
  }, [existingRecord]);

  const handleChange = (field) => (e) => {
    setMessage("");
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetForm = () => setForm(emptyForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    const payload = {
      date: form.date,
      nafisCompleted: form.nafisCompleted === "true",
      tamimCompleted: form.tamimCompleted === "true",
      nafisNote: form.nafisNote,
      tamimNote: form.tamimNote,
    };

    setSaving(true);
    try {
      if (isEditing) {
        await updateRecord(form.date, payload);
        setMessage("Record updated successfully.");
      } else {
        await createRecord(payload);
        setMessage("Record saved successfully.");
      }
      resetForm();
      await loadRecords();
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      setError(backendMessage || "Unable to save record.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (record) => {
    setMessage("");
    setError("");
    setForm({
      date: record.date,
      nafisCompleted: String(record.nafisCompleted),
      tamimCompleted: String(record.tamimCompleted),
      nafisNote: record.nafisNote || "",
      tamimNote: record.tamimNote || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (date) => {
    const confirmed = window.confirm(
      `Delete the record for ${formatDate(date)}? This cannot be undone.`
    );
    if (!confirmed) return;

    setError("");
    setMessage("");
    try {
      await deleteRecord(date);
      setMessage("Record deleted successfully.");
      if (form.date === date) resetForm();
      await loadRecords();
    } catch (err) {
      setError("Unable to delete record.");
    }
  };

  return (
    <div className="bg-paper-50 min-h-screen">
      <Navbar variant="admin" />

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <Statistics records={records} />

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">Homework Record</h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                id="date"
                type="date"
                required
                disabled={isEditing}
                value={form.date}
                onChange={handleChange("date")}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1 disabled:bg-slate-100 disabled:text-slate-500 sm:w-64"
              />
              {isEditing && (
                <p className="mt-1 text-xs text-amber-600">
                  A record already exists for this date and has been loaded for editing. The
                  date can't be changed here — use "Clear Form" and create a new record if you
                  need a different date, or delete this record from the list below.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="block text-sm font-medium text-slate-700">Nafis</p>
                <div className="mt-1 flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="nafisCompleted"
                      value="true"
                      checked={form.nafisCompleted === "true"}
                      onChange={handleChange("nafisCompleted")}
                    />
                    Completed
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="nafisCompleted"
                      value="false"
                      checked={form.nafisCompleted === "false"}
                      onChange={handleChange("nafisCompleted")}
                    />
                    Not Completed
                  </label>
                </div>

                <label
                  htmlFor="nafisNote"
                  className="mt-3 block text-sm font-medium text-slate-700"
                >
                  Nafis's Note
                </label>
                <textarea
                  id="nafisNote"
                  rows={3}
                  value={form.nafisNote}
                  onChange={handleChange("nafisNote")}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1"
                />
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="block text-sm font-medium text-slate-700">Tamim</p>
                <div className="mt-1 flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="tamimCompleted"
                      value="true"
                      checked={form.tamimCompleted === "true"}
                      onChange={handleChange("tamimCompleted")}
                    />
                    Completed
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="tamimCompleted"
                      value="false"
                      checked={form.tamimCompleted === "false"}
                      onChange={handleChange("tamimCompleted")}
                    />
                    Not Completed
                  </label>
                </div>

                <label
                  htmlFor="tamimNote"
                  className="mt-3 block text-sm font-medium text-slate-700"
                >
                  Tamim's Note
                </label>
                <textarea
                  id="tamimNote"
                  rows={3}
                  value={form.tamimNote}
                  onChange={handleChange("tamimNote")}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-brand-600 hover:bg-brand-700 rounded-md px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : isEditing ? "Update Record" : "Save Record"}
              </button>
              {form.date && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear Form
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="font-display mb-4 text-lg font-semibold text-slate-900">Records</h2>

          {loading && <p className="text-slate-500">Loading records...</p>}
          {!loading && records.length === 0 && (
            <p className="text-slate-500">No homework records available yet.</p>
          )}

          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record.date}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{formatDate(record.date)}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Nafis {record.nafisCompleted ? "🟢" : "🔴"} &nbsp; Tamim{" "}
                    {record.tamimCompleted ? "🟢" : "🔴"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.date)}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
