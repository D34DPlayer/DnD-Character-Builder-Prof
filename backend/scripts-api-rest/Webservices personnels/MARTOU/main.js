//La fonction renvoie le nombre de membres présents dans la DB
async function load() {
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