import { formatDate } from "../utils/dateUtils";
import StudentStatus from "./StudentStatus";

const RecordDetails = ({ record }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-2xl font-bold text-slate-900">
        {formatDate(record.date)}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StudentStatus
          name="Nafis"
          completed={record.nafisCompleted}
          note={record.nafisNote}
          size="lg"
        />
        <StudentStatus
          name="Tamim"
          completed={record.tamimCompleted}
          note={record.tamimNote}
          size="lg"
        />
      </div>
    </div>
  );
};

export default RecordDetails;
