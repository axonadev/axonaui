import React from "react";
import { Bar } from "react-chartjs-2";
import Card from "../Card/Card";

const ChartBar = ({
  data = [],
  title = "Grafico",
  legendposition = "top",
  messaggioerroredati = "Non sono presenti dati",
}) => {
  /* 
  const datacommpie = [
    {
      label: "grafaaa",
      gennaio: 12,
      febbraio: 23,
      marzo: 33,
      pippo: 53,
      pippo1: 53,
      pippo2: 53,
      pippo3: 53,
      pippo4: 53,
    },
    { 
      label: "grafaaa",
      gennaio1: 112,
      febbraio: 123,
      marzo: 233,
      pippo: 353,
      pippo1: 53,
      pippo2: 53,
      pippo3: 53,
      pippo4: 53,
    },
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
        borderColor: [
          ...Object.keys(items).map((item, key) => {
            return key >= colors.length ? rndcolor : colors[key];
          }),
        ],
        backgroundColor: [
          ...Object.keys(items).map((item, key) => {
            rndcolor =
              "rgb(" +
              parseInt(Math.random() * 255) +
              "," +
              parseInt(Math.random() * 255) +
              "," +
              parseInt(Math.random() * 255) +
              ")";
            return key >= colors.length ? rndcolor : colors[key];
          }),
        ],
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
      {data.length > 0 && <Bar options={options} data={datacomm} />}
      {data.length === 0 && <p>{messaggioerroredati}</p>}
    </Card>
  );
};
export default ChartBar;
