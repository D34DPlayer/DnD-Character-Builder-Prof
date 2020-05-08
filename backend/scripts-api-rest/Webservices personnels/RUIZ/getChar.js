//INCLUSE DANS character.js

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