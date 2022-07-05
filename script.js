// Define useful constants.
const blueCheck = `<svg xmlns="http://www.w3.org/2000/svg" style="height:0.9em; width:0.9em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;" viewBox="0 0 24 24" enable-background="new 0 0 18 18"><path fill="#1276b7" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
const redCheck = `<svg xmlns="http://www.w3.org/2000/svg" style="height:0.9em; width:0.9em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;" viewBox="0 0 24 24" enable-background="new 0 0 18 18"><path fill="#c93136" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
var regions = false;

// Create the map object.
var map = new maplibregl.Map({
    container: 'map',
    style:
    'https://raw.githubusercontent.com/davidliu99/il_elections/main/mapstyle.json',
    center: [-89.3723028, 39.7570053],
    zoom: 5.3
});
     
// Disable zooming and panning.
map.scrollZoom.disable();
map.boxZoom.disable();
map.doubleClickZoom.disable();
map.dragPan.disable();
map.keyboard.disable();
map.touchZoomRotate.disable();

// Global variables that describe the election whose information is to be displayed.
var year = "20";
var office = "Pres";

// Dictionary of elections.
const electionInfo = {
    "22": {
        "CB": ["Yes", "For", "No", "Against"],
        "Sen": ["Duckworth", "Tammy Duckworth", "Salvi", "Kathy Salvi"],
        "Gov": ["Pritzker", "J. B. Pritzker", "Bailey", "Darren Bailey"],
        "AG": ["Raoul", "Kwame Raoul", "DeVore", "Tom DeVore"],
        "SoS": ["Giannoulias", "Alexi Giannoulias", "Brady", "Dan Brady"],
        "Comp": ["Mendoza", "Susana Mendoza", "Teresi", "Shannon Teresi"],
        "Treas": ["Frerichs", "Mike Frerichs", "Demmer", "Tom Demmer"]
    },
    "20": {
        "Tax": ["Yes", "For", "No", "Against"],
        "Pres": ["Biden", "Joe Biden", "Trump", "Donald Trump"],
        "Sen": ["Durbin", "Dick Durbin", "Curran", "Mark Curran, Jr."]
    },
    "18": {
        "Gov": ["Pritzker", "J. B. Pritzker", "Rauner", "Bruce Rauner"],
        "AG": ["Raoul", "Kwame Raoul", "Harold", "Erika Harold"],
        "SoS": ["White", "Jesse White", "Helland", "Jason Helland"],
        "Comp": ["Mendoza", "Susana Mendoza", "Senger", "Darlene Senger"],
        "Treas": ["Frerichs", "Mike Frerichs", "Dodge", "Jim Dodge"]
    },
    "16": {
        "Pres": ["Clinton", "Hillary Clinton", "Trump", "Donald Trump"],
        "Sen": ["Duckworth", "Tammy Duckworth", "Kirk", "Mark Kirk"],
        "Comp": ["Mendoza", "Susana Mendoza", "Munger", "Leslie Munger"]
    },
    "14": {
        "Sen": ["Durbin", "Dick Durbin", "Oberweis", "Jim Oberweis"],
        "Gov": ["Quinn", "Pat Quinn", "Rauner", "Bruce Rauner"],
        "AG": ["Madigan", "Lisa Madigan", "Schimpf", "Paul Schimpf"],
        "SoS": ["White", "Jesse White", "Webster", "Mike Webster"],
        "Comp": ["Simon", "Sheila Simon", "Topinka", "Judy Baar Topinka"],
        "Treas": ["Frerichs", "Mike Frerichs", "Cross", "Tom Cross"]
    },
    "12": {
        "Pres": ["Obama", "Barack Obama", "Romney", "Mitt Romney"]
    },
    "10": {
        "Sen": ["Giannoulias", "Alexi Giannoulias", "Kirk", "Mark Kirk"],
        "Gov": ["Quinn", "Pat Quinn", "Brady", "Bill Brady"],
        "AG": ["Madigan", "Lisa Madigan", "Kim", "Steve Kim"],
        "SoS": ["White", "Jesse White", "Enriquez", "Robert Enriquez"],
        "Comp": ["Miller", "David E. Miller", "Topinka", "Judy Baar Topinka"],
        "Treas": ["Kelly", "Robin Kelly", "Rutherford", "Dan Rutherford"]
    },
    "08": {
        "Pres": ["Obama", "Barack Obama", "McCain", "John McCain"],
        "Sen": ["Durbin", "Dick Durbin", "Sauerberg", "Steve Sauerberg"]
    },
    "06": {
        "Gov": ["Blagojevich", "Rod Blagojevich", "Topinka", "Judy Baar Topinka"],
        "AG": ["Madigan", "Lisa Madigan", "Umholtz", "Stewart Umholtz"],
        "SoS": ["White", "Jesse White", "Rutherford", "Dan Rutherford"],
        "Comp": ["Hynes", "Daniel Hynes", "Pankau", "Carole Pankau"],
        "Treas": ["Giannoulias", "Alexi Giannoulias", "Radogno", "Christine Radogno"]
    },
    "04": {
        "Pres": ["Kerry", "John Kerry", "Bush", "George W. Bush"],
        "Sen": ["Obama", "Barack Obama", "Keyes", "Alan Keyes"]
    },
    "02": {
        "Sen": ["Durbin", "Dick Durbin", "Durkin", "Jim Durkin"],
        "Gov": ["Blagojevich", "Rod Blagojevich", "Ryan", "Jim Ryan"],
        "AG": ["Madigan", "Lisa Madigan", "Birkett", "Joe Birkett"],
        "SoS": ["White", "Jesse White", "Cohn", "Kris O'Rourke Cohn"],
        "Comp": ["Hynes", "Daniel Hynes", "Ramsdell", "Thomas J. Ramsdell"],
        "Treas": ["Dart", "Tom Dart", "Topinka", "Judy Baar Topinka"]
    },
    "00": {
        "Pres": ["Gore", "Al Gore", "Bush", "George W. Bush"]
    },
    "98": {
        "Sen": ["MoseleyBraun", "Carol Moseley-Braun", "Fitzgerald", "Peter Fitzgerald"],
        "Gov": ["Poshard", "Glenn Poshard", "Ryang", "George Ryan"],
        "AG": ["Santos", "Miriam Santos", "Ryanj", "Jim Ryan"],
        "SoS": ["White", "Jesse White", "Salvi", "Al Salvi"],
        "Comp": ["Hynes", "Daniel Hynes", "Lauzen", "Chris Lauzen"],
        "Treas": ["McLaughlin", "Daniel J. McLaughlin", "Topinka", "Judy Baar Topinka"]
    }
}

