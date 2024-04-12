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
const gameRuls = document.getElementById("gameRuls");

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
    choseName();
  }
  if (e.target === startBtn) {
    removeAndShow();
  }
});

function removeAndShow() {
  if (pokeballs.length === 3 && enemyArray.length === 1) {
    letStart.innerHTML = "";
    showPokemons();
    showEnemy();
    showName();
    showImagePokemons();
    showEnemyImagePokemon();
    boostLife();
    showHowToPlay();
  } else {
    alert("du må først velge pokemon og fiende");
  }
}

function showName() {
  showPlayerName.innerText = `Spiller sitt navn:
    ${playerName}`;
}

function choseName() {
  if (gameCounter === 0) {
    playerName = prompt("Hva vil du hete?");
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
    gameCounter += 10;
  }
  if (!playerName) {
    alert("du må skrive inn et navn!");
    choseName();
  } else {
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
        pokemonArrayPush(pokemon);
      });
  } catch (error) {
    console.error("klarte ikke å hente apiet", error);
  }
}

function pokemonArrayPush(pokemon) {
  if (pokeballs.length < 3) {
    pokeballs.push(pokemon);
  } else {
    alert("du har valgt 3 pokemon og kan ikke velge flere");
  }
}
let countPokeinfo = 0;
function showPokemons() {
  pokemonInfoContainer.innerHTML = "";
  pokeballs.forEach((pokemon) => {
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
    <h3>${pokemoneName}</h3>
    <p><strong>Life: ${hpLife}</br>
    Attack: ${pokemonAttack}</br>
    Defend: ${pokemonDefend}</strong></p
    `;

    styleCardColor(statusContainer, pokemonType);
    pokemonInfoContainer.appendChild(statusContainer);
  });
}

let imageCounter = 0;
function showImagePokemons() {
  pokeballs.forEach((pokemon) => {
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
  pokemonCard.style.height = "200px";
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
  } else {
    alert("Du må velge 3 pokemon først");
  }
}

function showEnemy() {
  enemyContainer.innerHTML = "";
  enemyArray.forEach((pokemon) => {
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
      <p><strong>Life: ${hpLife}</br>
      Attack: ${pokemonAttack}</br>
      Defend: ${pokemonDefend}</strong></p>
      `;
    styleCardColor(enemyContain, pokemonType);
    enemyContainer.appendChild(enemyContain);
  });
}

