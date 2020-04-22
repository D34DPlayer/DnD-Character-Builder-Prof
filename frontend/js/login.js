async function loadLogin() {
    await verifyToken();
    if (connected) window.location.replace('/');
}

async function connexion(form) {
    while (true) {
        let token = tokenGen();
        let request = await fetch(`/loginService?user=${form.username.value}&password=${form.password.value}&token=${token}`);
        let [{status}] = await request.json();

        if (status === 501) continue;
        else if (status === 502) showError('nonExistentUser');
        else if (status === 503) showError('badConnection');
        else if (status === 200) {
            localStorage.setItem('dndToken', token);
            console.log(token);
            console.log(localStorage.getItem('dndToken'));
            window.location.replace('/');
        }
        break;
    }
}

function isUser() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/isUser', true);
    xhr.onload = function () {
        let tab = [];
        tab = JSON.parse(xhr.responseText);
        for(let i of tab) {
            if ((${form.username.value} == i.username) && (${form.password.value} == i.password)) {
                //Mettre la confirmation que le compte est bien connecté et puis rediriger
                //vers soit page de création soit la page d'acceuil ou le profil en fct de la situation
            }
        }
    }
    xhr.send();
}

function tokenGen (len = 20) {
    function dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
    }
    let arr = new Uint8Array((len) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
}
