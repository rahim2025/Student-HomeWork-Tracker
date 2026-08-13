const StudentStatus = ({ name, completed, note, size = "sm" }) => {
  const dotClass = completed ? "bg-green-500" : "bg-red-500";
  const textClass = completed ? "text-green-700" : "text-red-700";
  const label = completed ? "Completed" : "Not Completed";

  if (size === "lg") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{name}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className={`h-3 w-3 rounded-full ${dotClass}`} aria-hidden="true" />
          <span className={`text-lg font-semibold ${textClass}`}>
            Homework {label}
          </span>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-3 text-left">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Instructor's Note
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
            {note ? note : "No note was left for this date."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      <span className="font-medium text-slate-700">{name}</span>
      <span className={`font-medium ${textClass}`}>{label}</span>
    </div>
  );
};

export default StudentStatus;
