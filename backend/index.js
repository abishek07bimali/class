const express = require("express");
require("dotenv").config();
const { sequelize, connectDB } = require("./db/database");
const userRoutes = require("./routes/routes");
const cors = require('cors'); // Import the cors package
const fileUpload = require("./helper/multer");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
// app.use(express.urlenco 21ded({ extended: true }));


app.use("/uploads", (req, res, next) => {
  express.static(path.resolve(__dirname, "uploads"))(req, res, next);
});


// POST /upload route
app.post('/upload', fileUpload("files"), (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  res.json({
    message: "Files uploaded successfully",
    files: req.files, 
    });
});


const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173', 'http://localhost:80'] 
};
app.use(cors(corsOptions));

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

const startServer = async () => {
  await connectDB();
  await sequelize.sync(); 
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
};

startServer();
