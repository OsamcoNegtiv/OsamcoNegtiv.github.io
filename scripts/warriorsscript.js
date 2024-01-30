//Set Gamestate
GameState = {
    moon: 0
};

//Global Arrays
const seasons = ["Newleaf","Greenleaf","Leaffall","Leafbare"];
const territories = [{
    name: "Sunningrocks"
    },{
    name: "ThunderpathTunnels"
    },{
    name: "RiverClanCamp"
    },{
    name: "Owltree"
    },{
    name: "BurntSycamore"
    },{
    name: "ShadowClanCamp"
    },{
    name: "Rivers"
    },{
    name: "Tunnels"
    },{
    name: "GorgeSouthBank"
    },{
    name: "WindClanCamp"
    },{
    name: "RabbitWarrens"
    },{
    name: "Marshes"
    },{
    name: "ThunderClanCamp"
    },{
    name: "Forest"
    },{
    name: "TreecutPlace"
    },{
    name: "Carrionplace"
    },{
    name: "Snakerocks"
    },{
    name: "SandyHollow"
    },{
    name: "TwolegFarm"
    },{
    name: "GorgeNorthBank"
    },{
    name: "Tallpines"
    },{
    name: "Shallows"
    },{
    name: "Roadkill"
    },{
    name: "Highstones"
    },{
    name: "Riverbed"
    }
]

function populateterritories() {
    for (let x in territories) {
            territories[x].newleaf = rounddecimal(Math.random());
            territories[x].greenleaf = rounddecimal(Math.random() * 1.2);
            territories[x].leaffall = rounddecimal(Math.random() * 0.8);
            territories[x].leafbare = rounddecimal(Math.random() * 0.4)
    }
}


//General Variables
GameState.season = seasons[0];

//Function to update general variables
function generalvariables() {
    document.getElementById("moon").innerHTML = GameState.moon;
    document.getElementById("season").innerHTML = GameState.season;
}


//Thunder Clan Variables

//ThunderClan object
ThunderClan = {
    food: 100,
    members:[
    {
        prefix: "Fire",
        suffix: "paw",
        title: "Apprentice",
        age: 80
    },{
        prefix: "Tiger",
        suffix: "claw",
        title: "Warrior"
    },{
        prefix: "Blue",
        suffix: "star",
        title: "Leader"
    }]
}

ShadowClan = {
    food: 100,
    members:[
    {
        prefix: "Broken",
        suffix: "star",
        title: "Leader",
        age: 80
    }]
}

WindClan = {
    food: 100,
    members:[
    {
        prefix: "Tall",
        suffix: "star",
        title: "Leader",
        age: 80
    }]
}

RiverClan = {
    food: 100,
    members:[
    {
        prefix: "Crooked",
        suffix: "star",
        title: "Leader",
        age: 80
    }]
}

const clans = [ThunderClan,ShadowClan,WindClan,RiverClan];

//Function to update ThunderClan variables
function clanvariables() {
//Update variables

    for (let x in clans) {
        clans[x].population = clans[x].members.length;
        clans[x].foodcost = clans[x].population*2;
    }

//Update HTML variables
    document.getElementById("tc_food").innerHTML = ThunderClan.food;
    document.getElementById("tc_population").innerHTML = ThunderClan.population;
    document.getElementById("tc_foodcost").innerHTML = ThunderClan.foodcost;
}

//Saving Functions
function save() {
    //save general variables
    localStorage.setItem("GameState", JSON.stringify(GameState));

    //save ThunderClan variables
    localStorage.setItem("ThunderClan", JSON.stringify(ThunderClan));
}

function load() {
    //load States
    GameState = JSON.parse(localStorage.getItem("GameState"));
    ThunderClan = JSON.parse(localStorage.getItem("ThunderClan"));

    //Update Variables
    initialize();
}

function testtoken() {
    console.log(localStorage.getItem("GameState"));
    console.log(localStorage.getItem("ThunderClan"));
}

//General Functions
function nextmoon() {
    //General Updates
    GameState.moon++

    //Thunder Clan Updates
    for (let i in clans) {
        incrementfood(clans[i],-clans[i].foodcost);
        console.log(clans[i].food)
    }
    //Update Variables
    initialize();
}

//ThunderClan Functions

function listmembers(clan) {
    let membernames = " ";
    for (let x in clan.members) {
        membernames += clan.members[x].prefix + clan.members[x].suffix + ", "
    }
    alert(membernames)
}

function incrementfood(clan,amount) {
    clan.food += amount;
    initialize();
}

function tcincrementmembers() {
    let new_member = prompt("Give this kit a prefix!")
    ThunderClan.members.push({
        prefix: new_member,
        suffix: "kit",
        title: "Kitten"
    });
    clanvariables();
}

//Non-game functions
function dropdown(id) {
    let x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function rounddecimal(number) {
    rounded = Math.round(number * 10) / 10;
    return rounded
}

function initialize() {
    clanvariables();
    generalvariables();
    populateterritories()
}

function testarray() {
    alert(territories[1].newleaf)
}
