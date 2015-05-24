// Code for Game ####################################################################################
var cookies = 0;
var cursors = 0;

function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function(){
	cookieClick(cursors);
}, 1000);

function saveGame(){
	var save = {
		cookies: cookies,
		cursors: cursors
	}	
	localStorage.setItem("save",JSON.stringify(save));
}

function loadGame(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
	if (typeof savegame.cookies !== "undefined") cursors = savegame.cursors;
    document.getElementById("cookies").innerHTML = cookies;
	document.getElementById('cursors').innerHTML = cursors;
	document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1,cursors));
}



// Tabs #########################################################################################
var tabLinks = new Array();
var contentDivs = new Array();
var defualtTabSelected = 1;

function init() {
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

function tabSelect(tabs){	
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
  return false;  // Stop the browser following the link
}

function getFirstChildWithTagName( element, tagName ) {
  for ( var i = 0; i < element.childNodes.length; i++ ) {
	if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
  }
}

function getHash( url ) {
  var hashPos = url.lastIndexOf ( '#' );
  return url.substring( hashPos + 1 );
}