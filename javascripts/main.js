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