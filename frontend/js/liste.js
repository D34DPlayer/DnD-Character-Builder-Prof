async function loadPage() {
	await loadNav();

	let xhr = new XMLHttpRequest();
	xhr.open('get', '/liste', true);
	xhr.onload = function () {
		gid("listeCharge").innerHTML = "";
		let tab = [];
		tab = JSON.parse(this.responseText);
		for(let i of tab) {
			gid("listeCharge").innerHTML += "<tr><td><a href=\"/character?name=" +
			i.nom + "\">" + i.nom +
			"</a></td><td id='user'><a href='/profile?user=" +
			i.username + "'>" + i.username + "</td><td id='race'>" +
			i.race + "</td><td id='class'>" + i.class + "</td></tr>";
		}
	}
	xhr.send();
	xhr.onerror = function () {
		console.log("Erreur !")
	}
}
