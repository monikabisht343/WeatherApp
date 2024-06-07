// // WeatherChart.js
// import {
//     CategoryScale,
//     Chart as ChartJS,
//     Legend,
//     LineElement,
//     LinearScale,
//     PointElement,
//     Title,
//     Tooltip,
// } from 'chart.js';
// import React from 'react';
// import { Line } from 'react-chartjs-2';

// // Register components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const WeatherChart = ({ weatherData }) => {
//   const data = {
//     labels: weatherData.map(entry => entry.time),
//     datasets: [
//       {
//         label: 'Temperature',
//         data: weatherData.map(entry => entry.temperature),
//         borderColor: 'rgba(75,192,192,1)',
//         fill: false,
//       },
//       {
//         label: 'Humidity',
//         data: weatherData.map(entry => entry.humidity),
//         borderColor: 'rgba(153,102,255,1)',
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: 'category',
//         title: {
//           display: true,
//           text: 'Time'
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Value'
//         }
//       }
//     }
//   };

//   return <Line data={data} options={options} />;
// };

// export default WeatherChart;
// WeatherChart.js
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherChart = ({ weatherData }) => {
  const data = {
    labels: weatherData.map(entry => entry.time),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map(entry => entry.temperature),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        fill: true, // Fill the area under the line
      },
      {
        label: 'Humidity (%)',
        data: weatherData.map(entry => entry.humidity),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        pointBackgroundColor: 'rgba(153,102,255,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(153,102,255,1)',
        fill: true, // Fill the area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weather Forecast',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgb(255, 99, 132)',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
          color: '#191, 72, 79',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
          color: 'rgba(255, 99, 132, 0.2)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: '#191, 72, 79',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
          color: 'rgba(255, 99, 132, 0.2)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;
