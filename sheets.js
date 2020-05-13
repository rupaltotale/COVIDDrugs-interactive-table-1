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
        display(tabledata);
      },
      function (response) {
        console.log("Error: " + response.result.error.message);
      }
    );
}

function display(data) {
  let loader = document.getElementById("circle");
  if (loader !== null) loader.remove();
  //create Tabulator on DOM element with id "table"
  let table = new Tabulator("#table", {
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
}
