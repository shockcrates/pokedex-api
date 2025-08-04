import * as readline from "node:readline";
import * as repl from "node:repl";
import {getCommands} from "./command.js";
import { type State } from "./state.js";


export function cleanInput(input: string): string[]{
  return input.trim().toLowerCase().split(" ").filter((item: string) => item !== "");
}


export function startREPL(state: State) {

  state.replInterface.prompt();
  state.replInterface.on("line", async (input)=> {
    if (input.length === 0) {
      state.replInterface.prompt()
      return;
    }
    let words: string[] = cleanInput(input);
    if (words[0] in state.commands){
      try {
        const [userCommand, ...args] = words;
        await state.commands[words[0]].callback(state, args)
      }
      catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
        console.log(e);
      }
    }
    else{
      console.log("Unknown command");
    }

    state.replInterface.prompt();
  })
}