import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import RecordCard from "../components/RecordCard";
import PerformanceOverview from "../components/PerformanceOverview";
import MonthSwitcher from "../components/MonthSwitcher";
import { getAllRecords } from "../services/homeworkService";
import { formatMonth, getCurrentMonth } from "../utils/dateUtils";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(getCurrentMonth());

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await getAllRecords();
        // Ascending order — earliest date (and earliest day of each month) first.
        const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
        setRecords(sorted);
      } catch (err) {
        setError("Unable to load records.");
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const monthRecords = useMemo(
    () => records.filter((record) => record.date.startsWith(month)),
    [records, month]
  );

  return (
    <div className="min-h-screen bg-paper-50">
      <Navbar variant="public" />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Student Homework Tracker
          </h1>
          <p className="mt-2 text-slate-600">Homework activity for Nafis and Tamim</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_18rem]">
          <section className="order-2 lg:order-1">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-base font-semibold text-slate-800">
                Available Records
              </h2>
              <MonthSwitcher month={month} onChange={setMonth} />
            </div>

            {loading && <p className="text-slate-500">Loading records...</p>}

            {!loading && error && <p className="text-red-600">{error}</p>}

            {!loading && !error && records.length === 0 && (
              <p className="text-slate-500">No homework records available yet.</p>
            )}

            {!loading && !error && records.length > 0 && monthRecords.length === 0 && (
              <p className="text-slate-500">No homework records for {formatMonth(month)}.</p>
            )}

            {!loading && !error && monthRecords.length > 0 && (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {monthRecords.map((record) => (
                  <RecordCard key={record.date} record={record} />
                ))}
              </div>
            )}
          </section>

          {!loading && !error && records.length > 0 && (
            <aside className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-6">
                <PerformanceOverview records={monthRecords} monthLabel={formatMonth(month)} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
