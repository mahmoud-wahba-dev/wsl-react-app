import Chart from "react-apexcharts";

const BarChart = ({ data, height = 300, title = "" }) => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 8,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#3E4946"],
      },
      formatter: (val) => val,
    },
    stroke: { show: false },
    xaxis: {
      categories: data.map((d) => d.x),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#3E4946",
        },
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: true,
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      position: "back",
    },
    colors: ["#0EA5E9"],
    fill: {
      type: "solid",
      colors: ["#0EA5E9"],
    },
    tooltip: {
      enabled: false,
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#3E4946",
      },
    },
  };

  const series = [
    {
      name: "البيانات",
      data: data.map((d) => d.y),
    },
  ];

  return (
    <Chart
      key={data.length ? data.map((d) => d.y).join(",") : "empty"}
      options={options}
      series={series}
      type="bar"
      height={height}
    />
  );
};

export default BarChart;