import { CLICommand, type State } from "./state.js";

export async function commandHelp(state: State):Promise<void> {
    console.log("Usage:");
    for (const command in state.commands){
        console.log(`${command}: ${state.commands[command].description}`);
    }
}