function showEnemyImagePokemon() {
  enemyArray.forEach((pokemon) => {
    let enemyContainerImage = document.createElement("div");
    enemyContainerImage.classList.add("enemyImageOne");
    let pokemonId = pokemon.id;
    enemyContainerImage.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"/>
    `;
    imageContainerEnemy.appendChild(enemyContainerImage);
  });
}

/////////////////////////////////////////////////////
///////game
document.addEventListener("keydown", (number) => {
  if (number.key === "1") {
    damgeEnemy(
      "1",
      pokeballs[0].stats[0].base_stat,
      pokeballs[0].stats[1].base_stat,
      pokeballs[0].name
    );
  }
  if (number.key === "2") {
    damgeEnemy(
      "2",
      pokeballs[1].stats[0].base_stat,
      pokeballs[1].stats[1].base_stat,
      pokeballs[1].name
    );
  }
  if (number.key === "3") {
    damgeEnemy(
      "3",
      pokeballs[2].stats[0].base_stat,
      pokeballs[2].stats[1].base_stat,
      pokeballs[2].name
    );
  }
  if (number.key === "4") {
    winGame();
  }
});

function showHowToPlay() {
  let pokemonOne =
    pokeballs[0].name.charAt(0).toUpperCase() + pokeballs[0].name.slice(1);

  let pokemonTwo =
    pokeballs[1].name.charAt(0).toUpperCase() + pokeballs[1].name.slice(1);
  let pokemonThrees =
    pokeballs[2].name.charAt(0).toUpperCase() + pokeballs[2].name.slice(1);
  gameRuls.style.width = `300px`;
  gameRuls.style.height = `300px`;
  gameRuls.style.backgroundColor = `white`;
  gameRuls.style.padding = `15px`;

  gameRuls.innerHTML = ` 
  <h3>Spille instrukser</h3>
  <p>Du kan bruke <strong>${pokemonOne}</strong> til å angripe med å trykke på knapp 1</p>
  <p>Du kan bruke <strong>${pokemonTwo}</strong> til å angripe med å trykke på knapp 2</p>
  <p>Du kan bruke <strong>${pokemonThrees}</strong> til å angripe med å trykke på knapp 3</p>
  `;
}

function showSpecialMove() {
  if ((gameCounter = 30)) {
    alert(
      "Du har kjempet hardt og har fått muligheten til bruke er spesial angrep, se spill regler for oppdatert info"
    );
    gameRuls.innerHTML = "";
    let pokemonOne =
      pokeballs[0].name.charAt(0).toUpperCase() + pokeballs[0].name.slice(1);

    let pokemonTwo =
      pokeballs[1].name.charAt(0).toUpperCase() + pokeballs[1].name.slice(1);
    let pokemonThrees =
      pokeballs[2].name.charAt(0).toUpperCase() + pokeballs[2].name.slice(1);

    gameRuls.style.width = `300px`;
    gameRuls.style.height = `300px`;
    gameRuls.style.backgroundColor = `white`;
    gameRuls.style.padding = `15px`;
    gameRuls.innerHTML = ` 
    <h3>Spille instrukser</h3>
    <p>Du kan bruke <strong>${pokemonOne}</strong> til å angripe med å trykke 1</p>
    <p>Du kan bruke <strong>${pokemonTwo}</strong> til å angripe med å trykke 2</p>
    <p>Du kan bruke <strong>${pokemonThrees}</strong> til å angripe med å trykke 3</p>
    <p> Du har kjempet hardt og har fått muligheten til</br>
    bruke er spesial angrep, trykk på<strong> 4 </strong>for å vinne, eller ta dine sjangse,
    uten spesial angrep</p>
    `;
  }
}
function winGame() {
  if ((gameCounter = 30)) {
    gameCounter += 10;
    alert(`${playerName} har valgt og  at sin siste pokemon skal bruker super attack på ${
      enemyArray[0].name.charAt(0).toUpperCase() + enemyArray[0].name.slice(1)
    } 
    og det tar 1000 i liv`);
    if ((gameCounter = 40)) {
      attack("1000");
    }
  }
}

function boostLife() {
  if (enemyArray[0].stats[0].base_stat < 200) {
    enemyArray[0].stats[0].base_stat = 600;
    console.log(enemyArray[0].stats[0].base_stat);
    alert(`${enemyArray[0].name} så at ${playerName} kom for å angripe,
    og brukt boostLife og økte livet sitt til 600Hp`);
    showEnemy();
  }
}

function damgeEnemy(pokemonNumber, pokemonLife, pokemonAttack, pokemonName) {
  if (pokemonNumber === "1" && pokemonLife > 0) {
    gameCounter += 10;
    alert(` ${
      pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    } Har valg og angripe med sitt vanlige angrep og tar
    ${pokemonAttack} av livet til ${
      enemyArray[0].name.charAt(0).toUpperCase() + enemyArray[0].name.slice(1)
    }`);
    attack(pokemonAttack);
    showSpecialMove();
  }
  if (pokemonNumber === "2" && pokemonLife > 0) {
    gameCounter += 10;
    alert(` ${
      pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    } Har valg og angripe med sitt vanlige angrep og tar
    ${pokemonAttack} av livet til ${
      enemyArray[0].name.charAt(0).toUpperCase() + enemyArray[0].name.slice(1)
    }`);
    attack(pokemonAttack);
    showSpecialMove();
  }
  if (pokemonNumber === "3" && pokemonLife > 0) {
    gameCounter += 10;
    alert(` ${
      pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    } Har valg og angripe med sitt vanlige angrep og tar
    ${pokemonAttack} av livet til ${
      enemyArray[0].name.charAt(0).toUpperCase() + enemyArray[0].name.slice(1)
    }`);
    attack(pokemonAttack);
    showSpecialMove();
  }
}
function attack(pokemonAttack) {
  console.log(pokemonAttack, "inne i attck");
  enemyArray[0].stats[0].base_stat -= pokemonAttack;

  showEnemy();
  enemyAttack();
}

function enemyAttack() {
  let pokemonAlive = pokeballs.filter((pokemon) => pokemon.is_default);
  if (pokemonAlive.length > 0) {
    let damgePokemon = Math.floor(Math.random() * pokemonAlive.length);

    let enemyAttackPokemon = pokemonAlive[damgePokemon];

    enemySuperAttack(enemyAttackPokemon);
  }
}

function enemySuperAttack(enemyAttackPokemon) {
  if (enemyArray[0].stats[0].base_stat > 0) {
    alert(
      `${
        enemyArray[0].name.charAt(0).toUpperCase() + enemyArray[0].name.slice(1)
      } Har valgt og angrip tilbake`
    );
    enemyAttackPokemon.stats[0].base_stat -= enemyArray[0].stats[1].base_stat;

    if ((enemyAttackPokemon = pokeballs[0])) {
      showPokemons();
      if (pokeballs[0].stats[0].base_stat <= 0) {
        showPokemons();
        deadPokemon();
      }
    }
    if ((enemyAttackPokemon = pokeballs[1])) {
      showPokemons();
      if (pokeballs[1].stats[0].base_stat <= 0) {
        showPokemons();
        deadPokemon();
      }
    }
    if ((enemyAttackPokemon = pokeballs[2])) {
      showPokemons();
      if (pokeballs[2].stats[0].base_stat <= 0) {
        showPokemons();
        deadPokemon();
      }
    }
  } else {
    deadPokemon();
  }
}

function deadPokemon() {
  if (pokeballs[0].stats[0].base_stat <= 0 && pokeballs[0].is_default == true) {
    console.log("inne i dead pokemon1");
    let imagePokemon = document.querySelector(".pokemonImage1");
    pokeballs[0].is_default = false;
    styleDeadPokemon(imagePokemon);
    ZeroPokemonLeft();
    return pokeballs;
  }
  if (pokeballs[1].stats[0].base_stat <= 0 && pokeballs[1].is_default == true) {
    console.log("inne i dead pokemon 2");
    let imagePokemon = document.querySelector(".pokemonImage2");
    pokeballs[1].is_default = false;
    styleDeadPokemon(imagePokemon);
    ZeroPokemonLeft();
    return pokeballs;
  }
  if (pokeballs[2].stats[0].base_stat <= 0 && pokeballs[2].is_default == true) {
    console.log("inne i dead pokemon 3");
    let imagePokemon = document.querySelector(".pokemonImage3");
    pokeballs[2].is_default = false;
    styleDeadPokemon(imagePokemon);
    ZeroPokemonLeft();
    return pokeballs;
  }
  if (
    enemyArray[0].stats[0].base_stat <= 0 &&
    enemyArray[0].is_default == true
  ) {
    enemyArray[0].is_default = false;
    console.log(enemyArray[0].is_default, "enemy liv");
    gameOver();
  }
}

function styleDeadPokemon(imagePokemon) {
  imagePokemon.style.width = "70px";
  imagePokemon.style.height = "70px";
  imagePokemon.style.backgroundColor = "black";
  imagePokemon.innerText = "Jeg er utmattet";
  imagePokemon.style.color = "red";
}

function ZeroPokemonLeft() {
  if (
    pokeballs[0].is_default == false &&
    pokeballs[1].is_default == false &&
    pokeballs[2].is_default == false
  ) {
    gameOver();
  }
}

function gameOver() {
  console.log("game over");
  div3 = document.createElement("div");
  h1 = document.createElement("h1");
  div3.style.width = `800px`;
  div3.style.height = `800px`;
  div3.style.backgroundColor = `black`;
  div3.style.borderRadius = `20%`;
  div3.style.position = "absolute";
  div3.style.left = "33%";
  div3.style.top = "25%";
  div3.style.fontSize = "xx-large";
  div3.style.display = "flex";
  div3.style.justifyContent = "center";
  div3.style.alignItems = "center";
  div3.style.textAlign = "center";
  document.body.append(div3);
  div3.append(h1);
  gamePlace.innerHTML = "";

  if (
    pokeballs[0].is_default == false &&
    pokeballs[1].is_default == false &&
    pokeballs[2].is_default == false
  ) {
    h1.textContent = "GAME OVER";
    h1.style.color = "red";
  }
  if (enemyArray[0].is_default == false) {
    h1.textContent = " Gratulerer du har vunnet!!!";
    h1.style.color = "yellow";
  }
}
