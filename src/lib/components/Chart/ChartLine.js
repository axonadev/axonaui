import React from "react";
import { Line } from "react-chartjs-2";
import Card from "../Card/Card";

const ChartLine = ({
  data = [],
  title = "Grafico",
  legendposition = "top",
  messaggioerroredati = "Non sono presenti dati",
}) => {
  /* const datacomm = [
    { label: "grafaaa", gennaio: 12, febbraio: 23, marzo: 33, pippo: 53 },
    { label: "grafico2", gennaio: 22, febbraio: 43, marzo: 13, pippo: 5 },
    { label: "grafico3", gennaio: 42, febbraio: 21, marzo: 3, pippo: 55 },
    { label: "grafico4", gennaio: 42, febbraio: 21, marzo: 3, pippo: 55 },
    { label: "grafico4", gennaio: 42, febbraio: 21, marzo: 3, pippo: 55 },
  ]; */

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
