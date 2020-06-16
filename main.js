// Client ID and API key from the Developer Console
// These are required for authorized access to the sheets
var CLIENT_ID =
  "1059571606840-htaveei63vm396kqssjulqbnpfra4mdq.apps.googleusercontent.com";
var API_KEY = "AIzaSyCGu3QtIgRJToMlFsAZtxBEH6Wr4MMwW2o";

// Array of API discovery doc URLs for APIs
var DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

window.onload = function () {
  handleClientLoad();
  initializeFiltersPanel();
};
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and fetches data from the sheets
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
        // Once Google api client has been initialized, get the data from the sheets
        getDataFromSheet();
      },
      function (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    );
}

/** Main logic for pulling data from the Google sheets.
 * Tranforms data received from response and passes it tp `displayTable`
 * The code above should, for the most part, remain the same. */

function getDataFromSheet() {
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: "1b9KlXzCvHUIklH7BmXizaMXwkbf_SJO6QSq7CgyVjdg",
      // Sheet name: "main"
      range: "main",
    })
    .then(
      function (response) {
        var range = response.result;
        columns = range.values[0];
        // Transform the data from the response to JSON format to populate table
        tabledata = range.values.splice(1).map((row) => {
          data = {};
          for (var i = 0; i < row.length; i++) {
            data[columns[i]] = row[i];
          }
          return data;
        });
        displayTable(tabledata).then((tableData) =>
          populateCheckBoxes(tableData)
        );
      },
      function (response) {
        console.log("Error: " + response.result.error.message);
      }
    );
}

let table;
let populated = false;

function displayTable(data) {
  let loader = document.getElementById("circle");
  let filterbut = document.getElementById("showFilters");
  if (filterbut !== null) filterbut.style.display = "block";
  if (loader !== null) loader.remove();
  //create Tabulator on DOM element with id "table"
  table = new Tabulator("#table", {
    height: window.innerHeight - 80,
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

/** populates filter panel with column names and check boxes */
function populateCheckBoxes(table) {
  if (!populated) {
    populated = true;
    let columns = table.getColumnDefinitions();
    columns.forEach((column) => {
      addCheckBox(column.title);
    });
  }
}

/** Helper function for `populateCheckBoxes()` which
 * adds column name label + check box to the left */
function addCheckBox(columnName) {
  let filters = document.getElementById("colFilters");
  let box = document.createElement("input");
  box.checked = true;
  box.setAttribute("type", "checkbox");
  box.setAttribute("class", "colCheck");
  box.setAttribute("value", columnName);
  let li = document.createElement("li");
  let label = document.createElement("label");
  label.append(box);
  label.append(document.createTextNode(columnName));
  li.append(label);
  filters.append(li);
}

/**  Applies filters based on columns checked/unchecked in the filters panel */
function applyFilters() {
  let boxes = document.getElementsByClassName("colCheck");
  for (i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let val = box.value;
    if (box.checked) {
      table.showColumn(val);
    } else {
      table.hideColumn(val);
    }
  }
}

/**  Uncheck (deselect) all column options */
function uncheckAll() {
  let boxes = document.getElementsByClassName("colCheck");
  for (i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.checked = false;
  }
}

/** Check (select) all column options */
function checkAll() {
  let boxes = document.getElementsByClassName("colCheck");
  for (i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.checked = true;
  }
}

/** Adds event listener to the filter accordion
 * which controls display state of filters panel * */
function initializeFiltersPanel() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
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
}
