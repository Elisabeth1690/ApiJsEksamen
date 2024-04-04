const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showPokemonContainer = document.getElementById("showPokemonContainer");

showFiftyPokemonBtn.onclick = fetchPokemonType;
//https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
// jeg følger denne oppskriften for å fetche pokemonene

async function fetchPokemonType() {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50`)
      .then((response) => response.json())
      .then(function (allpokemons) {
        allpokemons.results.forEach(function (pokemonFullInfo) {
          fetchPokemonFullInfo(pokemonFullInfo);
          console.log(allpokemons, "inne i første");
        });
      });
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}
// når jeg skrev inn denne koden første gangen så ble det feil
//så jeg endret til de orginale navnene, for å så endre tilabke til min
// feilen var i den første fetch. men jeg glemte og endre pokeData
//til pokeDext, på første push.
function fetchPokemonFullInfo(pokemonFullInfo) {
  let url = pokemonFullInfo.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeDex) {
      showPokemon(pokeDex);
    });
}

function showPokemon(pokeDex) {
  console.log(pokeDex, "pokedex");
  let pokemonCard = document.createElement("div");
  let pokemonName = pokeDex.name;
  let pokemonId = pokeDex.id;
  let pokemonType = pokeDex.types[0].type.name; // fikk hjelp av chatgpt om hvordan jeg skulle nøste ut bare en type.
  console.log("inne i showPokemon", pokemonName, pokemonId, pokemonType);
  pokemonCard.innerHTML = ` 
  <p>#${pokemonId}</p>
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"/>
<p>Name: ${pokemonName} <br/>
Type: ${pokemonType}</p>
`;
  styleCardColor(pokemonCard, pokemonType);
  showPokemonContainer.appendChild(pokemonCard);
}

function styleCardColor(pokemonCard, pokemonType) {
  pokemonCard.style.fontcolor = "black";
  pokemonCard.style.display = "flex";
  pokemonCard.style.flexDirection = "column";
  pokemonCard.style.padding = "5px";
  pokemonCard.style.color = "blue";
  pokemonCard.style.width = "180px";
  pokemonCard.style.height = "220px";
  pokemonCard.style.borderRadius = "15px";
  pokemonCard.style.margin = "20px";
  if (pokemonType === "bug") {
    pokemonCard.style.backgroundColor = "rgb(168, 243, 114)";
  }
  if (pokemonType === "dark") {
    pokemonCard.style.backgroundColor = "rgb(124, 125, 123)";
  }
  if (pokemonType === "electric") {
    pokemonCard.style.backgroundColor = "rgb(255, 247, 88)";
  }
  if (pokemonType === "fairy") {
    pokemonCard.style.backgroundColor = "rgb(145, 110, 243)";
  }
  if (pokemonType === "fighting") {
    pokemonCard.style.backgroundColor = "rgb(205, 153, 31)";
  }
  if (pokemonType === "fire") {
    pokemonCard.style.backgroundColor = "rgb(245, 14, 14)";
  }
  if (pokemonType === "flying") {
    pokemonCard.style.backgroundColor = "rgb(50, 215, 248)";
  }
  if (pokemonType === "ghost") {
    pokemonCard.style.backgroundColor = "rgb(176, 210, 216)";
  }
  if (pokemonType === "grass") {
    pokemonCard.style.backgroundColor = "rgb(116, 198, 57)";
  }
  if (pokemonType === "ground") {
    pokemonCard.style.backgroundColor = "rgb(189, 144, 85)";
  }
  if (pokemonType === "ice") {
    pokemonCard.style.backgroundColor = "rgb(190, 223, 229)";
  }
  if (pokemonType === "normal") {
    pokemonCard.style.backgroundColor = "rgb(216, 168, 101)";
  }
  if (pokemonType === "poison") {
    pokemonCard.style.backgroundColor = "rgb(100, 66, 221)";
  }
  if (pokemonType === "pyschic") {
    pokemonCard.style.backgroundColor = "rgb(64, 16, 236)";
  }
  if (pokemonType === "rock") {
    pokemonCard.style.backgroundColor = "rgb(106, 106, 106)";
  }
  if (pokemonType === "steel") {
    pokemonCard.style.backgroundColor = "rgb(175, 176, 176)";
  }
  if (pokemonType === "water") {
    pokemonCard.style.backgroundColor = "rgb(10, 121, 241)";
  }
}
