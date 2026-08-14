const transporter = require("../config/email");

const FRONTEND_URL = "https://nafis-tamim.vercel.app/";

const getParentEmails = () =>
  (process.env.PARENT_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

const statusLabel = (completed) => (completed ? "Completed" : "Not completed");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const notifyNewRecord = async (record) => {
  const recipients = getParentEmails();

  if (recipients.length === 0 || !process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    return;
  }

  const nafisNote = record.nafisNote?.trim() || "No note";
  const tamimNote = record.tamimNote?.trim() || "No note";

  await transporter.sendMail({
    from: `"Student Homework Tracker" <${process.env.EMAIL_USER}>`,
    to: recipients,
    subject: `New homework record added — ${record.date}`,
    text: [
      `A new homework record was added for ${record.date}.`,
      "",
      `Nafis: ${statusLabel(record.nafisCompleted)}`,
      `Note: ${nafisNote}`,
      "",
      `Tamim: ${statusLabel(record.tamimCompleted)}`,
      `Note: ${tamimNote}`,
      "",
      `Please visit ${FRONTEND_URL} for all information.`,
    ].join("\n"),
    html: `
      <p>A new homework record was added for <strong>${record.date}</strong>.</p>
      <p><strong>Nafis:</strong> ${statusLabel(record.nafisCompleted)}<br />
      Note: ${escapeHtml(nafisNote)}</p>
      <p><strong>Tamim:</strong> ${statusLabel(record.tamimCompleted)}<br />
      Note: ${escapeHtml(tamimNote)}</p>
      <p>Please visit ${FRONTEND_URL} for all information.</p>
    `,
  });
};

module.exports = { notifyNewRecord };
