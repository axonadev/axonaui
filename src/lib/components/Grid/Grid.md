Grid esempio

la configurazione delle colonne deve essere con questi item

```js
const listColumns = [
  {
    key: "integer",
    Label: "string",
    dbField: "string",
    order: "integer",
  },
];
```

```js
const listColumns = [
  {
    key: 1,
    Label: "ID",
    dbField: "IDOBJ",
    order: 0,
  },
  {
    key: 2,
    Label: "Cliente",
    dbField: "Soggetti_Nome1",
    nullVal: "-",
    order: 2,
  },
  {
    key: 3,
    Label: "Indirizzo",
    dbField: "Soggetti_Indirizzo",
    nullVal: "-",
    order: 3,
  },
  {
    key: 4,
    Label: "CAP",
    dbField: "Soggetti_CAP",
    nullVal: "-",
    order: 4,
  },
  {
    key: 5,
    Label: "Citta",
    dbField: "Soggetti_Citta",
    nullVal: "-",
    order: 5,
  },
];
```

vengono passati anche i campi di ricerca mettendo i nomi delle colonne in un array

```js
const CampidiRicerca = [
  "Soggetti_Nome1",
  "Soggetti_Codice",
  "Soggetti_Indirizzo",
];
```

```js
<Grid
  id={"id"}
  onDoubleClickRow={() => {
    console.log("doubleclick");
  }}
  onClickRow={() => {
    console.log("click");
  }}
  items={[
    { id: 1, Soggetti_Nome1: "nome1" },
    { id: 2, Soggetti_Nome1: "nome2" },
  ]}
  columns={[
    {
      key: 1,
      Label: "ID",
      dbField: "IDOBJ",
      order: 0,
    },
    {
      key: 2,
      Label: "Cliente",
      dbField: "Soggetti_Nome1",
      nullVal: "-",
      order: 2,
    },
  ]}
  itemSearch={["Soggetti_Nome1"]}
  itemInsert={true}
  onFilter={() => {
    console.log("filter");
  }}
  onBtnInsert={() => {
    console.log("click insert");
  }}
/>
```
