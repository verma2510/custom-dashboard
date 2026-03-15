const mongoose = require("mongoose");

const DatasetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    originalData: { type: Array, required: true }, // Store parsed JSON data
    columns: { type: Array, required: true },      // Store detected columns and their types
    kpis: { type: Object },                        // Computed KPIs like totals, averages, etc.
    charts: { type: Array },                       // Automatically selected chart configurations
    insights: { type: String },                    // AI generated insights text
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dataset", DatasetSchema);