const fullName = {
    "CB": ["Workers' Rights", "Illinois Right to Collective Bargaining referendum"],
    "Tax": ["Fair Tax", "Illinois Fair Tax referendum"],
    "Pres": ["President", "United States presidential election in Illinois"],
    "Sen": ["Senate", "United States Senate election in Illinois"],
    "Gov": ["Governor", "Illinois gubernatorial election"],
    "AG": ["Att. Gen.", "Illinois Attorney General election"],
    "Treas": ["Treasurer", "Illinois Treasurer election"],
    "SoS": ["Sec. of State", "Illinois Secretary of State election"],
    "Comp": ["Comptroller", "Illinois Comptroller election"]
}

const regionNames = {
    "chicago": "Chicago",
    "suburbs": "Suburbs of Chicago",
    "northern": "Northern Illinois",
    "central": "Central Illinois",
    "southern": "Southern Illinois"
}

// Create a popup, but don't add it to the map yet.
var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    maxWidth: 400
});

// Event listener that displays the popup upon hover.
function listener (e) {
    map.getCanvas().style.cursor = 'pointer';
    var areaName = regions ? regionNames[e.features[0].properties.NAME] : `${e.features[0].properties.name} County`;
    var demVotes = e.features[0].properties[`elections_${electionInfo[year][office][0]}${year}`];
    var repVotes = e.features[0].properties[`elections_${electionInfo[year][office][2]}${year}`];
    var totalVotes = e.features[0].properties[`elections_Total${office}${year}`];
    var demPct = demVotes / totalVotes * 100;
    var repPct = repVotes / totalVotes * 100;

    var demResult, repResult;
    
    if (demVotes > repVotes) {
        demResult = "win"
        repResult = "lose"
    }
    else {
        demResult = "lose"
        repResult = "win"
    }
    var demHTML = `<${demResult}-color style="background-color: #1276b7;"></${demResult}-color> <${demResult}-name>${electionInfo[year][office][1]}</${demResult}-name> <${demResult}-votes>${demVotes.toLocaleString('en-US')}</${demResult}-votes> <${demResult}-pct>${demPct.toFixed(1)}%</${demResult}-pct>`
    var repHTML = `<${repResult}-color style="background-color: #c93136;"></${repResult}-color> <${repResult}-name>${electionInfo[year][office][3]}</${repResult}-name> <${repResult}-votes>${repVotes.toLocaleString('en-US')}</${repResult}-votes> <${repResult}-pct>${repPct.toFixed(1)}%</${repResult}-pct>`

    popup.setLngLat({lng: e.lngLat.lng, lat: e.lngLat.lat + 0.01})
        .setHTML(`<h4>${areaName}</h4><info-grid> <header-name>Candidate</header-name> <header-votes>Votes</header-votes> <header-pct>Pct.</header-pct> ${repHTML} ${demHTML} </info-grid>`)
        .addTo(map);
};

