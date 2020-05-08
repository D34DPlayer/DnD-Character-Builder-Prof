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