import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    series: [
      {
        name: "Sales 2023",
        data: [65, 59, 80, 81, 56],
      },
      {
        name: "Sales 2022",
        data: [50, 55, 60, 70, 66],
      },
      {
        name: "Sales 2021",
        data: [40, 45, 50, 60, 76],
      },
    ],
  };

  const options = {
    chart: {
      type: 'line',
      fontFamily: 'Saira',
    },
    colors: ["#4bbfbb", "#9966ff", "#ff9f40"], // Chỉnh màu sắc ở đây
    title: {
      text: "Monthly Sales Comparison",
      align: "center",
      style: {
        fontSize: '20px',
        fontFamily: 'Saira',
      }
    },
    legend: {
      show: true,
      position: "top",
      fontFamily: 'Poppins',
    },
    xaxis: {
      categories: ["January", "February", "March", "April", "May"],
      labels: {
        style: {
          fontFamily: 'Poppins',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Poppins',
        }
      }
    },
    toolbar: {
        show: false, // Đặt show: false ở đây
      },
  };

  return (
    <div>
      <div className="max-w-xl pt-2">
        <Chart options={options} series={data.series} type="line" height={450} />
      </div>
    </div>
  );
};

export default LineChart;
