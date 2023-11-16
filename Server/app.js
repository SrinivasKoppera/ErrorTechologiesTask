const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const File = require("./model");
const multer = require("multer");
const mime = require("mime-types");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = mime.extension(file.mimetype);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${extension}`);
  },
});
const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const uri =
  "mongodb+srv://jaanusaragandla:no0Nz8iYIhMpuOIZ@errortaskdb.wffhl1z.mongodb.net/?retryWrites=true&w=majority";

const initializeDBAndServer = async () => {
  try {
    await mongoose.connect(uri).then(() => {
      console.log("You successfully connected to MongoDB! Atlas");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

initializeDBAndServer();
app.listen(3000, () => {
  console.log(`Server is Running at http://localhost/3000`);
});

app.get("/file", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({ files });
  } catch (error) {
    console.log(`Getting Files Error: ${error}`);
    res.status(500).json({ message: "Someting went wrong" });
  }
});

app.post("/file", upload.single("file"), async (req, res) => {
  try {
    console.log("File: ", req.file);
    const isExits = await File.findOne({ name: req.file.originalname });
    if (isExits) {
      return res.status(400).json({ message: "given file is already exits" });
    }
    const fileObj = {
      name: req.file.originalname,
      url: `https://file-uploader-back-end.onrender.com/${req.file.filename}`,
    };
    const file = await File.create(fileObj);
    res.status(200).json({ message: `file uploaded successfully`, file });
  } catch (error) {
    console.log(`Uploaded File Error: ${error}`);
    res.status(500).json({ message: "Someting went wrong" });
  }
});

app.delete(`/file/:id`, async (req, res) => {
  try {
    const deleteItemId = req.params.id;
    const deleteFile = await File.findByIdAndDelete(deleteItemId);
    if (!deleteFile) {
      return res.status(404).json({ message: "File Not Found" });
    }
    res.status(200).json({ message: "File Deleted Successfully", deleteFile });
  } catch (error) {
    console.log("Deleting File Error : ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
