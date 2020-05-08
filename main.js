// let xhr = new XMLHttpRequest();
// let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRB8GpRwi3-e3VjPx8z3IXRRf6O6Z2lfhIWF9OfmH1VeD-QAALEJOlCLrreqCYmqxwfn3wWpBrZNM8l/pub?gid=0&single=true&output=csv";
// xhr.open("GET", url);
// xhr.responseType = "text";

// xhr.onload = function () {
//     convert(this.responseText);
// };

// xhr.send();

let url  ='https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRB8GpRwi3-e3VjPx8z3IXRRf6O6Z2lfhIWF9OfmH1VeD-QAALEJOlCLrreqCYmqxwfn3wWpBrZNM8l/pub?gid=0&single=true&output=csv';

fetch(url)
  .then(response => response.text())
  .then(data => convert(data));

function convert(data)
{
    let json = Papa.parse(data, {header: true});
    console.log(json.data);
    display(json.data);
}

function display(json)
{
    //create Tabulator on DOM element with id "table"
    let table = new Tabulator("#table", {
        height:720,
        data:json, //assign data to table
        autoColumns:true,
    });

    // Add header filter to all columns
    let columns = table.getColumnDefinitions();

    columns.forEach(column => {
        column.headerFilter = true;
        column.tooltip = true;
        if(column.title == "Title")
        {
            column.width = 200;
            column.frozen = true;
        }
    });

    table.setColumns(columns);
}