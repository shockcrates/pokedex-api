import { State } from './state.js';

export async function commandInspect(state: State, args: string[]){
    const pokemonName = args[0];

    if (pokemonName in state.pokedex){
        const pokemon = state.pokedex[pokemonName];
        const pokemonString:string = `
        Name: ${pokemon.name}
        Height: ${pokemon.height}
        Weight: ${pokemon.weight}
        Stats:`
        console.log(pokemonString);
    }
    else{
        console.log("You have not caught that pokemon yet!");
    }
}

export async function commandPokedex(state: State, args: string[]){
    console.log("Currently in Pokedex: ");
    for (const poke in state.pokedex){
        console.log(` - ${poke}`);
    }
}