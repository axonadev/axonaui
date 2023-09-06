##### lista caricata da un api

il TOKEN viene preso dai cookie locali
TOKEN=localStorage.getItem("axn_token");

```jsx
const REACT_APP_SERVERAPI = "http://192.168.2.159:8811/";
const TOKEN =
  "SyU6f1adnZFzu4IJSQhnzCqHY1N0iS6LFnOKYmEJmw6Jt6ES_p_5_p_Ch1wzn2BLFetmZqy16CDp5rFBu_p_1cIsOf4yWHSRvzEwUxLbT2b_p_1rAyUNgGsKe78TQxPhAppp9gBtb8OJQx_p_4HBsUptRTY9tKVg==";
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
    TOKEN +
    "/pagamenti/pagamentisel/leggicombo"
  }
  nameList="v_pagamenti"
/>;
```

##### lista fissa a codice

```jsx
<InputList
  label="Esigibilità iva"
  id="Soggetti_IVAEsigibilita"
  defList={[
    {
      IDOBJ: 1,
      Descrizione: "IVA ad esigibilità immediata",
    },
    {
      IDOBJ: 2,
      Descrizione: "IVA ad esigibilità differita",
    },
    {
      IDOBJ: 3,
      Descrizione: "Scissione dei pagamenti",
    },
  ]}
  onChangeValue={() => {}}
  onChange={() => {}}
/>
```
