import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const PieChart = ({dataTotal}) => {

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ["Total Teacher", "Total User", "Total Admin"],
      title: {
        text: 'Users by Role',
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
  });

  useEffect(() => {
    if (dataTotal) {
      setChartData(prevState => ({
        ...prevState,
        series: [dataTotal?.totalTeacher, dataTotal?.totalUser, dataTotal?.totalAdmin],
      }));
    }
  }, [dataTotal]);

  return (
    <div className="w-full max-w-2xl h-96 mx-auto">
      <Chart options={chartData.options} series={chartData.series} type="pie" height="100%" />
    </div>
  );
};

export default PieChart;
