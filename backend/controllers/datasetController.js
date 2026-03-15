const Dataset = require("../models/Dataset");
const { analyzeData } = require("../utils/dataAnalyzer");
const { generateInsights } = require("../utils/aiInsights");

exports.uploadDataset = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // 1. Analyze the uploaded Excel/CSV file for data, KPIs, Charts
    const { data, columns, kpis, charts } = analyzeData(req.file.buffer);

    // 2. Generate AI Insights based on extracted KPIs
    const insights = await generateInsights(kpis, columns);

    // 3. Save to database for the authenticated user
    const newDataset = new Dataset({
      user: req.user.id,
      name: req.file.originalname,
      originalData: data,
      columns,
      kpis,
      charts,
      insights
    });

    const savedDataset = await newDataset.save();
    
    res.json(savedDataset);
  } catch (err) {
    console.error("Dataset Upload Error:", err.message);
    res.status(500).send("Error reading or analyzing the file " + err.message);
  }
};

exports.getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(datasets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) return res.status(404).json({ msg: "Dataset not found" });

    if (dataset.user.toString() !== req.user.id) {
       return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(dataset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
