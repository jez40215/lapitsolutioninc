// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

// 1. Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://jez40215_db_user:<db_password>@cluster0.hdtdors.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 2. Define Schemas
const usersAgentSchema = new mongoose.Schema({
  id: Number,
  agent_no: String,
  fullname: String,
  username: String,
  password: String
});

const itemSchema = new mongoose.Schema({
  id: Number,
  itemname: String,
  description: String,
  price: Number,
  picture: String // base64 string
});

// 3. Define Models
const UsersAgent = mongoose.model("users_agent", usersAgentSchema);
const R5ItemList = mongoose.model("r5itemlist", itemSchema);
const MyDiner = mongoose.model("mydiner", itemSchema);
const CCTV = mongoose.model("cctv", itemSchema);

// 4. API Endpoints
app.post("/users", async (req, res) => {
  const user = new UsersAgent(req.body);
  await user.save();
  res.json({ message: "✅ User saved", user });
});

app.post("/r5itemlist", async (req, res) => {
  const item = new R5ItemList(req.body);
  await item.save();
  res.json({ message: "✅ Item saved", item });
});

app.post("/mydiner", async (req, res) => {
  const item = new MyDiner(req.body);
  await item.save();
  res.json({ message: "✅ MyDiner item saved", item });
});

app.post("/cctv", async (req, res) => {
  const item = new CCTV(req.body);
  await item.save();
  res.json({ message: "✅ CCTV item saved", item });
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
