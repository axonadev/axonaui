CssStruct example:

carica il css di default con la root e il css della piva con root e le modifiche sugli id dei tag.

esempio di css di default:

```json
{
  "root": {
    "--testcolor": "#ABFF3D",
    "--axn-primary-color": "rgb(1, 102, 0)",
    "--axn-primary-text-color": "#f1f1f1",
    "--axn-secondary-color": "rgb(155, 155, 155)",
    "--axn-secondary-text-color": "rgb(0, 102, 0)",
    "--axn-activate-color": "lightgreen",
    "--axn-background-color": "#f1f1f1",
    "--axn-box-shadow": "#c2c2c2",
    "--axn-color": "brown",
    "--axn-input-active": "lightgreen",
    "--axn-sidemenu-background-color": "teal",
    "--axn-sidemenu-color": "#f1f1f1",
    "--axn-sidemenu-border-color": "blue",
    "--axn-sidemenu-btn-background-color": "blue",
    "--axn-msgbox-header-background-color": "#a4a4a5",
    "--axn-msgbox-header-color": "darkgreen",
    "--axn-msgbox-background-color": "#f1f1f1",
    "--axn-msgbox-color": "darkgreen",
    "--axn-msgbox-border-color": "darkgreen",
    "--axn-msgbox-footer-background-color": "#a4a4a5",
    "--axn-msgbox-btn-background-color": "blue",
    "--axn-msgbox-btn-color": "white",
    "--axn-grid-header-row-background-color": "black",
    "--axn-grid-header-row-color": "beige",
    "--axn-grid-row-background-color": "white",
    "--axn-grid-row-color": "black",
    "--axn-grid-row-border-color": "#0070c0",
    "--axn-grid-row-selected-background-color": "white"
  }
}
```

#profilo personalizzato:

```json
{
  "root": {
    "--testcolor": "red"
  },
  "id": {
    "btntest": {
      "color": "blue",
      "width": "200px",
      "font-size": "30px",
      "background-color": "yellow"
    }
  }
}
```

```js
<CssStruct url="https://svil.axonasrl.com/css" piva="55555555550">
  <label id="btntest">html</label>
</CssStruct>
```
