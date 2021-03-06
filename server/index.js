import 'dotenv/config';
import * as path from "path";
import express from "express";
const app = express();

console.log(`My secret is ${process.env.MY_SECRET}`);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// Put after all routes, is the catch all?
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(5000, () => {
  console.log("server started on port 5000");
})