const Dataset = require("../models/Dataset");

/**
 * Service to handle complex analytics business logic
 * This isolates business rules from controllers.
 */

exports.generateAdvancedAnalytics = async (datasetId, userId) => {
  const dataset = await Dataset.findOne({ _id: datasetId, user: userId });
  if (!dataset) {
    throw new Error("Dataset not found or unauthorized");
  }

  // Example advanced analytics logic (can be expanded to include correlations, complex groupings, etc.)
  const rowCount = dataset.originalData ? dataset.originalData.length : 0;
  const colCount = dataset.columns ? dataset.columns.length : 0;
  
  const summary = {
    totalRows: rowCount,
    totalColumns: colCount,
    numericColumnsCount: dataset.columns.filter(c => c.type === 'numeric').length,
    categoricalColumnsCount: dataset.columns.filter(c => c.type === 'categorical').length,
    timestamp: new Date()
  };

  return { summary, kpis: dataset.kpis, insights: dataset.insights };
};

exports.getDashboardSummary = async (userId) => {
  const datasets = await Dataset.find({ user: userId }).sort({ createdAt: -1 });
  
  // Aggregate stats across all datasets for a user's main dashboard view
  const summary = {
    totalDatasets: datasets.length,
    totalRowsProcessed: datasets.reduce((acc, curr) => acc + (curr.originalData ? curr.originalData.length : 0), 0),
    recentDatasets: datasets.slice(0, 5).map(d => ({ 
      id: d._id, 
      name: d.name, 
      uploadedAt: d.createdAt 
    }))
  };

  return summary;
};
