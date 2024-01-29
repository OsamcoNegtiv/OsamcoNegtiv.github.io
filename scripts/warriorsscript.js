//General Variables
let moon = 0;
document.getElementById("moon").innerHTML = moon;
const seasons = ["Newleaf","Greenleaf","Leaffall","Leafbare"];
let season = seasons[0];
document.getElementById("season").innerHTML = season;

//Function to update general variables
function generalvariables() {
    document.getElementById("moon").innerHTML = moon;
    document.getElementById("season").innerHTML = season;
}


//Thunder Clan Variables
let tc_members = ["Firepaw","Tigerclaw","Bluestar"];
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

function save() {
    //save general variables
    localStorage.setItem("moon", JSON.stringify(moon));

    //save ThunderClan variables
    localStorage.setItem("tc_food", JSON.stringify(tc_food));
    localStorage.setItem("tc_members", JSON.stringify(tc_members));
}

function load() {
    //load general variables
    moon = localStorage.getItem("moon");

    //load ThunderClan variables
    tc_food = localStorage.getItem("tc_food");
    tc_members = JSON.parse(localStorage.getItem("tc_members"));

    //reload all displayed variables
    generalvariables();
    thunderclanvariables();
}

function testtoken() {
    console.log(localStorage.getItem("tc_food"));
    console.log(localStorage.getItem("tc_members"));
    console.log(localStorage.getItem("moon"));
}

//General Functions
function nextmoon() {
    //General Updates
    moon++
    generalvariables();

    //Thunder Clan Updates
    tc_food = tc_food -= tc_foodcost;
    thunderclanvariables();
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

//Non-game functions
function dropdown() {
    let x = document.getElementById("devTools");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
