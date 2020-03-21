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

function filterTableOnMultiple(alienData) {
    var userDate = document.getElementById("datetime").value;
    var userState = document.getElementById("state").value;
    var userCountry = document.getElementById("country").value;
    var userShape = document.getElementById("shape").value;

    if (userDate != "" && userState != "" && userCountry != "" && userShape != "") {
        return alienData.datetime === userDate &&
            alienData.state === userState &&
            alienData.country === userCountry &&
            alienData.shape === userShape;
    }
    else if (userDate != "" && userState != "" && userCountry != "") {
        return alienData.datetime === userDate &&
            alienData.state === userState &&
            alienData.country === userCountry;
    }
    else if (userDate != "" && userState != "") {
        return alienData.datetime === userDate &&
            alienData.state === userState;
    }
    else if (userDate != "") {
        return alienData.datetime === userDate;
    }
    else if (userState != "") {
        return alienData.state === userState;
    }
    else if (userCountry != "") {
        return alienData.country === userCountry;
    }
    else if (userShape != "") {
        return alienData.shape === userShape;
    }
}

function handleClick() {
    // If button is pressed, get the data entered in the input field
    // and clear the already shown table to append filtered rows in the 
    // table

    var userDate = document.getElementById("datetime").value;

    // var filteredDataSet = alienSightingData.filter(filterTableOnDate);
    var filteredDataSet = alienSightingData.filter(filterTableOnMultiple);

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

