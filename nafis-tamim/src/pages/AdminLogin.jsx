import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(() => {
    if (sessionStorage.getItem("sessionExpired")) {
      sessionStorage.removeItem("sessionExpired");
      return "Session expired. Please log in again.";
    }
    return "";
  });
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/admin";

  // Already logged in — skip the form instead of asking to log in again.
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid login credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="notebook-texture bg-ink-900 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="font-display text-center text-xl font-bold text-slate-900">
          Student Homework Tracker
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">Administrator Login</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:border-brand-500 focus:ring-brand-500 mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-600 hover:bg-brand-700 w-full rounded-md px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
