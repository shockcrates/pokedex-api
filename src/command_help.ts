import type { CLICommand } from "./command.js";

export function commandHelp(commands : Record<string, CLICommand>){
    console.log("Usage:");
    for (const command in commands){
        console.log(`${command}: ${commands[command].description}`);
    }
}