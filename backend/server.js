const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./data.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Admin login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  const data = readData();

  if (
    username === data.admin.username &&
    password === data.admin.password
  ) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Create donation
app.post("/donate", (req, res) => {
  const { name, amount, kyc } = req.body;
  const data = readData();

  if (!kyc) {
    return res.status(400).json({ message: "KYC not completed" });
  }

  if (amount > 10) {
    return res.status(400).json({ message: "Amount exceeds limit" });
  }

  data.donations.push({
    name,
    amount,
    status: "Pending"
  });

  writeData(data);
  res.json({ message: "Donation created" });
});

// Get all donations
app.get("/donations", (req, res) => {
  const data = readData();
  res.json(data.donations);
});

// Approve donation
app.post("/donations/approve", (req, res) => {
  const { index } = req.body;
  const data = readData();

  if (data.donations[index]) {
    data.donations[index].status = "Approved by Charity Org";
    writeData(data);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
