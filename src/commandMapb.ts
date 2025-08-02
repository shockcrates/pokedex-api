import type { State } from "./state.js";


export async function commandMapb( state: State): Promise<void>{

    try
    {
        if (!state.previousLocationsURL){
            throw Error("You're on the first page. use map.");
        }
        const locations = await state.pokeApi.fetchLocations(state.previousLocationsURL)
        state.nextLocationsURL = locations.next;
        state.previousLocationsURL = locations.previous;
        for (const location of locations.results){
            console.log(location.name);
        }
    } catch(error) {
        if (error instanceof Error){
            throw error;
        }
    }


}