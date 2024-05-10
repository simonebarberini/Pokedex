const pokemonCardContainer = document.getElementById("pokemonCard");
const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");

const getPokemonName = () => {
    return searchBar.value;
}

const printPokemonCard = () => {
    pokemonCardContainer.style.visibility = "hidden";
    let pokemonName = getPokemonName();
    pokemonCardContainer.innerHTML = "";
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((pokemon) => {
        const pokemonCard = document.createElement("div");
        pokemonCard.innerHTML =`
            <div class="name">
                ${pokemon.name}
            </div>
            <div class="image">
                <img src = "${pokemon.sprites.other['official-artwork'].front_default}">
            </div>
            <div class="type">
                <h3>Pokemon Type: ${pokemon.types['0'].type.name}</h3>
            </div>
        `;
        pokemonCardContainer.appendChild(pokemonCard);
        pokemonCardContainer.style.visibility = "visible";
    })
    .catch((error) => console.error("Errore: ", error));
}

searchButton.addEventListener("click", printPokemonCard);
