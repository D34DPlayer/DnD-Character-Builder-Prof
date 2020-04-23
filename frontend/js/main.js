"use strict";

let nbrMembre = 0;

async function load() {
	//La fonction renvoie le nombre de membres présents dans la DB
	gid("nbrPers").innerText = "";
	let xhr = new XMLHttpRequest();
	xhr.open("get", "", true);
	xhr.onload = function () {
		let tabDb = [];
		tabDb = JSON.parse(xhr.responseText);
		gid("nbrPers").innerText = "";
	}
	xhr.send();

	await loadNav();
}
