"use strict";

let nbrMembre = 0;

function gid(id) {
	return document.getElementById(id);
}

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

	//Vérification si un token correct existe et affichage de nom si c'est le cas
	//un exemple de comment utiliser un token pour afficher des données utilisateur
	await verifyToken();
	if (connected) {
		let connectionContainer = gid('connectionContainer');
		let token = localStorage.getItem('dndToken');
		let request = await fetch(`/username?token=${token}`);
		let [{username}] = await request.json();
		if (username) connectionContainer.innerHTML = `<p>Bienvenue ${username} !</p>
													   <button onclick="deconnexion()">Se déconnecter</button>`;
	}
}
