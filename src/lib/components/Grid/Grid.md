Grid esempio

```jsx
<Grid
  id="maint_t"
  loadGrid={
    REACT_APP_SERVERAPI +
    "api/axo_sel/" +
    localStorage.getItem("axn_token") +
    cmd_getGrid
  }
  onClickRow={(IDOBJ) => {
    onChangeRow(IDOBJ);
  }}
  onDoubleClickRow={() => {}}
  onBtnInsert={insertClickHandler}
  onBtnDelete={deleteClickHandler}
  nameView={nameView}
  reload={reloadGriglia}
  itemSearch={itemsSearch}
  btn_insert={true}
/>
```

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

```
