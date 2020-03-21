// from data.js
//var tableData = data;
var alienSightingData = data;

// YOUR CODE HERE!
// data.forEach(element => {
//     console.log(element);
// });

// Select the HTML element which contains the table
var tbody = d3.select("tbody");

alienSightingData.forEach(sighting => {
    // Add a row for each alien sighting available in the dataset
    var row = tbody.append("tr");

    // For each sighting, append cell and populate data
    Object.entries(sighting).forEach(function ([key, value]) {
        var cell = row.append("td");
        cell.text(value);
    });
});