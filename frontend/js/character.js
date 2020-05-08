let charName;
let token = localStorage.getItem('dndToken');

async function loadChar() {
    await loadNav();

    //Obtenir les paramètres GET dans un objet
    let GETval = window.location.search.substr(1)
                    .split("&").map(a => a.split("="))
                    .reduce((obj, arr) => {obj[arr[0]] = arr[1]; return obj}, {});

    await getChar(GETval.name);
}

async function getChar(name) {
    let request;
    if (!name) name = '';
    if (connected) {
        let token = localStorage.getItem('dndToken');
        request = await fetch(`getChar?token=${token}&name=${name}`);
    }
    else request = await fetch(`getChar?name=${name}`);
    let [profile] = await request.json();
    console.log(profile);
    if (profile.status === 201) showChar(profile, true);
    else if (profile.status === 200) showChar(profile, false);
    else if (profile.status === 405) showLink(false);
    else if (profile.status === 406) showLink(true);
	else gid('profileContainer').style.display = 'none';
}

function showChar(profile, owner) {
    //On change l'html
    let nameContainer = gid('nameContainer');
    let classContainer = gid('classContainer');
    let raceContainer = gid('raceContainer');
	let originContainer = gid('originContainer');
	let buttonContainer = gid('buttonContainer');
	let raceImage = gid('raceImage');
	let classImage = gid('classImage');
	
    nameContainer.innerHTML = profile.name;
    charName = profile.name;
    classContainer.innerHTML = profile.classe;
	classContainer.title = profile.classeDesc;
    raceContainer.innerHTML = profile.race;
	raceContainer.title = profile.raceDesc;
	originContainer.innerHTML = profile.origine;
	originContainer.title = profile.origineDesc;
	gid("desc").innerHTML = profile.description;
	gid("sexeContainer").innerHTML = profile.sexe == "F"? "Femelle" : "Mâle";
	raceImage.src = `/img/${profile.race.toLowerCase()}.jpg`;
	classImage.src = `/img/${profile.classe.toLowerCase()}.jpg`;
    //On ajoute des boutons pour effacer/modifier si owner
	if (owner) buttonContainer.innerHTML = `<button onclick="redirect('/modify?name=${charName}', false)">Modifier ce personnage</button><button onclick="deleteChar();">Effacer ce personnage</button>`;
}

function showLink(create) {
    let nameContainer = gid('nameContainer');
    let profileContainer = gid('profileContainer');
    nameContainer.style.display = 'none';
    if (create) profileContainer.innerHTML = 'Crééz votre personnage <a href="/create">ici.</a>';
    else profileContainer.innerHTML = 'Connectez-vous <a href="/create">ici.</a>';
}

function deleteChar() {
    //POUR SIMON
    let supr;
    let conf = 'effacer'
    let verif = prompt("écrivez effacer si vous voulez supprimer le personnage");
    if (conf == verif) {
        supr = suprrime();
        if (connected && charName) {
            let xhr = new XMLHttpRequest;
            xhr.open("get", supr, true);
            xhr.onload = dirige();
            xhr.send();
        }
    }
}

function dirige() {
    alert("Personnage supprimé!");
    window.location.replace("index");
}

function suprrime() {
    let url = "/SuppressionService?";
    url += "nom=" + charName;
    url += "&token=" + token;
    return url;
}
