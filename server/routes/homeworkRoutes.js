const express = require("express");
const {
  getAllRecords,
  getRecordByDate,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/homeworkController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllRecords);
router.get("/:date", getRecordByDate);

// Protected admin routes
router.post("/", protect, createRecord);
router.put("/:date", protect, updateRecord);
router.delete("/:date", protect, deleteRecord);

module.exports = router;
