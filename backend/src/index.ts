import express from "express";

const app = express();

app.get("/healthcheck", (req, res) => {
  res.end("ok");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
