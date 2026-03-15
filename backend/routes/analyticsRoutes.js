const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const auth = require("../middlewares/auth");

// Routes for advanced analytics and dashboard summaries
// Using auth middleware to protect these endpoints
router.get("/summary", auth, analyticsController.getDashboardSummary);
router.get("/:id", auth, analyticsController.getDatasetAnalytics);

module.exports = router;
