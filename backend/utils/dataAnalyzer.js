const xlsx = require("xlsx");

const analyzeData = (buffer) => {
  // Read workbook
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const data = xlsx.utils.sheet_to_json(sheet);
  
  if (!data || data.length === 0) {
    throw new Error("Dataset is empty");
  }

  // Detect Columns & Types
  const columns = [];
  const firstRow = data[0];
  for (const key in firstRow) {
    const value = firstRow[key];
    const type = typeof value === "number" ? "numeric" : "categorical";
    columns.push({ name: key, type });
  }

  // Generate Basic KPIs
  const kpis = {};
  columns.filter(c => c.type === "numeric").forEach(col => {
    const values = data.map(row => row[col.name]).filter(val => typeof val === "number");
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = values.length ? sum / values.length : 0;
    kpis[col.name] = { sum, avg: avg.toFixed(2), count: values.length };
  });

  // Automatic Chart Selection Logic
  const charts = [];
  const numericCols = columns.filter(c => c.type === "numeric");
  const catCols = columns.filter(c => c.type === "categorical");

  if (catCols.length > 0 && numericCols.length > 0) {
    // Basic Bar chart mapping categorical vs numeric
    charts.push({
      type: "BarChart",
      xAxis: catCols[0].name,
      yAxis: numericCols[0].name,
      title: `${numericCols[0].name} by ${catCols[0].name}`
    });
  }

  if (numericCols.length > 1) {
    // Line chart or scatter for 2 numerics
    charts.push({
      type: "LineChart",
      xAxis: numericCols[0].name,
      yAxis: numericCols[1].name,
      title: `${numericCols[1].name} vs ${numericCols[0].name} Trend`
    });
  }

  return { data, columns, kpis, charts };
};

module.exports = { analyzeData };
