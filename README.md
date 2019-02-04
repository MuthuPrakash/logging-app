# wedding wire web app to handle logs
---
first, you should install node and npm.

1. Install npm - to install the dependencies
    `npm install`

2. start server  
    `npm start`

3. open browser: [http://localhost:7777](http://localhost:7777)
----

Technology Stack:
----------------
npm
node js - server-side scripts
react js - front end framework
loki js - database
mui-datatables - interactive table structure which is part of npm package

Functionality:
-------------
1. The browser will be having a `file upload` control and an `upload` button
      a. Select the log file which should be parsed and click the upload button
      b. This will parse the log file and store it in lokijs database (javascript based in-memory database) and will display in the below table with the following fields
                1. `ID` - Auto incremented value to help us sort/filter
                2. `UUID` - Log UUID parsed from log file
                3. `Status` - Log status parsed from log file
                4. `Description` - Log Description parsed from log file. The logic is now made as a split of status and uuid in the log and the portion is considered as Description. This logic can be detailed out for different status/log type for the production development.
                5. `Date` - Logging the current date in the database to help us identify the creation of the log which will help in sorting/filtering.
2. The table is an interactive table with functionalities as follows,
      a. Search - The keyword search in the search box works as it filters among all columns as the keywords gets typed.
      b. Download as csv - The logs from the table can be downloaded as csv for reporting purposes
      c. Print - Print option allows us to print the datatable.
      d. View Columns - The user/admin have the ability to show/hide the columns.
      e. Filter Table - The filter option is provided for status and date columns. This is customizable based on business needs.
3. Once the app is launched, the web browser window acts as the interactive UI for the ruby on rails admin (as per our use case) to view/interact with the log data. 
4. lokijs is preferred as the database since the use case is to have the code and the data stores self-contained. The web browser should not be refreshed since the browser window is considered as a full stack application with the file upload control and upload button as the first part to store the logs in database and the second part is the interactive table and the backend logic to retrieve the data from database and display in the front-end stack.
      a. For Production development, a relational database in the on-prem/cloud will be considered like Postgresql/SQL Server/any no sql database such as AWS dynamo db/similar based on the organization's existing datastores/applications.
      b. For Production development, this will be segregated into two different applications (combined as one application since our use case is to have the data and code self-contained) and reading the log file logic can be scheduled as scheduler job with the web front end application hosted in a separated server.

