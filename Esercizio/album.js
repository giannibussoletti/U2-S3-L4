const row = document.getElementById("photo-gallery")
const singleCard = function (imgConst, titleConst, descConst, idImage) {
  const divCol = document.createElement("div")
  divCol.classList.add("col-md-4", "col-lg-3")

  const divCard = document.createElement("div")
  divCard.classList.add("card", "mb-4", "shadow-sm")

  const img = document.createElement("img")
  img.classList.add("bd-placeholder-img", "card-img-top")
  img.setAttribute("src", imgConst)

  const divBody = document.createElement("div")
  divBody.classList.add("card-body")

  const h5Title = document.createElement("h5")
  h5Title.classList.add("card-title")
  h5Title.innerText = titleConst

  const par = document.createElement("p")
  par.classList.add("card-text")
  par.innerText = descConst

  const divFlex = document.createElement("div")
  divFlex.classList.add("d-flex", "justify-content-between", "align-items-center")

  const divBtnGroup = document.createElement("div")
  divBtnGroup.classList.add("btn-group")

  const buttonView = document.createElement("button")
  buttonView.classList.add("btn", "btn-sm", "btn-outline-secondary")
  buttonView.setAttribute("type", "button")
  buttonView.setAttribute("id", "btnViev")
  buttonView.innerText = "View"

  const buttonHide = document.createElement("button")
  buttonHide.classList.add("btn", "btn-sm", "btn-outline-secondary")
  buttonHide.setAttribute("type", "button")
  buttonHide.setAttribute("id", "btnHide")
  buttonHide.innerText = "Hide"

  const smallSection = document.createElement("small")
  smallSection.classList.add("text-muted")
  smallSection.innerText = idImage

  row.appendChild(divCol)
  divCol.appendChild(divCard)
  divCard.appendChild(img)
  divCard.appendChild(divBody)
  divBody.appendChild(h5Title)
  divBody.appendChild(par)
  divBody.appendChild(divFlex)
  divFlex.appendChild(divBtnGroup)
  divBtnGroup.appendChild(buttonView)
  divBtnGroup.appendChild(buttonHide)
  divFlex.appendChild(smallSection)
}
const mainUrl = "https://api.pexels.com/v1/search?query="

const loadPrimary = function () {
  fetch(`${mainUrl}hamsters`, {
    Headers: { Authorization: "W1TyRJMryxcJFDeHrtgmdMSNOGERVIaDw1Uz3LjWS9E7zezyukzQc25Z" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .then((data) => {
      row.innerHTML = ""

      data.photos.forEach((info) => {
        singleCard(info.src.medium, info.photographer, info.photographer_id, info.id)
      })
    })
    .catch(console.log("Errore nel contattare il server"))
}

const loadSecondary = function () {
  fetch(`${mainUrl}tiger`, {
    Headers: { Authorization: "W1TyRJMryxcJFDeHrtgmdMSNOGERVIaDw1Uz3LjWS9E7zezyukzQc25Z" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore n°: ", response.status)
      }
    })
    .then((data) => {
      row.innerHTML = ""
      data.photos.forEach((info) => {
        singleCard(info.src.medium, info.photographer, info.photographer_id, info.id)
      })
    })
    .catch(console.log("Errore nel contattare il server"))
}
const searchFunc = function () {
  row.innerHTML = ""
  const term = document.querySelector("#search-group input").value
  fetch(mainUrl + term, {
    Headers: { Authorization: "W1TyRJMryxcJFDeHrtgmdMSNOGERVIaDw1Uz3LjWS9E7zezyukzQc25Z" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore n°: ", response.status)
      }
    })
    .then((data) => {
      row.innerHTML = ""
      data.photos.forEach((info) => {
        singleCard(info.src.medium, info.photographer, info.photographer_id, info.id)
      })
    })
    .catch(console.log("Errore nel contattare il server"))
}
