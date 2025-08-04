import { State } from "./state.js";

export async function commandCatch(state: State, args:string[]): Promise<void>{
    const pokemonName:string = args[0];
    const pokemonData = await state.pokeApi.fetchPokemon(pokemonName);

    if (state.pokedex[pokemonName] !== undefined){
        console.log(`You've already caught ${pokemonName}` );
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`)
    const chance:number = Math.random();

    if (chance > 0.5){
        console.log("Success!")
        state.pokedex[pokemonName] = pokemonData;
        console.log(`Its height is ${state.pokedex[pokemonName].height}!`)
    }
    else{
        console.log(`Failed to catch ${pokemonName}.`)
    }
}