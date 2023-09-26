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
  await getMembers();
  displayMembers();
}
async function getResults() {
  const response = await fetch("./results.json");
  const resultsJSON = await response.json();
  for (const resultData of resultsJSON) {
    const constructedResult = result.construct(resultData);
    results.push(constructedResult);
  }
}
async function getMembers() {
  const response = await fetch("./members.json");
  const membersJSON = await response.json();
  for (const memberData of membersJSON) {
    const constructedMember = member.constructMember(memberData);
    members.push(constructedMember);
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
function displayMembers() {
  const memberTable = document.querySelector("#memberTableBody");
  memberTable.innerHTML = "";
  for (const member of members) {
    const memberTableHTML = /*html*/ `
    <tr>
    <td>${member.name}</td>
    <td>${member.active}</td>
    <td>${member.birthday}</td>
    <td>Alder</td>
    <td>Aldersgruppe</td>
    </tr>
    `;
    memberTable.insertAdjacentHTML("beforeend", memberTableHTML);
  }
}
// Match results with members: const member = members.find((member) => member.id == result.memberId);
//     result.member = member;
