var members = data.results["0"].members;
var independents = [];
var republicans = [];
var tblBody = document.getElementById("least-engaged-data");

var statistics = {
    "Democrats": numberParty2("D"),
    "Republicans": numberParty2("R"),
    "Independents": numberParty2("I"),
    "republicansAvg": partyVotes("R"),
    "democratsAvg": partyVotes("D"),
    "independentsAvg": partyVotes("I"),
    "leastEngagedBottom": leastEngaged(),
    "mostEngagedTop": engaged(),
    "leastVotes": lowVotes(),
    "mostVotes": highVotes()
}



function numberParty(letter, party) {
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            statistics[party] += 1;
        }
    }
    console.log(statistics);
}
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
//numberParty("D","Democrats");
//numberParty("R","Republicans");
//numberParty("I","Independents");

function partyVotes(letter) {
    var politician = [];
    var totalPoints = 0;
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            politician.push(members[i].votes_with_party_pct);
            totalPoints += members[i].votes_with_party_pct;
        }
    }

    var averagePoints = totalPoints / politician.length;
    return averagePoints;
}

statistics.republicansAvg = partyVotes("R");
statistics.democratsAvg = partyVotes("D");
statistics.independentsAvg = partyVotes("I");
statistics.leastEngagedBottom = leastEngaged();
statistics.mostEngagedTop = engaged();
statistics.leastVotes = lowVotes();
statistics.mostVotes = highVotes();

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
    var leastMissed = [];
    members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    for (var i = 0; i < members.length; i++) {
        // console.log(members[i].missed_votes , members[i].missed_votes_pct);
        if (i < members.length * 0.1) {
            leastMissed.push(members[i]);
        } else if (members[i].missed_votes_pct == members[i + 1].missed_votes_pct) {
            leastMissed.push(members[i + 1]);

        } else {
            break;
        }
    }
    return leastMissed;
}

function leastEngaged() {

    members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    for (var i = 0; i < members.length; i++) {
        var missedVotes = [];
        var row = tblBody.insertRow();
        if (i < members.length * 0.1) {
            missedVotes.push(members[i]);
        } else if (members[i].missed_votes_pct == members[i + 1].missed_votes_pct) {
            missedVotes.push(members[i + 1]);

        } else {
            break;
        }
        row.insertCell().innerHTML = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        row.insertCell().innerHTML = members[i].missed_votes;
        row.insertCell().innerHTML = members[i].missed_votes_pct;
        
    };
}

function lowVotes() {
    var missedV = [];
    members.sort(function (a, b) {
        return b.missed_votes - a.missed_votes;
    });
    for (var i = 0; i < members.length; i++) {
        if (i < members.length * 0.1) {
            missedV.push(members[i]);
        } else if (members[i].missed_votes == members[i + 1].missed_votes) {
            missedV.push(members[i + 1]);

        } else {
            break;
        }
    }
    return missedV;
}

function highVotes() {
    var highPerc = [];
    members.sort(function (a, b) {
        return a.missed_votes - b.missed_votes;
    });
    for (var i = 0; i < members.length; i++) {
        if (i < members.length * 0.1) {
            highPerc.push(members[i]);
        } else if (members[i].missed_votes == members[i + 1].missed_votes) {
            highPerc.push(members[i + 1]);

        } else {
            break;
        }
    }
    return highPerc;
}
