import type { State } from "./state.js";
import type { Location,} from "./pokeapi.js";

export async function commandExplore(state: State, args: string[]): Promise<void>{
    const userLocation: string = args[0];

    const data : Location = await state.pokeApi.fetchLocation(userLocation);

    data.pokemon_encounters.forEach((encounter) => {
        console.log(encounter.pokemon.name)
    });
}