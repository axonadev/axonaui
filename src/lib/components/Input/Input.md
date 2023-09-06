##### Campo Input di base

```jsx
<Input label="Campo Input" id="Tabella_Descrizione" />
```

##### si può cambiare il tipo in numero e limitare il range di scelta ed il formato del numero

```jsx
<Input
  label="Campo Input Numerico"
  id="Tabella_Descrizione"
  type="number"
  min="0"
  max="50"
  decimali="2"
/>
```

##### si può cambiare il tipo in textarea

```jsx
<Input label="Campo Input Memo" id="Tabella_Descrizione" type="textarea" />
```

##### si possono assegnare delle icone e lanciare i relativi eventi al loro click

```jsx
<Input
  label="Campo Input"
  id="Tabella_Descrizione"
  preicon="left"
  onPreIconClick={() => {}}
  icon="right"
  onIconClick={() => {}}
/>
```
