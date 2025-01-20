const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"], 
    credentials: true, 
  })
);
app.use(express.json());

// File storage configuration using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    if (file.mimetype === "application/pdf") {
      const dataBuffer = await pdfParse(file.path);
      return res.json({ text: dataBuffer.text });
    }

    const imageOCR = await Tesseract.recognize(file.path, "eng", {
      logger: (info) => console.log(info),
    });
    return res.json({ text: imageOCR.data.text });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Failed to process file." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
