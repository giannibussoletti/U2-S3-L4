urlApi = "https://api.pexels.com/v1/search?query="
apiKey = "W1TyRJMryxcJFDeHrtgmdMSNOGERVIaDw1Uz3LjWS9E7zezyukzQc25Z"

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
      const img = document.querySelectorAll(".card img")
      const title = document.querySelectorAll(".card h5")
      const description = document.querySelectorAll(".card p.card-text")
      const small9mins = document.getElementsByTagName("small")
      const btnView = document.querySelectorAll(".card button:first-child")
      const btnHide = document.querySelectorAll(".card button:last-child")

      data.photos.forEach((photo, i) => {
        img[i].setAttribute("src", photo.src.large)
        title[i].innerText = photo.photographer
        description[i].innerText = photo.alt
        small9mins[i].innerText = photo.id
        btnHide[i].innerText = "Hide"
        const hideCard = btnHide[i].closest(".col-md-4")
        btnHide[i].addEventListener("click", () => {
          hideCard.classList.add("invisible")
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const mainLoad = document.querySelector(".jumbotron .container button:first-of-type")
const secondLoad = document.querySelector(".jumbotron .container button:last-of-type")
const btnSearch = document.querySelector("button.btn-warning")

mainLoad.addEventListener("click", () => searchFetch("hamsters"))
secondLoad.addEventListener("click", () => searchFetch("unicorns"))
btnSearch.addEventListener("click", () => {
  const searchTerm = document.querySelector("input").value
  searchFetch(searchTerm)
})
