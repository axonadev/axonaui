import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import Card from "../Card/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartLine = ({
  data = [],
  title = "Grafico",
  legendposition = "top",
  messaggioerroredati = "Non sono presenti dati",
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendposition,
      },
      title: {
        display: title !== "" ? true : false,
        text: title,
      },
    },
  };

  const labels = data[0] ? Object.keys(data[0]).slice(1) : [];

  const colors = [
    "rgb(0,0,255)",
    "rgb(0,255,0)",
    "rgb(255,0,0)",
    "rgb(0,255,255)",
    "rgb(255,0,255)",
  ];

  const datasets = [
    ...data.map((items, key) => {
      let rndcolor =
        "rgb(" +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        ")";
      let datasingle = {
        label: items[Object.keys(items)[0]],
        data: Object.values(items).slice(1),
        borderColor: key >= colors.length ? rndcolor : colors[key],
        backgroundColor: key >= colors.length ? rndcolor : colors[key],
      };

      return datasingle;
    }),
  ];

  const datacomm = {
    labels,
    datasets: datasets,
  };

  return (
    <Card>
      {data.length > 0 && <Line options={options} data={datacomm} />}
      {data.length === 0 && <p>{messaggioerroredati}</p>}
    </Card>
  );
};
export default ChartLine;
