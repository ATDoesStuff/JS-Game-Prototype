//LOG CORE CODE
const gameBoard = document.getElementById('game');
const log = document.getElementById('log');
const seedPrice = 50;
//checks if the enter key was pressed, if it was, acts as if the buttos was pressed
var input = document.getElementById("logUserInput");
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        document.getElementById("logTrigger").click();
}});

function logScroll() {
    var elem = document.getElementById('log');
    elem.scrollTop = elem.scrollHeight;
};

//here it checks if whatever you're typing's a command, the check in this case is "/"
function logListener(){
    const log = document.getElementById('log');
    var userLastInput = document.getElementById('logUserInput').value;
    log.innerHTML += "<p class='logEntry'>" + userLastInput + "</p>";
    document.getElementById('logUserInput').value = "";
    logScroll();
    if (userLastInput[0] === "/"){
        userLastInput = userLastInput.substring(1);
        commandCheck(userLastInput);
}};

//here it looks up what command was used
function commandCheck(userLastInput){

    var seedCurrency = document.getElementById("seeds");
    var seedCurrencyContent = seedCurrency.textContent;

    var command = userLastInput.replace(/[^a-z]/g, '');
    var coordCheck = userLastInput.replace(/[^0-9]/g, '');
    var coords = { x: coordCheck[0] ,  y: coordCheck[1] };
    var idBool = idCheck(coordCheck, command);

    const seedTypes = ["seed1", "seed2", "seed3"];
    seedType = Math.floor(Math.random() * seedTypes.length);
    seeds = Number(seedCurrencyContent);

    switch (command){
        case "water":
            if (idBool == 1){
                elementID.classList.add("watered");
            } else if (idBool == 0){
                log.innerHTML += "<p class='logEntry commandText'>There's nothing on that square tho :(</p>";
                logScroll();
            }

        break;
        case "plant":
            if (seeds > 0){
                var seed = document.createElement("div");
                if (idBool == 1){
                    log.innerHTML += "<p class='logEntry commandText'>There's already a seed in there, chief >:(</p>";
                    logScroll();
                } else if (idBool == 0){

                    seed.style.gridRowStart = coords.x;
                    seed.style.gridColumnStart = coords.y;
                    seed.classList.add(seedTypes[seedType]);
                    seed.setAttribute("id", coordCheck);
                    gameBoard.appendChild(seed);
                    log.innerHTML += "<p class='logEntry commandText'>Planted on x:" + coords.x + " y:" + coords.y  + "</p>";
                    logScroll();

                    seeds = seeds - 1;
                    seedCurrency.textContent = seeds;
                    
                }
            }else{
                log.innerHTML += "<p class='logEntry commandText'>Alto ahi loca >:(</p>";
                logScroll();
            }
            
        break;
        default: log.innerHTML += "<p class='logEntry commandText'>Could not recognize Command :(</p>" ; logScroll(); break;
}}
function idCheck(coordCheck, command){
    if (coordCheck == '' || coordCheck == null){
        log.innerHTML += "<p class='logEntry commandText'>Be sure to add x y coordinates at the end of the command! (Example: /" + command +" 4, 4)</p>";
        logScroll();
        return;
    } else { elementID = document.getElementById(coordCheck); }
    if(elementID) { var idBool = 1; } else { idBool = 0; }
    return idBool;
}
function seedShop(){
    var seedCurrency = document.getElementById("seeds");
    var seedCurrencyContent = seedCurrency.textContent;

    var cornCurrency = document.getElementById("currency");
    var cornCurrencyContent = cornCurrency.textContent;
    
    var seeds = Number(seedCurrencyContent);
    var corn = Number(cornCurrencyContent);

    if (corn >= seedPrice){
        corn = corn - seedPrice;
        seeds = seeds + 1 ;
        seedCurrency.textContent = seeds;
        cornCurrency.textContent = corn;
    }else{
        log.innerHTML += "<p class='logEntry commandText'>Alto ahi loca >:(</p>";
        logScroll();
    } 
}