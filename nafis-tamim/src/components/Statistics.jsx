const studentStats = (records, key) => {
  const completed = records.filter((r) => r[key]).length;
  const total = records.length;
  const notCompleted = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, notCompleted, rate };
};

const Statistics = ({ records }) => {
  const nafis = studentStats(records, "nafisCompleted");
  const tamim = studentStats(records, "tamimCompleted");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-slate-900">Statistics</h2>
      <p className="mt-1 text-sm text-slate-500">Total Records: {records.length}</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="font-medium text-slate-800">Nafis</p>
          <p className="mt-1 text-sm text-slate-600">Completed: {nafis.completed}</p>
          <p className="text-sm text-slate-600">Not Completed: {nafis.notCompleted}</p>
          <p className="text-sm font-semibold text-slate-800">
            Completion Rate: {nafis.rate}%
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="font-medium text-slate-800">Tamim</p>
          <p className="mt-1 text-sm text-slate-600">Completed: {tamim.completed}</p>
          <p className="text-sm text-slate-600">Not Completed: {tamim.notCompleted}</p>
          <p className="text-sm font-semibold text-slate-800">
            Completion Rate: {tamim.rate}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
