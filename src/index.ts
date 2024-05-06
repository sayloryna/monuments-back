import express from "express";

const app = express();

app.listen(6000, () => {
  console.log("Listening on port: 4000");
});

app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});
