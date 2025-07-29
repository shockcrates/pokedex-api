import * as readline from "node:readline";
import * as repl from "node:repl";
import {getCommands} from "./command.js";


export function cleanInput(input: string): string[]{
  return input.trim().toLowerCase().split(" ").filter((item: string) => item !== "");
}


export function startREPL() {
  let replInterface = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : "Welcome to the Pokedex!\n"
  });
  const commands = getCommands();

  replInterface.prompt();
  replInterface.on("line", (input)=> {
    if (input.length === 0) {
      replInterface.prompt()
      return;
    }
    let words = cleanInput(input);
    if (words[0] in commands){
      try {
        commands[words[0]].callback(commands)
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

    replInterface.prompt();
  })
}