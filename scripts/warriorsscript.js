//General Variables
let moon = 0;
document.getElementById("moon").innerHTML = moon;
let season = "Leaffall";
document.getElementById("season").innerHTML = season;


//Thunder Clan Variables
const tc_members = ["Firepaw","Tigerclaw","Bluestar"];
let tc_food = 100;
document.getElementById("tc_food").innerHTML = tc_food;
let tc_population = tc_members.length;
document.getElementById("tc_population").innerHTML = tc_population;
let tc_foodcost = tc_population*2
document.getElementById("tc_foodcost").innerHTML = tc_foodcost;

//Function to update ThunderClan variables
function thunderclanvariables() {
    tc_population = tc_members.length;
        document.getElementById("tc_population").innerHTML = tc_population;
    tc_foodcost = tc_population*2
        document.getElementById("tc_foodcost").innerHTML = tc_foodcost;
        document.getElementById("tc_food").innerHTML = tc_food;
}

//Saving Functions

function save(state) {
    localStorage.setItem(tc_food, JSON.stringify(tc_food));
}

function load() {
    tc_food = number(JSON.parse(localStorage.getItem(tc_food)));
    thunderclanvariables();
}


//General Functions
function nextmoon() {
    //General Updates
    moon++
    document.getElementById("moon").innerHTML = moon;

    //Thunder Clan Updates
    tc_food = tc_food -= tc_foodcost;
    document.getElementById("tc_food").innerHTML = tc_food;
}

//ThunderClan Functions
function tclistmembers() {
    alert(tc_members)
}

function tcincrementfood() {
    tc_food++
    document.getElementById("tc_food").innerHTML = tc_food;
    thunderclanvariables();
}

function tcincrementmembers() {
    let new_member = prompt("Name this new kit!")
    tc_members.push(new_member);
    thunderclanvariables();
}
