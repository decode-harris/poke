/*
    POKEMON API 

=== API CONFIGURATION ===
 const options = {
     protocol: 'https',
     hostName: 'localhost:443',
     versionPath: 'api/v2/',
     cache: true,
     timeout: 5 * 1000 // 5 seconds
};
=== API CONFIGURATION ===

*/

// root element selector
const root = document.querySelector('#root');

// limit pokemon list to 150 [ original series]
const pokemon_number_limit = 150;

// pokemon type / color array
const pokemon_type_color = {
    bug: '#A8B820',
    dragon: '#7038F8',
    electric: '#F8D030',
    fairy: '#F0B6BC',
    fighting: '#C03028',
    fire: '#F08030',
    flying: '#A890F0',
    grass: '#78C850',
    ghost: '#705898',
    ground: '#E0C068',
    ice: '#98D8D8',
    normal: '#A8A878',
    poison: '#A040A0',
    psychic: '#F85888',
    rock: '#B8A038',
    water: '#6890F0'
};

// obtain the keys for the [ pokemon type color ] array
const main_types = Object.keys(pokemon_type_color);

// set a fetch condition for async function to obtain only first 150 pokemon
const fetchPokemon = async ()=> {

    // loop through pokemon number limit and stop at 150 items
    for (let i = 1; i <= pokemon_number_limit; i++) {
        await getPokemon(i);
    }
}

// async function [ get pokemon ]
const getPokemon = async id => {
    // connect to the pokeAPI
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    
    // init [ pokemon card ] function
    pokemonCard(pokemon);
}

/* 
    function : [ pokemon card ]  
        - creates a html section element to house pokeapi info  
        - constructs a ul element containing pokemon details
        - li elements house main details of current pokemon card
*/
const pokemonCard = (pokemon)=> {
    
    // pokemon card [ create a section component for data placement ]
    const card = document.createElement('section');
    // pokemon card attributes
    card.setAttribute('class', 'card');

    // pokemon name [ alter pokemon names to capital letter for starting letter ]
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    // map through pokemon types array
    const pokemonType = pokemon.types.map(el => el.type.name);
    // find & remove pokemon types array[ item 2 ]
    const type = main_types.find(type => pokemonType.indexOf(type) > - 1);
    
    // pokemon details [ create image, pokemon reference number, name & type ]
    const pokemonDetails = `
        <img class="img" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id + '.png'}">

        <ul class="details">
            <li>
                <p class="pokemonNumber">
                    #${pokemon.id.toString().padStart(3, '0')}
                </p>
            </li>
            <li>
                <h2 class="pokemonName">
                    ${name}
                </h2>
            </li>
            <li>
                <p class="pokemonType">
                    Type : ${type}
                </p>
            </li>
        </ul>
        `;

    // append pokemon details to pokemon card element via inner html
    card.innerHTML = pokemonDetails;
    
    // assigns color to pokemon type color array and gets type : color
    const color = pokemon_type_color[type];
    
    // assign color value to background of card component
    card.style.background = color;
    
    // append pokemon card element to root html element
    root.appendChild(card)

}

// init [ fetch pokemon ] async function
fetchPokemon();