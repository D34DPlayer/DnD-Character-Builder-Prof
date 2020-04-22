async function loadRegister () {
    await verifyToken();
    if (connected) window.location.replace('/');
    //Confirmation de mot de passe sans requête
    let password = document.getElementById("passwordId");
    let confirmPassword = document.getElementById("confirmPasswordId");

    function validatePassword(){
        if(password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Les mots de passe ne sont pas identiques.");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;
}

async function inscription(form) {
    //ça équivaut à faire une requête GET à ce lien, avec comme callback la sauvegarde de la réponse dans cette variable
    let request = await fetch(`/registerService?user=${form.username.value}&password=${form.password.value}`);
    //on parse cette réponse pour avoir la réponse comme objet à partir d'un json, et de celui là on extrait de la
    //première ligne la "colonne" status.
    let [{status}] = await request.json();

    if (status === 501) showError('existentUser');
    else if (status === 200) registered();
    else showError('default');
}

function registered() {
    let div = document.getElementById('success');
    let formContainer = document.querySelectorAll('#formContainer>*');
    formContainer.forEach((node) => node.style.display = 'none');
    div.style.display = 'block';
}
