let gameCounter = 0;
const nameBtn = document.getElementById("nameBtn");
const oneBtn = document.getElementById("oneBtn");
const emenyBtn = document.getElementById("choseEmenyBtn");
const letStart = document.getElementById("letStart");
const gamePlace = document.getElementById("gamePlace");
const startBtn = document.getElementById("startBtn");
const enemyContainer = document.getElementById("enemyContainer");
const pokemonInfoContainer = document.getElementById("pokemonInfoContainer");
const imagePokemonContainer = document.getElementById("imagePokemonContainer");
const imageContainerEnemy = document.getElementById("imageContainerEnemy");
let showPlayerName = document.getElementById("playerName");
let pokeballs = [];
let playerName;

document.addEventListener("click", async (e) => {
  if (e.target === oneBtn) {
    chosePokemontType("chosePokemonOne");
  }
  if (e.target === emenyBtn) {
    enemyType();
  }
  if (e.target === nameBtn) {
    deleteBeforeStarteNewGame();
    choseName();
  }
  if (e.target === startBtn) {
    removeAndShow();
  }
});

function deleteBeforeStarteNewGame() {
  localStorage.clear("PokemonBalls");
  localStorage.clear("enemyMOHAHA");
}

function removeAndShow() {
  if (pokeballs.length === 3 && enemyArray.length === 1) {
    console.log("inne i remov");
    letStart.innerHTML = "";
    showPokemons();
    showEnemy();
    //showName();
    showImagePokemons();
    showEnemyImagePokemon();
  } else {
    alert("du må først velge pokemon og fiende");
  }
}

function showName() {
  showPlayerName.innerText =
    playerName.charAt(0).toUpperCase() + playerName.slice(1);
}

function choseName() {
  if (gameCounter === 0) {
    playerName = prompt("Hva vil du hete?");
    // playerName =
    gameCounter += 10;
  }

  if (!playerName) {
    alert("du må skrive inn et navn!");
    choseName();
  } else {
    console.log(gameCounter, playerName);
  }
}

function chosePokemontType(btn) {
  if (gameCounter === 10) {
    let choseType = document.querySelector(`#${btn}`).value;
    fetchType(choseType);
  } else {
    alert("Du må velge navn først");
  }
}

async function fetchType(type) {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${type}`)
      .then((response) => response.json())
      .then(function (pokemon) {
        console.log(pokemon);
        pokemonArrayPush(pokemon);
      });
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}

function pokemonArrayPush(pokemon) {
  if (pokeballs.length < 3) {
    pokeballs.push(pokemon);
    savePokemonBallsInLocalStorge(pokemon);
  } else {
    console.log("du har valgt 3 pokemon");
    alert("du har valgt 3 pokemon og kan ikke velge flere");
  }
}
let countPokeinfo = 0;
function showPokemons() {
  const pokemons = JSON.parse(localStorage.getItem("PokemonBalls")) || [];
  pokemons.forEach((pokemon) => {
    countPokeinfo++;
    let statusContainer = document.createElement("div");
    statusContainer.classList.add(`pokemonInfo${countPokeinfo}`);
    let hpLife = pokemon.stats[0].base_stat;
    let pokemoneName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let pokemonAttack = pokemon.stats[1].base_stat;
    let pokemonDefend = pokemon.stats[2].base_stat;
    let pokemonId = pokemon.id;
    let pokemonType =
      pokemon.types[0].type.name.charAt(0).toUpperCase() +
      pokemon.types[0].type.name.slice(1);
    statusContainer.innerHTML = `
    <p>#${pokemonId}</p>
    <h1>${pokemoneName}</h1>
    <h3>${pokemonType}</h3>
    <p>Life: ${hpLife}</br>
    Attack: ${pokemonAttack}</br>
    Defend: ${pokemonDefend}</p
   `;
    styleCardColor(statusContainer, pokemonType);
    pokemonInfoContainer.appendChild(statusContainer);
    console.log(countPokeinfo, "teller");
  });
}
let imageCounter = 0;
function showImagePokemons() {
  const pokemons = JSON.parse(localStorage.getItem("PokemonBalls")) || [];
  pokemons.forEach((pokemon) => {
    imageCounter++;
    let imageContainerPoke = document.createElement("div");
    imageContainerPoke.classList.add(`pokemonImage${imageCounter}`);
    let pokemonId = pokemon.id;

    imageContainerPoke.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"/>
    `;
    imagePokemonContainer.appendChild(imageContainerPoke);
  });
}

