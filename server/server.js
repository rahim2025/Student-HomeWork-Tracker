require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const homeworkRoutes = require("./routes/homeworkRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const ensureDbConnected = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ message: "Database unavailable, please try again." });
  }
};

app.use("/api/auth", ensureDbConnected, authRoutes);
app.use("/api/homework", ensureDbConnected, homeworkRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
