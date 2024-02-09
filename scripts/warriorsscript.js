//Set Gamestate
GameState = {
    moon: 0,
    territories: [{
    //0
    name: "Sunningrocks"
    },{
    //1
    name: "Thunderpath Tunnels"
    },{
    //2
    name: "RiverClan Camp"
    },{
    //3
    name: "Owltree"
    },{
    //4
    name: "Burnt Sycamore"
    },{
    //5
    name: "ShadowClan Camp"
    },{
    //6
    name: "Rivers"
    },{
    //7
    name: "Tunnels"
    },{
    //8
    name: "Gorge South Bank"
    },{
    //9
    name: "WindClan Camp"
    },{
    //10
    name: "Rabbit Warrens"
    },{
    //11
    name: "Marshes"
    },{
    //12
    name: "ThunderClan Camp"
    },{
    //13
    name: "Forest"
    },{
    //14
    name: "Treecut Place"
    },{
    //15
    name: "Carrionplace"
    },{
    //16
    name: "Snakerocks"
    },{
    //17
    name: "Sandy Hollow"
    },{
    //18
    name: "Twoleg Farm"
    },{
    //19
    name: "Gorge North Bank"
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
    }],
    version: "0.5.3"
};

//Global Arrays
const seasons = ["Newleaf","Greenleaf","Leaffall","Leafbare"];

function populateterritories() {
    for (let x in GameState.territories) {
            GameState.territories[x].newleaf = rounddecimal((Math.random()+0.3));
            GameState.territories[x].greenleaf = rounddecimal((Math.random()+0.5)*1.2);
            GameState.territories[x].leaffall = rounddecimal((Math.random()+0.2)*0.8);
            GameState.territories[x].leafbare = rounddecimal((Math.random())*0.4)
    }
}

function territoryowners() {
    for (let x in GameState.territories) {
        if (ThunderClan.territories.includes(Math.round(x))) {
            GameState.territories[x].owner = "ThunderClan"
        } else if (ShadowClan.territories.includes(Math.round(x))) {
            GameState.territories[x].owner = "ShadowClan"
        } else if (WindClan.territories.includes(Math.round(x))) {
            GameState.territories[x].owner = "WindClan"
        } else if (RiverClan.territories.includes(Math.round(x))) {
            GameState.territories[x].owner = "RiverClan"
        } else  {
            GameState.territories[x].owner = "Unowned";
        }
    }
}


//General Variables
GameState.season = seasons[0];

//Function to update general variables
function generalvariables() {
    document.getElementById("moon").innerHTML = GameState.moon;
    document.getElementById("season").innerHTML = GameState.season;
    document.getElementById("all_territories").innerHTML = listallterritories();
    document.getElementById("version").innerHTML = GameState.version;
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
        birthmoon: -15
    },{
        prefix: "Tiger",
        suffix: "claw",
        title: "Warrior",
        birthmoon: -45
    },{
        prefix: "Blue",
        suffix: "star",
        title: "Leader",
        birthmoon: -80
    }],
    territories: [
        0,3,12,14,16,17,20
    ]
}

ShadowClan = {
    food: 100,
    members:[
    {
        prefix: "Broken",
        suffix: "star",
        title: "Leader",
        birthmoon: -80
    },{
        prefix: "Black",
        suffix: "foot",
        title: "Deputy",
        birthmoon: -75
    }],
    territories: [
        1,4,5,11,15,22
    ]
}

WindClan = {
    food: 100,
    members:[
    {
        prefix: "Tall",
        suffix: "star",
        title: "Leader",
        birthmoon: -80
    },{
        prefix: "Green",
        suffix: "tail",
        title: "Deputy",
        birthmoon: -34
    }],
    territories: [
        7,9,10,18,19,23
    ]
}

RiverClan = {
    food: 100,
    members:[
    {
        prefix: "Crooked",
        suffix: "star",
        title: "Leader",
        birthmoon: -80
    }],
    territories: [
        2,6,8,13,21,24
    ]
}

