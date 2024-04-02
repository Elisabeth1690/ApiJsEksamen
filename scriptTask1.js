const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showFiftyPokemonCard = document.getElementById("showFiftyPokemon");

showFiftyPokemonBtn.onclick = getFiftyPokemon;

async function fetchFiftyPokemon() {
  try {
    const pokemonRequset = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=50`
    );
    let response = await pokemonRequset.json();
    return response;
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}
async function getFiftyPokemon() {
  //   try {
  allPokemon = await fetchFiftyPokemon();
  pokemonArray = allPokemon.results;
  showFiftyPokemon(pokemonArray);
  //   } catch (error) {
  // console.error("klarte ikke å hente fetchen", error);
  //   }
}

function showFiftyPokemon(allPokemon) {
  console.log(allPokemon, "array2");
  allPokemon.forEach((pokemon) => {
    const showPokemonCard = document.createElement("div");
    let name = pokemon.name;
    let imageUrl = pokemon.url;
    showPokemonCard.innerHTML = `
    <img
        src="${imageUrl}"
    
      />
    <p>${name}</p>`;

    showFiftyPokemonCard.appendChild(showPokemonCard);
  });
}
