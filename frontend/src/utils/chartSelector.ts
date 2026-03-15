import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface ChartConfig {
  type: "BarChart" | "LineChart";
  xAxis: string;
  yAxis: string;
  title: string;
}

export const getChartConfig = (
  chartDef: ChartConfig,
  dataset: any[]
): {
  data: ChartData<any>;
  options: ChartOptions<any>;
  componentType: 'Bar' | 'Line';
} => {
  const labels = dataset.map(row => row[chartDef.xAxis]);
  const dataPoints = dataset.map(row => row[chartDef.yAxis]);

  const backgroundColor = chartDef.type === "BarChart" 
    ? 'rgba(99, 102, 241, 0.5)' // Indigo-500 with opacity
    : 'rgba(236, 72, 153, 0.5)'; // Pink-500 with opacity

  const borderColor = chartDef.type === "BarChart" 
    ? 'rgba(99, 102, 241, 1)'
    : 'rgba(236, 72, 153, 1)';

  const data: ChartData<any> = {
    labels,
    datasets: [
      {
        label: chartDef.yAxis,
        data: dataPoints,
        backgroundColor,
        borderColor,
        borderWidth: 2,
        tension: 0.4, // smooth lines for LineChart
        fill: chartDef.type === "LineChart" ? true : false,
      },
    ],
  };

  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      title: {
        display: !!chartDef.title,
        text: chartDef.title,
        color: 'rgba(255, 255, 255, 0.9)',
        font: { size: 16, weight: 'bold' }
      },
    },
    scales: {
      y: {
        ticks: { color: 'rgba(255,255,255,0.6)' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: 'rgba(255,255,255,0.6)' },
        grid: { display: false }
      }
    }
  };

  return {
    data,
    options,
    componentType: chartDef.type === 'BarChart' ? 'Bar' : 'Line'
  };
};
