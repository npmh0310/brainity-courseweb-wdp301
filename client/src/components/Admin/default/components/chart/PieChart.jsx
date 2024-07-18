import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const data = {
    series: [55, 48, 30],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ["Technology", "Business", "Others"],
      title: {
        text: 'Revenue by Industry',
        style: {
          fontSize: '20px',
          fontFamily: 'Saira',
        }
      },
      legend: {
        position: 'top',
        labels: {
          useSeriesColors: true,
          style: {
            fontFamily: 'Poppins'
          }
        }
      },
      colors: ["#04DDB2", "#81eed8", "#029a7c"],
    },
  };

  return (
    <div className="w-full max-w-2xl h-96 mx-auto">
      <Chart options={data.options} series={data.series} type="pie" height="100%" />
    </div>
  );
};

export default PieChart;
