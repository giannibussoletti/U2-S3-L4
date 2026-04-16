const urlApi = "https://api.pexels.com/v1/photos/"
const apiKey = "W1TyRJMryxcJFDeHrtgmdMSNOGERVIaDw1Uz3LjWS9E7zezyukzQc25Z"

const searchFetch = function (element) {
  fetch(urlApi + element, {
    headers: {
      authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then((data) => {
      const img = document.querySelector(".card img")
      const title = document.querySelector(".card h5")
      const description = document.querySelector(".card p.card-text")
      const small9mins = document.querySelector("small")
      const btnGoBack = document.querySelector(".card button:first-child")
      console.log(img, title, description, small9mins, btnGoBack, data)

      img.setAttribute("src", data.src.large)
      title.innerText = data.photographer
      description.innerText = data.alt
      small9mins.innerText = data.id
      btnGoBack.addEventListener("click", () => window.location.replace(`./index.html`))
    })
    .catch((err) => {
      console.log(err)
    })
}

const allParameters = new URLSearchParams(location.search)
const getID = allParameters.get("id")
searchFetch(getID)
