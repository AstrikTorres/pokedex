const pokemonHtml = document.getElementById("pokemon");
const movesHtml = document.getElementById("infoSearch");

const fetchPokeApi = () => {
    const namePokemon = document.getElementById("namePokemon");
    fetch("https://pokeapi.co/api/v2/pokemon/" + namePokemon.value.toLowerCase())
        .then(response => response.json())
        .then((data) => {
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const type = data.types[0].type.name;
            const stats = data.stats;
            const moves = data.moves.slice(0, 3);
            const image = data.sprites.front_default;
            let pokemonInfo = `
                <h1 class="name">${name}</h1>
                <div>
                    <span>Type:</span>
                    <p class="${type}">${type}</p>
                </div>
                <img class="image" src="${image}"/>
                <ul class="stats">
            `;
            stats.map(stat => {
                pokemonInfo += `<li><span>${stat.stat.name}</span> ${stat.base_stat}</li>`
            })
            pokemonInfo += "</ul>";
            pokemonHtml.innerHTML = pokemonInfo;

            let printMoves = "</ul>";
            moves.map(move => {
                printMoves += `
                    <li>${move.move.name}</li>
                `
            })
            printMoves += "</ul>";

            movesHtml.innerHTML = printMoves;
        });
}

window.onload = () => {
    const namePokemon = document.getElementById("namePokemon");
    namePokemon.value = 'pikachu';
    fetchPokeApi();
}