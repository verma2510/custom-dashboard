const multer = require("multer");

// Use memory storage to process the excel file in memory directly
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.ms-excel" || file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("Please upload an Excel or CSV file"));
    }
  }
});

module.exports = upload;
