const pokemonCardContainer = document.getElementById("pokemonCard");
const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");
const loading = document.getElementById("loading");

const typeColors = {
    normal: "linear-gradient(to right, #a8a77a, #c6c6a7)",
    fire: "linear-gradient(to right, #ee8130, #f5ac78)",
    water: "linear-gradient(to right, #6390f0, #9db7f5)",
    electric: "linear-gradient(to right, #f7d02c, #fbe273)",
    grass: "linear-gradient(to right, #7ac74c, #abce82)",
    ice: "linear-gradient(to right, #96d9d6, #c2f1f1)",
    fighting: "linear-gradient(to right, #c22e28, #e77e75)",
    poison: "linear-gradient(to right, #a33ea1, #c183c1)",
    ground: "linear-gradient(to right, #e2bf65, #ecd69e)",
    flying: "linear-gradient(to right, #a98ff3, #d6b1f0)",
    psychic: "linear-gradient(to right, #f95587, #fc91ac)",
    bug: "linear-gradient(to right, #a6b91a, #c6d16e)",
    rock: "linear-gradient(to right, #b6a136, #d4c27c)",
    ghost: "linear-gradient(to right, #735797, #a292bc)",
    dragon: "linear-gradient(to right, #6f35fc, #b09eff)",
    dark: "linear-gradient(to right, #705746, #a29288)",
    steel: "linear-gradient(to right, #b7b7ce, #d4d4e2)",
    fairy: "linear-gradient(to right, #d685ad, #eebbc9)"
};
    
const getPokemonName = () => {
    let name = searchBar.value;
    return name.toLowerCase();
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
            setTimeout(() => {
                const pokemonType = pokemon.types['0'].type.name;
                let backgroundColorCard = typeColors[pokemonType];
                pokemonCardContainer.style.backgroundImage = backgroundColorCard;
                const pokemonCard = document.createElement("div");
                pokemonCard.innerHTML = `
            <div class="name">
                ${pokemon.name}
            </div>
            <div class="image">
                <img src = "${pokemon.sprites.other['official-artwork'].front_default}">
            </div>
            <div class="type">
                <h3>Pokemon Type: ${pokemon.types['0'].type.name}</h3>
                <h4>Move: ${pokemon.moves['0'].move.name}</h4>
                <h4>Height: ${pokemon.height} dm</h4>
                <h4>Weight: ${pokemon.weight} hg</h4>
            </div>`;
                pokemonCardContainer.appendChild(pokemonCard);
                hiddenImageLoading();
                pokemonCardContainer.style.visibility = "visible";
            }, 1500);
        })
        .catch((error) => {
            console.error("Errore: ", error);
            alert("Pokemon non trovato!");
        })
}

searchButton.addEventListener("click", printPokemonCard);
