CssStruct example:

carica il css di default con la root e il css della piva con root e le modifiche sugli id dei tag.

esempio di css di default:

```json
{
  "root": {
    "--testcolor": "#ABFF3D",
    "--axn-height-top": "75px",
    "--axn-primary-color": "rgb(1, 102, 0)",
    "--axn-primary-text-color": "#f1f1f1",
    "--axn-secondary-color": "rgb(155, 155, 155)",
    "--axn-secondary-text-color": "rgb(0, 102, 0)",
    "--axn-border-color": "brown",
    "--axn-activate-background-color": "lightgreen",
    "--axn-activate-color": "lightgreen",
    "--axn-background-color": "#f1f1f1",
    "--axn-box-shadow": "#c2c2c2",
    "--axn-color": "brown",
    "--axn-input-active": "lightgreen",
    "--axn-top-color": "#ffffff",
    "--axn-card-background-color": "#ffffff",
    "--axn-card-color": "#000000",
    "--axn-card-form-input-background-color": "#f1f1f1",
    "--axn-card-form-t-background-color": "lightblue",
    "--axn-card-form-d-background-color": "lightgreen",
    "--axn-sidemenu-top-background-color": "#ebebeb",
    "--axn-sidemenu-background-color": "#ffffff",
    "--axn-sidemenu-color": "#000000",
    "--axn-sidemenu-color-hover": "rgb(1, 102, 0)",
    "--axn-sidemenu-border-color": "blue",
    "--axn-sidemenu-btn-background-color": "#ebebeb",
    "--axn-sidemenu-btn-ambito-background-color": "#ffffff",
    "--axn-sidemenu-btn-closed-background-color": "#000000",
    "--axn-sidemenu-btn-closed-color": "#ffffff",
    "--axn-msgbox-header-background-color": "#a4a4a5",
    "--axn-msgbox-header-color": "darkgreen",
    "--axn-msgbox-background-color": "#f1f1f1",
    "--axn-msgbox-color": "darkgreen",
    "--axn-msgbox-border-color": "darkgreen",
    "--axn-msgbox-footer-background-color": "#a4a4a5",
    "--axn-msgbox-btn-background-color": "blue",
    "--axn-msgbox-btn-color": "white",
    "--axn-grid-header-button-background-color": "blue",
    "--axn-grid-header-button-color": "white",
    "--axn-grid-header-button-background-color-hover": "lightblue",
    "--axn-grid-header-button-color-hover": "white",
    "--axn-grid-top-header-t-background-color": "lightblue",
    "--axn-grid-header-row-background-color": "navy",
    "--axn-grid-header-row-color": "white",
    "--axn-grid-top-header-d-background-color": "lightgreen",
    "--axn-grid-header-d-row-background-color": "darkgreen",
    "--axn-grid-header-d-row-color": "white",
    "--axn-grid-row-background-color": "transparent",
    "--axn-grid-row-t-background-color": "transparent",
    "--axn-grid-2row-t-background-color": "#b4e3f1",
    "--axn-grid-row-d-background-color": "transparent",
    "--axn-grid-2row-d-background-color": "#c4f3b1",
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
