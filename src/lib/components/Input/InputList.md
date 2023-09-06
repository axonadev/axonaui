##### lista caricata da un api

```jsx
<InputList
  label={"Pagamento"}
  id={"Soggetti_Pagamento"}
  onChangeValue={() => {}}
  onChange={() => {}}
  field_id="IDOBJ"
  field_description={["Pagamenti_Descrizione"]}
  url={
    REACT_APP_SERVERAPI +
    "api/axo_sel/" +
    localStorage.getItem("axn_token") +
    "/pagamenti/pagamentisel/leggicombo"
  }
  nameList="v_pagamenti"
/>
```

##### lista fissa a codice

```jsx
<InputList
  label="Esigibilità iva"
  id="Soggetti_IVAEsigibilita"
  nameList="v_esigibilitaiva"
  field_id="IDOBJ"
  field_description={["IVAEsigibilita_Descrizione"]}
  defList={[
    {
      IDOBJ: 1,
      IVAEsigibilita_Descrizione: "IVA ad esigibilità immediata",
    },
    {
      IDOBJ: 2,
      IVAEsigibilita_Descrizione: "IVA ad esigibilità differita",
    },
    {
      IDOBJ: 3,
      IVAEsigibilita_Descrizione: "Scissione dei pagamenti",
    },
  ]}
  onChangeValue={() => {}}
  onChange={() => {}}
/>
```
