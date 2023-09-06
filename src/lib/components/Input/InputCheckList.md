il TOKEN viene preso dai cookie locali
TOKEN=localStorage.getItem("axn_token");

```jsx
const REACT_APP_SERVERAPI = "http://192.168.2.159:8811/";
const TOKEN =
  "SyU6f1adnZFzu4IJSQhnzCqHY1N0iS6LFnOKYmEJmw6Jt6ES_p_5_p_Ch1wzn2BLFetmZqy16CDp5rFBu_p_1cIsOf4yWHSRvzEwUxLbT2b_p_1rAyUNgGsKe78TQxPhAppp9gBtb8OJQx_p_4HBsUptRTY9tKVg==";
<InputCheckList
  label="tipisoggetto"
  id="tipisoggetto"
  url={
    REACT_APP_SERVERAPI +
    "api/axo_sel/" +
    TOKEN +
    "/soggetti/" +
    "soggettisel/leggitipisoggetto/1"
  }
  nameList="v_tipisoggetto"
  field_id="IDOBJ"
  field_description="TipiSoggetto_Descrizione"
  field_value="valore"
  field_target="SoggettiTipi_Tipo"
  db_target="SoggettiTipi"
  pidobj={1}
  onChange={() => {}}
/>;
```
