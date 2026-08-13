import { formatMonth, getCurrentMonth, shiftMonth } from "../utils/dateUtils";

const MonthSwitcher = ({ month, onChange }) => {
  const isCurrentMonth = month === getCurrentMonth();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(shiftMonth(month, -1))}
        aria-label="Previous month"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
      >
        ←
      </button>

      <p className="font-display w-36 text-center text-sm font-semibold text-slate-800">
        {formatMonth(month)}
      </p>

      <button
        type="button"
        onClick={() => onChange(shiftMonth(month, 1))}
        aria-label="Next month"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
      >
        →
      </button>

      {!isCurrentMonth && (
        <button
          type="button"
          onClick={() => onChange(getCurrentMonth())}
          className="text-brand-600 ml-1 text-xs font-medium hover:underline"
        >
          This month
        </button>
      )}
    </div>
  );
};

export default MonthSwitcher;
