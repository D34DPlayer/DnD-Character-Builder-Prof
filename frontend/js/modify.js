let classes = [];
let origines = [];
let races = [];

async function loadModify() {
    loadNav();

    //Obtenir les paramètres GET dans un objet
    let GETval = window.location.search.substr(1)
        .split("&").map(a => a.split("="))
        .reduce((obj, arr) => {obj[arr[0]] = arr[1]; return obj}, {});

    await getChar(GETval.name);
}

async function getChar(name) {
    let token = localStorage.getItem('dndToken');
    let request = await fetch(`getChar?token=${token}&name=${name}`);
    let [profile] = await request.json();
    console.log(profile);
    if (profile.status === 201) fillForm(profile);
    else if (profile.status === 200) redirect(`/character?name=${name}`, false);
    else gid('modifyForm').style.display = 'none';
}

async function fillForm(profile) {
    let form = gid("modifyForm");
    await fillOptions(form);
    form.name.value = profile.name;
    form.classe.value = classes.filter(a => a.clNom === profile.classe)[0].clId;
    form.race.value = races.filter(a => a.rNom === profile.race)[0].rId;
    form.origine.value = origines.filter(a => a.org === profile.origine)[0].orgId;
    form.description.value = profile.description;
    form.sexe.value = profile.sexe;
}

async function fillOptions(form) {
    let request;
    //classes
    request = await fetch("/classe");
    classes = await request.json();
    form.classe.innerHTML = classes.map(obj => `<option value="${obj.clId}">${obj.clNom}</option>`).join("");

    //origines
    request = await fetch("/origine");
    origines = await request.json();
    form.origine.innerHTML = origines.map(obj => `<option value="${obj.orgId}">${obj.org}</option>`).join("");

    //races
    request = await fetch("/race");
    races = await request.json();
    form.race.innerHTML = races.map(obj => `<option value="${obj.rId}">${obj.rNom}</option>`).join("");
}

async function modifyChar(f) {
    let token = localStorage.getItem("dndToken");
    let request = await fetch(`/modifierPerso?rId=${f.race.value}&orgId=${f.origine.value}&clId=${f.classe.value}&nom=${f.name.value}&genre=${f.sexe.value}&desc=${f.description.value}&token=${token}`);
    let [{status}] = await request.json();
    if (status === 200) redirect(`/character?name=${f.name.value}`);
}
