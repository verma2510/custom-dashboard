const analyticsService = require("../services/analyticsService");

exports.getDatasetAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    // Call the service for business logic
    const analytics = await analyticsService.generateAdvancedAnalytics(id, req.user.id);
    res.json(analytics);
  } catch (error) {
    if (error.message === "Dataset not found or unauthorized") {
      return res.status(404).json({ msg: error.message });
    }
    console.error("Dataset Analytics Error:", error.message);
    res.status(500).json({ msg: "Server Error generating analytics" });
  }
};

exports.getDashboardSummary = async (req, res) => {
  try {
    // Collect aggregated data across all datasets from the service
    const summary = await analyticsService.getDashboardSummary(req.user.id);
    res.json(summary);
  } catch (error) {
    console.error("Dashboard Summary Error:", error.message);
    res.status(500).json({ msg: "Server Error fetching summary" });
  }
};
