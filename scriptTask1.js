const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showPokemonContainer = document.getElementById("showFiftyPokemon");

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
<p>Name: ${pokemonName}</p>
<p>Type: ${pokemonType}</p>
`;
  showPokemonContainer.appendChild(pokemonCard);
}
