//LOG CORE CODE
const gameBoard = document.getElementById('game');
const log = document.getElementById('log');
const seedPrice = 50;

//checks if the enter key was pressed, if it was, acts as if the buttos was pressed
document.addEventListener("keyup", function(event) {
  if (event.code === 'Enter') {
    document.getElementById("logTrigger").click();
}});

//here it checks if whatever you're typing's a command, the check in this case is "/"
function logListener(){
  var userLastInput = document.getElementById('logUserInput').value;
  log.innerHTML += "<p class='logEntry'>" + userLastInput + "</p>";
  document.getElementById('logUserInput').value = "";
  log.scrollTop = log.scrollHeight;;
  if (userLastInput[0] === "/"){
    userLastInput = userLastInput.substring(1);
    
    //here it looks up what command was used
    var command = userLastInput.replace(/[^a-z]/g, '');
    
    var seedCurrency = document.getElementById("seeds");
    var seedCurrencyContent = seedCurrency.textContent;
    
    var seedTypes = ["seed1", "seed2", "seed3"];
    seedType = Math.floor(Math.random() * seedTypes.length);
    seeds = Number(seedCurrencyContent);
    
    switch (command){
      case "water":
        var coordCheck = userLastInput.replace(/[^0-9]/g, '');
        var coords = { x: coordCheck[0] ,  y: coordCheck[1] };
        var xy = xyCheck(coordCheck, command);
        var idBool = idCheck(coordCheck, command);
        if(xy != 0){
            if (idBool == 1){
              elementID.classList.add("watered");
            } else if (idBool == 0){
                log.innerHTML += "<p class='logEntry commandText'>There's nothing on that square tho :(</p>";
                log.scrollTop = log.scrollHeight;;
        }};
      break;
      case "plant":
        var coordCheck = userLastInput.replace(/[^0-9]/g, '');
        var coords = { x: coordCheck[0] ,  y: coordCheck[1] };
        var idBool = idCheck(coordCheck, command);
        var xy = xyCheck(coordCheck, command);
        if (xy != 0){

          if (seeds > 0){
            var seed = document.createElement("div");
            if (idBool == 1){
  
              log.innerHTML += "<p class='logEntry commandText'>There's already a seed in there, chief >:(</p>";
              log.scrollTop = log.scrollHeight;;

            } else if (idBool == 0){
              seed.style.gridRowStart = coords.x;
              seed.style.gridColumnStart = coords.y;
              seed.classList.add(seedTypes[seedType]);
              seed.setAttribute("id", coordCheck);
              gameBoard.appendChild(seed);
              log.innerHTML += "<p class='logEntry commandText'>Planted on x:" + coords.x + " y:" + coords.y  + "</p>";
              log.scrollTop = log.scrollHeight;;
      
              seeds = seeds - 1;
              seedCurrency.textContent = seeds;
          }}else{
              log.innerHTML += "<p class='logEntry commandText'>Alto ahi loca >:(</p>";
              log.scrollTop = log.scrollHeight;;
        }};
      break;
      case "help":
        log.innerHTML +=
          "<p class='logEntry commandText'>"+
          "/plant (x y): The most basic of actions, requires x & y coordinates to work and CONSUMES 1 SEED :)"+
          "<br><br>/water: Gives a seed of your choosing some H2O for it to grow big and stronk"+
          "</p>";
          log.scrollTop = log.scrollHeight;;
      break;
      default: log.innerHTML += "<p class='logEntry commandText'>Could not recognize Command :( If you need help try typing /help </p>" ; 
      log.scrollTop = log.scrollHeight;; break;
    }   
    }};

function idCheck(coordCheck, command){
  elementID = document.getElementById(coordCheck);
  if(elementID) { var idBool = 1; } else { idBool = 0; }
  return idBool;
}
function xyCheck(coordCheck, command){
  if (coordCheck == '' || coordCheck == null){
    log.innerHTML += "<p class='logEntry commandText'>Be sure to add x y coordinates at the end of the command! (Example: /" 
    + command +" 4, 4)</p>";
    log.scrollTop = log.scrollHeight;;
    return xy = 0;
}}

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
    log.innerHTML += "<p class='logEntry commandText'>You don't have enough corn tho >:(</p>";
    log.scrollTop = log.scrollHeight;;
  } 
}
