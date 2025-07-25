function fetchGradeData() {
  console.log("Fetching grade data...");
  let xhr = new XMLHttpRequest();
  let apiRoute = "/api/grades";
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status !== 200) {
        console.error(`Could not get grades. Status: ${xhr.status}`);
        return;
      }
      let data = JSON.parse(xhr.responseText);
      populateGradebook(data);
    }
  };
  xhr.open("GET", apiRoute, true);
  xhr.send();
}

function populateGradebook(data) {
  console.log("Populating gradebook with data:", data);
  let tableElm = document.querySelector("#gradebook tbody");
  
  data.forEach(function (assignment) {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = `${assignment.last_name}, ${assignment.first_name}`;
    row.appendChild(nameCell);

    let gradeCell = document.createElement("td");
    gradeCell.textContent = assignment.total_grade;
    row.appendChild(gradeCell);

    tableElm.appendChild(row);
  });
}

fetchGradeData();
