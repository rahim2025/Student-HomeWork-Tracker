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
      className="group relative block overflow-hidden rounded-lg border border-slate-200 bg-white py-2 pl-3.5 pr-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:bg-slate-50"
    >
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ backgroundColor: dayAccent(record) }}
        aria-hidden="true"
      />

      <p className="font-display text-sm font-semibold text-slate-900">
        {formatDate(record.date)}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <StudentStatus name="Nafis" completed={record.nafisCompleted} />
        <StudentStatus name="Tamim" completed={record.tamimCompleted} />
      </div>

      <span className="text-brand-600 mt-1 flex items-center gap-0.5 text-[11px] font-medium">
        See more
        <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
};

export default RecordCard;
