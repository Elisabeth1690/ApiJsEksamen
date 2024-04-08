const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showPokemonContainer = document.getElementById("showPokemonContainer");
const savedCardsContainer = document.getElementById("savedCardsContainer");

const bugBnt = document.getElementById("bugBnt");
const darkBnt = document.getElementById("darkBnt");
const dragonBnt = document.getElementById("dragonBnt");
const electricBnt = document.getElementById("electricBnt");
const fairyBnt = document.getElementById("fairyBnt");
const fightingBnt = document.getElementById("fightingBnt");
const fireBnt = document.getElementById("fireBnt");
const flyingBnt = document.getElementById("flyingBnt");
const ghostBnt = document.getElementById("ghostBnt");
const grassBnt = document.getElementById("grassBnt");
const groundBnt = document.getElementById("groundBnt");
const iceBnt = document.getElementById("iceBnt");
const normalBnt = document.getElementById("normalBnt");
const poisonBnt = document.getElementById("poisonBnt");
const pyschicBnt = document.getElementById("pyschicBnt");
const rockBnt = document.getElementById("rockBnt");
const steelBnt = document.getElementById("steelBnt");
const waterBnt = document.getElementById("waterBnt");

document.addEventListener("click", async (e) => {
  if (e.target === showFiftyPokemonBtn) {
    fetchPokemonType();
  }
  if (e.target === bugBnt) {
    sootPokomone("bug");
  }
  if (e.target === darkBnt) {
    sootPokomone("dark");
  }
  if (e.target === dragonBnt) {
    sootPokomone("dragon");
  }
  if (e.target === electricBnt) {
    sootPokomone("electric");
  }
  if (e.target === fairyBnt) {
    sootPokomone("fairy");
  }
  if (e.target === fightingBnt) {
    sootPokomone("fighting");
  }
  if (e.target === fireBnt) {
    sootPokomone("fire");
  }
  if (e.target === flyingBnt) {
    sootPokomone("flying");
  }
  if (e.target === ghostBnt) {
    sootPokomone("ghost");
  }
  if (e.target === grassBnt) {
    sootPokomone("grass");
  }
  if (e.target === groundBnt) {
    sootPokomone("ground");
  }
  if (e.target === iceBnt) {
    sootPokomone("ice");
  }
  if (e.target === normalBnt) {
    sootPokomone("normal");
  }
  if (e.target === poisonBnt) {
    sootPokomone("poison");
  }
  if (e.target === pyschicBnt) {
    sootPokomone("pyschic");
  }
  if (e.target === rockBnt) {
    sootPokomone("rock");
  }
  if (e.target === steelBnt) {
    sootPokomone("steel");
  }
  if (e.target === waterBnt) {
    sootPokomone("water");
  }
});
//https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
// jeg følger denne oppskriften for å fetche pokemonene

async function fetchPokemonType() {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50`)
      .then((response) => response.json())
      .then(function (allpokemons) {
        showPokemonContainer.innerHTML = "";
        allpokemons.results.forEach(function (pokemonFullInfo, index) {
          fetchPokemonFullInfo(pokemonFullInfo, index);
        });
      });
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}
// når jeg skrev inn denne koden første gangen så ble det feil
//så jeg endret til de orginale navnene, for å så endre tilabke til min
// feilen var i den første fetch. men jeg glemte og endre pokeData
//til pokeDex, på første push.
function fetchPokemonFullInfo(pokemonFullInfo, index) {
  let url = pokemonFullInfo.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeDex) {
      showPokemon(pokeDex, index);
    });
}

function showPokemon(pokeDex, index) {
  let pokemonCard = document.createElement("div");
  let pokemonName =
    pokeDex.name.charAt(0).toUpperCase() + pokeDex.name.slice(1);
  let pokemonId = pokeDex.id;
  let pokemonType =
    pokeDex.types[0].type.name.charAt(0).toUpperCase() +
    pokeDex.types[0].type.name.slice(1); // fikk hjelp av chatgpt om hvordan jeg skulle nøste ut bare en type.
  pokemonCard.innerHTML = ` 
  <p>#${pokemonId}</p>
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"/>
<p>Name: ${pokemonName} <br/>
Type: ${pokemonType}</p>
<button class="saveBtn" data-index="${index}">Save</button>
`;
  styleCardColor(pokemonCard, pokemonType);
  showPokemonContainer.appendChild(pokemonCard);
  const savePokeBtn = document.querySelector(`.saveBtn[data-index="${index}"]`);
  savePokeBtn.style.backgroundColor = "green";
  savePokeBtn.onclick = function () {
    savePokeCard(pokeDex);
  };
}

/////////////////////////////////////////////////////////////
///////Filtereing av typer

fetchType();
async function fetchType() {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50`)
      .then((response) => response.json())
      .then(function (allpokemons) {
        showPokemonContainer.innerHTML = "";
        allpokemons.results.forEach(function (pokemonFullInfo) {
          fetchPokemonTypeFullInfo(pokemonFullInfo);
        });
      });
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}
let pokeArray = [];
async function fetchPokemonTypeFullInfo(pokemonFullInfo) {
  try {
    let url = await pokemonFullInfo.url;
    fetch(url)
      .then((response) => response.json())
      .then(function (pokeDex) {
        pokeArray.push(pokeDex);
      });
  } catch (error) {
    console.error("klarte ikke og hente pokemonFullInfo", error);
  }
}

