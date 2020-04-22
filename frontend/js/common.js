//Stocker variables et fonctions qui sont utilisées dans plusieurs parties du site
let connected = false;

let ERRORS = {
    'default' : 'Une erreur inconnue est survenue, veuillez réessayer plus tard.',
    'existentUser' : 'Ce nom d\'utilisateur est déjà utilisé.',
    'nonExistentUser' : 'Aucun compte n\'existe avec ce nom d\'utilisateur.',
    'badConnection' : 'Mauvais mot de passe.'
}

function showError(messageCode) {
    let errors = document.getElementById('errors');
    errors.innerHTML = ERRORS[messageCode];
    errors.style.display = "block";
}

async function verifyToken() {
    let token = localStorage.getItem('dndToken');
    if (token) {
        let request = await fetch(`/verifyToken?token=${token}`);
        let [{status}] = await request.json();
        if (status === 200) connected = true;
        else localStorage.removeItem('dndToken');
    }
}

async function deconnexion() {
    let token = localStorage.getItem('dndToken');
    if (token) {
        let request = await fetch(`/logout?token=${token}`);
        localStorage.removeItem('dndToken');
        window.location.replace('/');
    }
}