function handleMouseLeave () {
    map.getCanvas().style.cursor = '';
    popup.remove();
};

// Draw counties.
map.on('load', function () {
    // Add a source for the county polygons.
    map.addSource('counties', {
        'type': 'geojson',
        'data':
        'https://raw.githubusercontent.com/davidliu99/il_elections/main/elections.geojson'
    });

    map.addSource('regions', {
        'type': 'geojson',
        'data':
        'https://raw.githubusercontent.com/davidliu99/il_elections/main/regions.geojson' 
    })
    
    // Add a layer showing the state polygons.
    map.addLayer({
        'id': 'counties-layer',
        'type': 'fill',
        'source': regions ? 'regions' : 'counties',
        'paint': {
            'fill-color': [
                'match', ['get', `elections_Winner${office}${year}`],
                `${electionInfo[year][office][2]}`, '#c93136',
                `${electionInfo[year][office][0]}`, '#1276b7',
                'Other', '#91b66e',
                '#000000'
            ],
            'fill-outline-color': 'rgba(255, 255, 255, 1)',
            'fill-opacity': [
                'step', ['get', `elections_WinPct${office}${year}`],
                0.2, 0.5,
                0.4, 0.6,
                0.6, 0.7,
                0.8, 0.8,
                1
            ]
        }
    });
    
    // When a click event occurs on a feature in the counties layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('mousemove', 'counties-layer', listener);

    map.on('mouseleave', 'counties-layer', handleMouseLeave);
});

function formatMargin(margin) {
    if (margin > 0) {
        return `<span style="color:#1276b7">D+${(margin * 100).toFixed(1)}</span>`
    }
    else {
        return `<span style="color:#c93136">R+${(margin * -100).toFixed(1)}</span>`
    }
}

