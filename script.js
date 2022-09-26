"use strict";

// ALLLLL
async function Allcountry() {
  const response = await fetch("https://restcountries.com/v2/all");
  const result = await response.json();
  renderData(result);
}

Allcountry();

// RENDER====================
function renderData(data = []) {
  if (data.length === 0) {
    $(".all").innerHTML = `<span class="loader"></span>`;
  } else {
    $(".all").innerHTML = "";
    data.forEach((item) => {
      const card = createElement(
        "div",
        "box  p-3 my-2 d-flex",
        `  <img src="${item.flags.png}" alt="flag" class="box-img">
         <div class="box-body">
            <h2 class="country">${item.name}</h2>
            <p>${item.nativeName}</p>
         </div>`
      );

      card.dataset.info = item.name;

      $(".all").appendChild(card);

      card.addEventListener("click", (e) => {
        renderModal(card.getAttribute("data-info").toLowerCase());
      });
    });
  }
}

renderData();

// SEARCH
async function searchCountry(query) {
  $(".all").innerHTML = `<span class="loader"></span>`;

  const data = await fetch(`https://restcountries.com/v2/name/${query}`);
  const res = await data.json();

  $(".all").innerHTML = "";
  if (res.message) {
    $(".all").innerHTML = "<h1>Ma'lumot topilmadi</h1>";
  } else {
    renderData(res);
  }
}

//   ============================ SEARCH

$(".search").addEventListener("keyup", (e) => {
  console.log(e.target.value.length);
  if (e.target.value.length === 0) {
    Allcountry();
  } else {
    searchCountry(e.target.value.trim().toLowerCase());
  }
});

// modal

$(".modal-content").style.display = "none";

async function renderModal(data) {
  const result = await fetch(`https://restcountries.com/v2/name/${data}`);
  const res = await result.json();

  const modal = createElement(
    "div",
    "modals",
    `<img src="${res[0].flags.png}" alt="rasm" class="rasm">
   <div class="wrapper2">
    <h2>${res[0].name}</h2>
    <h6 class="text">topLevelDomain: -  ${res[0].topLevelDomain}</h6>
   <h6 class="text">alpha2Code - ${res[0].alpha2Code}</h6>
   <h6 class="text">callingCodes - ${res[0].callingCodes}</h6>
   <h6 class="text">alpha3Code - ${res[0].alpha3Code}</h6>
   <h6 class="text">capital - ${res[0].capital}</h6>
   <h6 class="text">subregion - ${res[0].subregion}</h6>
   <h6 class="text">region - ${res[0].region}</h6>
   <h6 class="text">population - ${res[0].population}</h6>
   <h6 class="text">latlng - ${res[0].latlng}</h6>
   <h6 class="text">demonym - ${res[0].demonym}</h6>
  <h6 class="text">area - ${res[0].area}</h6>
  <h6 class="text">timezones - ${res[0].timezones}</h6>
  <h6 class="text">nativeName ${res[0].nativeName}</h6>
  <h6 class="text">numericCode - ${res[0].numericCode}</h6>
  <h6 class="text">altSpellings - ${res[0].altSpellings}</h6>
</div>  `);

  $(".modal-content").style.display = "flex";
  $(".wrapper").appendChild(modal);
}

$(".hideelement").addEventListener("click", () => {
  $(".wrapper").innerHTML = "";
  $(".modal-content").style.display = "none";
});
