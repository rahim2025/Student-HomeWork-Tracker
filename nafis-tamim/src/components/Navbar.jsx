import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ variant = "public" }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="notebook-texture bg-ink-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="font-display flex items-center gap-2 text-base font-semibold tracking-tight text-white sm:text-lg"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-500 text-sm">
            📘
          </span>
          <span className="hidden sm:inline">Student Homework Tracker</span>
          <span className="sm:hidden">HW Tracker</span>
        </Link>

        {variant === "admin" ? (
          <nav className="flex items-center gap-4 text-sm font-medium text-white/80">
            <Link to="/admin" className="hover:text-white">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-md border border-white/20 px-3 py-1.5 text-white hover:bg-white/10"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-4 text-sm font-medium text-white/80">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link
              to="/admin/login"
              aria-label="Admin Login"
              title="Admin Login"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a4 4 0 0 0-4 4v2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1V5a4 4 0 0 0-4-4Zm2 6V5a2 2 0 1 0-4 0v2h4Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
