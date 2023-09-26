import { initTabs } from "./tabs.js";
import * as result from "./results.js";
import * as member from "./members.js";

window.addEventListener("load", initApp);
let results = [];
let members = [];
async function initApp() {
  initTabs();
  await getResults();
  // TODO: Make the rest of the program ...
}
async function getResults() {
  const response = await fetch("./results.json");
  const resultJson = await response.json();
  for (const resultData of resultJson) {
    const constructedResult = result.construct(resultData);
    results.push(constructedResult);
  }
}
