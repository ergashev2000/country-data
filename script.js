"use strict";

// ALLLLL
async function Allcountry() {
  const response = await fetch("https://restcountries.com/v2/all");
  const result = await response.json();

  renderData(result);
}

Allcountry();

// LOADER//
window.addEventListener('load', function () {
  let mainLoad = document.querySelector('#main__load')
  let load = document.querySelector('#load')
  
  mainLoad.classList.remove("loader__mask");
  load.classList.remove("lds-spinner");

  $('body').style.overflow = 'visible'

})

// RENDER=========
function renderData(data = []) {
  if (data.length === 0) {
    $(".all").innerHTML = `<span class="loader"></span>`;
  } else {
    $(".all").innerHTML = "";

    data.forEach((item) => {
      const card = createElement(
        "div",
        "box p-3 my-2 d-flex",
        `
         <img src="${item.flags.png}" alt="" class="box-img">
          <div class="box-body">
          <h2 class="country ">${item.name}</h2>
           <p>${item.nativeName}</p>
           <p> Capital: ${item.capital}</p>
           <p>Location region:  ${item.region}</p>
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

// =============== SERACH
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
    `
    
   <div class="text-center pt-3">
   <img src="${res[0].flags.png}" alt="rasm" class="">
   </div>
    <h2 class="text-center">${res[0].name}</h2>
   <div class=" d-flex justify-content-around">
   <div>
   <p>Capital: ${res[0].capital}</p>
   <p>Region: ${res[0].region}</p>
   <p>Population: ${res[0].population}</p>
   <p>Area: ${res[0].area}</p>
   </div>
   <div>
   <p>Timezones: ${res[0].timezones}</p>
   <p>Currencies: ${res[0].currencies[0].name}</p>
   <p>Numeric Code: ${res[0].numericCode}</p>
   <p>Language: ${res[0].languages[0].name}</p>
   </div>
   </div>
   
   `
  );

  $(".modal-content").style.display = "flex";
  $(".wrapper").appendChild(modal);

  console.log(data);
  console.log(res);
}

$(".hideelement").addEventListener("click", () => {
  $(".wrapper").innerHTML = "";
  $(".modal-content").style.display = "none";
});