const clans = [ThunderClan,ShadowClan,WindClan,RiverClan];

//Function to update Clan variables
function clanvariables() {
//Update variables

    //Update Foodcost based on pupulation
    for (let x in clans) {
        clans[x].population = clans[x].members.length;
        clans[x].foodcost = clans[x].population*-2;
    }
    //Update territory count
    for (let x in clans) {
        clans[x].territorycount = clans[x].territories.length;
    }

    //Update foodgain based on territories
    for (let j in clans) {
        cclan = clans[j];
        cclan.foodgain = 0;
        for (let i in cclan.territories) {
            c = cclan.territories[i];
            cclan.foodgain += GameState.territories[c].leaffall
        };
        cclan.foodgain = rounddecimal(cclan.foodgain)
    }

    //Set the amount of food that the total will change by, not counting food decay
    for (let j in clans) {
        cclan = clans[j];
        cclan.foodchange = rounddecimal(cclan.foodgain + cclan.foodcost);
    }

//Update HTML variables
    //ThunderClan
    document.getElementById("tc_food").innerHTML = ThunderClan.food;
    document.getElementById("tc_population").innerHTML = ThunderClan.population;
    document.getElementById("tc_foodcost").innerHTML = ThunderClan.foodcost;
    document.getElementById("tc_foodgain").innerHTML = ThunderClan.foodgain;
    document.getElementById("tc_foodchange").innerHTML = ThunderClan.foodchange;
    document.getElementById("tc_territorycount").innerHTML = ThunderClan.territorycount;
    document.getElementById("tc_territories").innerHTML = listterritories(ThunderClan);
    document.getElementById("tc_members").innerHTML = listmembers(ThunderClan);

    //ShadowClan
    document.getElementById("sc_food").innerHTML = ShadowClan.food;
    document.getElementById("sc_population").innerHTML = ShadowClan.population;
    document.getElementById("sc_foodcost").innerHTML = ShadowClan.foodcost;
    document.getElementById("sc_foodgain").innerHTML = ShadowClan.foodgain;
    document.getElementById("sc_foodchange").innerHTML = ShadowClan.foodchange;
    document.getElementById("sc_territorycount").innerHTML = ShadowClan.territorycount;
    document.getElementById("sc_territories").innerHTML = listterritories(ShadowClan);
    document.getElementById("sc_members").innerHTML = listmembers(ShadowClan);

    //WindClan
    document.getElementById("wc_food").innerHTML = WindClan.food;
    document.getElementById("wc_population").innerHTML = WindClan.population;
    document.getElementById("wc_foodcost").innerHTML = WindClan.foodcost;
    document.getElementById("wc_foodgain").innerHTML = WindClan.foodgain;
    document.getElementById("wc_foodchange").innerHTML = WindClan.foodchange;
    document.getElementById("wc_territorycount").innerHTML = WindClan.territorycount;
    document.getElementById("wc_territories").innerHTML = listterritories(WindClan);
    document.getElementById("wc_members").innerHTML = listmembers(WindClan);

    //RiverClan
    document.getElementById("rc_food").innerHTML = RiverClan.food;
    document.getElementById("rc_population").innerHTML = RiverClan.population;
    document.getElementById("rc_foodcost").innerHTML = RiverClan.foodcost;
    document.getElementById("rc_foodgain").innerHTML = RiverClan.foodgain;
    document.getElementById("rc_foodchange").innerHTML = RiverClan.foodchange;
    document.getElementById("rc_territorycount").innerHTML = RiverClan.territorycount;
    document.getElementById("rc_territories").innerHTML = listterritories(RiverClan);
    document.getElementById("rc_members").innerHTML = listmembers(RiverClan);


}

