/*les tableaux (cache) */
let rT = [];
let rO = [];
let rC = [];

/* requetes pour créer une cache */
let charRace = new XMLHttpRequest();
charRace.open("get", "/race", true);
charRace.onload = function(){
	rT = JSON.parse(charRace.responseText);
};
charRace.send();

let charOrigine = new XMLHttpRequest();
charOrigine.open("get", "/origine", true);
charOrigine.onload = function(){
	rO = JSON.parse(charOrigine.responseText);
};
charOrigine.send();

let charClasse = new XMLHttpRequest();
charClasse.open("get", "/classe", true);
charClasse.onload = function(){
	rC = JSON.parse(charClasse.responseText);
};
charClasse.send();

/* fonctions */
function sauvegarde(){
    var txt;
    var s;
	var svg = confirm("Voulez-vous sauvegarder cette personnage?");
    if (svg == true) {
        nvPr['token'] = localStorage.getItem('dndToken');
        s = ajouteChoix();
		let xhr = new XMLHttpRequest;
        xhr.open("get", s, true);
        xhr.onload = function () {
            if (JSON.parse(xhr.responseText)[0].status == 200) {
                alert("Personnage sauvegardé!");
                window.location.replace('/profile');
            } else {
                alert("Erreur! Votre personnage n'a pas un nom unique!");
                window.location.replace('/create');
            }
        }
		xhr.send();
	}else{
		txt = "Annulé! Retour à la création!";
	}
}

function ajouteChoix() {
    let url = "/registrePerso?";
    url += "rId=" + nvPr['rId'];
    url += "&orgId=" + nvPr['orgId'];
    url += "&clId=" + nvPr['clId'];
    url += "&nom=" + nvPr['nom'];
    url += "&genre=" + nvPr['genre'];
    url += "&desc=" + nvPr['desc'];
    url += "&token=" + nvPr['token'];
    return url;
}