let allPokemon;

fetch50Pokemon();
async function fetch50Pokemon() {
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
get50Pokemon();

async function get50Pokemon() {
  try {
    allPokemon = await fetch50Pokemon();
    console.log(allPokemon);
  } catch (error) {
    console.error("klarte ikke å hente fetchen", error);
  }
}
