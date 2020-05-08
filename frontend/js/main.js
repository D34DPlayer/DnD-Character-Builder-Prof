"use strict";

let nbrMembre = 0;

function gid(id) {
	return document.getElementById(id);
}

async function load() {
	//La fonction renvoie le nombre de membres présents dans la DB
	gid("nbrPers").innerText = "";
	let xhr = new XMLHttpRequest();
	xhr.open("get", "/membre", true);
	xhr.onload = function () {
		let tabDb = [];
		tabDb = JSON.parse(xhr.responseText);
		if(tabDb[0].nbr > 0) {
			gid("nbrPers").innerText = tabDb[0].nbr;
		}
		else {
			gid("nbrPers").innerText = 0;
		}
	}
	xhr.send(); 

	await loadNav();
}