/// chatGpt hjalp meg med å finne rikitg måte og flitere på.
// litt irriterende og spørre hen om dette, siden jeg egentlig kunne det.
//og har gjort det på staylingen uten hjelp....
// hadde vist fått hjelp av chatGpt på staylingen også, beklager det!

function sootPokomone(type) {
  let typePokemon = pokeArray.filter(
    (pokemon) => pokemon.types[0].type.name === type
  );

  if (typePokemon.length > 0) {
    showPokemonContainer.innerHTML = "";
    typePokemon.forEach(function (pokemonTypeDex, index) {
      showPokemon(pokemonTypeDex, index);
    });
  } else {
    showPokemonContainer.innerHTML = `<p> Beklager, men vi har ikke hentet ut typen: ${
      type.charAt(0).toUpperCase() + type.slice(1)
    } blandt de 50 pokemonene</br>
    Om 5 sekunder vil du få se alle de 50 første pokemonene</p> `;
    setTimeout(() => {
      fetchPokemonType();
    }, 5000);
  }
}

////////
///1.3
const makePokeTypeBtn = document.getElementById("makePokeTypeBtn");
makePokeTypeBtn.onclick = getCreatePokemontType;
function getCreatePokemontType() {
  let createType = document.querySelector("#chosePokemon").value;
  console.log(createType);
  pokeName(createType);
}
function pokeName(createType) {
  let chosePokeName = prompt("hva vil du at pokemonen din skal hete?");

  console.log(createType, chosePokeName);
}
////////////////////////
////////////////1.4
let savedPokemonCards = [];
function savePokeCard(pokeDex) {
  if (savedPokemonCards.length < 30) {
    const findCard = savedPokemonCards.some((item) => item.id === pokeDex.id);

    if (!findCard) {
      savePokemonInLocalStorge(pokeDex);
      savedPokemonCards.push(pokeDex);
      console.log(savedPokemonCards, "array");
    }
  } else {
    alert("Du for ikke lagre mer enn 30");
  }

  console.log(pokeDex, "inne i savecard", index);
}

