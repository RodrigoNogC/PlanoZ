const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const cardContainer = document.getElementById("card-container");
const btn = document.getElementById("btn");
const searchInput = document.getElementById("search-input");

let getRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 150) + 1;
    const response = await fetch(`${url}${randomId}`);
    const data = await response.json();
    
    generateCard(data);
  } catch (error) {
    console.error("Erro ao buscar dados do Pokémon:", error);
  }
};

let searchPokemon = async () => {
  cardContainer.innerHTML = '';

  const searchTerm = searchInput.value.toLowerCase().trim();
  
  try {
    const response = await fetch(`${url}${searchTerm}`);
    const data = await response.json();
    
    generateCard(data);
  } catch (error) {
    console.error("Erro ao buscar dados do Pokémon:", error);
    displayErrorCard();
  }
};

let generateCard = (data) => {
  const hp = data.stats.find((stat) => stat.stat.name === "hp").base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats.find((stat) => stat.stat.name === "attack").base_stat;
  const statDefense = data.stats.find((stat) => stat.stat.name === "defense").base_stat;
  const statSpeed = data.stats.find((stat) => stat.stat.name === "speed").base_stat;
  const themeColor = typeColor[data.types[0].type.name];

  let card = createCardElement(pokeName, imgSrc, hp, statAttack, statDefense, statSpeed, themeColor, data.types);
  cardContainer.appendChild(card);
};

let createCardElement = (name, imgSrc, hp, attack, defense, speed, color, types) => {
  let card = document.createElement("div");
  card.className = "poke-card";
  card.innerHTML = `
    <p class="hp"><span>HP</span>${hp}</p>
    <img class="pokemon" s src="${imgSrc}" />
    <h2 class="poke-name">${name}</h2>
    <div class="types">
      ${types.map(type => `<span style="background-color: ${typeColor[type.type.name]}">${type.type.name}</span>`).join('')}
    </div>
    <div class="stats">
      <div><h3>${attack}</h3><p>Ataque</p></div>
      <div><h3>${defense}</h3><p>Defesa</p></div>
      <div><h3>${speed}</h3><p>Velocidade</p></div>
    </div>
  `;
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  return card;
};

let displayErrorCard = () => {
  let errorCard = document.createElement("div");
  errorCard.className = "poke-card";
  errorCard.innerHTML = `<h2 class="poke-name">Pokemon não encontrado!</h2>`;
  cardContainer.appendChild(errorCard);
};

getRandomPokemon();

btn.addEventListener("click", searchPokemon);

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});
