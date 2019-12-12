const image_cartes = document.getElementsByTagName("img");
const cartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
const cartes_etat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let cartes_choisis = [];
let carte_gagner = 0;

for (let i = 0; i < image_cartes.length; i++) {
    image_cartes[i].pas_Carte = i;
    image_cartes[i].onclick = function(){
        controleur(this.pas_Carte);
    }
}

init();

function modif_carte(pas_Carte){
    switch(cartes_etat[pas_Carte]){
        case 0:
            image_cartes[pas_Carte].src="img/fondcarte.jpeg";
            break;
        case 1:
            image_cartes[pas_Carte].src="img/carte" + cartes[pas_Carte] + ".png";
            break;
        case -1:
            image_cartes[pas_Carte].style.visibility="hidden";
            break;
    }
}

function rejouer(){
    alert("Bravo !");
    location.reload();
}

function init(){
    for(let i = cartes.length - 1; i >= 1; i--) {
        const aleatoire = Math.floor(Math.random() * (i + 1));
        const modif = cartes[i];
        cartes[i] = cartes[aleatoire];
        cartes[aleatoire] = modif;
    }
}



function controleur(pas_Carte) {
    if (cartes_choisis.length < 2) {

        if (cartes_etat[pas_Carte] === 0) {
            cartes_etat[pas_Carte] = 1;
            cartes_choisis.push(pas_Carte);
            modif_carte(pas_Carte);
        }

        if (cartes_choisis.length === 2) {
            let nouveau = 0;
            if (cartes[cartes_choisis[0]] === cartes[cartes_choisis[1]]) {
                nouveau = -1;
                carte_gagner++;
            }

            cartes_etat[cartes_choisis[0]] = nouveau ;
            cartes_etat[cartes_choisis[1]] = nouveau ;

            setTimeout(function(){
                modif_carte(cartes_choisis[0]);
                modif_carte(cartes_choisis[1]);
                cartes_choisis = [];

                if (carte_gagner === 10){
                    rejouer();
                }
            },750);
        }
    }
}



