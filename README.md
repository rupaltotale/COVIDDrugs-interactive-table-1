# COVIDDrugs-interactive-table

Interactive tables for coviddrugs.org

## Notes

- The tables are hosted on GitHub pages and embedded into the Wix website using iframes.
- The code for pulling in data from the Google Sheets using the sheets API is located in `sheets.js`.
- To change permissions for Google Sheets API access, please visit [Developer Console](https://console.developers.google.com/apis/credentials?authuser=1&folder=&organizationId=&project=quickstart-1589347900568). You must be logged into **covid19review** in order to access the console.
  - Change client ID access by clicking on the edit button for the *"OAuth client"* under OAuth 2.0 Client IDs or click [here](https://console.developers.google.com/apis/credentials/oauthclient/1059571606840-htaveei63vm396kqssjulqbnpfra4mdq.apps.googleusercontent.com?authuser=1&project=quickstart-1589347900568)
  - Change API key access by clicking on the edit button for the *"API key"* under API keys or click [here](https://console.developers.google.com/apis/credentials/key/352f626b-f719-47cd-bfb0-57c57560e0f8?authuser=1&project=quickstart-1589347900568)
