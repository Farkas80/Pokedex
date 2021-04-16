/*const fetchPokemon = () => {
    This solution is fast enough but it has its disadvantage. Asynch used in a for loop is a bad practice
    because one for loop has to be finished before js can execute for example the next for loop.
    for (let i = 1; i <=150; i++) { 
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);

            pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', ')
            };
            console.log(pokemon);
        });
    };
};

fetchPokemon();
*/
// It is better to queue things up and run paralel not sequentially. 
const pokedex = document.getElementById('pokedex');
const fetchPokemon = () => {

    //create an empty array of promises
    const promises = [];
    for (let i=1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        /*pushing a new promise in the array*/
        promises.push(fetch(url).then(res => res.json()));
    };

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        displayPokemon(pokemon);
    });

};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map( pokeman => 
        `<li>
            <img src="${pokeman.image}">
            <h2>${pokeman.id}. ${pokeman.name}</h2>
            <p>Type: ${pokeman.type}</p>
        </li>`)
    pokedex.innerHTML = pokemonHTMLString;    
    };

fetchPokemon();
