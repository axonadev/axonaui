### Server Api

##### il comando API per la lettura è in GET

```text
[SERVER REST]/api/axo_sel/[TOKEN]/
```

per convenzione metteremo le chiamate API nel codice come constanti all'interno del componente project.js
per esempio

```text
const cmd_getGrid = "/[MODULO FORM]/[NOME CLASSE]/[NOME FUNZIONE]";
```

ai vari componenti si imposta il percorso concatenando il percorso del server con il comando voluto

nelle sezioni specifiche per i vari moduli ci sono tutti i comandi necessari per il determinato progetto

##### il comando API per la scrittura è in POST

```json
{
  "Token": "[TOKEN]",
  "Idobj": "[IDOBJ]",
  "Modulo": "[MODULO]",
  "DB": "[NOME TABELLA]",
  "Operazione": "",
  "Item": "[{[NOME TABELLA]]:[[RECORD DI CAMPI]]}]"
}
```
