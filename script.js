const numberOfRoles = 17
let savedRoles=[]
let usedRoles=[]
let lastSelectedRole = undefined
let mousePos={x:0,y:0}
for (var i=0;i<numberOfRoles;i++){
  savedRoles.push(false)
}
function updateRoles(){
  //console.log(lastSelectedRole)
  document.getElementById("roleSummary").innerHTML=""
  let roles = ["mafia", "doctor", "investigator", "villager"]
  for (var i=0;i<numberOfRoles;i++){
    if (document.getElementById("selector" + i).checked){
      roles.push(document.getElementById("selector" + i).value)
    }
  }
  for (var i=0;roles.length<parseInt(document.getElementById("playerQuantity").value);i++){
    roles.push("villager")
  }
  usedRoles=roles
  if (document.getElementById("playerQuantity").value<roles.length){
    console.log("Entered player quantity does not match selected roles")
    for (var i=0;i<numberOfRoles;i++){
      document.getElementById("selector" + i).checked=savedRoles[i]
    }
  }else{
    savedRoles=[]
    for (var i=0;i<numberOfRoles;i++){
      savedRoles.push(document.getElementById("selector" + i).checked)
    }
  }
  document.getElementById("roleSummary").innerHTML="A game with " + roles.length + " players; <br>"
  for (var i=0;i<roles.length;i++){
    if (roles.includes("second mafia")){
      if (i==0){
        document.getElementById("roleSummary").innerHTML+="There are 2 mafia" + "<br>"
      }
      if (roles[i]!=="second mafia"&&roles[i]!=="mafia"){
        if (roles[i]!=="villager"){
          document.getElementById("roleSummary").innerHTML+="There is 1 " + roles[i] + "<br>"
        }
      }
    }else{
      if (roles[i]!=="villager"){
        document.getElementById("roleSummary").innerHTML+="There is 1 " + roles[i] + "<br>"
      }
    }
  }
    document.getElementById("roleSummary").innerHTML+="There are " + (roles.filter(role => role=='villager').length) + " villager(s)<br>"
}
//(roles.filter(role => role=='villager').length)
function runGame(){
  document.getElementById("quantitySelector").style.display="none"
  document.getElementById("rolesSelector").style.display="none"
  document.getElementById("roleSummary").style.display="none"
  document.getElementById("instructions").style.display="none"
  document.getElementById("ctrlBtns").style.display="none"
  console.log("run")
  let renderLines = document.createElement("canvas")
  renderLines.id = "renderLines";
  renderLines.width = document.documentElement.clientWidth/3;
  renderLines.height = document.documentElement.clientHeight-30;
  renderLines.style.zIndex = 1;
  renderLines.style.position = "relative"
  renderLines.style.top = 0;
  renderLines.style.left = 0;

  renderLines.addEventListener("mousemove", function(e) {
      var cRect = canvas.getBoundingClientRect();              // Gets the CSS positions along with width/height
      mousePos.x = Math.round(e.clientX - cRect.left);        // Subtract the 'left' of the canvas from the X/Y
      mousePos.y = Math.round(e.clientY - cRect.top);         // positions to get make (0,0) the top left of the
  });
  //renderLines.style. = "connectionsRender"
  //renderLines.style.position = "absolute";
  document.getElementsByClassName("connectionColumn")[0].innerHTML=""
  document.getElementsByClassName("connectionColumn")[0].appendChild(renderLines);

  let endNightButton = document.createElement("button")
  endNightButton.classList.add("button")
  endNightButton.innerHTML = "End the Night"
  endNightButton.setAttribute("onClick", ("endNight()"))
  endNightButton.style.zIndex=20
  endNightButton.style.position = "relative"
  endNightButton.style.top = 0;
  endNightButton.style.left = 0;
  document.getElementsByClassName("connectionColumn")[0].appendChild(endNightButton)
  //console.log(renderLines)

  var canvas = document.getElementById("renderLines");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("nightActivity").style.display="block"

  //let element = document.querySelector('.button');
  //element.style.height = (document.documentElement.clientHeight-30)/savedRoles.length + "vh"
  //console.log((document.documentElement.clientHeight-30)/parseInt(document.getElementById("playerQuantity").value))
  document.getElementsByClassName("rolesColumn")[0].innerHTML=""
  let buttonRoleNames = capArray(usedRoles)
  for (var i=0;i<parseInt(document.getElementById("playerQuantity").value);i++){
    //console.log("new button")
    let newRoleButton = document.createElement("button")
    newRoleButton.classList.add("button")
    //newRoleButton.class = "button";
    newRoleButton.innerHTML = buttonRoleNames[i]
    //lastSelectedRole = i
    //first numbers are added here
    //newRoleButton.setAttribute("onClick", ("lastSelectedRole = " + i + ";if(connectorLines[connectorLines.length-1]&&connectorLines[connectorLines.length-1].length%4==0){connectorLines.push(0,((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))))}"));
    //if (connectorLines.some(hasElement(((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))),1))) {

    /*if ((connectorLines.map(e => e[1]==((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))))).indexOf(true)>=0){
      connectorLines.splice(connectorLines.indexOf((connectorLines.map(e => e[1]==((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))))).indexOf(true)),1)
    }*/

    newRoleButton.setAttribute("onClick", ("lastSelectedRole = " + i + ";if ((connectorLines.map(e => e[1]==((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))))).indexOf(true)>=0){connectorLines.splice(connectorLines.indexOf((connectorLines.map(e => e[1]==((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))))).indexOf(true)),1)};if(connectorLines.length==0||connectorLines[connectorLines.length-1].length%4==0){connectorLines.push([0,((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length)))]);console.log('aaaaaaaaaaaaaaaaaaaa')}"));
    /*newRoleButton.setAttribute("onClick", function assignRole(){
      lastSelectedRole = i
    })*/
    document.getElementsByClassName("rolesColumn")[0].appendChild(newRoleButton)
    //console.log(newRoleButton)
  }
  document.getElementsByClassName("playersColumn")[0].innerHTML=""
  for (var i=0;i<parseInt(document.getElementById("playerQuantity").value);i++){
    let newPlayerButton = document.createElement("button")
    newPlayerButton.classList.add("button")
    newPlayerButton.innerHTML = "Player " + (i+1)
    //lastSelectedRole = i
    //The final two numbers are added here
    //newPlayerButton.setAttribute("onClick", ("console.log(connectorLines)"));
    Math.round(((mousePos.y)*(usedRoles.length))/(document.documentElement.clientHeight-30))/(usedRoles.length*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length)))
    newPlayerButton.setAttribute("onClick", ("if(connectorLines[connectorLines.length-1]&&connectorLines[connectorLines.length-1].length==2){connectorLines[connectorLines.length-1].push(document.documentElement.clientWidth/3," + i + "/(usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length)));console.log(connectorLines)}"));
    //newPlayerButton.setAttribute("onClick", ("if(connectorLines[connectorLines.length-1]&&connectorLines[connectorLines.length-1].length==2){connectorLines[connectorLines.length-1].push(document.documentElement.clientWidth/3,(mousePos.y));console.log(connectorLines)}"));
    //newPlayerButton.setAttribute("onClick", ("connectorLines.push([0,((lastSelectedRole/usedRoles.length)*(document.documentElement.clientHeight-30)+((document.documentElement.clientHeight-30)/(2*usedRoles.length))),mousePos.x , mousePos.y])"));
    document.getElementsByClassName("playersColumn")[0].appendChild(newPlayerButton)
    console.log("added a player")
  }

  let buttons = document.getElementsByClassName("button")
  //console.log(buttons)
  for (var i=2;i<buttons.length;i++){
    buttons[i].style.height=((document.documentElement.clientHeight-30)/parseInt(document.getElementById("playerQuantity").value)) + "px"
  }
  window.setInterval( function() {
    runNight()
  }, 17);
}

