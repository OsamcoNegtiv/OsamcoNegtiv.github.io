//Set Gamestate
GameState = {
    moon: 0,
    seasonnumber: 0,
    season: "Newleaf",
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
            GameState.territories[x].yield = {};
            GameState.territories[x].yield.Newleaf = rounddecimal((Math.random()+0.3));
            GameState.territories[x].yield.Greenleaf = rounddecimal((Math.random()+0.5)*1.2);
            GameState.territories[x].yield.Leaffall = rounddecimal((Math.random()+0.2)*0.8);
            GameState.territories[x].yield.Leafbare = rounddecimal((Math.random())*0.4)
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
        } else {
            GameState.territories[x].owner = "Unowned";
        }
    }
}


//General Variables

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

    //Update territory count
    for (let x in clans) {
        clans[x].territorycount = clans[x].territories.length;

        //Update Foodcost based on pupulation
        clans[x].population = clans[x].members.length;
        clans[x].foodcost = clans[x].population*-2;

        //Update foodgain based on territories
        cclan = clans[x];
        cclan.foodgain = 0;
        cseason = GameState.season;
        for (let i in cclan.territories) {
            c = cclan.territories[i];
            cseason = GameState.season;
            cclan.foodgain += GameState.territories[c].yield[cseason]
        };
        cclan.foodgain = rounddecimal(cclan.foodgain)

        //Set the amount of food that the total will change by, not counting food decay
        cclan = clans[x];
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

    //Season Logic
    if (GameState.moon % 3 === 0) {
        GameState.seasonnumber++
        if (GameState.seasonnumber < 4) {
            GameState.season = seasons[GameState.seasonnumber]
        } else {
            GameState.season = seasons[0];
            GameState.seasonnumber = 0
        }
    }

//Clan Updates
    for (let i in clans) {

        //Food Decay
        cclan = clans[i];
        cclan.food = rounddecimal(cclan.food/2)

        //Add food from territories
        incrementfood(clans[i],clans[i].foodchange)

    };

    //Update Variables
    updatevariables();
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
        territorynames += "<pre/>" + ct + ". " + GameState.territories[ct].name +
        "<br/>  Owned By: " + GameState.territories[ct].owner +
        "<br/>  Newleaf: " + GameState.territories[ct].yield.Newleaf +
        "<br/>  Greenleaf: " + GameState.territories[ct].yield.Greenleaf +
        "<br/>  Leaffall: " + GameState.territories[ct].yield.Leaffall +
        "<br/>  Leafbare: " + GameState.territories[ct].yield.Leafbare +
        "<br/>"
    }
    return(territorynames)
}

function listallterritories() {
    let territorynames = " ";
    for (let y in GameState.territories) {
        territorynames += "<pre/>" + y + ". " + GameState.territories[y].name +
        "<br/>  Owned By: " + GameState.territories[y].owner +
        "<br/>  Newleaf: " + GameState.territories[y].yield.Newleaf +
        "<br/>  Greenleaf: " + GameState.territories[y].yield.Greenleaf +
        "<br/>  Leaffall: " + GameState.territories[y].yield.Leaffall +
        "<br/>  Leafbare: " + GameState.territories[y].yield.Leafbare +
        "<br/>"
    }
    return(territorynames)
}

function incrementfood(clan,amount) {
    clan.food += amount;
    clan.food = rounddecimal(clan.food)
    updatevariables();
}

function incrementmembers(clan) {
    let new_member = prompt("Give this kit a prefix!");
    conflict = false;
    for (let i in clan.members) {
        if (clan.members[i].prefix === new_member) {
            conflict = true;
        }
    }
    if (conflict === true) {
        alert("Sorry, that prefix is already taken!");
        incrementmembers(clan)
    } else {
        clan.members.push({
            prefix: new_member,
            suffix: "kit",
            title: "Kitten",
            birthmoon: GameState.moon
        });
        updatevariables();
    }
}



//function for changing a cat's title, such as kit to paw, or becoming star when becoming leader.
function changetitle(clan,prefix,newsuffix,newtitle) {
    ccat = findcatnumber(clan,prefix);
    clan.members[ccat].suffix = newsuffix;
    clan.members[ccat].title = newtitle;
    updatevariables();
}

//Obtain catnumber from prefix
function findcatnumber(clan,prefix) {
    let conflict = false;
    for (let i in clan.members) {
        if (clan.members[i].prefix === prefix) {
            conflict = true;
            catnum = i
        }
    }
    if (conflict === true) {
        return catnum;
    } else {
        alert("No cat by that prefix! Did you misspell it?");
    }
}

//Kill cat
function killcat(clan,prefix) {
    cnum = findcatnumber(clan,prefix);
    clan.members.splice(cnum,1);
    updatevariables()
}

//Generate a random member in the clan.
function randommember(clan) {
    let x = Math.floor(Math.random()*clan.population+1)
    return(x)
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
    updatevariables();
    GameState.season = seasons[0];
    GameState.seasonnumber = 0;
}

function updatevariables() {
    territoryowners();
    clanvariables();
    generalvariables();
}

//Output the save data straight from localStorage
function testsave() {
    console.log(localStorage.getItem("GameState"));
    console.log(localStorage.getItem("ThunderClan"));
    console.log(localStorage.getItem("ShadowClan"));
    console.log(localStorage.getItem("WindClan"));
    console.log(localStorage.getItem("RiverClan"));
}

//output the current GameState, as well as all of the Clan States
function outputgamestate() {
    for (let i in clans) {
        console.log(clans[i])
    };
    console.log(GameState)
}

function devtool1() {
    let c = prompt("Clan?");
    let cc = clans[c];
    let p = prompt("Prefix?");
    killcat(cc,p);
    alert("The deed has been done.")
}

//Randomly assigned to whatever
function devtooln() {
    killcat(ThunderClan,"Fire");
}
