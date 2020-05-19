// Client ID and API key from the Developer Console
var CLIENT_ID =
  "1059571606840-htaveei63vm396kqssjulqbnpfra4mdq.apps.googleusercontent.com";
var API_KEY = "AIzaSyCGu3QtIgRJToMlFsAZtxBEH6Wr4MMwW2o";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
window.onload = function () {
  handleClientLoad();
};
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        // Handle the initial sign-in state.
        getDataFromSheet();
        //   authorizeButton.onclick = handleAuthClick;
        //   signoutButton.onclick = handleSignoutClick;
      },
      function (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    );
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function getDataFromSheet() {
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: "1b9KlXzCvHUIklH7BmXizaMXwkbf_SJO6QSq7CgyVjdg",
      range: "main",
    })
    .then(
      function (response) {
        var range = response.result;
        columnNames = [];
        columns = range.values[0];
        tabledata = range.values.splice(1).map((row) => {
          data = {};
          for (var i = 0; i < row.length; i++) {
            data[columns[i]] = row[i];
          }
          return data;
        });
        display(tabledata).then(result => populateCheckBoxes(result));
      },
      function (response) {
        console.log("Error: " + response.result.error.message);
      }
    );
}
let table;
let populated = false;
let columnNames = [];
function display(data) {
  let loader = document.getElementById("circle");
  if (loader !== null) loader.remove();
  //create Tabulator on DOM element with id "table"
  table = new Tabulator("#table", {
    // height: window.innerHeight - 20,
    height: "100%",
    data: data, //assign data to table
    autoColumns: true,
  });

  // Add header filter to all columns
  let columns = table.getColumnDefinitions();
  columns.forEach((column) => {
    column.headerFilter = true;
    column.tooltip = true;
    column.width = "10%";
    if (column.title == "Title") {
      column.frozen = true;
    }
  });
  table.setColumns(columns);
  return Promise.resolve(table);
}

function populateCheckBoxes(table)
{
  if(!populated)
  {
    populated = true;
    let columns = table.getColumnDefinitions();
    columns.forEach((column) => {
      addCheckBox(column.title);
    });
  }
}

function addCheckBox(name)
{
  let filters = document.getElementById("filters");
  let box = document.createElement("input");
  box.checked = true;
  box.setAttribute("type", "checkbox");
  box.setAttribute("class", "colCheck");
  box.setAttribute("value", name);
  let li = document.createElement("li");
  let label = document.createElement("label");
  label.append(box);
  label.append(document.createTextNode(name));
  li.append(label);
  filters.append(li);
  console.log("called");
}

function refresh()
{
  console.log("called refresh");
  let boxes = document.getElementsByClassName("colCheck");
  console.log(boxes);
  for(i = 0; i < boxes.length; i++){
    let box = boxes[i];
    let val = box.value;
    if(box.checked)
    {
      table.showColumn(val);
    }else{
      table.hideColumn(val);
    }
  }
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}