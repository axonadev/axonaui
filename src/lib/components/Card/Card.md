il type cambia il css

```css
.card_sm {
  max-width: 25%;
}

.card_md {
  max-width: 50%;
}

.card_lg {
  max-width: calc(100% - 30px);
}

.card_form {
  text-align: left;
  max-width: calc(100% - 30px);
}

.card_noborder {
  padding: 0px;
  margin: 0px;
  box-shadow: none;
  width: 100%;
  max-width: none;
  text-align: left;
}
```

```jsx
<Card>
  <label>contenuto della card</label>
</Card>
```
