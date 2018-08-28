if (window.location.pathname == "/MOD%201/Attendance-senate.start.html") {
    start('https://api.propublica.org/congress/v1/113/senate/members.json');
}

if (window.location.pathname == "/MOD%201/Attendance-house.start.html") {
    start('https://api.propublica.org/congress/v1/113/house/members.json');
}

function start(url) {

    var fetchData = fetch(url, {
            method: "GET",
            headers: new Headers({
                "X-API-Key": '1kmWNaoS8SLvm7qMrJ8uf3LtksD5WpkxU5F0te9u'
            })
        })
        .then(onDataFetched)
        .catch(onDataFetchFailed);
}

function onDataFetched(response) {
    response.json()
        .then(onConversionToJsonSuccessful)
        .catch(onConversionToJsonFailed);
}

function onDataFetchFailed(error) {
    console.log("I have failed in life.", error);
}

function onConversionToJsonSuccessful(json) {
    console.log("success!!!!", json);
    data = json;
    document.getElementById("myloader").style.display = "none";
    document.getElementById("parties").style.display="visible";

    members = data.results["0"].members;
    tblBody3 = document.getElementById("least-engaged-data");
    tblBody1 = document.getElementById("most-engaged-data");
    tblBody2 = document.getElementById("parties");
    middle = (members.middle_name != null ? members.middle_name : "");

    statistics = {
        "Democrats": votesForParty("D"),
        "Republicans": votesForParty("R"),
        "Independents": votesForParty("I"),
        "republicansAvg": partyVotes("R"),
        "democratsAvg": partyVotes("D"),
        "independentsAvg": partyVotes("I"),
        "leastEngagedBottom": leastEngaged(),
        "mostEngagedTop": engaged(),
        "Total": averagePercentage()
    }
    fillStatisticsTable();
}

function onConversionToJsonFailed(error) {
    console.log("Not a json mate!", error);
}

//F returns total number of politicians(letter)
function votesForParty(letter) {
    var total = 0
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            total += 1;
        }
    }
    return total;
}

//F calculates average % of total votes
function averagePercentage() {
    var totalPoints = 0; //sum % of votes
    var politician = []; //total number votes
    for (var i = 0; i < members.length; i++) {
        if (members[i].votes_with_party_pct != undefined) { //some data is undefined and is giving an error so you say that if there are undefined values, do not count them.
            totalPoints += members[i].votes_with_party_pct;
            politician.push(members[i].votes_with_party_pct);
        }
    }

    var averagePoints = totalPoints / politician.length;
    return averagePoints.toFixed();
}
//calculates average votes by party
function partyVotes(letter) {
    var politician = [];
    var totalPoints = 0;
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            if (members[i].votes_with_party_pct != undefined) {

                politician.push(members[i].votes_with_party_pct);
                totalPoints += members[i].votes_with_party_pct;
            }
        }
    }
    if (totalPoints != 0) {
        var averagePoints = totalPoints / politician.length;
    } else {
        var averagePoints = 0;
    }
    return averagePoints;
}

function sortAscendent(array, key) {
    return array.sort(function (a, b) {
        return a[key] - b[key]
    })
}

function sortDescendent(array, key) {
    return array.sort(function (a, b) {
        return b[key] - a[key];
    })
}
//calculates 
function higherEng() {
    var highestEng = [];
    sortDescendent(members, "votes_with_party_pct");

    for (var i = 0; i < members.length; i++) {
        // console.log('i: ', i);
        if (i < members.length * 0.1) {
            highestEng.push(members[i]);
        } else if (members[i].votes_with_party_pct == members[i + 1].votes_with_party_pct) {
            highestEng.push(members[i + 1])
        } else {
            break;
        }
    }
    return highestEng;
}

function engaged() {
    sortAscendent(members, "missed_votes_pct");

    for (var i = 0; i < members.length; i++) {
        var leastMissed = [];
        var row = tblBody1.insertRow();
        // console.log(members[i].missed_votes , members[i].missed_votes_pct);
        if (i < members.length * 0.1) {
            leastMissed.push(members[i]);
        } else if (members[i].missed_votes_pct == members[i + 1].missed_votes_pct) {
            leastMissed.push(members[i + 1]);

        } else {
            break;
        }
        row.insertCell().innerHTML = members[i].first_name + " " + middle + "" + members[i].last_name;
        row.insertCell().innerHTML = members[i].missed_votes;
        row.insertCell().innerHTML = members[i].missed_votes_pct + "%";
    };
}

function fillStatisticsTable() {

    document.getElementById('rep-ttl').innerHTML = statistics.Republicans;
    document.getElementById('rep-avg').innerHTML = statistics.republicansAvg.toFixed() + "%";
    document.getElementById("dem-ttl").innerHTML = statistics.Democrats;
    document.getElementById("dem-avg").innerHTML = statistics.democratsAvg.toFixed() + "%";
    document.getElementById("indep-ttl").innerHTML = statistics.Independents;
    document.getElementById("indep-avg").innerHTML = statistics.independentsAvg.toFixed() + "%";
    document.getElementById("total-number").innerHTML = votesForParty("D") + votesForParty("I") + votesForParty("R");
    document.getElementById("percentage").innerHTML = statistics.Total + '%';
}

function leastEngaged() {
    sortDescendent(members, "missed_votes_pct");
    for (var i = 0; i < members.length; i++) {
        var missedVotes = [];
        var row = tblBody3.insertRow();
        if (i < members.length * 0.1) {
            missedVotes.push(members[i]);
        } else if (members[i].missed_votes_pct == members[i + 1].missed_votes_pct) {
            missedVotes.push(members[i + 1]);

        } else {
            break;
        }
        row.insertCell().innerHTML = members[i].first_name + " " + middle + " " + members[i].last_name;
        row.insertCell().innerHTML = members[i].missed_votes;
        row.insertCell().innerHTML = members[i].missed_votes_pct.toFixed() + "%";

    };
}

//    function loadTable() {
//    tableBody = document.getElementsById("parties");
//    } return tableBody.style.display="block";
    