// Formats a "YYYY-MM-DD" string into "Month D, YYYY" without timezone shifting.
export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// "YYYY-MM" for the current local month.
export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

// Shifts a "YYYY-MM" string by `delta` months (can be negative), returns "YYYY-MM".
export const shiftMonth = (monthString, delta) => {
  const [year, month] = monthString.split("-").map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

// Formats a "YYYY-MM" string into "Month YYYY".
export const formatMonth = (monthString) => {
  const [year, month] = monthString.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};
