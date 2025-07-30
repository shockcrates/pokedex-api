import { startREPL } from "./repl.js"
import { initState, type State} from "./state.js";

function main() {
  let state = initState();
  startREPL(state);
}

main();