function savePokemonInLocalStorge(pokeDex) {
  if (savedPokemonCards.length < 30) {
    const savePokemonCardsLocal =
      JSON.parse(localStorage.getItem("PokemonKort")) || [];
    savePokemonCardsLocal.push(pokeDex);
    localStorage.setItem("PokemonKort", JSON.stringify(savePokemonCardsLocal));
  } else {
  }
}
//////////////
///////Hente lagrde Kort
fatchSavedPokemonCards();
function fatchSavedPokemonCards() {
  const fatchPokemon = JSON.parse(localStorage.getItem("PokemonKort")) || [];

  fatchPokemon.forEach((pokemon, index) => {
    console.log(pokemon, "hente lagred");
    let pokemonSavedCard = document.createElement("div");
    let pokemonName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let pokemonId = pokemon.id;
    let pokemonType =
      pokemon.types[0].type.name.charAt(0).toUpperCase() +
      pokemon.types[0].type.name.slice(1);

    pokemonSavedCard.innerHTML = ` 
    <p>#${pokemonId}</p>
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"/>
  <p>Name: ${pokemonName} <br/>
  Type: ${pokemonType}</p>
  <button class="rewritePokeBtn" data-index="${index}">Redigere</button>
  <button class="deleteBtn" data-index="${index}">Delete</button>
  `;
    styleCardColor(pokemonSavedCard, pokemonType);
    savedCardsContainer.appendChild(pokemonSavedCard);
    const rewritePokeBtn = document.querySelector(
      `.rewritePokeBtn[data-index="${index}"]`
    );
    rewritePokeBtn.addEventListener("click", () => {
      rewritePokemonBtn(pokemonSavedCard, index);
    });

    const deleteBtn = document.querySelector(
      `.deleteBtn[data-index="${index}"]`
    );
    deleteBtn.addEventListener("click", () => {
      deletePokeCard(index);
    });
  });
}
function rewritePokemonBtn(pokemonSavedCard, index) {
  console.log(pokemonSavedCard, index);
}

function deletePokeCard(index) {
  console.log(index);
}

//////////////////////////
///////////// styling av kort
function styleCardColor(pokemonCard, pokemonType) {
  pokemonCard.style.display = "flex";
  pokemonCard.style.flexDirection = "column";
  pokemonCard.style.padding = "5px";
  pokemonCard.style.color = "blue";
  pokemonCard.style.width = "150px";
  pokemonCard.style.height = "280px";
  pokemonCard.style.border = "2px solid black";
  pokemonCard.style.borderRadius = "15px";
  pokemonCard.style.margin = "20px";

  if (pokemonType.toLowerCase() === "bug") {
    pokemonCard.style.backgroundColor = "rgb(168, 243, 114)";
  }
  if (pokemonType.toLowerCase() === "dark") {
    pokemonCard.style.backgroundColor = "rgb(124, 125, 123)";
  }
  if (pokemonType.toLowerCase() === "dragon") {
    pokemonCard.style.backgroundColor = "rgb(248, 74, 178)";
  }
  if (pokemonType.toLowerCase() === "electric") {
    pokemonCard.style.backgroundColor = "rgb(255, 247, 88)";
  }
  if (pokemonType.toLowerCase() === "fairy") {
    pokemonCard.style.backgroundColor = "rgb(145, 110, 243)";
  }
  if (pokemonType.toLowerCase() === "fighting") {
    pokemonCard.style.backgroundColor = "rgb(205, 153, 31)";
  }
  if (pokemonType.toLowerCase() === "fire") {
    pokemonCard.style.backgroundColor = "rgb(245, 14, 14)";
  }
  if (pokemonType.toLowerCase() === "flying") {
    pokemonCard.style.backgroundColor = "rgb(50, 215, 248)";
  }
  if (pokemonType.toLowerCase() === "ghost") {
    pokemonCard.style.backgroundColor = "rgb(176, 210, 216)";
  }
  if (pokemonType.toLowerCase() === "grass") {
    pokemonCard.style.backgroundColor = "rgb(116, 198, 57)";
  }
  if (pokemonType.toLowerCase() === "ground") {
    pokemonCard.style.backgroundColor = "rgb(189, 144, 85)";
  }
  if (pokemonType.toLowerCase() === "ice") {
    pokemonCard.style.backgroundColor = "rgb(190, 223, 229)";
  }
  if (pokemonType.toLowerCase() === "normal") {
    pokemonCard.style.backgroundColor = "rgb(216, 168, 101)";
  }
  if (pokemonType.toLowerCase() === "poison") {
    pokemonCard.style.backgroundColor = "rgb(100, 66, 221)";
  }
  if (pokemonType.toLowerCase() === "pyschic") {
    pokemonCard.style.backgroundColor = "rgb(64, 16, 236)";
  }
  if (pokemonType.toLowerCase() === "rock") {
    pokemonCard.style.backgroundColor = "rgb(106, 106, 106)";
  }
  if (pokemonType.toLowerCase() === "steel") {
    pokemonCard.style.backgroundColor = "rgb(175, 176, 176)";
  }
  if (pokemonType.toLowerCase() === "water") {
    pokemonCard.style.backgroundColor = "rgb(10, 121, 241)";
  }
}
