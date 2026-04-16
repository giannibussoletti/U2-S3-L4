const detailsRow = document.getElementById("details-photo")
const allTheParameters = new URLSearchParams(location.search)
const imageId = allTheParameters.get("id")
const imagequery = allTheParameters.get("query")

const singleCard = function (imgConst, titleConst, descConst, idImage, div, searchterm) {
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

  const buttonView = document.createElement("a")
  buttonView.classList.add("btn", "btn-sm", "btn-outline-secondary")
  buttonView.setAttribute("type", "button")
  buttonView.setAttribute("onclick", "detailsPage()")

  buttonView.setAttribute("href", `./details.html?query=${searchterm}&id=${idImage}`)
  buttonView.innerText = "View"

  const buttonHide = document.createElement("a")
  buttonHide.classList.add("btn", "btn-sm", "btn-outline-secondary")
  buttonHide.setAttribute("type", "button")
  buttonHide.innerText = "Hide"

  const smallSection = document.createElement("small")
  smallSection.classList.add("text-muted")
  smallSection.innerText = idImage

  div.appendChild(divCol)
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

const detailsPage = function () {
  fetch(mainUrl + imagequery + "&id=" + imageId, {
    Headers: { Authorization: "W1TyRJMryxcJFDeHrtgmdMSNOGERVIaDw1Uz3LjWS9E7zezyukzQc25Z" },
  })
    .then((response) => {
      console.log(mainUrl + imagequery + "&id=" + imageId)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore n°: ", response.status)
      }
    })
    .then((data) => {
      detailsRow.innerHTML = ""
      console.log(data)
      data.photos.forEach((info) => {
        singleCard(
          info.src.medium,
          info.photographer,
          info.photographer_id,
          info.id,
          detailsRow,
          imagequery,
        )
      })
    })
    .catch(console.log("Errore nel contattare il server"))
}
detailsPage()
