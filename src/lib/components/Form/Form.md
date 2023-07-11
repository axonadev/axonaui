esempio di chiamata al form

```js
<Form
  idobj={1}
  modulo={"soggetti"}
  db={"soggetti"}
  afterSubmit={() => {
    console.log("after");
  }}
  token={localStorage.getItem("axn_token")}
  serverApi={"http://192.168.2.159:8811"}
>
  <input id="Soggetti_Nome1" tipo="text"></input>
  <button type="submit">invia</button>
</Form>
```
