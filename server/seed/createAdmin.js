require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seedAdmin = async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  await connectDB();

  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log(`Admin account already exists for ${email}. No changes made.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await Admin.create({ email, password: hashedPassword });

  console.log(`Admin account created for ${email}`);
  await mongoose.disconnect();
};

seedAdmin().catch((error) => {
  console.error("Failed to seed admin:", error.message);
  process.exit(1);
});
