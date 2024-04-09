const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showPokemonContainer = document.getElementById("showPokemonContainer");
const savedCardsContainer = document.getElementById("savedCardsContainer");
const emptyContainerBtn = document.getElementById("emptyContainer");
let pokeArray = [];
let savedPokemonCards = [];

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
    sootPokomone("psychic");
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
  if (e.target === emptyContainerBtn) {
    emptyContainer();
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

/////////
///1.3 lag en pokemon
const makePokeTypeBtn = document.getElementById("makePokeTypeBtn");
makePokeTypeBtn.onclick = getCreatePokemontType;
function getCreatePokemontType() {
  let createType = document.querySelector("#chosePokemon").value;
  pokeName(createType);
}
function pokeName(createType) {
  let chosePokeName = prompt("hva vil du at pokemonen din skal hete?");
  let choseNum = Math.floor(Math.random() * 200) + 50;
  if (!chosePokeName) {
    alert(" Ops, du glemte å skrive navn, prøv igjen");
    let chosePokeName = prompt("hva vil du at pokemonen din skal hete?");
    console.log(chosePokeName);
  }
  if (savedPokemonCards.length < 15) {
    let newPokemonQueen = {
      name: `${chosePokeName}`,
      id: `${choseNum}`,
      types: [{ type: { name: `${createType}` } }],
    };
    /// er veldig stolt over den ut nøstingen over her

    savedPokemonCards.push(newPokemonQueen);
    pokeArray.push(newPokemonQueen);
    console.log(pokeArray, "arrayet");
    savePokemonInLocalStorge(newPokemonQueen);
    fatchSavedPokemonCards();
  } else {
    alert("Du for ikke lagre mer enn 15 favoritter, vær vennlig og slett en");
  }
}
////////////////////////
////////////////1.4 lagre kort

function savePokeCard(pokeDex) {
  if (savedPokemonCards.length < 15) {
    const findCard = savedPokemonCards.some((item) => item.id === pokeDex.id);

    if (!findCard) {
      savePokemonInLocalStorge(pokeDex);
      savedPokemonCards.push(pokeDex);
      fatchSavedPokemonCards();
    }
  } else {
    alert("Du for ikke lagre mer enn 15 favoritter, vær vennlig og slett en");
  }

  console.log(pokeDex, "inne i savecard");
}

function savePokemonInLocalStorge(pokeDex) {
  if (savedPokemonCards.length < 15) {
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
  const savePokemonCardsLocal =
    JSON.parse(localStorage.getItem("PokemonKort")) || [];
  savedCardsContainer.innerHTML = "";
  savePokemonCardsLocal.forEach((pokemon, index) => {
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
  <p>Velg ny Type:</p>
  <select class="chosePokemonTyp">
  <option value="bug">Bug</option>
  <option value="dark">Dark</option>
  <option value="dragon">Dragon</option>
  <option value="electric">Electric</option>
  <option value="fairy">Fairy</option>
  <option value="fighting">Fighting</option>
  <option value="fire">Fire</option>
  <option value="flying">Flying</option> 
  <option value="ghost">Ghost</option>
  <option value="grass">Grass</option>
  <option value="ground">Ground</option>
  <option value="ice">Ice</option>
  <option value="normal">Normal</option>
  <option value="poison">Poison</option>
  <option value="pyschic">Pyschic</option>
  <option value="rock">Rock</option>
  <option value="steel">Steel</option>
  <option value="water">Water</option>
</select>
<button class="rewritePokeBtn" data-index="${index}">Redigere</button>
  <button class="deleteBtn" data-index="${index}">Delete</button>
  `;

    styleCardColor(pokemonSavedCard, pokemonType);
    savedCardsContainer.appendChild(pokemonSavedCard);
    const rewritePokeBtn = document.querySelector(
      `.rewritePokeBtn[data-index="${index}"]`
    );
    rewritePokeBtn.addEventListener("click", () => {
      const selectPokemonType =
        pokemonSavedCard.querySelector(".chosePokemonTyp").value;
      rewritePokemonBtn(pokemon, selectPokemonType, index);
    });

    const deleteBtn = document.querySelector(
      `.deleteBtn[data-index="${index}"]`
    );
    deleteBtn.addEventListener("click", () => {
      deletePokeCard(index);
    });
  });
}

////////
////1.6 Redigere Pokemon
function rewritePokemonBtn(pokemonCard, selectPokemonType, index) {
  let newPokemonName = prompt("Skriv inn ny fornavn");
  console.log(newPokemonName, pokemonCard, "før if");
  if (newPokemonName !== null && newPokemonName.trim() !== "") {
    pokemonCard.name = newPokemonName;
    pokemonCard.types[0].type.name = selectPokemonType;
    console.log(newPokemonName, "inne i ifen", selectPokemonType);
  }
  if (selectPokemonType !== null) {
    pokemonCard.types[0].type.name = selectPokemonType;
  }
  try {
    console.log("inne i try nummer1", pokemonCard);

    savedPokemonCards[index] = pokemonCard;
    const savePokemonCardsLocal =
      JSON.parse(localStorage.getItem("PokemonKort")) || [];
    savePokemonCardsLocal[index] = pokemonCard;
    console.log("inne i try", pokemonCard);

    localStorage.setItem("PokemonKort", JSON.stringify(savePokemonCardsLocal));
    fatchSavedPokemonCards();
  } catch (error) {
    console.error("Feil med endring av navn", error);
  }
}

///////////////
/////1.5 Slett Pokemon
function deletePokeCard(index) {
  const savePokemonCardsLocal =
    JSON.parse(localStorage.getItem("PokemonKort")) || [];
  savePokemonCardsLocal.splice(index, 1);
  try {
    savedPokemonCards = savePokemonCardsLocal;
    localStorage.setItem("PokemonKort", JSON.stringify(savePokemonCardsLocal));
    fatchSavedPokemonCards();
  } catch (error) {
    console.error("klarte ikke og oppdatere arrayet", error);
  }
}
//////////
////tøm showPokemonContainer
function emptyContainer() {
  showPokemonContainer.innerHTML = "";
}

//////////////////////////
///////////// styling av kort
function styleCardColor(pokemonCard, pokemonType) {
  pokemonCard.style.display = "flex";
  pokemonCard.style.flexDirection = "column";
  pokemonCard.style.padding = "5px";
  pokemonCard.style.color = "blue";
  pokemonCard.style.width = "150px";
  pokemonCard.style.height = "350px";
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
