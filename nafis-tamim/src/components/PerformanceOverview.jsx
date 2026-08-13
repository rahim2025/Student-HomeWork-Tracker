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

const StudentMeter = ({ name, completed, total, rate, isTop }) => {
  const fillColor = rateColor(rate);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-1">
        <p className="flex items-center gap-1 text-xs font-medium text-slate-800">
          {name}
          {isTop && total > 0 && (
            <span className="text-[10px]" title="Leading this period" aria-label="Leading this period">
              🏆
            </span>
          )}
        </p>
        <p className="font-display text-sm font-bold text-slate-900">{rate}%</p>
      </div>
      <div
        className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
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
      <p className="mt-1 text-[10px] text-slate-500">
        {completed}/{total} day{total === 1 ? "" : "s"}
      </p>
    </div>
  );
};

const PerformanceOverview = ({ records, monthLabel }) => {
  // Sort so whichever student is currently performing better appears first.
  const students = [
    { name: "Nafis", field: "nafisCompleted" },
    { name: "Tamim", field: "tamimCompleted" },
  ]
    .map((s) => ({ ...s, ...computeRate(records, s.field) }))
    .sort((a, b) => b.rate - a.rate);
  const isTie = students.length > 1 && students[0].rate === students[1].rate;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <h2 className="font-display text-sm font-semibold text-slate-800">
        Student Performance
      </h2>
      <p className="mt-0.5 text-[11px] text-slate-500">
        {monthLabel ? `Completion for ${monthLabel}.` : "Completion across all recorded days."}
      </p>

      {records.length === 0 ? (
        <p className="mt-3 text-xs text-slate-500">
          No records for {monthLabel || "this period"} yet.
        </p>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {students.map((s) => (
              <StudentMeter key={s.name} {...s} isTop={!isTie && s.rate === students[0].rate} />
            ))}
          </div>

          <p className="mt-3 border-t border-slate-100 pt-2 text-[10px] leading-relaxed text-slate-500">
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
