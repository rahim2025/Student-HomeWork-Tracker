import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import RecordDetails from "../components/RecordDetails";
import { getRecordByDate } from "../services/homeworkService";

const RecordDetailsPage = () => {
  const { date } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecord = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getRecordByDate(date);
        setRecord(data);
      } catch (err) {
        setError("No record found for this date.");
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [date]);

  return (
    <div className="min-h-screen bg-paper-50">
      <Navbar variant="public" />

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link to="/" className="text-brand-600 text-sm font-medium hover:underline">
          ← Back to Records
        </Link>

        <div className="mt-6">
          {loading && <p className="text-slate-500">Loading record...</p>}

          {!loading && error && <p className="text-red-600">{error}</p>}

          {!loading && !error && record && <RecordDetails record={record} />}
        </div>
      </main>
    </div>
  );
};

export default RecordDetailsPage;
