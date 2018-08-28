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

    members = data.results["0"].members;
    tblBody3 = document.getElementById("least-engaged-data");
    tblBody1 = document.getElementById("most-engaged-data");
    tblBody2 = document.getElementById("parties");
    middle = (members.middle_name != null ? members.middle_name : "");

    statistics = {
        "Democrats": numberParty2("D"),
        "Republicans": numberParty2("R"),
        "Independents": numberParty2("I"),
        "republicansAvg": partyVotes("R"),
        "democratsAvg": partyVotes("D"),
        "independentsAvg": partyVotes("I"),
        "leastEngagedBottom": leastEngaged(),
        "mostEngagedTop": engaged(),
        "Total": a()
    }
    fillStatisticsTable();
}

function onConversionToJsonFailed(error) {
    console.log("Not a json mate!", error);
}

//or one function:
//start() {
//
//    var fetchData =
//        fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
//            method: "GET",
//            headers: new Headers({
//                "X-API-Key": '1kmWNaoS8SLvm7qMrJ8uf3LtksD5WpkxU5F0te9u'
//            })
//        })
//        .then(function (response) {
//            response.json()
//                .then(function (json) {
//                    console.log("success!!!!", json);
//                    data = json;
//
//                    members = data.results["0"].members;
//                    independents = [];
//                    republicans = [];
//                    tblBody3 = document.getElementById("least-engaged-data");
//                    tblBody1 = document.getElementById("most-engaged-data");
//                    tblBody2 = document.getElementById("parties");
//                    middle = (members.middle_name != null ? members.middle_name : "");
//
//                    statistics = {
//                        "Democrats": numberParty2("D"),
//                        "Republicans": numberParty2("R"),
//                        "Independents": numberParty2("I"),
//                        "republicansAvg": partyVotes("R"),
//                        "democratsAvg": partyVotes("D"),
//                        "independentsAvg": partyVotes("I"),
//                        "leastEngagedBottom": leastEngaged(),
//                        "mostEngagedTop": engaged(),
//                        "Total": a()
//                    }
//                    fillStatisticsTable();
//                })
//                .catch(function (e) {
//                    console.log(e);
//                });
//        })
//        .catch(function (e) {
//            console.log(e);
//        });
//}
//

//function numberParty(letter, party) {
//    for (i = 0; i < members.length; i++) {
//        if (members[i].party == letter) {
//            statistics[party] += 1;
//        }
//    }
//    console.log(statistics);
//}
//second option to return the party taking only one parameter - the letter (letter is not a key word, could be anything -god, carror, etc)
function numberParty2(letter) {
    var total = 0
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            total += 1;
        }
    }
    return total;
}
//
function mainTable() {
    var table = document.getElementById("maintable");
    var reps = document.getElementById("numbers");
    var votesWith = document.getElementById("percentage");
    var newRow = table.insertRow(1);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    cell1.innerHTML = numberParty2("R");
    cell1.innerHTML = partyVotes("R");
    cell2.innerHTML = numberParty2("I");
    cell1.innerHTML = numberParty2("D");

}
//numberParty("D","Democrats");
//numberParty("R","Republicans");
//numberParty("I","Independents");

function a() {
    var totalPoints = 0;
    var politician = [];
    for (i = 0; i < members.length; i++) {

        if (members[i].votes_with_party_pct != undefined) { //some data is undefined and is giving an error so you say that if there are undefined values, to not count them
            totalPoints += members[i].votes_with_party_pct;
            politician.push(members[i].votes_with_party_pct);
        }
    }

    var averagePoints = totalPoints / politician.length;
    return averagePoints.toFixed();
}

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
//statistics.total = a();



function sortVotes() {
    var votesArray = [];
    var lowestEng = [];
    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    for (var i = 0; i < members.length; i++) {
        if (i < members.length * 0.1) {
            lowestEng.push(members[i]);
        } else if (members[i] == members[i + 1]) {
            lowestEng.push(members[i + 1]);
        } else {
            break;
        }

    }
    return lowestEng;
}

function higherEng() {
    var highestEng = [];
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct; //sort all members by the votes with party 
    });
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

    members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
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
    document.getElementById('rep-avg').innerHTML = statistics.republicansAvg;
}

function fillStatisticsTable() {

    document.getElementById('rep-ttl').innerHTML = statistics.Republicans;
    document.getElementById('rep-avg').innerHTML = statistics.republicansAvg.toFixed() + "%";
    document.getElementById("dem-ttl").innerHTML = statistics.Democrats;
    document.getElementById("dem-avg").innerHTML = statistics.democratsAvg.toFixed() + "%";
    document.getElementById("indep-ttl").innerHTML = statistics.Independents;
    document.getElementById("indep-avg").innerHTML = statistics.independentsAvg.toFixed() + "%";
    document.getElementById("total-number").innerHTML = numberParty2("D") + numberParty2("I") + numberParty2("R");
    document.getElementById("percentage").innerHTML = statistics.Total + '%';
}

function leastEngaged() {

    members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });
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

function loading() {
    var loader = document.getElementById("myloader");
    if (document.onload === true) {
        loader.style.display = "none";
    } else {
        loader.style.display = "block";
    }
    console.log(loader);
}
