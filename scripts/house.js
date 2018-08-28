

var members = data.results["0"].members;
console.log(members);

var tblBody = document.getElementById("senate-data");


var democrat = document.getElementById("democrat");
var independent = document.getElementById("independent");
var republican = document.getElementById("republican");
var filter = document.getElementById("statefilter");
var allCheckboxes = document.getElementById("checkboxes");
var select = document.getElementById("allstates");

var dataByFilter = filterData();
displayData(dataByFilter);

createDropdownFilter();


allstates.addEventListener('change', function () {
    var dataByFilter = filterData();
    displayData(dataByFilter);
});

democrat.addEventListener('click', function () {
    var dataByFilter = filterData();
    displayData(dataByFilter);
});
republican.addEventListener('click', function () {
    var dataByFilter = filterData();
    displayData(dataByFilter);
});
independent.addEventListener('click', function () {
    var dataByFilter = filterData();
    displayData(dataByFilter);
});




function displayData(members) {
    tblBody.innerHTML = '';
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
        //        if (allCheckboxes.checked != true) {
        //            newParty.push("Please select at least one party affiliation");
        //        } 
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
    console.log(allStates.sort())
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