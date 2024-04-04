const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showFiftyPokemonCard = document.getElementById("showFiftyPokemon");

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

function fetchPokemonFullInfo(pokemonFullInfo) {
  let url = pokemonFullInfo.url;
  console.log(url, "inne i url");
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      console.log(pokeData);
    });
}
