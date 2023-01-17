import express from "express";
import request from "request";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const sibAPIKey = process.env.SIB_API_KEY;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/", "index.html"));
});

app.post("/submitForm", (req, res) => {
  let { name, email } = req.body;
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = sibAPIKey;

  let apiInstance = new SibApiV3Sdk.ContactsApi();
  let createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = [2];

  createContact.attributes = {
    FIRSTNAME: name,
  };

  apiInstance.createContact(createContact).then(
    (data) => {
      res.status(200);
      res.send("success");
    },
    function (error) {
      console.log(error);
      res.status(500);
      res.send("failure");
    }
  );

  console.log(apiKey.apiKey);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
