const pokeList = document.getElementById('pokemons');
const loadMoreButton = document.getElementById('load-more')

let maxRecords = 151;
let offset = 0;
const limit = 5

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then( (pokemons = []) => pokeList.innerHTML += pokemons.map( pokemon => `
        <li class="poke-list__item ${pokemon.types[0]}">
            <span class="number">
                ${
                pokemon.number <= 9
                    ? `#00${pokemon.number}`
                    : pokemon.number > 9 && pokemon.number <= 99
                    ? `#0${pokemon.number}`
                    : `#${pokemon.number}`
                }
            </span>
            <a href="#" class="link" id="modal">
                <h2>${pokemon.name}</h2>
                <ul class="poke-type">
                    ${pokemon.types.map( type => `<li class="poke-type__item ${type}">${type}</li>`).join('')}
                </ul>
            </a>
            <img class="img" src=${pokemon.photo} alt=${pokemon.name}>
        </li>
    `).join(''));
};

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsNextPage = offset + limit;

    if(qtdRecordsNextPage >= maxRecords){
        const nextLimit = maxRecords - offset;
        loadPokemonItems(offset, nextLimit);

        loadMoreButton.remove();
    } else {
        loadPokemonItems(offset, limit);
    }
})