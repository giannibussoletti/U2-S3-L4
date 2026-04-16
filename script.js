const urlFetch = "https://striveschool-api.herokuapp.com/api/agenda"

//Function GET
const getConcerts = function () {
  fetch(urlFetch)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(console.log("errore di chiamata", response.status))
      }
    })
    .then((data) => {
      console.log("CONCERTI ESISTENTI", data)
    })
    .catch((error) => {
      console.log(error)
    })
}

getConcerts()

// Come si fa una richiesta per fare una REQUEST POST?
// Nelle API che seguono i prnicipi RESTful l'endpoint su cui viene fatta l'operazione di GET
// è la stessa su cui si può fare l'operazione di post

// Esempio di Fetch per il sistema POST

const inviaConcerto = function () {
  fetch(urlFetch, {
    method: "POST", // crea una nuova risorsa
    // ogni volta che usiamo POST/PUT va inviato un JSON alla API
    // Quindi va indicato un BODY
    body: JSON.stringify({
      description: "Fiorella Mannoia che balla",
      name: "Fiorella Mannoia",
      price: 300,
      time: "2027-09-16T23:30:00.000Z",
    }), // Va inviato come stringa JSON
    headers: {
      "Content-Type": "application/json", // informa l'API che il contenuto di questa fetch è JSON. obbligatorio nelle RESTful API
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("concerto salvato correttamente")
        // in questo caso potrei comunque estrarre response.json
        // ma so che se entro qui dentro facendo un POST o un PUT non mi server
        alert("CONCERTO SALVATO!")
      } else {
        throw new Error("concerto non salvato correttamente", response.status)
      }
    })
    .catch((error) => {
      console.log("invio non riuscito", error)
    })
  // Piccola notifica, il Payload è l'oggetto che è stato inviato all'API
  // Se la POST request rimanda un errore dobbiamo andare in NETWORK > RESPONSE sul broswer per capire cosa è andato storto
  // Quando creiamo una pagina è bene dare l'id al link della pagina nel dettaglio per poter poi recuperare tramite
  // GET per recuperare i dati del concerto che ha quell' ID di cui ho bisogno di recuperare i dettagli
}

// Esempio Fetch ID
// per avere un unico i dettagli un unico elemento bisogna usare https://striveschool-api.herokuapp.com/api/agenda/id <-- l'id è il numero univoco che ha l'indirizzo
// Come si ricerca nella barra degli indirizzi l'id con un nuovo costruttore che è
const allTheParams = new URLSearchParams(location.search)
const concertID = allTheParams.get("id") // questo estra il parametro chiamato id <-- il nome è dato da noi in questo caso, non è obbligatorio "id" come nome
// si poteva pure da un nome a caso tipo ferdinando
// Si usa sempre un fetch per prendere i dettagli del singolo ID
const getDetails = function () {
  fetch(urlFetch + `/` + concertID)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(console.log("problemi di response", response.status))
      }
    })
    .then((details) => {
      console.log(details)
    })
    .catch((error) => {
      console.log("Errore, il server non risponde")
    })
}

//  Metodo DELETE
const deleteConcert = function () {
  // questa funzione eliminerà il concerto eliminerà in singolo elemente
  // serve l'indirizzo specifico come per il fetch ID
  fetch(urlFetch + `/` + concertID, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("concerto eliminato")
        // ritorniamo alla home
        location.assign("/.index.html") // Questo riporta alla pagina index in maniera automatica
      } else {
        throw new Error("errore nell'eliminazioni", response.status)
      }
    })
    .catch((error) => {
      console.log("il server non risponde" + error)
    })
}

// Metodo PUT // recuperriamo le informazioni da modificare tramite ID
const modifyConcert = function () {
  fetch(urlFetch + `/` + concertID, {
    method: "PUT",
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(console.log("c'è statoun errore: ", response.status))
      }
    })
    .then((data) => {
      // recuperiamo i dati della singola card e li mettiamo nei campi da compilare
    })
    .catch((err) => {
      console.log("errore nel retrieve dei dati")
    })
}
