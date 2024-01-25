// filterData.js

// Fonction pour limiter les données aux 5 prochains jours sur 24 heures
export function limitDataTo5Days24Hours(hourlyData) {
  // Crée un objet pour regrouper les données par jour
  const groupedData = {};

  // On suppose que les données sont structurées par périodes de 3 heures
  for (let i = 0; i < 5 * 8; i++) {
    // Récupère les données actuelles
    const currentData = hourlyData[i];
    
    // Obtient la date au format jour de la semaine (en français)
    const date = new Date(currentData.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'long' });

    // Crée une clé pour chaque jour s'il n'existe pas déjà
    if (!groupedData[date]) {
      groupedData[date] = {
        minTemp: currentData.main.temp_min,
        maxTemp: currentData.main.temp_max,
        weatherIcon: currentData.weather[0].icon, // Ajout de l'icône météo
      };
    } else {
      // Met à jour les températures et l'icône météo si nécessaire
      groupedData[date].minTemp = Math.min(groupedData[date].minTemp, currentData.main.temp_min);
      groupedData[date].maxTemp = Math.max(groupedData[date].maxTemp, currentData.main.temp_max);
      // Utilise l'icône de la dernière période de 3 heures de la journée
      groupedData[date].weatherIcon = currentData.weather[0].icon;
    }
  }

  // Convertit l'objet groupé en tableau
  const filteredData = Object.keys(groupedData).map((date) => ({
    date,
    minTemp: groupedData[date].minTemp,
    maxTemp: groupedData[date].maxTemp,
    weatherIcon: groupedData[date].weatherIcon,
  }));
  
  return filteredData;
}
