"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { RootState } from '../app/Redux/store';

const ApexChart = () => {
  const seriesData = useSelector((state: RootState) => state.bootcampProgram.seriesData);

  const chartData = {
    series: seriesData,
    options: {
      chart: {
        id: 'chart2',
        height: 500,
      },
      xaxis:{
        tickAmount: 10,
        labels: {
          rotate: 0,
          rotateAlways: false
        }
      },
      tooltip: {
        enabled: true,
        followCursor: false,
        shared: true,
        intersect: false,
      },
      colors: [
        "#00FFFF", "#e5598c", "#FF4500", "#00CED1", "#7FFF00", "#8A2BE2", "#800080", "#FFD700", "#40E0D0", "#FF6347",
        "#6495ED", "#FF69B4", "#4682B4", "#20B2AA", "#DAA520", "#8B008B", "#228B22", "#800000", "#4169E1", "#FFA07A",
        "#FF7F50", "#00FA9A", "#32CD32", "#00FF7F", "#9932CC", "#00FF00", "#FF1493", "#7CFC00", "#9370DB", "#00FFFF",
        "#B22222", "#ADFF2F", "#FA8072", "#FFE4B5", "#1E90FF", "#FF8C00", "#FAEBD7", "#556B2F", "#FF4500", "#00FF00",
        "#00FF00", "#FFD700", "#8B008B", "#000080", "#FF69B4", "#808000", "#20B2AA", "#B0C4DE", "#FF8C00", "#7B68EE",
        "#8A2BE2", "#BC8F8F", "#FF6347", "#20B2AA", "#F08080", "#4682B4", "#B8860B", "#8B0000", "#D8BFD8", "#8FBC8F"
      ],
    },
  };
  

  useEffect(() => {
    chartData.series = seriesData;
  }, [seriesData]);

  return (
    <>
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={500} />
    </div>
    </>
  );
};

export default ApexChart;