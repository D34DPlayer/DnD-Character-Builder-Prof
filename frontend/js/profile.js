async function loadProfile() {
    await loadNav();

    let GETval = window.location.search.substr(1)
        .split("&").map(a => a.split("="))
        .reduce((obj, arr) => {obj[arr[0]] = arr[1]; return obj}, {});

    await getProfile(GETval.user);
}

async function getProfile(name) {
    let request;
    if (!name) name = '';
    if (connected) {
        let token = localStorage.getItem('dndToken');
        request = await fetch(`getProfile?token=${token}&user=${name}`);
    }
    else request = await fetch(`getProfile?user=${name}`);
    let profile = await request.json();
    console.log(profile);
    if (profile[0].status === 201) showProfile(profile, true);
    else if (profile[0].status === 200) showProfile(profile, false);
    else if (profile[0].status === 405) showLink();
    else gid('profileContainer').style.display = 'none';
}

function showProfile(profile, owner) {
    gid('nameContainer').innerHTML = `Profil de ${profile[0].username}`;
	
	if(profile[0].nom) {
		gid('charHead').innerHTML = Object.keys(profile[0]).slice(2).reduce((str, key) => str + `<th>${key}</th>`, '');
		gid('charBody').innerHTML = profile.map((obj)=>`<tr><td><a href="/character?name=${obj.nom}">${obj.nom}</a></td><td>${obj.race}</td><td>${obj.classe}</td></tr>`).reduce((str, a)=>str+a,'')
    }
	
	if (!owner) gid("creatButton").style.display = "none";
}

function showLink() {
    gid('nameContainer').style.display = 'none';
    gid('profileContainer').innerHTML = 'Connectez-vous <a href="/create">ici.</a>';

}
