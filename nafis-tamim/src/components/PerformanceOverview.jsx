const SEVERITY = {
  good: "#0ca30c",
  warning: "#fab219",
  critical: "#d03b3b",
};

const rateColor = (rate) => {
  if (rate >= 80) return SEVERITY.good;
  if (rate >= 50) return SEVERITY.warning;
  return SEVERITY.critical;
};

const computeRate = (records, key) => {
  const total = records.length;
  const completed = records.filter((r) => r[key]).length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, rate };
};

const StudentMeter = ({ name, records, field }) => {
  const { completed, total, rate } = computeRate(records, field);
  const fillColor = rateColor(rate);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-slate-800">{name}</p>
        <p className="font-display text-lg font-bold text-slate-900">{rate}%</p>
      </div>
      <div
        className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={rate}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} homework completion rate`}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${rate}%`, backgroundColor: fillColor }}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        {completed} of {total} day{total === 1 ? "" : "s"} completed
      </p>
    </div>
  );
};

const PerformanceOverview = ({ records, monthLabel }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="font-display text-base font-semibold text-slate-800">
        Student Performance
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        {monthLabel ? `Completion rate for ${monthLabel}.` : "Completion rate across all recorded days."}
      </p>

      {records.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No records for {monthLabel || "this period"} yet.
        </p>
      ) : (
        <>
          <div className="mt-4 space-y-4">
            <StudentMeter name="Nafis" records={records} field="nafisCompleted" />
            <StudentMeter name="Tamim" records={records} field="tamimCompleted" />
          </div>

          <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-500">
            <span style={{ color: SEVERITY.good }}>●</span> 80%+&nbsp;&nbsp;
            <span style={{ color: SEVERITY.warning }}>●</span> 50–79%&nbsp;&nbsp;
            <span style={{ color: SEVERITY.critical }}>●</span> Below 50%
          </p>
        </>
      )}
    </section>
  );
};

export default PerformanceOverview;
