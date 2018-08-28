if (window.location.pathname == '/MOD%201/senate.html') {

    start('https://api.propublica.org/congress/v1/113/senate/members.json');
}

if (window.location.pathname == '/MOD%201/house.html') {

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
        .catch(onDataFetched);

}

function onDataFetched(response) {
    response.json()
        .then(onConversionToJsonSuccessful)
        .catch(onConversionToJsonFailed);
}

function onDataFetchFailed(error) {
    console.log("I have failed in life", error);
}

function onConversionToJsonSuccessful(json) {
    console.log("success!!!!", json);

    data = json;
    document.getElementById("myloader").style.display = "none";
    members = data.results["0"].members;
    tblBody = document.getElementById("senate-data");
    democrat = document.getElementById("democrat");
    independent = document.getElementById("independent");
    republican = document.getElementById("republican");
    filter = document.getElementById("statefilter");
    allCheckboxes = document.getElementById("checkboxes");
    selectState = document.getElementById("allstates");
    txt = document.getElementById("noparty");

    $(displayData).ready(function () {
        onConversionToJsonSuccessful();
    });

    createDropdownFilter();
    showAlert();

    allstates.addEventListener('change', function () {
        showAlert();
    });

    democrat.addEventListener('click', function () {
        showAlert();
    });
    republican.addEventListener('click', function () {
        showAlert();
    });
    independent.addEventListener('click', function () {
        showAlert();
    });
}

//Function showing 'no matches' when no data is available to display
function showAlert() {
    tblBody.innerHTML = '';
    txt.style.display = 'none';
    var dataByFilter = filterData();
    if (dataByFilter.length > 0) {
        displayData(dataByFilter);
    } else {
        txt.style.display = 'block';
    }
}


//Function creates table displaying data
function displayData(members) {

    for (var i = 0; i < members.length; i++) {

        var member = members[i];
        var row = tblBody.insertRow();
        middle = (members.middle_name != null ? members.middle_name : "");
        var name = member.first_name + " " + middle + " " + member.last_name;
        var link = name.link(member.url);

        row.insertCell().innerHTML = link;
        row.insertCell().innerHTML = member.party;
        row.insertCell().innerHTML = member.state;
        row.insertCell().innerHTML = member.seniority;
        row.insertCell().innerHTML = member.votes_with_party_pct;
    };
}


//Display data in table - filtered by State & checkboxes
function filterData() {
    var filteredArray = [];
    for (var i = 0; i < members.length; i++) {
        if (selectState.value == members[i].state || selectState.value == 'all') {
            if (democrat.checked == true && members[i].party == "D") {
                filteredArray.push(members[i]);
            }
            if (independent.checked == true && members[i].party == "I") {
                filteredArray.push(members[i]);
            }
            if (republican.checked == true && members[i].party == "R") {
                filteredArray.push(members[i]);
            }
        }

    }
    return filteredArray;
}


//filter data by State
function createDropdownFilter() {
    var allStates = [];
    for (var i = 0; i < members.length; i++) {
        if (!allStates.includes(members[i].state)) {
            allStates.push(members[i].state);
            var el = document.createElement("option");
            var opt = members[i].state;
            el.textContent = opt;
            el.value = opt;
            selectState.appendChild(el);
        }
    }
}


//Read more/Read less on About Page
$("#toggle").click(function () {
    var elem = $("#toggle").text();
    if (elem == "Read More") {
        $("#toggle").text("Read Less");
        $(".panel").slideDown();
    } else {
        $("#toggle").text("Read More");
        $(".panel").slideUp();
    }
});

function loadTable() {
    tableBody = document.getElementsById("parties");
    if (data.onload = true) {
        tableBody.style.display = "block";
    }
}
