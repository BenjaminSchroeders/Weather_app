// filterData.js
export function limitDataTo24Hours(hourlyData) {
    // Filtrer les données pour les 8 prochaines périodes de 3 heures (24 heures au total)
    return hourlyData.slice(0, 9);
  } 
