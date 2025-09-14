# SocialHub

**SocialHub** nasce dall'idea di voler collegare gli abitanti dei centri urbani raccogliendo le loro idee e progetti mirati a proteggere e salvaguardare il patrimonio urbano, migliorandone la qualità della vita


**GustoSano** permette di:

- Visualizzare un elenco completo di utenti.
- Cercare un utente specifico tramite la barra di ricerca.
- Visualizzare per ogni utente i dettagli e i post pubblicati (con i relativi commenti), e per ogni utente la possibilità di eliminarlo.
- Visualizzare una lista di tutti i post presenti, anch'essi con i relativi commenti.
- Cercare un post specifico tramite la barra di ricerca.
- Aggiungere nuovi utenti, post, commenti.


## Struttura del progetto

- **Componenti principali**:
  - `HomepageComponent`: pagina principale con call-to-action.
  - `UsersComponent`: lista utenti con barra di ricerca.
  - `UserComponent`: pannello espandibile per singolo utente con informazioni principali e pulsanti "Dettagli" ed "Elimina".
  - `UserDetailsComponent`: pagina con i dettagli del rispettivo utente selezionato, con i suoi post ed eventuali commenti relativi ai post.
  - `PostsComponent`: lista post con barra di ricerca.
  - `NotfoundComponent`: pagina di errore 404.
- **Componenti riutilizzabili**:
  - `ButtonComponent`: componente riutilizzabile per gestire la navigazione tramite `routerLink`, o `EventEmitter`.
  - `CardComponent`:
  - `EmptyStateComponent`:
  - `FormComponent`:
  - `HeaderComponent`: usata nella homepage.
  - `LoaderComponent`:componente globale che mostra uno spinner durante il caricamento dei dati dalle API, integrato in tutte le sezioni con chiamate HTTP asincrone.
  - `SearchBarComponent`:
- **Servizi**:
  - `Api`: gestione chiamate API, basata su `environment.apiUrl` per supportare sviluppo e produzione.
  Le chiamate HTTP sono intercettate dal `LoaderInterceptor`, che comunica con `LoaderService` per mostrare/nascondere automaticamente lo spinner durante le richieste.
  - `ErrorInterceptor`:
  - `Auth`:
  - `AuthInterceptor`:
  - `AuthGuard`:
- **Models**:
  - `UserInterface`, `PostInterface` e `CommentInterface` per la tipizzazione TypeScript degli elementi presenti in memoria.
  - `NewUserInterface`, `NewPostInterface` e `NewCommentInterface` per la tipizzazione TypeScript dei nuovi elementi aggiunti tramite form.
- **Routing**:
  - Implementato tramite `RouterModule` con gestione 404.


## Principali librerie esterne utilizzate

- `@angular/material` → componenti UI (Card, Button, Icon, Form).  
- `@angular/cdk` → supporto Material e funzionalità aggiuntive.  
- `rxjs` → gestione delle chiamate asincrone.  
- `zone.js` → change detection Angular.

 

## Istruzioni per configurare il progetto in locale

### Prerequisiti

- Node.js v18+  
- npm v9+  
- Angular CLI v20+  


## Configurazione e avvio in locale

Per avviare il progetto in locale, segui questi passaggi:

1. **Clona il repository:**

```bash
git clone https://github.com/junior5969/GustoSano.git
cd GustoSano
```

2. **Installa le dipendenze:**

```bash
npm install
```

3. **Avvia il server di sviluppo:**

```bash
ng serve
```

4. **Apri l’app nel browser:**

Vai all’indirizzo: http://localhost:4200


5. **Build di sviluppo:**

```bash
ng build
```

6. **Build di produzione:**

```bash
ng build --configuration production
```

## Backend Express (server locale) 

7. **Vai nella cartella `server`**

```bash
cd server
```

8. **Installa le dipendenze:**

```bash
npm install
```

9. **Avvia il server:**




## Repository GitHub

Visita il codice sorgente su [GitHub](https://github.com/junior5969/GustoSano)


## Documentazione 

[Presentazione del progetto (PDF)](./Presentazione.pdf)


## Autrice

Barletta Chiara 