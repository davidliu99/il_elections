// Define useful constants.
const blue = "#1276b7";
const red = "#c93136";
const green = "#3b99a7";
const orange = "#e26e42";
const blueCheck = `<svg xmlns="http://www.w3.org/2000/svg" style="height:0.9em; width:0.9em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;" viewBox="0 0 24 24" enable-background="new 0 0 18 18"><path fill="${blue}" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
const redCheck = `<svg xmlns="http://www.w3.org/2000/svg" style="height:0.9em; width:0.9em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;" viewBox="0 0 24 24" enable-background="new 0 0 18 18"><path fill="${red}" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
const greenCheck = `<svg xmlns="http://www.w3.org/2000/svg" style="height:0.9em; width:0.9em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;" viewBox="0 0 24 24" enable-background="new 0 0 18 18"><path fill="${green}" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
const orangeCheck = `<svg xmlns="http://www.w3.org/2000/svg" style="height:0.9em; width:0.9em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;" viewBox="0 0 24 24" enable-background="new 0 0 18 18"><path fill="${orange}" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`

var regions = false;

// Create the map object.
var map = new maplibregl.Map({
    container: 'map',
    style: 'https://raw.githubusercontent.com/davidliu99/il_elections/main/mapstyle.json',
    center: [-89.5723028, 39.7570053],
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
        "CB": {
            "referendum": 1, // 1 indicates passage, 2 indicates failure
            "special": false,
            "candidates": ["Yes", "For", "No", "Against"]
        },
        "Sen": {
            "referendum": 0,
            "special": false,
            "candidates": ["Duckworth", "Tammy Duckworth", "Salvi", "Kathy Salvi"]
        },
        "Gov": {
            "referendum": 0,
            "special": false,
            "candidates": ["Pritzker", "J. B. Pritzker", "Bailey", "Darren Bailey"]
        },
        "AG": {
            "referendum": 0,
            "special": false,
            "candidates": ["Raoul", "Kwame Raoul", "DeVore", "Tom DeVore"]
        },
        "SoS": {
            "referendum": 0,
            "special": false,
            "candidates": ["Giannoulias", "Alexi Giannoulias", "Brady", "Dan Brady"]
        },
        "Comp": {
            "referendum": 0,
            "special": false,
            "candidates": ["Mendoza", "Susana Mendoza", "Teresi", "Shannon Teresi"]
        },
        "Treas": {
            "referendum": 0,
            "special": false,
            "candidates": ["Frerichs", "Mike Frerichs", "Demmer", "Tom Demmer"]
        }
    },
    "20": {
        "Pres": {
            "referendum": 0,
            "incumbent": 2, // 0: no incumbent, 1: dem incumbent, 2: rep incumbent
            "special": false,
            "candidates": ["Biden", "Joe Biden", "Trump", "Donald Trump"]
        },
        "Sen": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Durbin", "Dick Durbin", "Curran", "Mark Curran"]
        },
        "Tax": {
            "referendum": 2,
            "incumbent": 0,
            "special": false,
            "candidates": ["Yes", "For", "No", "Against"]
        }
    },
    "18": {
        "Gov": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["Pritzker", "J. B. Pritzker", "Rauner", "Bruce Rauner"]
        },
        "AG": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Raoul", "Kwame Raoul", "Harold", "Erika Harold"]
        },
        "SoS": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["White", "Jesse White", "Helland", "Jason Helland"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Mendoza", "Susana Mendoza", "Senger", "Darlene Senger"]
        },
        "Treas": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Frerichs", "Mike Frerichs", "Dodge", "Jim Dodge"]
        }
    },
    "16": {
        "Pres": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Clinton", "Hillary Clinton", "Trump", "Donald Trump"]
        },
        "Sen": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["Duckworth", "Tammy Duckworth", "Kirk", "Mark Kirk"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 2,
            "special": true,
            "candidates": ["Mendoza", "Susana Mendoza", "Munger", "Leslie Munger"]
        },
        "Trans": {
            "referendum": 1,
            "incumbent": 0,
            "special": false,
            "candidates": ["Yes", "For", "No", "Against"]
        }
    },
    "14": {
        "Sen": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Durbin", "Dick Durbin", "Oberweis", "Jim Oberweis"]
        },
        "Gov": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Quinn", "Pat Quinn", "Rauner", "Bruce Rauner"]
        },
        "AG": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Madigan", "Lisa Madigan", "Schimpf", "Paul Schimpf"]
        },
        "SoS": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["White", "Jesse White", "Webster", "Mike Webster"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["Simon", "Sheila Simon", "Topinka", "Judy Baar Topinka"]
        },
        "Treas": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Frerichs", "Mike Frerichs", "Cross", "Tom Cross"]
        },
        "Marsy": {
            "referendum": 1,
            "incumbent": 0,
            "special": false,
            "candidates": ["Yesm", "For", "Nom", "Against"]
        },
        "Vote": {
            "referendum": 1,
            "incumbent": 0,
            "special": false,
            "candidates": ["Yesv", "For", "Nov", "Against"]
        }
    },
    "12": {
        "Pres": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Obama", "Barack Obama", "Romney", "Mitt Romney"]
        },
        "Pens": {
            "referendum": 2,
            "incumbent": 0,
            "special": false,
            "candidates": ["Yes", "For", "No", "Against"]
        }
    },
    "10": {
        "Sen": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Giannoulias", "Alexi Giannoulias", "Kirk", "Mark Kirk"]
        },
        "Gov": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Quinn", "Pat Quinn", "Brady", "Bill Brady"]
        },
        "AG": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Madigan", "Lisa Madigan", "Kim", "Steve Kim"]
        },
        "SoS": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["White", "Jesse White", "Enriquez", "Robert Enriquez"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Miller", "David E. Miller", "Topinka", "Judy Baar Topinka"]
        },
        "Treas": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Kelly", "Robin Kelly", "Rutherford", "Dan Rutherford"]
        },
        "Rec": {
            "referendum": 1,
            "incumbent": 0,
            "special": false,
            "candidates": ["Yes", "For", "No", "Against"]
        }
    },
    "08": {
        "Pres": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Obama", "Barack Obama", "McCain", "John McCain"]
        },
        "Sen": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Durbin", "Dick Durbin", "Sauerberg", "Steve Sauerberg"]
        }
    },
    "06": {
        "Gov": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Blagojevich", "Rod Blagojevich", "Topinka", "Judy Baar Topinka"]
        },
        "AG": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Madigan", "Lisa Madigan", "Umholtz", "Stewart Umholtz"]
        },
        "SoS": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["White", "Jesse White", "Rutherford", "Dan Rutherford"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Hynes", "Daniel Hynes", "Pankau", "Carole Pankau"]
        },
        "Treas": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Giannoulias", "Alexi Giannoulias", "Radogno", "Christine Radogno"]
        }
    },
    "04": {
        "Pres": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["Kerry", "John Kerry", "Bush", "George W. Bush"]
        },
        "Sen": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Obama", "Barack Obama", "Keyes", "Alan Keyes"]
        }
    },
    "02": {
        "Sen": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Durbin", "Dick Durbin", "Durkin", "Jim Durkin"]
        },
        "Gov": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Blagojevich", "Rod Blagojevich", "Ryan", "Jim Ryan"]
        },
        "AG": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Madigan", "Lisa Madigan", "Birkett", "Joe Birkett"]
        },
        "SoS": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["White", "Jesse White", "Cohn", "Kris O'Rourke Cohn"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["Hynes", "Daniel Hynes", "Ramsdell", "Thomas J. Ramsdell"]
        },
        "Treas": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["Dart", "Tom Dart", "Topinka", "Judy Baar Topinka"]
        }
    },
    "00": {
        "Pres": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Gore", "Al Gore", "Bush", "George W. Bush"]
        }
    },
    "98": {
        "Sen": {
            "referendum": 0,
            "incumbent": 1,
            "special": false,
            "candidates": ["MoseleyBraun", "Carol Moseley-Braun", "Fitzgerald", "Peter Fitzgerald"]
        },
        "Gov": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Poshard", "Glenn Poshard", "Ryang", "George Ryan"]
        },
        "AG": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["Santos", "Miriam Santos", "Ryanj", "Jim Ryan"]
        },
        "SoS": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["White", "Jesse White", "Salvi", "Al Salvi"]
        },
        "Comp": {
            "referendum": 0,
            "incumbent": 0,
            "special": false,
            "candidates": ["Hynes", "Daniel Hynes", "Lauzen", "Chris Lauzen"]
        },
        "Treas": {
            "referendum": 0,
            "incumbent": 2,
            "special": false,
            "candidates": ["McLaughlin", "Daniel J. McLaughlin", "Topinka", "Judy Baar Topinka"]
        }
    }
};

const fullName = {
    "CB": ["Workers' Rights", "referendum on the Illinois Right to Collective Bargaining Amendment"],
    "Tax": ["Fair Tax", "referendum on the Illinois Fair Tax Amendment"],
    "Trans": ["Transport Tax", "referendum on the Illinois Transportation Taxes and Fees Lockbox Amendment"],
    "Marsy": ["Victims' Rights", "referendum on the Illinois Crime Victims' Bill of Rights"],
    "Vote": ["Voting Rights", "referendum on the Illinois Right to Vote Amendment"],
    "Pens": ["Pensions", "referendum on the Illinois Public Pension Amendment"],
    "Rec": ["Gov. Recalls", "referendum on the Illinois Governor Recall Amendment"],
    "Pres": ["President", "United States presidential election in Illinois"],
    "Sen": ["Senate", "United States Senate election in Illinois"],
    "Gov": ["Governor", "Illinois gubernatorial election"],
    "AG": ["Attorney Gen.", "Illinois Attorney General election"],
    "Treas": ["Treasurer", "Illinois Treasurer election"],
    "SoS": ["Sec. of State", "Illinois Secretary of State election"],
    "Comp": ["Comptroller", "Illinois Comptroller election"]
};

const fullNameSpecial = {
    "Comp": "Illinois Comptroller special election"
};

const regionNames = {
    "chicago": "City of Chicago",
    "suburbs": "Suburbs of Chicago",
    "northern": "Northern Illinois",
    "central": "Central Illinois",
    "southern": "Southern Illinois"
};

const referendumDescriptions = {
    "20": {
        "Tax": [
            `The Illinois Fair Tax Amendment was rejected. Votes against the amendment outnumbered those for by a margin of <span style='color:${orange};'>375,921 votes</span>, or <span style='color:${orange}; font-weight:600;'>6.5%</span>.`,
            "The Illinois Fair Tax Amendment would have authorized the state legislature to impose a graduated (progressive) income tax."
        ]
    },
    "16": {
        "Trans": [
            `The Illinois Transportation Taxes and Fees Lockbox Amendment was approved. Votes for the amendment outnumbered those against by a margin of <span style='color:${green};'>2,782,193 votes</span>, or <span style='color:${green}; font-weight:600;'>57.8%</span>.`,
            "The Illinois Transportation Taxes and Fees Lockbox Amendment prohibits lawmakers from using transportation funds for anything other than their stated purpose."
        ]
    },
    "14": {
        "Marsy": [
            `The Illinois Crime Victims' Bill of Rights was approved. Votes for the amendment outnumbered those against by a margin of <span style='color:${green};'>1,924,484 votes</span>, or <span style='color:${green}; font-weight:600;'>56.9%</span>.`,
            "The Illinois Crime Victims' Bill of Rights established additional protections for crime victims, including restitution and timely notice of court proceedings."
        ],
        "Vote": [
            `The Illinois Right to Vote Amendment was approved. Votes for the amendment outnumbered those against by a margin of <span style='color:${green};'>1,389,933 votes</span>, or <span style='color:${green}; font-weight:600;'>42.0%</span>.`,
            "The Illinois Right to Vote Amendment prohibits restrictions of citizens' right to vote on the basis of race, ethnicity, national origin, language, religion, sex, sexual orientation, or income."
        ]
    },
    "12": {
        "Pens": [
            `The Illinois Public Pension Amendment was rejected. Although votes for the amendment outnumbered those against by a margin of <span style='color:${green};'>534,214 votes</span>, or <span style='color:${green}; font-weight:600;'>12.3%</span>, the amendment did not attain the three-fifths supermajority required for passage.`,
            "The Illinois Public Pension Amendment would have required increases in public employees' pension benefits to be approved by a three-fifths vote of their governing body, rather than a simple majority."
        ]
    },
    "10": {
        "Rec": [
            `The Illinois Governor Recall Amendment was approved. Votes for the amendment outnumbered those against by a margin of <span style='color:${green};'>1,031,057 votes</span>, or <span style='color:${green}; font-weight:600;'>31.4%</span>.`,
            "The Illinois Governor Recall Amendment established an electoral process for recalling the Governor and electing a successor."
        ]
    }
}
// Create a popup, but don't add it to the map yet.
var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    maxWidth: 400,
    offset: [0, -1]
});

