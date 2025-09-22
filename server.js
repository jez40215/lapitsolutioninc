// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "10mb" })); // allow images as base64
app.use(cors());

// 1. Connect to MongoDB Atlas
mongoose.connect("your_mongoDB_atlas_uri/Quotationauto", {
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
  picture: String // base64 image
});

// 3. Define Models (tables/collections)
const UsersAgent = mongoose.model("users_agent", usersAgentSchema);
const R5ItemList = mongoose.model("r5itemlist", itemSchema);
const MyDiner = mongoose.model("mydiner", itemSchema);
const CCTV = mongoose.model("cctv", itemSchema);

// 4. Insert Sample Data Routes (like your Python script)
app.post("/users_agent", async (req, res) => {
  const doc = new UsersAgent(req.body);
  await doc.save();
  res.json({ message: "✅ User saved", doc });
});

app.post("/r5itemlist", async (req, res) => {
  const doc = new R5ItemList(req.body);
  await doc.save();
  res.json({ message: "✅ Item saved", doc });
});

app.post("/mydiner", async (req, res) => {
  const doc = new MyDiner(req.body);
  await doc.save();
  res.json({ message: "✅ MyDiner item saved", doc });
});

app.post("/cctv", async (req, res) => {
  const doc = new CCTV(req.body);
  await doc.save();
  res.json({ message: "✅ CCTV item saved", doc });
});

// 5. Query Routes (SELECT equivalent)
app.get("/users_agent", async (req, res) => {
  const docs = await UsersAgent.find();
  res.json(docs);
});

app.get("/r5itemlist", async (req, res) => {
  const docs = await R5ItemList.find();
  res.json(docs);
});

app.get("/mydiner", async (req, res) => {
  const docs = await MyDiner.find();
  res.json(docs);
});

app.get("/cctv", async (req, res) => {
  const docs = await CCTV.find();
  res.json(docs);
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