function styleCardColor(pokemonCard, pokemonType) {
  pokemonCard.style.display = "flex";
  pokemonCard.style.flexDirection = "column";
  pokemonCard.style.padding = "5px";
  pokemonCard.style.color = "black";
  pokemonCard.style.width = "150px";
  pokemonCard.style.height = "250px";
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
  if (pokemonType.toLowerCase() === "psychic") {
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
////////////////////////////////////////
////////// Velg Enemy
function enemyType() {
  let enemyType = document.querySelector("#choseEmeny").value;
  console.log(enemyType, "enmyetyp");
  fetchEnemy(enemyType);
}

async function fetchEnemy(type) {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${type}`)
      .then((response) => response.json())
      .then(function (pokemon) {
        console.log(pokemon, "finde pokemon");
        enemyArrayPush(pokemon);
      });
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}

let enemyArray = [];
function enemyArrayPush(enemy) {
  if (pokeballs.length === 3) {
    enemyArray.push(enemy);
    enemySaveInLocalStorge(enemy);
    console.log(enemyArray, "push enemy");
  } else {
    alert("Du må velge 3 pokemon først");
  }
}

function showEnemy() {
  const enemyPokemon = JSON.parse(localStorage.getItem("enemyMOHAHA")) || [];
  enemyPokemon.forEach((pokemon) => {
    let enemyContain = document.createElement("div");
    let hpLife = pokemon.stats[0].base_stat;
    let pokemoneName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let pokemonAttack = pokemon.stats[1].base_stat;
    let pokemonDefend = pokemon.stats[2].base_stat;
    let pokemonId = pokemon.id;
    let pokemonType =
      pokemon.types[0].type.name.charAt(0).toUpperCase() +
      pokemon.types[0].type.name.slice(1);
    enemyContain.innerHTML = `
      <p>#${pokemonId}</p>
      <h1>${pokemoneName}</h1>
      <p>Life: ${hpLife}</br>
      Attack: ${pokemonAttack}</br>
      Defend: ${pokemonDefend}</p>
      `;
    styleCardColor(enemyContain, pokemonType);
    enemyContainer.appendChild(enemyContain);
  });
}

function showEnemyImagePokemon() {
  const enemyPokemon = JSON.parse(localStorage.getItem("enemyMOHAHA")) || [];
  console.log(enemyPokemon, "enemypoke bilde");
  enemyPokemon.forEach((pokemon) => {
    let enemyContainerImage = document.createElement("div");
    enemyContainerImage.classList.add("enemyImageOne");
    let pokemonId = pokemon.id;
    enemyContainerImage.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"/>
    `;
    imageContainerEnemy.appendChild(enemyContainerImage);
    console.log(enemyContainerImage, "imageEnemyContainer");
  });
  console.log(imageContainerEnemy, "imageContainerEnemy");
}
///////
////Largre og hente info derfra

function savePokemonBallsInLocalStorge(pokemon) {
  const savePokemonCardsLocal =
    JSON.parse(localStorage.getItem("PokemonBalls")) || [];
  savePokemonCardsLocal.push(pokemon);
  localStorage.setItem("PokemonBalls", JSON.stringify(savePokemonCardsLocal));
}
function enemySaveInLocalStorge(enemy) {
  const savePokemonCardsLocal =
    JSON.parse(localStorage.getItem("enemyMOHAHA")) || [];
  savePokemonCardsLocal.push(enemy);
  localStorage.setItem("enemyMOHAHA", JSON.stringify(savePokemonCardsLocal));
}
