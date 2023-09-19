### Gestire un ticket

1 - Entrare nel progetto [Ticket dev](https://github.com/users/axonadev/projects/4/views/1)

2 - Spostare il ticket nella colonna "In Progress"

3 - Aprirlo e selezionare "Open in new tab"

4 - Creare una nuova branch

5 - Selezionare "Checkout locally" e premere "Create branch"

6 - Copiare il testo ed incollarlo nel terminale di vscode

### Comandi Git per l'invio

```text
git add .   -> prepara i file per la consegna
git commit -m "aggiungere il commento della branch"
               "fix(#numero ticket): commento" -> per la correzione di bug
               "feat(#numero ticket): commento" -> per lo sviluppo di nuove funzionalità
git push    -> invia i file
```

### Altri comandi Git

```text
git status   .> controlla lo stato dei file se rossi sono modificati ma non aggiunti alla lista dei pushabili
git pull     -> scarica i file aggiornati dal repository
```