// Event listener that displays the popup upon hover.
function listener (e) {
    map.getCanvas().style.cursor = 'pointer';
    var areaName = regions ? regionNames[e.features[0].properties.NAME] : `${e.features[0].properties.name} County`;
    var demVotes = e.features[0].properties[`elections_${electionInfo[year][office]["candidates"][0]}${year}`];
    var repVotes = e.features[0].properties[`elections_${electionInfo[year][office]["candidates"][2]}${year}`];
    var totalVotes = e.features[0].properties[`elections_Total${office}${year}`];
    var demPct = demVotes / totalVotes * 100;
    var repPct = repVotes / totalVotes * 100;

    var demResult, repResult;
    
    if (demVotes > repVotes) {
        demResult = "win";
        repResult = "lose";
    }
    else {
        demResult = "lose";
        repResult = "win";
    }
    var demHTML = `<${demResult}-color style="background-color: ${electionInfo[year][office]["referendum"] ? green : blue};"></${demResult}-color> <${demResult}-name>${electionInfo[year][office]["candidates"][1]}${electionInfo[year][office]["incumbent"] == 1 ? "*" : ""}</${demResult}-name> <${demResult}-votes>${demVotes.toLocaleString('en-US')}</${demResult}-votes> <${demResult}-pct>${demPct.toFixed(1)}%</${demResult}-pct>`
    var repHTML = `<${repResult}-color style="background-color: ${electionInfo[year][office]["referendum"] ? orange : red};"></${repResult}-color> <${repResult}-name>${electionInfo[year][office]["candidates"][3]}${electionInfo[year][office]["incumbent"] == 2 ? "*" : ""}</${repResult}-name> <${repResult}-votes>${repVotes.toLocaleString('en-US')}</${repResult}-votes> <${repResult}-pct>${repPct.toFixed(1)}%</${repResult}-pct>`

    popup.setLngLat(e.lngLat)
        .setHTML(`<h4>${areaName}</h4><info-grid> <header-name>${electionInfo[year][office]["referendum"] ? "Position" : "Candidate"}</header-name> <header-votes>Votes</header-votes> <header-pct>Pct.</header-pct> ${repHTML} ${demHTML} </info-grid>`)
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
        'data': 'https://raw.githubusercontent.com/davidliu99/il_elections/main/elections.geojson'
    });

    map.addSource('regions', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/davidliu99/il_elections/main/regions.geojson' 
    });
    
    // Add a layer showing the state polygons.
    map.addLayer({
        'id': 'counties-layer',
        'type': 'fill',
        'source': regions ? 'regions' : 'counties',
        'paint': {
            'fill-color': [
                'match', ['get', `elections_Winner${office}${year}`],
                `${electionInfo[year][office]["candidates"][2]}`, electionInfo[year][office]["referendum"] ? orange : red,
                `${electionInfo[year][office]["candidates"][0]}`, electionInfo[year][office]["referendum"] ? green : blue,
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
    if (electionInfo[year][office]["referendum"]) {
        demAbbr = "Yes";
        repAbbr = "No";
    }
    else {
        demAbbr = electionInfo[year][office]["candidates"][1].trim().split(" ").pop();
        repAbbr = electionInfo[year][office]["candidates"][3].trim().split(" ").pop();
    }

    if (margin > 0) {
        return `<span style="color:${electionInfo[year][office]["referendum"] ? green : blue}">${demAbbr} +${(margin * 100).toFixed(1)}</span>`;
    }
    else {
        return `<span style="color:${electionInfo[year][office]["referendum"] ? orange : red}">${repAbbr} +${(margin * -100).toFixed(1)}</span>`;
    }
}

// Update the map with the selected settings.
function updateMap() {
    map.removeLayer('counties-layer');

    map.addLayer({
        'id': 'counties-layer',
        'type': 'fill',
        'source': regions ? 'regions' : 'counties',
        'paint': {
            'fill-color': [
                'match', ['get', `elections_Winner${office}${year}`],
                `${electionInfo[year][office]["candidates"][2]}`, electionInfo[year][office]["referendum"] ? orange : red,
                `${electionInfo[year][office]["candidates"][0]}`, electionInfo[year][office]["referendum"] ? green : blue,
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

// Change the displayed election.
function updateElection() {
    // Update summary
    if (electionInfo[year][office]["special"]) { // special election
        document.getElementById("election-title").innerHTML = `${(year == "98" ? "19" : "20")}${year} ${fullNameSpecial[office]}`
    }
    else {
        document.getElementById("election-title").innerHTML = `${(year == "98" ? "19" : "20")}${year} ${fullName[office][1]}`;
    }
    document.getElementById("header-name").innerHTML = `${electionInfo[year][office]["referendum"] ? "Position" : "Candidate"}`
    
    var demTotal = 0;
    var repTotal = 0;
    var voteTotal = 0;

    for (let i = 0; i < data.length; i++) {
        demTotal += data[i][`elections_${electionInfo[year][office]["candidates"][0]}${year}`];
        repTotal += data[i][`elections_${electionInfo[year][office]["candidates"][2]}${year}`];
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

    var demLegend, repLegend, headerParty, demColor, repColor, demCheck, repCheck, demParty, repParty;
    if (electionInfo[year][office]["referendum"]) {
        demLegend = "Yes";
        repLegend = "No";
        headerParty = "";
        demColor = green;
        repColor = orange;
        demCheck = electionInfo[year][office]["referendum"] == 1 ? greenCheck : "";
        repCheck = electionInfo[year][office]["referendum"] == 1 ? "" : orangeCheck;
        demParty = "";
        repParty = "";
    }
    else {
        demLegend = "Dem.";
        repLegend = "Rep.";
        headerParty = "Party";
        demColor = blue;
        repColor = red;
        demCheck = (demTotal > repTotal) ? blueCheck : "";
        repCheck = (demTotal > repTotal) ? "" : redCheck;
        demParty = "<div>Democratic</div>";
        repParty = "<div>Republican</div>";
    }

    document.getElementById("dem-legend").innerHTML = demLegend;
    document.getElementById("rep-legend").innerHTML = repLegend;
    document.getElementById("header-party").innerHTML = headerParty;
    
    document.getElementById(`${demResult}-color`).style.backgroundColor = demColor;
    document.getElementById(`${repResult}-color`).style.backgroundColor = repColor;
    document.getElementById(`${demResult}-name`).innerHTML = `<div>${electionInfo[year][office]["candidates"][1]}${electionInfo[year][office]["incumbent"] == 1 ? "*" : ""} ${demCheck}</div>`;
    document.getElementById(`${demResult}-party`).innerHTML = demParty;
    document.getElementById(`${demResult}-votes`).innerHTML = `<div>${demTotal.toLocaleString('en-US')}</div>`;
    document.getElementById(`${demResult}-pct`).innerHTML = `<div>${(demTotal / voteTotal * 100).toFixed(1)}%</div>`;
    document.getElementById(`${repResult}-name`).innerHTML = `<div>${electionInfo[year][office]["candidates"][3]}${electionInfo[year][office]["incumbent"] == 2 ? "*" : ""} ${repCheck}</div>`;
    document.getElementById(`${repResult}-party`).innerHTML = repParty;
    document.getElementById(`${repResult}-votes`).innerHTML = `<div>${repTotal.toLocaleString('en-US')}</div>`;
    document.getElementById(`${repResult}-pct`).innerHTML = `<div>${(repTotal / voteTotal * 100).toFixed(1)}%</div>`;
    document.getElementById("total-votes").innerHTML = `<div>${voteTotal.toLocaleString('en-US')}</div>`
    
    // Update description.
    if (electionInfo[year][office]["referendum"]) { // for referenda
        document.getElementById("description").style.width = "490px";
        document.getElementById("description").innerHTML = referendumDescriptions[year][office][0];
    }
    else {
        document.getElementById("description").style.width = "545px";
        var winner = (demTotal > repTotal) ? electionInfo[year][office]["candidates"][1] : electionInfo[year][office]["candidates"][3];
        var winColor = electionInfo[year][office]["referendum"] ? ((demTotal > repTotal) ? green : orange) : ((demTotal > repTotal) ? blue : red);
        var reelect = ((demTotal > repTotal && electionInfo[year][office]["incumbent"] == 1) ||
                       (demTotal < repTotal && electionInfo[year][office]["incumbent"] == 2));
        var verb = office == "Pres" || (year == "10" && office == "Gov") ? "won by" : (reelect ? "won reelection by" : "won by")
        
        document.getElementById("description").innerHTML = `${winner} ${verb} a margin of <span style="color:${winColor};">${Math.abs(demTotal - repTotal).toLocaleString('en-US')} votes</span>, or <span style="color:${winColor}; font-weight:600;">${(Math.abs(demTotal - repTotal) / voteTotal * 100).toFixed(1)}%</span>.`;
    }

    // Update amendment description.
    if (electionInfo[year][office]["referendum"]) { // for referenda
        document.getElementById("referendum-description-container").style.display = "block";
        document.getElementById("referendum-description").innerHTML = referendumDescriptions[year][office][1];
    }
    else {
        document.getElementById("referendum-description-container").style.display = "none";
    }

    // Update breakdown.
    for (let i = 0; i < regionData.length; i++) {
        let region = regionData[i]["NAME"];
        let demVotes = regionData[i][`elections_${electionInfo[year][office]["candidates"][0]}${year}`];
        let repVotes = regionData[i][`elections_${electionInfo[year][office]["candidates"][2]}${year}`];
        let regionVotes = regionData[i][`elections_Total${office}${year}`];

        document.getElementById(`${region}-margin`).innerHTML = formatMargin((demVotes - repVotes) / regionVotes);
        document.getElementById(`${region}-share`).innerHTML = `${(regionVotes / voteTotal * 100).toFixed(1)}%`;
    }

    // Update map.
    updateMap();

    // Update legend.
    var demGradients = document.getElementsByClassName("gradient-box-dem");
    var repGradients = document.getElementsByClassName("gradient-box-rep");

    for (let i = 0; i < demGradients.length; i++) {
        demGradients[i].style.backgroundColor = electionInfo[year][office]["referendum"] ? green : blue;
        repGradients[i].style.backgroundColor = electionInfo[year][office]["referendum"] ? orange : red;
    }
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
    document.getElementById("select-an-office").innerHTML = `Select an office.`
    var newHTML = "";
    var elections = Object.keys(electionInfo[newYear]);
    for (let i = 0; i < elections.length; i++) {
        if (electionInfo[newYear][elections[i]]["referendum"]) {
            document.getElementById("select-an-office").innerHTML = `Select an office or <span style="color:rgb(137, 75, 169);">referendum</span>.`
        }
        newHTML += `<div class="office-box"> <li ${electionInfo[newYear][elections[i]]["referendum"] ? "class='purple'" : ""}> <input type="radio" ${electionInfo[newYear][elections[i]]["referendum"] ? "class='purple'" : ""} onclick="changeOffice()" id="${elections[i]}" name="office"/> <label for="${elections[i]}">${fullName[elections[i]][0]}</label> </li> </div>`
    }

    document.getElementById("office-grid").innerHTML = newHTML;
}

// Handle changes in office selection.
function changeOffice() {
    // Update global year and office variables
    var newYear = getSelectedYear();
    var newOffice = getSelectedOffice();

    if (year == newYear && office == newOffice) {
        return;
    }

    year = newYear;
    office = newOffice;
    updateElection();
}

// Handle changes in mode selection.
function viewCounties() {
    if (regions) {
        regions = false;
        
        updateMap();
    }
}

function viewRegions() {
    if (!regions) {
        regions = true;

        updateMap();
    }
}

// Toggle referendum description.
function toggleReferendumDescription() {
    let description = document.getElementById("referendum-description");
    let arrow = document.getElementById("referendum-arrow");

    if (description.style.display == "none") {
        description.style.display = "block";
        arrow.innerHTML = "▾";
    }
    else {
        description.style.display = "none";
        arrow.innerHTML = "▸";
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