// Change the displayed election.
function updateElection() {
    // Update summary
    document.getElementById("election-title").innerHTML = `${(year == "98" ? "19" : "20")}${year} ${fullName[office][1]}`;
    var demTotal = 0;
    var repTotal = 0;
    var voteTotal = 0;

    for (let i = 0; i < data.length; i++) {
        demTotal += data[i][`elections_${electionInfo[year][office][0]}${year}`];
        repTotal += data[i][`elections_${electionInfo[year][office][2]}${year}`];
        voteTotal += data[i][`elections_Total${office}${year}`]
    }

    var demResult, repResult;
    if (demTotal > repTotal) {
        demResult = "win";
        repResult = "lose";
    }
    else {
        demResult = "lose";
        repResult = "win";
    }

    document.getElementById(`${demResult}-color`).setAttribute("style", "background-color: #1276b7;");
    document.getElementById(`${repResult}-color`).setAttribute("style", "background-color: #c93136;");
    document.getElementById(`${demResult}-name`).innerHTML = `<div>${electionInfo[year][office][1]} ${(demTotal > repTotal) ? blueCheck : ""}</div>`;
    document.getElementById(`${demResult}-votes`).innerHTML = `<div>${demTotal.toLocaleString('en-US')}</div>`;
    document.getElementById(`${demResult}-pct`).innerHTML = `<div>${(demTotal / voteTotal * 100).toFixed(1)}%</div>`;
    document.getElementById(`${repResult}-name`).innerHTML = `<div>${electionInfo[year][office][3]} ${(demTotal > repTotal) ? "" : redCheck}</div>`;
    document.getElementById(`${repResult}-votes`).innerHTML = `<div>${repTotal.toLocaleString('en-US')}</div>`;
    document.getElementById(`${repResult}-pct`).innerHTML = `<div>${(repTotal / voteTotal * 100).toFixed(1)}%</div>`;
    document.getElementById("total-votes").innerHTML = `<div>${voteTotal.toLocaleString('en-US')}</div>`
    
    // Update description.
    if (year == "20" && office == "Tax") { // for the Fair Tax referendum only
        document.getElementById("description").innerHTML = "The Illinois Fair Tax Amendment was rejected. Votes against the amendment outnumbered those for by a margin of <span style='color:#c93136;'>375,921 votes</span>, or <span style='color:#c93136; font-weight:500;'>6.5%</span>."
    }
    else {
        var winner = (demTotal > repTotal) ? electionInfo[year][office][1] : electionInfo[year][office][3];
        var winColor = (demTotal > repTotal) ? "#1276b7" : "#c93136";
        document.getElementById("description").innerHTML = `${winner} won by a margin of <span style="color:${winColor};">${Math.abs(demTotal - repTotal).toLocaleString('en-US')} votes</span>, or <span style="color:${winColor}; font-weight:500;">${(Math.abs(demTotal - repTotal) / voteTotal * 100).toFixed(1)}%</span>.`;
    }

    // Update breakdown.
    for (let i = 0; i < regionData.length; i++) {
        let region = regionData[i]["NAME"];
        let demVotes = regionData[i][`elections_${electionInfo[year][office][0]}${year}`];
        let repVotes = regionData[i][`elections_${electionInfo[year][office][2]}${year}`];
        let regionVotes = regionData[i][`elections_Total${office}${year}`];

        document.getElementById(`${region}-margin`).innerHTML = formatMargin((demVotes - repVotes) / regionVotes);
        document.getElementById(`${region}-share`).innerHTML = `${(regionVotes / voteTotal * 100).toFixed(1)}%`;
    }

    // Update map.
    map.removeLayer('counties-layer');

    console.log(`elections_Winner${office}${year}`);
    console.log(electionInfo[year][office][2]);
    console.log(electionInfo[year][office][0])
    map.addLayer({
        'id': 'counties-layer',
        'type': 'fill',
        'source': regions ? 'regions' : 'counties',
        'paint': {
            'fill-color': [
                'match', ['get', `elections_Winner${office}${year}`],
                `${electionInfo[year][office][2]}`, '#c93136',
                `${electionInfo[year][office][0]}`, '#1276b7',
                'Other', '#91b66e',
                '#000000'
            ],
            'fill-outline-color': 'rgba(255, 255, 255, 1)',
            'fill-opacity': [
                'step', ['get', `elections_WinPct${office}${year}`],
                0.2, 0.5,
                0.4, 0.6,
                0.6, 0.7,
                0.8, 0.8,
                1
            ]
        }
    });
}

// Get the currently selected year.
function getSelectedYear() {
    var choices = document.getElementsByName('year');

    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            return choices[i].id.replace(/\D/g,''); // removes nonnumeric characters
        }
    }
}

// Get the currently selected office.
function getSelectedOffice() {
    var choices = document.getElementsByName('office');

    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            return choices[i].id;
        }
    }

    // Failsafe.
    return Object.keys(electionInfo[getSelectedYear()])[0];
}

// Handle changes in year selection.
function changeYear() {
    // Unselect all currently available elections.
    
    var currElections = document.getElementById("office-grid").getElementsByTagName("input");
    for (let i = 0; i < currElections.length; i++) {
        currElections[i].checked = false;
    }

    var newYear = getSelectedYear();
    
    // Update available elections to select from.
    var newHTML = "";
    var elections = Object.keys(electionInfo[newYear]);
    for (let i = 0; i < elections.length; i++) {
        newHTML += `<div class="office-box"> <li> <input type="radio" onclick="changeOffice()" id="${elections[i]}" name="office"/> <label for="${elections[i]}">${fullName[elections[i]][0]}</label> </li> </div>`
    }

    document.getElementById("office-grid").innerHTML = newHTML;
}

// Handle changes in office selection.
function changeOffice() {
    // Update global year and office variables
    year = getSelectedYear();
    office = getSelectedOffice();

    updateElection();
}

// Handle changes in mode selection.
function viewCounties() {
    if (regions) {
        regions = false;
        
        updateElection();
    }
}

function viewRegions() {
    if (!regions) {
        regions = true;

        updateElection();
    }
}

// Toggle breakdown table.
function toggleBreakdown() {
    let table = document.getElementById("breakdown");
    let arrow = document.getElementById("arrow");
    if (table.style.display == "none") {
        table.style.display = "grid";
        arrow.innerHTML = "▾";
    }
    else {
        table.style.display = "none";
        arrow.innerHTML = "▸";
    }
}
