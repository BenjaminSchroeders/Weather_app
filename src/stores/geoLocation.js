// GeoLocation.js
import router from '../routers/index.js';

// Stockage de la position actuelle ou sélectionnée
let currentPosition = null;

// Fonction pour obtenir la position géographique actuelle de l'utilisateur
export async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("La géolocalisation n'est pas prise en charge par ce navigateur."));
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                currentPosition = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                resolve(currentPosition);
            }, reject);
        }
    });
}

// Fonction pour définir manuellement la position (par exemple, à partir d'un favori)
export async function setFavPosition(lat, lon) {
    currentPosition = { lat, lon };
    router.push({ name: 'home' });
}

// Fonction pour obtenir la position actuelle ou une position définie manuellement
export async function getPosition() {
    if (currentPosition) {
        return Promise.resolve(currentPosition);
    } else {
        return getCurrentPosition();
    }
}

// Ajoutez ici d'autres fonctions liées à la géolocalisation si nécessaire
