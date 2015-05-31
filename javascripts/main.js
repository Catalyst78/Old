function init() {
	prepareTabs();
	clearConsole();

	if (!(localStorage.getItem("save") == true )) 
		loadGame();	
	
	var intervalCount = 0;
	window.setInterval(function() {
		if (incrementMe.resource !== "") 
			modifyResource(incrementMe.resource, incrementMe.number);
		
		
		if (intervalCount > 10) {
			saveGame() 
			intervalCount = 0;
		}
		intervalCount += 1;
	}, 1000);
}
                               
// Main
var resources = {
	territory:0
};

var incrementMe = {
	resource:"",
	number:0
}
function incrementResource(resource, number) {
	incrementMe.resource = resource;
	incrementMe.number = number;
}

function modifyResource(resource, number) {
	resources[resource] += number;
	document.getElementById(resource).innerHTML = resources[resource];
}

function setResource(resource, number) {
	resources[resource] = number;
	document.getElementById(resource).innerHTML = resources[resource];
}

function updateAll() {
	//document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1, resources.cursors));
	for (resource in resources)
		document.getElementById(resource).innerHTML = resources[resource];
}

function explore() {
	incrementMe.resource = "territory";
	incrementMe.number = 1;
	document.getElementById('explore_button').disabled = "disabled";
	document.getElementById('explore_button').innerHTML = '<img class="nopadd" src="images/bunny.gif">';
};

function buyCursor() {
	var cursorCost = Math.floor(10 * Math.pow(1.1,resources.cursors));  
	if(resources.territory >= cursorCost){                                 
		modifyResource("cursors", 1)                               
		modifyResource("territory", -cursorCost)                     
		document.getElementById('territory').innerHTML = resources.territory;  
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,resources.cursors));      
	document.getElementById('cursorCost').innerHTML = nextCost; 
};

// Console
var consoleList = [];
var maxLines = 12;

function clearConsole() {
	for (var i = 0; i < maxLines; i++) 
		updateConsole(""); 
}

function setConsole(consoleLineList) {
	for (var a = consoleLineList.length - 1; a >= 0; a--)
		updateConsole(consoleLineList[a]);
}

function updateConsole(newLine) {
	consoleList.unshift(newLine);
	if (consoleList.length > maxLines)  
		consoleList.pop(); 
	var datConsoleText = "";
	for (var a = 0; a < consoleList.length; a++) 
		datConsoleText += consoleList[a] + "<br>";
	document.getElementById("bunnyConsole").innerHTML = datConsoleText;
}

// Save & Load
function saveGame() {
	var save = {
		consoleData: consoleList,
		territory: resources.territory
	}	
	localStorage.setItem("save",JSON.stringify(save));
	console.log("Saved");
}

function loadGame() {
	var saveGame = JSON.parse(localStorage.getItem("save"));
	if (typeof saveGame.consoleData !== "undefined") setConsole(saveGame.consoleData);
	if (typeof saveGame.territory !== "undefined") setResource("territory", saveGame.territory);
	updateAll();
}

function clearAllData() {
	intervalCount = 0;
	var save = {
		territory: 0,
	}
	clearConsole();
	localStorage.setItem("save",JSON.stringify(save));
	for(var resource in resources)
		resources[resource] = 0;
	
	updateAll();
	tabSelect(0);
}

// Tabs
var tabLinks = new Array();
var contentDivs = new Array();
var defualtTabSelected = 0;

function prepareTabs() {
	var tabListItems = document.getElementById('tabs').childNodes;
	for ( var i = 0; i < tabListItems.length; i++ ) {
		if ( tabListItems[i].nodeName == "LI" ) {
			var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
			var id = getHash( tabLink.getAttribute('href') );
			tabLinks[id] = tabLink;
			contentDivs[id] = document.getElementById( id );
		}
	}
	tabSelect(tabLinks);
	tabContentHide(contentDivs);
}

function tabSelect(tabs) {    
	var i = 0;
	for ( var id in tabs ) {
		tabs[id].onclick = showTab;
		tabs[id].onfocus = function() { this.blur() };
		if ( i == defualtTabSelected ) tabs[id].className = 'selected';
		i++;
	}    
}

function tabContentHide(content) {
	var i = 0;
	for ( var id in content ) {
		if ( i != defualtTabSelected ) content[id].className = 'tabContent hide';
			i++;
	}
}

function showTab() {
  var selectedId = getHash( this.getAttribute('href') );

  for ( var id in contentDivs ) {
    if ( id == selectedId ) {
      tabLinks[id].className = 'selected';
      contentDivs[id].className = 'tabContent';
    } else {
      tabLinks[id].className = '';
      contentDivs[id].className = 'tabContent hide';
    }
  }
  return false;
}

function getFirstChildWithTagName(element, tagName) {
  for ( var i = 0; i < element.childNodes.length; i++ ) {
    if ( element.childNodes[i].nodeName == tagName ) 
		return element.childNodes[i];
  }
}

function getHash(url) {
  var hashPos = url.lastIndexOf ( '#' );
  return url.substring( hashPos + 1 );
}

var totalTabs = 48;
function tellThing(tabClicked) {
	for (var a = 1; a <= totalTabs; a++)
		document.getElementById("ug" + a).innerHTML = a;
}
var intervalCount = 0;