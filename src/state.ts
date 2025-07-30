import {createInterface, type Interface } from "readline";
import readline from "node:readline";
import {getCommands} from "./command.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
    replInterface: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    let replInterface = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
        prompt : "Welcome to the Pokedex!\n"
    });
    const commands = getCommands();

    return {replInterface: replInterface, commands: commands};
}