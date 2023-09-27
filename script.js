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
   <td>${checkResultType(result)}</td>
   <td>${result.originalTime}</td>
   </tr>
    `;
    resultTable.insertAdjacentHTML("beforeend", resultTableHTML);
  }
}
function checkResultType(result) {
  let HTML;
  if (result.isTraining() === true) {
    HTML = /*html*/ `Træning`;
    return HTML;
  } else if (result.isCompetition() === true) {
    HTML = /*html*/ `Konkurrence`;
    return HTML;
  }
}

function displayMembers() {
  const memberTable = document.querySelector("#memberTableBody");
  memberTable.innerHTML = "";
  for (const member of members) {
    const memberTableHTML = /*html*/ `
    <tr>
    <td>${member.name}</td>
    <td>${checkMemberStatus(member)}</td>
    <td>${member.birthday}</td>
    <td>${member.age()}</td>
    <td>${checkMemberAgeGroup(member)}</td>
    </tr>
    `;
    memberTable.insertAdjacentHTML("beforeend", memberTableHTML);
  }
}
function checkMemberAgeGroup(member) {
  let HTML;
  if (member.isJunior() === true) {
    HTML = /*html*/ `Junior`;
    return HTML;
  } else {
    HTML = /*html*/ `Senior`;
    return HTML;
  }
}
function checkMemberStatus(member) {
  let HTML;
  if (member.active === true) {
    HTML = /*html*/ `Aktiv`;
    return HTML;
  } else {
    HTML = /*html*/ `Inaktiv`;
    return HTML;
  }
}
// Match results with members: const member = members.find((member) => member.id == result.memberId);
//     result.member = member;
