// Importe la fonction getCurrentPosition du fichier geoLocation.js
import { getPosition } from "./geoLocation";

// Clé d'API pour OpenWeatherMap
const API_KEY = '36d6237367ff42ae26eecee20ea83d69';

// Fonction asynchrone pour obtenir les prévisions horaires
export async function getHourlyWeather() {
    try {
        // Obtient les coordonnées géographiques actuelles de l'utilisateur
        const position = await getPosition();

        // Construit l'URL pour obtenir les prévisions horaires
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}&units=metric&lang=fr`;

        // Effectue une requête à l'API OpenWeatherMap pour obtenir les données horaires
        const response = await fetch(url);
        const hourlyWeatherData = await response.json();

        // Retourne les données horaires obtenues de l'API
        return hourlyWeatherData;
    } catch (error) {
        // Gère les erreurs qui pourraient survenir pendant le processus
        console.error('Erreur lors de la récupération des prévisions horaires', error);
        throw error;
    }
}
