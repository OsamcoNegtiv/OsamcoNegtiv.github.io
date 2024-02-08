//Set Gamestate
GameState = {
    moon: 0
};

//Global Arrays
const seasons = ["Newleaf","Greenleaf","Leaffall","Leafbare"];
const territories = [{
    //0
    name: "Sunningrocks"
    },{
    //1
    name: "ThunderpathTunnels"
    },{
    //2
    name: "RiverClanCamp"
    },{
    //3
    name: "Owltree"
    },{
    //4
    name: "BurntSycamore"
    },{
    //5
    name: "ShadowClanCamp"
    },{
    //6
    name: "Rivers"
    },{
    //7
    name: "Tunnels"
    },{
    //8
    name: "GorgeSouthBank"
    },{
    //9
    name: "WindClanCamp"
    },{
    //10
    name: "RabbitWarrens"
    },{
    //11
    name: "Marshes"
    },{
    //12
    name: "ThunderClanCamp"
    },{
    //13
    name: "Forest"
    },{
    //14
    name: "TreecutPlace"
    },{
    //15
    name: "Carrionplace"
    },{
    //16
    name: "Snakerocks"
    },{
    //17
    name: "SandyHollow"
    },{
    //18
    name: "TwolegFarm"
    },{
    //19
    name: "GorgeNorthBank"
    },{
    //20
    name: "Tallpines"
    },{
    //21
    name: "Shallows"
    },{
    //22
    name: "Roadkill"
    },{
    //23
    name: "Highstones"
    },{
    //24
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
    }],
    territories: [
        0,1,9,14,3
    ]
}

ShadowClan = {
    food: 100,
    members:[
    {
        prefix: "Broken",
        suffix: "star",
        title: "Leader",
        age: 80
    },{
        prefix: "Lost",
        suffix: "Leaf",
        title: "Leader",
        age: 80
    }],
    territories: [
        2,4
    ]
}

WindClan = {
    food: 100,
    members:[
    {
        prefix: "Tall",
        suffix: "star",
        title: "Leader",
        age: 80
    },{
        prefix: "Green",
        suffix: "tail",
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

//Function to update Clan variables
function clanvariables() {
//Update variables

    for (let x in clans) {
        clans[x].population = clans[x].members.length;
        clans[x].foodcost = clans[x].population*2;
    }

    for (let j in clans) {
        cclan = clans[j];
        cclan.foodgain = 0;
        for (let i in cclan.territories) {
            c = cclan.territories[i];
            cclan.foodgain += territories[c].leaffall
        };
        cclan.foodgain = rounddecimal(cclan.foodgain)
    }

//Update HTML variables
    //ThunderClan
    document.getElementById("tc_food").innerHTML = ThunderClan.food;
    document.getElementById("tc_population").innerHTML = ThunderClan.population;
    document.getElementById("tc_foodcost").innerHTML = ThunderClan.foodcost;
    document.getElementById("tc_nextmoonfood").innerHTML = ThunderClan.foodgain;

    //RiverClan


    //ShadowClan
    document.getElementById("sc_food").innerHTML = ShadowClan.food;
    document.getElementById("sc_population").innerHTML = ShadowClan.population;
    document.getElementById("sc_foodcost").innerHTML = ShadowClan.foodcost;
    document.getElementById("sc_nextmoonfood").innerHTML = ShadowClan.foodgain;

    //WindClan


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
    updatevariables();
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

    //Add food from territories
    for (let i in clans) {
        incrementfood(clans[i],clans[i].foodgain)
    }


    //Remove Food Cost for Moon
    for (let i in clans) {
        incrementfood(clans[i],-clans[i].foodcost);
    }
    //Update Variables
    updatevariables();

    //Display Clan info in console
    for (let i in clans) {
        console.log(clans[i])

    }
}

//ThunderClan Functions

function listmembers(clan) {
    let membernames = " ";
    for (let x in clan.members) {
        membernames += clan.members[x].prefix + clan.members[x].suffix + "\n"
    }
    alert(membernames)
}

function listterritories(clan) {
    let territorynames = " ";
    for (let y in clan.territories) {
        ct = clan.territories[y];
        territorynames += territories[ct].name + "\n"
    }
    alert(territorynames)
}

function incrementfood(clan,amount) {
    clan.food += amount;
    updatevariables();
}

function incrementmembers(clan) {
    let new_member = prompt("Give this kit a prefix!")
    clan.members.push({
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
    populateterritories();
    clanvariables();
    generalvariables()
}

function updatevariables() {
    clanvariables();
    generalvariables()
}

function testarray() {
    alert(ThunderClan.foodgain)
}
