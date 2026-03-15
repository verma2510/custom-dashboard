const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/datasetController");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// Protected routes to upload and fetch datasets
router.post("/upload", [auth, upload.single("file")], datasetController.uploadDataset);
router.get("/", auth, datasetController.getDatasets);
router.get("/:id", auth, datasetController.getDatasetById);

module.exports = router;
