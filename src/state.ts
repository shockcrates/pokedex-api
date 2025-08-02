import {createInterface, type Interface } from "readline";
import readline from "node:readline";
import {getCommands} from "./command.js";
import { PokeApi } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export type State = {
    replInterface: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeApi;
    nextLocationsURL?: string;
    previousLocationsURL?: string;

}

export function initState(): State {
    let replInterface = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
        prompt : "Welcome to the Pokedex!\n"
    });
    const commands = getCommands();
    var pokeApi = new PokeApi();

    return {replInterface: replInterface, commands: commands, pokeApi: pokeApi};
}