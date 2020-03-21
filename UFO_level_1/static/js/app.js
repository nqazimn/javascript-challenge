// from data.js
var alienSightingData = data;

// Select the HTML element which contains the table
var tbody = d3.select("tbody");

// Function definitions
function appendRowsToTable(dataSet) {
    // Appends rows from dataSet to "tbody" of the table    
    dataSet.forEach(sighting => {
        // Add a row for each alien sighting available in the dataset
        var row = tbody.append("tr");

        // For each sighting, append cells (datetime|City|State|Country|Shape|Duration|Comments)
        // and populate the table
        Object.entries(sighting).forEach(function ([key, value]) {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

function clearTable() {
    // Clear table 
    var table = document.getElementById("ufo-table");

    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function filterTableOnDate(alienData) {
    return alienData.datetime === document.getElementById("datetime").value;
}
// var inputField = d3.select("#datetime");

function handleClick() {
    // If button is pressed, get the data entered in the input field
    // and clear the already shown table to append filtered rows in the 
    // table

    var userDate = document.getElementById("datetime").value;

    var filteredDataSet = alienSightingData.filter(filterTableOnDate);

    // If there are values in returned filteredDataSet then update
    // table, else show and alert do not do anything.
    if (filteredDataSet.length > 0) {
        clearTable();
        appendRowsToTable(filteredDataSet);
    }
    else {
        alert(`Data for "${userDate}" does not exist.`);
    }

}

// Show all available data when the page loads/reloads
appendRowsToTable(alienSightingData);

// upon clicking the button, filter the table on entered data
var dateEntryButton = d3.select("#filter-btn");
dateEntryButton.on("click", handleClick);

