import express from "express";
import request from "request";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/", "index.html"));
});

app.post("/submitForm", (req, res) => {
  // Do something with the form data
  const { name, email } = req.body;
  console.log(name, email);
  // Prepare the updated data
  const updatedData = `Hello, ${name}!`;
  // Send the updated data back to the client
  //   res.send(updatedData);
  res.status(200).send(updatedData);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
