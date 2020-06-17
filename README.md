# COVIDDrugs-interactive-table

Interactive table for coviddrugs.org

## Notes

- The tables are hosted on GitHub pages and embedded into the Wix website using iframes.

- In order to run the project locally, follow the following steps:

  - Clone the repository:
    - ssh: `git clone git@github.com:ashingtondc/COVIDDrugs-interactive-table.git`
    - https: `git clone https://github.com/ashingtondc/COVIDDrugs-interactive-table.git`
  - Go into the root directory for this repo from the terminal:
    - `cd path/to/<dir_name>`
    - or `cd path/to/COVIDDrugs-interactive-table` (by default if repo dir was not named)
  - Run localhost server: `python3 -m http.server 8000`
  - Visit [localhost:8000](http://localhost:8000/)

- [`main.js`](main.js) consists code to do the following:

  - Logic for pulling in data from google sheets
  - Logic for displaying table
  - Logic for displaying a functioning filters panel. The filters panel controls what columns
    are show and what columns are not. The user can toggle open the filters panel and check or
    uncheck column names to do this.
  - To change the default column width, change the `column.width = x` property in main.js in
    function `displayTable()` or do it when looking the table by moving the dividers.

- [`index.html`](index.html) consists the HTML skeleton for the interactive table and filters panel

- [`stylesheet.css`](stylesheet.css) consists the styling for different DOM elements

- To change permissions for Google Sheets API access, please visit [Developer Console](https://console.developers.google.com/apis/credentials?authuser=1&folder=&organizationId=&project=quickstart-1589347900568). You must be logged into **covid19review** in order to access the console.
  - Change client ID access by clicking on the edit button for the _"OAuth client"_ under OAuth 2.0 Client IDs or click [here](https://console.developers.google.com/apis/credentials/oauthclient/1059571606840-htaveei63vm396kqssjulqbnpfra4mdq.apps.googleusercontent.com?authuser=1&project=quickstart-1589347900568)
  - Change API key access by clicking on the edit button for the _"API key"_ under API keys or click [here](https://console.developers.google.com/apis/credentials/key/352f626b-f719-47cd-bfb0-57c57560e0f8?authuser=1&project=quickstart-1589347900568)
