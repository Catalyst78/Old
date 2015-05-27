function init() {
	prepareTabs();
	loadGame()
	
	var intervalCount = 0;
	window.setInterval(function(){
		cookieClick(resources.cursors);
		
		if (intervalCount > 10){
			saveGame() 
			intervalCount = 0;
		}
		intervalCount += 1;
	}, 1000);
}

// Main
var resources = {
	cookies:0,
	cursors:0
};

function modifyResource(resource, number) {
	resources[resource] += number;
	document.getElementById(resource).innerHTML = resources[resource];
}

function setResource(resource, number) {
	resources[resource] = number;
	document.getElementById(resource).innerHTML = resources[resource];
}

function updateAll() {
	document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1, resources.cursors));
	for (resource in resources){
		document.getElementById(resource).innerHTML = resources[resource];
	}
}

function mainClick(number) {
	modifyResource("cookies", number)
};

function buyCursor() {
	var cursorCost = Math.floor(10 * Math.pow(1.1,resources.cursors));  
	if(resources.cookies >= cursorCost){                                 
		modifyResource("cursors", 1)                               
		modifyResource("cookies", -cursorCost)                     
		document.getElementById('cookies').innerHTML = resources.cookies;  
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,resources.cursors));      
	document.getElementById('cursorCost').innerHTML = nextCost; 
};

// Save & Load
function saveGame() {
	var save = {
		cookies: resources.cookies,
		cursors: resources.cursors
	}	
	localStorage.setItem("save",JSON.stringify(save));
}

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.cookies !== "undefined") setResource("cookies", savegame.cookies);
	if (typeof savegame.cursors !== "undefined") setResource("cursors", savegame.cursors);
	updateAll();
}

function clearAllData() {
	intervalCount = 0;
	var save = {
		cookies: 0,
		cursors: 0
	}	
	localStorage.setItem("save",JSON.stringify(save));
	for(var resource in resources){
		resources[resource] = 0;
	}
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
    if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
  }
}

function getHash(url) {
  var hashPos = url.lastIndexOf ( '#' );
  return url.substring( hashPos + 1 );
}

var totalTabs = 48;
function tellThing(tabClicked) {
	for (var a = 1; a <= totalTabs; a++){
		document.getElementById("ug" + a).innerHTML = a;
	}
}
var intervalCount = 0;