import {createInterface, type Interface } from "readline";
import readline from "node:readline";
import {getCommands} from "./command.js";
import { PokeApi , Pokemon} from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, args: string[]) => Promise<void>;
}

export type State = {
    replInterface: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeApi;
    nextLocationsURL?: string;
    previousLocationsURL?: string;
    pokedex: Record<string, Pokemon>
}

export function initState(): State {
    let replInterface = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
        prompt : "Pokedex > "
    });
    const commands = getCommands();
    const pokeApi = new PokeApi();

    return {replInterface: replInterface, commands: commands, pokeApi: pokeApi, pokedex: {}};
}