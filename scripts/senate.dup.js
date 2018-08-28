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
    document.getElementById("myloader").style.display="none";
    members = data.results["0"].members;
    tblBody = document.getElementById("senate-data");
    democrat = document.getElementById("democrat");
    independent = document.getElementById("independent");
    republican = document.getElementById("republican");
    filter = document.getElementById("statefilter");
    allCheckboxes = document.getElementById("checkboxes");
    select = document.getElementById("allstates");
    txt = document.getElementById("noparty");
    
   
    createDropdownFilter();
    showAlert()

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

//if (window.location.pathname == '/home-starter-page.html') {
//
//
//} else {
//    var members = data.results["0"].members;
//    console.log(members);

//var tblBody = document.getElementById("senate-data");
//var democrat = document.getElementById("democrat");
//var independent = document.getElementById("independent");
//var republican = document.getElementById("republican");
//var filter = document.getElementById("statefilter");
//var allCheckboxes = document.getElementById("checkboxes");
//var select = document.getElementById("allstates");
//var txt = document.getElementById("noparty");
//    
//var i;




//createDropdownFilter();
//showAlert()
//
//allstates.addEventListener('change', function () {
//   showAlert();
//});
//
//democrat.addEventListener('click', function () {
//   showAlert();
//});
//republican.addEventListener('click', function () {
//    showAlert();
//});
//independent.addEventListener('click', function () {
//    showAlert();
//});

//function alertFunction() {
//    alert("Please select a party");
//}


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

function displayData(members) {

    for (var i = 0; i < members.length; i++) {

        var member = members[i];
        var row = tblBody.insertRow();
        var name;
        if (member.middle_name == null || "") {
            name = member.first_name + " " + member.last_name;
        } else {
            name = member.first_name + " " + member.middle_name + " " + member.last_name;
        }
        var link = name.link(member.url);

        row.insertCell().innerHTML = link;
        row.insertCell().innerHTML = member.party;
        row.insertCell().innerHTML = member.state;
        row.insertCell().innerHTML = member.seniority;
        row.insertCell().innerHTML = member.votes_with_party_pct;
    };
}

function filterData() {
    var filteredArray = [];
    for (i = 0; i < members.length; i++) {
        if (select.value == members[i].state || select.value == 'all') {
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

function createDropdownFilter() {
    var allStates = [];

    for (i = 0; i < members.length; i++) {
        if (!allStates.includes(members[i].state)) {
            allStates.push(members[i].state);
            var el = document.createElement("option");
            var opt = members[i].state;
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    }
}

function loading(){
 var loader = document.getElementById("myloader");
if (document.onload == true){
    loader.style.display="none";
} 
}


/*function showStates(){
 var options = document.createElementbyId("allstates");
for (i=0; i < options.length; i++){
    if(state.checked == true){
        options = 
    } 
}  
*/
//function appendDropdown() {
//    for (var i = 0; i < usStates.length; i++) {
//        var opt = usStates[i];
//        el.textContent = opt;
//        el.value = opt;
//        select.appendChild(el);
//    }
//}
