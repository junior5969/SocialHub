## 🌐SocialHub

**SocialHub** è un’applicazione sviluppata con Angular che permette di connettere gli utenti, condividere post e commenti, e gestire un piccolo ecosistema sociale digitale.
L’obiettivo è raccogliere idee e progetti volti a migliorare la qualità della vita urbana, mettendo in rete cittadini e comunità locali.


## Funzionalità principali

- **Login con Token**
   - L’autenticazione avviene tramite token generato su `GoRest`, il quale viene salvato nella sessione e usato come Bearer Token per tutte le chiamate API.
- **Gestione utenti**
   - Visualizzazione di un elenco completo di utenti con barra di ricerca.
   - Per ogni utente è possibile visualizzarne dettagli e post pubblicati con relativi commenti.
   - Possibilità di eliminazione utenti e di creazione nuovi utenti.
   - Visualizzazione di una lista di tutti i post presenti con i relativi commenti, con barra di ricerca.
   - Possibilità di creazione di nuovi post e commenti.
- **Logout**
   - Funzionalità dedicata per la terminazione della sessione.


## 📂Struttura del progetto 

- **Componenti principali**: 
  - `HomepageComponent`: pagina introduttiva con call-to-action.
  - `UsersComponent`: lista utenti con barra di ricerca.
  - `UserComponent`: pannello espandibile per singolo utente con informazioni principali e pulsanti "Dettagli" ed "Elimina".
  - `UserDetailComponent`: dettaglio utente con relativi post e commenti.
  - `PostsComponent`: lista dei post con barra di ricerca.
  - `NotfoundComponent`: pagina di errore 404.
- **Componenti riutilizzabili**:
  - `ButtonComponent`: pulsante personalizzabile con `routerLink`, o `EventEmitter`.
  - `CardComponent`: contenitore UI utilizzato per la rappresentazione dei post.
  - `EmptyStateComponent`: messaggio per ricerche senza contenuti.
  - `FormComponent`: gestione creazione nuovi utenti/post/commenti.
  - `HeaderComponent`: header principale con login/logout.
  - `LoaderComponent`: spinner globale, integrato in tutte le chiamate API.
  - `SearchBarComponent`: barra di ricerca per utenti e post.
- **Servizi**:
  - `Api`: gestione centralizzata delle chiamate API. 
  - `Auth`: login/logout e gestione token.
  - `AuthGuard`: protezione delle rotte private.
  - `AuthInterceptor`: aggiunge automaticamente il token alle richieste.
  - `ErrorInterceptor`: gestione centralizzata degli errori API.
  - `LoaderService`: gestione globale dello stato di caricamento.
  - `LoaderInterceptor` : mostra/nasconde lo spinner durante le chiamate HTTP.
- **Models**:
Per la tipizzazione Typescript
  - `UserInterface`, `PostInterface`, `CommentInterface`.
  - `NewUserInterface`, `NewPostInterface`, `NewCommentInterface` 
- **Routing**:
  - Configurato con `RouterModule` e con gestione 404.


## Testing

L’applicazione include unit test scritti con **Karma + Jasmine**, seguendo le best practice Angular.  


## Principali librerie esterne utilizzate

- `@angular/material` → componenti UI (Card, Button, Icon, Form).  
- `@angular/cdk` → supporto Material e funzionalità aggiuntive.  
- `rxjs` → gestione delle chiamate asincrone.  
- `zone.js` → change detection Angular.
- `karma + jasmine` → unit testing.
 

## ⚙️Istruzioni per configurare il progetto in locale

### Prerequisiti

- Node.js v18+  
- npm v9+  
- Angular CLI v20+  
- Token generato da `GoRest`


## Installazione

1. **Clona il repository:**

```bash
git clone https://github.com/junior5969/SocialHub.git
cd SocialHub
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


5. **Testing:**

```bash
ng test --code-coverage
```


## Repository GitHub

Visita il codice sorgente su [GitHub](https://github.com/junior5969/SocialHub)


## Documentazione 

[Presentazione del progetto (PDF)](./Presentazione.pdf)


## Autrice

Barletta Chiara 