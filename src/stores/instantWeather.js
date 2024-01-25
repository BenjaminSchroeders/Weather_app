// Importe la fonction getCurrentPosition du fichier geoLocation.js

import { getPosition } from "./geoLocation";

// Clé d'API pour OpenWeatherMap
const API_KEY = '36d6237367ff42ae26eecee20ea83d69';

// Fonction asynchrone pour obtenir les données météorologiques instantanées
export async function getInstantWeather() {
    try {
        // Obtient les coordonnées géographiques actuelles ou sélectionnées
        const position = await getPosition();

        // Vérifie si les coordonnées sont valides
        if (!position || position.lat == null || position.lon == null) {
            console.error('Coordonnées géographiques non disponibles');
            return; // Retourner ici ou utiliser des coordonnées par défaut
        }

        // Construit l'URL pour obtenir les données météorologiques instantanées
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}&units=metric&lang=fr`;

        // Effectue une requête à l'API OpenWeatherMap pour obtenir les données instantanées
        const response = await fetch(url);
        const weatherData = await response.json();

        // Retourne les données météorologiques instantanées obtenues de l'API
        return weatherData;
    } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques instantanées', error);
        throw error;
    }
}
