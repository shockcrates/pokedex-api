import { CLICommand, type State } from "./state.js";

export function commandHelp(state: State){
    console.log("Usage:");
    for (const command in state.commands){
        console.log(`${command}: ${state.commands[command].description}`);
    }
}