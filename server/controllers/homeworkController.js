const HomeworkRecord = require("../models/HomeworkRecord");

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const getAllRecords = async (req, res) => {
  try {
    const records = await HomeworkRecord.find().sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Unable to load records." });
  }
};

const getRecordByDate = async (req, res) => {
  try {
    const record = await HomeworkRecord.findOne({ date: req.params.date });

    if (!record) {
      return res.status(404).json({ message: "No record found for this date." });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Unable to load record." });
  }
};

const createRecord = async (req, res) => {
  try {
    const { date, nafisCompleted, tamimCompleted, nafisNote, tamimNote } = req.body;

    if (!date || !DATE_REGEX.test(date)) {
      return res.status(400).json({ message: "A valid date (YYYY-MM-DD) is required." });
    }

    if (typeof nafisCompleted !== "boolean" || typeof tamimCompleted !== "boolean") {
      return res.status(400).json({ message: "Nafis and Tamim status are required." });
    }

    const existing = await HomeworkRecord.findOne({ date });
    if (existing) {
      return res.status(409).json({ message: "A record for this date already exists." });
    }

    const record = await HomeworkRecord.create({
      date,
      nafisCompleted,
      tamimCompleted,
      nafisNote: nafisNote || "",
      tamimNote: tamimNote || "",
    });

    res.status(201).json(record);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A record for this date already exists." });
    }
    res.status(500).json({ message: "Unable to create record." });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { nafisCompleted, tamimCompleted, nafisNote, tamimNote } = req.body;

    if (typeof nafisCompleted !== "boolean" || typeof tamimCompleted !== "boolean") {
      return res.status(400).json({ message: "Nafis and Tamim status are required." });
    }

    const record = await HomeworkRecord.findOneAndUpdate(
      { date: req.params.date },
      {
        nafisCompleted,
        tamimCompleted,
        nafisNote: nafisNote || "",
        tamimNote: tamimNote || "",
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "No record found for this date." });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Unable to update record." });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await HomeworkRecord.findOneAndDelete({ date: req.params.date });

    if (!record) {
      return res.status(404).json({ message: "No record found for this date." });
    }

    res.json({ message: "Record deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete record." });
  }
};

module.exports = {
  getAllRecords,
  getRecordByDate,
  createRecord,
  updateRecord,
  deleteRecord,
};
