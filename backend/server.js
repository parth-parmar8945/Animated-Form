const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/submit-form", (req, res) => {
  console.log("📩 Form Data Received:");
  console.log(req.body);

  res.json({ message: "Data received successfully" });
});

app.post("/submit-form", (req, res) => {
  console.log(req.body); // 👈 saara data yaha dikhega
  res.send({ message: "Form submitted" });
});


app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
