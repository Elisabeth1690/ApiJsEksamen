const showFiftyPokemonBtn = document.querySelector("#showFiftyPokemonBtn");
let showFiftyPokemonCard = document.getElementById("showFiftyPokemon");

showFiftyPokemonBtn.onclick = getFiftyPokemon;

async function fetchPokemonType() {
  try {
    const typeRequset = await fetch(`https://pokeapi.co/api/v2/type/?limit=18`);
    let TypeResponse = await typeRequset.json();
    return TypeResponse;
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}
/*
getPokemonType();

async function getPokemonType() {
  try {let allType = await fetchPokemonType();
    allTypeArray = allType.results;
    
    console.log(allType, allTypeArray);
  } catch (error) {
    console.error("klarte ikke å hente fetchen", error);
  }
}*/

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
  try {
    let allPokemon = await fetchFiftyPokemon();
    let pokemonArray = allPokemon.results;

    let allType = await fetchPokemonType();
    let allTypeArray = allType.results;

    showAllPokemonType(pokemonArray, allTypeArray);
  } catch (error) {
    console.error("klarte ikke å hente fetchen", error);
  }
}

function showAllPokemonType(allPokemon, allType) {
  console.log(allPokemon, "array2", allType);

  allPokemon.forEach((pokemon) => {
    const showPokemonCard = document.createElement("div");
    let name = pokemon.name;
    let imageUrl = pokemon.url;

    console.log(imageUrl, "bilde");
    showPokemonCard.innerHTML = `
    <img src="${imageUrl}"/>
    <p>${name}</p>
    `;

    showFiftyPokemonCard.appendChild(showPokemonCard);
  });
}
