if (window.location.pathname == "/MOD%201/Party-loyalty-senate.start.html"){
    start('https://api.propublica.org/congress/v1/113/senate/members.json');
}

if (window.location.pathname == "/MOD%201/Party-loyalty-house.start.html") {  start('https://api.propublica.org/congress/v1/113/house/members.json');
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
     document.getElementById("myloader").style.display="none";
    data = json;

 members = data.results["0"].members;
 independents = [];
 republicans = [];
 middle = (members.middle_name != null ? members.middle_name : "");
 tblbody = document.getElementById("leastloyal-data");
 tblbody1 = document.getElementById("mostloyal-data");
 statistics = {
    "Democrats": numberParty2("D"), //number of democrats
    "Republicans": numberParty2("R"), //number republicans
    "Independents": numberParty2("I"), //number independents
    "republicansAvg": partyVotes("R"), //average republicans
    "democratsAvg": partyVotes("D"), //average democrats
    "independentsAvg": partyVotes("I"), //average independents
    "Total": a(),
    "LeastLoyal": lowestEngagement(),
    "MostLoyal": highestEngagement()
}
fillStatisticsTable();
}
function onConversionToJsonFailed(error) {
    console.log("Not a json mate!", error);
}

//function numberParty(letter, party) {
//    for (i = 0; i < members.length; i++) {
//        if (members[i].party == letter) {
//            statistics += 1;
//        }
//    }
//}
//second option to return the party taking only one parameter - the letter (letter is not a key word, could be anything -god, carror, etc)
function numberParty2(letter) {
    var total = 0;
    for (i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            total += 1;
        }
    }
    return total;
}


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
//statistics.republicansAvg = partyVotes("R");
//statistics.democratsAvg = partyVotes("D");
//statistics.independentsAvg = partyVotes("I");
//statistics.LeastLoyal = lowestEngagement();
//statistics.MostLoyal = highestEngagement();


function highestEngagement() {
    var highestEng = [];
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct; //sort all members by the votes with party 
    });
    for (var i = 0; i < members.length; i++) {
        var row = tblbody1.insertRow();
        var onlyPartyVotes =
            (members[i].votes_with_party_pct * members[i].total_votes) / 100;
        // console.log('i: ', i);
        if (i < members.length * 0.1) {
            highestEng.push(members[i]);
        } else if (members[i].votes_with_party_pct == members[i + 1].votes_with_party_pct) {
            highestEng.push(members[i + 1])
        } else {
            break;
        }
        row.insertCell().innerHTML = members[i].first_name + " " + middle + "" + members[i].last_name;
        row.insertCell().innerHTML = onlyPartyVotes.toFixed();
        row.insertCell().innerHTML = members[i].votes_with_party_pct;
    }

}

function lowestEngagement() {
    var lowestEng = [];
    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    for (var i = 0; i < members.length; i++) {
        var onlyPartyVotes =
            (members[i].votes_with_party_pct * members[i].total_votes) / 100;
        var row = tblbody.insertRow();
        if (i < members.length * 0.1) {
            lowestEng.push(members[i]);
        } else if (members[i] == members[i + 1]) {
            lowestEng.push(members[i + 1]);
        } else {
            break;
        }
        row.insertCell().innerHTML = members[i].first_name + " " + middle + "" + members[i].last_name;
        row.insertCell().innerHTML = onlyPartyVotes.toFixed();
        row.insertCell().innerHTML = members[i].votes_with_party_pct;
    }

}

//function fillStatisticsTable() {
//
//    document.getElementById('rep-ttl').innerHTML = statistics.Republicans;
//    document.getElementById('rep-avg').innerHTML = statistics.republicansAvg;
//}

function fillStatisticsTable() {

    document.getElementById('rep-ttl').innerHTML = statistics.Republicans;
    document.getElementById('rep-avg').innerHTML =partyVotes("R").toFixed() + "%";
    document.getElementById("dem-ttl").innerHTML = statistics.Democrats;
    document.getElementById("dem-avg").innerHTML =partyVotes("D").toFixed()+ "%";
    document.getElementById("indep-ttl").innerHTML = statistics.Independents;
    document.getElementById("indep-avg").innerHTML = partyVotes("I").toFixed();
    document.getElementById("total-number").innerHTML = numberParty2("D") + numberParty2("I") + numberParty2("R");
    document.getElementById("percentage").innerHTML = statistics.Total + '%';

}