//Saving Functions
function save() {
    //save general variables
    localStorage.setItem("GameState", JSON.stringify(GameState));

    //save ThunderClan variables
    localStorage.setItem("ThunderClan", JSON.stringify(ThunderClan));
    localStorage.setItem("ShadowClan", JSON.stringify(ShadowClan));
    localStorage.setItem("WindClan", JSON.stringify(WindClan));
    localStorage.setItem("RiverClan", JSON.stringify(RiverClan));
}

function load() {
    //load States
    GameStateNew = JSON.parse(localStorage.getItem("GameState"));
    if (GameStateNew.version === GameState.version) {
        ThunderClan = JSON.parse(localStorage.getItem("ThunderClan"));
        ShadowClan = JSON.parse(localStorage.getItem("ShadowClan"));
        WindClan = JSON.parse(localStorage.getItem("WindClan"));
        RiverClan = JSON.parse(localStorage.getItem("RiverClan"));
        GameState = GameStateNew;
    } else {
        alert("Game Version mismatch! Cannot load save!")
    }

    //Update Variables
    updatevariables();
}

//General Functions
function nextmoon() {
    //General Updates
    GameState.moon++

//Thunder Clan Updates

    //Add food from territories
    for (let i in clans) {
        incrementfood(clans[i],clans[i].foodchange)
    }

    //Food Decay
    for (let j in clans) {
        cclan = clans[j];
        cclan.food = rounddecimal(cclan.food/2)
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
        membernames += "<pre/>" + clan.members[x].prefix + clan.members[x].suffix +"<br/>  Title: " + clan.members[x].title + "<br/>  Age: " + (GameState.moon - clan.members[x].birthmoon)
    };
    return(membernames)
}

function listterritories(clan) {
    let territorynames = " ";
    for (let y in clan.territories) {
        ct = clan.territories[y];
        territorynames += "<pre/>" + ct + ". " + GameState.territories[ct].name + "<br/>  Owned By: " + GameState.territories[ct].owner + "<br/>  Newleaf: " + GameState.territories[ct].newleaf + "<br/>  Greenleaf: " + GameState.territories[ct].greenleaf + "<br/>  Leaffall: " + GameState.territories[ct].leaffall + "<br/>  Leafbare: " + GameState.territories[ct].leafbare + "<br/>"
    }
    return(territorynames)
}

function listallterritories() {
    let territorynames = " ";
    for (let y in GameState.territories) {
        territorynames += "<pre/>" + y + ". " + GameState.territories[y].name + "<br/>  Owned By: " + GameState.territories[y].owner + "<br/>  Newleaf: " + GameState.territories[y].newleaf + "<br/>  Greenleaf: " + GameState.territories[y].greenleaf + "<br/>  Leaffall: " + GameState.territories[y].leaffall + "<br/>  Leafbare: " + GameState.territories[y].leafbare + "<br/>"
    }
    return(territorynames)
}

function incrementfood(clan,amount) {
    clan.food += amount;
    clan.food = rounddecimal(clan.food)
    updatevariables();
}

function incrementmembers(clan) {
    let new_member = prompt("Give this kit a prefix!")
    clan.members.push({
        prefix: new_member,
        suffix: "kit",
        title: "Kitten",
        birthmoon: GameState.moon
    });
    clanvariables();
}

//Non-game functions
function dropdown(id) {
    let x = document.getElementById(id);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function rounddecimal(number) {
    rounded = Math.round(number * 10) / 10;
    return rounded
}

function initialize() {
    populateterritories();
    updatevariables()
}

function updatevariables() {
    territoryowners();
    clanvariables();
    generalvariables();
}

function testtoken() {
    console.log(localStorage.getItem("GameState"));
    console.log(localStorage.getItem("ThunderClan"));
    console.log(localStorage.getItem("ShadowClan"));
    console.log(localStorage.getItem("WindClan"));
    console.log(localStorage.getItem("RiverClan"));
}

function testarray() {
    console.log(GameState)
}
