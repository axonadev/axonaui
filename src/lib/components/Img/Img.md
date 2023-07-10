Img example:

```js
<Img className={"test"} src={"/logo192.png"} alt={""} />
```

ci sono vari tipi di immagini che si possono passare dalla proprieta type
icon, button

```js
<Img className={"test"} src={"/logo192.png"} alt={""} type={"icon"} />
<Img className={"test"} src={"/logo192.png"} alt={""} type={"button"} />
```

se non viene inserito il src verrà caricata un immagine dalla root del dominio con il nome del messo nel type .png