let connectorLines = []
function runNight(){
  var canvas = document.getElementById("renderLines");
  var ctx = canvas.getContext("2d");
  canvas.width = canvas.width
  for (var i=0;i<connectorLines.length;i++){
    ctx.lineWidth = 5
    ctx.beginPath();
    ctx.moveTo(connectorLines[i][0], connectorLines[i][1]);
    ctx.lineTo(connectorLines[i][2], connectorLines[i][3])
    ctx.stroke();
  }
  //console.log(lastSelectedRole>-1&&(connectorLines.length==0))

  //console.log(connectorLines)
  //console.log(connectorLines[connectorLines.length-1].length)
  //if (lastSelectedRole>-1){
  if (lastSelectedRole>-1&&(connectorLines.length==0||connectorLines[connectorLines.length-1].length!==4)){
    console.log("line to mouse")
    /*let mousePosition = getMousePos()
    console.log(mousePosition)*/
    ctx.beginPath();
    ctx.lineWidth = 5
    //console.log(lastSelectedRole/usedRoles.length)
    ctx.moveTo(0, (lastSelectedRole/usedRoles.length)*canvas.height+(canvas.height/(2*usedRoles.length)));
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke();
  }
}

function resetRoles(){
  console.log("Selected roles reset")
  for (var i=0;i<numberOfRoles;i++){
    document.getElementById("selector" + i).checked=false
  }
  document.getElementById("nightActivity").style.display="none"
}

document.getElementById("playerQuantity").onchange=resetRoles

window.setInterval( function() {
  updateRoles()
}, 50);

function capArray(arr){
  let result = arr
  for (var i=0;i<result.length;i++){
    let splitToWords=result[i].split(" ")
    for (var j=0;j<splitToWords.length;j++){
      splitToWords[j] = splitToWords[j].charAt(0).toUpperCase() + splitToWords[j].slice(1)
    }
    result[i] = splitToWords.join(" ")
  }
return(result)
}

function hasElement(el, index){
    return (element) => element[index] == el
}

function endNight(){
  console.log("good morning")
}
