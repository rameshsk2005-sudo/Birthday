import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// ===== MULTER STORAGE =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ===== MONGODB CONNECTION =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===== MODEL =====
const BirthdaySchema = new mongoose.Schema({
  name: String,
  imagePath: String,
  date: { type: Date, default: Date.now }
});

const Birthday = mongoose.model("Birthday", BirthdaySchema);

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "views" });
});

app.post("/wish", upload.single("image"), async (req, res) => {
  const { name } = req.body;

  const imagePath = "/uploads/" + req.file.filename;

  await Birthday.create({ name, imagePath });

  res.redirect(`/birthday?name=${name}&image=${imagePath}`);
});

app.get("/birthday", (req, res) => {
  res.sendFile("birthday.html", { root: "views" });
});

// START SERVER
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
