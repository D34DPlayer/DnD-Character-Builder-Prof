/* variables */
var nvPr = new Object; //nouveau personnage à sauvegarder au base de données
var page = 0;

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

function gid(id) {
	return document.getElementById(id);
}

function gnom(nom) {
    return document.getElementsByName(nom);
}

//changer le formulaire
function setPage(page) {
	var setTitre = '';
	var setForm = '';
    var setConf = '';
    let request;
	switch(page){
		case 1:
			setTitre += "<h3>Choix d'origine</h3>";
			for(let ca of rO){
				setForm += "<input type='radio' name='org' value=" + ca.orgId.toString() + ">" + ca.org;
			}
			setForm += "<br><input type='submit' value='Classe'>";
			setForm += "<button onClick='retour();'>Retour</button>";
			break;
		case 2:
			setTitre += "<h3>Choix de classe</h3>";
			for(let cc of rC){
				setForm += "<input type='radio' name='cla' value=" + cc.clId.toString() + ">" + cc.clNom;
			}
			setForm += "<input type='submit' value='Description'>";
			setForm += "<button onClick='retour();'>Retour</button>";
			break;
		case 3:
			setTitre += "<h3>Caractéristiques du personnage</h3>";
			setForm += "<br><input type='textarea' name='nom' placeholder='Nom du personnage'>";
			setForm += "<br><input type='radio' name='genre' value='M'>Mâle";
			setForm += "<br><input type='radio' name='genre' value='F'>Femelle";
			setForm += "<br><textarea name='desc' placeholder='Description du personnage'></textarea>";
			setForm += "<input type='submit' value='Afficher les choix'>";
			setForm += "<button onClick='retour();'>Retour</button>";
			break;
		case 4:
			setTitre += "<h3>Personnage</h3>";
            setConf += `<button onClick='sauvegarde();'>Sauvegarder ?</button><button onClick='redirect("/create", false);'>Recommencer ?</button>`;
            break;
        default:
			setTitre += "<h3>Choix de race:</h3>";
			for(let cr of rT){
				setForm += "<input type='radio' name='race' value=" + cr.rId.toString() + ">" + cr.rNom;
			}
			setForm += "<br><input type='submit' value='Origin'>";
    }
	gid('titre').innerHTML = setTitre;
	gid('creation').innerHTML = setForm;
    gid('confirmation').innerHTML = setConf;
    setOnClick();
}

function setOnClick() {
    gid('desc').innerHTML = "";
    var a = '';
    switch (page) {
        case (0):
            a = 'race';
            break;
        case (1):
            a = 'org';
            break;
        case (2):
            a = 'cla';
            break;
        default:
            gid('d').innerHTML = "";
    }
    for (var c = 0; c < gnom(a).length; c++) {
        gnom(a)[c].onclick = function () {
            affDesc(this.value);
        };
    }
}

function affDesc(v) {
    var d = '';
    var a = [];
    switch (page) {
        case (1): //origine
            a = rO.map(x => x).filter(x => x.orgId == v);
            d = a[0].orgDesc;
            break;
        case (2): //classe
            a = rC.map(x => x).filter(x => x.clId == v);
            d = a[0].clDesc;
            break;
        default: //race
            a = rT.map(x => x).filter(x => x.rId == v);
            d = a[0].rDesc;
    }
    gid('desc').innerHTML = d;
}

function retour(){
	page--;
	switch(page){
		case 1:
			delete nvPr.orgID;
			break;
		case 2:
			delete nvPr.clId;
			break;
		case 3:
            delete nvPr.nom;
            delete nvPr.genre;
            delete nvPr.desc;
			break;
		default:
			delete nvPr.rId;
	}
    setPage(page);
    affChoix();
}

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

function ajouteChar(form){
	switch(page){
		case 1:
            var ajouteOrg = form.org.value;
			nvPr['orgId'] = ajouteOrg;
			break;
		case 2:
            var ajouteCl = form.cla.value;
			nvPr['clId'] = ajouteCl;
			break;
		case 3:
			var ajouteNom = form.nom.value;
			var ajouteGenre = form.genre.value;
            var ajouteDesc = form.desc.value;
			nvPr['nom'] = ajouteNom;
			nvPr['genre'] = ajouteGenre;
			nvPr['desc'] = ajouteDesc;
			break;
		default:
            var ajouteRa = form.race.value;
			nvPr['rId'] = ajouteRa;
    }
	page++;
    setPage(page);
    affChoix();
    return false;
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

function affChoix() {
    let c = '';
    let k = Object.keys(nvPr)
    for (let s of k) {
        if (s == 'rId' && s) {
            c += '<li>Race: ' + rT.map(x => x).filter(x => x.rId == nvPr[s])[0].rNom + '</li>';
        }
        else if (s == 'orgId' && s) {
            c += '<li>Origine: ' + rO.map(x => x).filter(x => x.orgId == nvPr[s])[0].org + '</li>';
        }
        else if (s == 'clId' && s) {
            c += '<li>Classe: ' + rC.map(x => x).filter(x => x.clId == nvPr[s])[0].clNom + '</li>';
        }
        else if (s == 'nom' && s) {
            c += '<li>Nom: ' + nvPr[s] + '</li>';
        }
        else if (s == 'genre' && s) {
            c += '<li>Sexe: ' + nvPr[s] + '<li>';
        }
        else if (s == 'desc' && s) {
            c += '<li>' + nvPr[s] + '</li>';
        }
        else {
            c += '<li>undefined</li>';
        }
    }
    gid('choisi').innerHTML = c;
}

async function main(){
    await loadNav();
    setPage(page);
	if (!connected) redirect("/");
}

/* event listeners */
const loadMain = document.addEventListener("load", main);
