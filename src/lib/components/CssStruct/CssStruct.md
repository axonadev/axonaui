CssStruct example:

carica il css di default con la root e il css della piva con root e le modifiche sugli id dei tag.

esempio di css di default:

```json
{
  "root": {
    "--testcolor": "#ABFF3D",
    "--axn-height-top": "75px",
    "--axn-white-color": "rgb(1, 102, 0)",
    "--axn-primary-text-color": "#f1f1f1",
    "--axn-secondary-color": "rgb(155, 155, 155)",
    "--axn-secondary-text-color": "rgb(0, 102, 0)",
    "--axn-border-color": "brown",
    "--axn-activate-background-color": "lightgreen",
    "--axn-activate-color": "lightgreen",
    "--axn-background-color": "#f1f1f1",
    "--axn-gray-color": "#c2c2c2",
    "--axn-color": "brown",
    "--axn-accents-color": "lightgreen",
    "--axn-top-color": "#ffffff",
    "--axn-white-color": "#ffffff",
    "--axn-black-color": "#000000",
    "--axn-white-color": "#f1f1f1",
    "--axn-white-color": "lightblue",
    "--axn-white-color": "lightgreen",
    "--axn-white-color": "#ebebeb",
    "--axn-sidemenu-background-color": "#ffffff",
    "--axn-black-color": "#000000",
    "--axn-black-color-hover": "rgb(1, 102, 0)",
    "--axn-sidemenu-border-color": "blue",
    "--axn-white-color": "#ebebeb",
    "--axn-sidemenu-btn-ambito-background-color": "#ffffff",
    "--axn-sidemenu-btn-closed-background-color": "#000000",
    "--axn-sidemenu-btn-closed-color": "#ffffff",
    "--axn-white-color": "#a4a4a5",
    "--axn-black-color": "darkgreen",
    "--axn-white-color": "#f1f1f1",
    "--axn-black-color": "darkgreen",
    "--axn-msgbox-border-color": "darkgreen",
    "--axn-gray-color": "#a4a4a5",
    "--axn-msgbox-btn-background-color": "blue",
    "--axn-msgbox-btn-color": "white",
    "--axn-grid-header-button-background-color": "blue",
    "--axn-grid-header-button-color": "white",
    "--axn-grid-header-button-background-color-hover": "lightblue",
    "--axn-grid-header-button-color-hover": "white",
    "--axn-transparent-color": "lightblue",
    "--axn-primary-color": "navy",
    "--axn-white-color": "white",
    "--axn-transparent-color": "lightgreen",
    "--axn-primary-color": "darkgreen",
    "--axn-white-color": "white",
    "--axn-grid-row-background-color": "transparent",
    "--axn-grid-row-t-background-color": "transparent",
    "--axn-grid-2row-t-background-color": "#b4e3f1",
    "--axn-grid-row-d-background-color": "transparent",
    "--axn-grid-2row-d-background-color": "#c4f3b1",
    "--axn-grid-row-color": "black",
    "--axn-grid-row-border-color": "#0070c0",
    "--axn-lighthaven-color": "white"
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
