import { initTabs } from "./tabs.js";
import * as result from "./results.js";
import * as member from "./members.js";

window.addEventListener("load", initApp);
let results = [];
let members = [];
async function initApp() {
  initTabs();
  await getResults();
  displayResults(results);
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
function displayResults(results) {
  const resultTable = document.querySelector("#resultTableBody");
  resultTable.innerHTML = "";
  results.sort((a, b) => a.time - b.time);
  for (const result of results) {
    const resultTableHTML = /*html*/ `
   <tr>
   <td>${result.date}</td>
   <td>${result.id}</td>
   <td>${result.discipline}</td>
   <td>${result.resultType}</td>
   <td>${result.originalTime}</td>
   </tr>
    `;
    resultTable.insertAdjacentHTML("beforeend", resultTableHTML);
  }
}
