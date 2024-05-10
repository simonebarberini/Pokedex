const pokemonCardContainer = document.getElementById("pokemonCard");
const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");
const loading = document.getElementById("loading");

const getPokemonName = () => {
    return searchBar.value;
}

const showImageLoading = () => {
    loading.style.display = "block";
}
const hiddenImageLoading = () => {
    loading.style.display = "none";
}

const printPokemonCard = () => {
    pokemonCardContainer.style.visibility = "hidden";
    showImageLoading();
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
        setTimeout(hiddenImageLoading(), 5000);
        pokemonCardContainer.style.visibility = "visible";
    })
    .catch((error) => {
        console.error("Errore: ", error);
        alert("Pokemon non trovato!");
    })
}

searchButton.addEventListener("click", printPokemonCard);
