import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import StudentStatus from "./StudentStatus";

const dayAccent = (record) => {
  if (record.nafisCompleted && record.tamimCompleted) return "var(--color-status-good)";
  if (!record.nafisCompleted && !record.tamimCompleted) return "var(--color-status-critical)";
  return "var(--color-status-warning)";
};

const RecordCard = ({ record }) => {
  return (
    <Link
      to={`/record/${record.date}`}
      className="group relative block overflow-hidden rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ backgroundColor: dayAccent(record) }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm font-semibold text-slate-900">
          {formatDate(record.date)}
        </p>
        <span
          className="text-brand-600 text-sm opacity-0 transition group-hover:opacity-100"
          aria-hidden="true"
        >
          →
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <StudentStatus name="Nafis" completed={record.nafisCompleted} />
        <StudentStatus name="Tamim" completed={record.tamimCompleted} />
      </div>
    </Link>
  );
};

export default RecordCard;
