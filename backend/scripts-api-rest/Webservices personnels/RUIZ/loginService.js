//INCLUSE DANS login.js

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