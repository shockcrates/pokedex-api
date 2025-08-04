import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from  "./state.js"
import { commandMap} from "./commandMap.js";
import { commandMapb } from "./commandMapb.js";
import { commandExplore } from "./commandExplore.js";
import { commandCatch} from "./commandCatch.js";
import { commandInspect, commandPokedex} from "./commandInspect.js";

export function getCommands(): Record<string, CLICommand>{
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        map:{
            name: "map",
            description: "Display the next 20 location areas in the Pokemon World.",
            callback: commandMap
        },
        mapb:{
            name: "mapb",
            description: "Display the previous 20 location areas in the Pokemon World.",
            callback: commandMapb
        },
        explore:{
            name: "explore",
            description: "Give detailed information about a location",
            callback: commandExplore
        },
        catch:{
            name: "catch",
            description: "Attempt to catch a pokemon. Successful attempts will give you more info on a pokemon.",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Give info on pokemon you have caught",
            callback: commandInspect
        },
        pokedex:{
            name: "pokedex",
            description: "List the pokemon in your pokedex.",
            callback: commandPokedex
        }
    }
}