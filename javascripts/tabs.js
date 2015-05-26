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