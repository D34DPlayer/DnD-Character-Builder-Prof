async function loadChoice() {
    await loadNav();
    await reloadTable();
}

async function reloadTable() {
    let request = await fetch(`/stats?colonne=${gid('colonne').value}`);
    let reponse = await request.json();
    gid('tableStats').innerHTML = reponse.map(obj => `<tr><td>${obj.categ}</td><td>${obj.cmpt}</td></tr>`).join('');
}
