var app = angular.module('myApp', []);


app.controller('MainController', function($scope) {
  var resources = {
		cookies:0,
		cursors:0,
		cursorCost:10
	};
	
	updateAll();
	function updateAll() {
		$scope.cookies = resources.cookies;
		$scope.cursors = resources.cursors;
		$scope.cursorCost = resources.cursorCost;
	}
	
	function add(resource, value){
		resources.resource += value;
	}
	
  $scope.cookieClick = function(amount) { 
		add(resources.cookies, amount);
		$scope.cookies = resources.cookies;
	};
	
	$scope.buyCursor = function(amount) { 
		cursorCost = Math.floor(10 * Math.pow(1.1,resources.cursors));
		if(resources.cookies >= cursorCost) {        
			resources.cursors = resources.cursors + 1;      
			resources.cookies = resources.cookies - cursorCost;  
			$scope.cursors = resources.cursors;
			$scope.cookies = resources.cookies;
		};
		$scope.cursorCost = Math.floor(10 * Math.pow(1.1,resources.cursors));
	};
	
	
	// Interval
	setInterval(function() {
		add("cookies", resources.cursors);
		$scope.cookies = resources.cookies;
	}, 1000);
	
	
	// Save & Load
	$scope.save = function(amount) { 
		var save = {
			cookies: resources.cookies,
			cursors: resources.cursors
		}	
		localStorage.setItem("save",JSON.stringify(save));
	};

	$scope.load = function(amount) { 
		var savegame = JSON.parse(localStorage.getItem("save"));
		if (typeof savegame.cookies !== "undefined") resources.cookies = savegame.cookies;
		if (typeof savegame.cookies !== "undefined") resources.cursors = savegame.cursors;
		$scope.cookies = resources.cookies;
		$scope.cursors = resources.cursors;
  };
});



// Tabs ###############################################################################
var tabLinks = new Array();
var contentDivs = new Array();
var defualtTabSelected = 0;

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