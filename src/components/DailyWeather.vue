<!-- DailyWeather.vue -->
<template>
  <!-- Prévisions pour les jours suivants -->
  <section class="bg-white bg-opacity-50 rounded-lg shadow p-5">
    <h2 class="font-bold text-xl mb-4">Prochains Jours</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <!-- Blocs de prévisions journalières ici -->
        <template v-if="limitedForecastData">
          <div v-for="dailyData in limitedForecastData" :key="dailyData.date" class="text-center">
            <!-- Affiche la date -->
            <p class="text-lg">{{ dailyData.date }}</p>
            <div class="w-10 h-10 mx-auto my-2">
              <!-- Utilisez le code d'icône pour construire l'URL de l'icône -->
              <img :src="getWeatherIconUrl(dailyData.weatherIcon)" alt="Weather Icon" />
            </div>
            <!-- Affiche la température minimale -->
            <p class="text-sm text-blue-500">{{ Math.round(dailyData.minTemp.toFixed(2)) }}°C</p>
            <!-- Affiche la température maximale -->
            <p class="text-sm text-red-600">{{ Math.round(dailyData.maxTemp.toFixed(2)) }}°C</p>
          </div>
        </template>
        <template v-else>
          <!-- Affiche un message pendant le chargement des données -->
          <p>Chargement des données...</p>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getHourlyWeather } from '../stores/hourlyWeather';
import { limitDataTo5Days24Hours } from '../stores/filterDailyData';

const limitedForecastData = ref(null);

onMounted(async () => {
  try {
    const fullHourlyData = await getHourlyWeather();

    // Utilisez la fonction de filtre pour limiter à 24 heures
    limitedForecastData.value = limitDataTo5Days24Hours(fullHourlyData.list);
  } catch (error) {
    console.error('Erreur lors de la récupération des prévisions pour les 5 prochains jours', error);
  }
});

// Fonction pour obtenir l'URL de l'icône météo en fonction du code d'icône fourni par l'API
function getWeatherIconUrl(iconCode) {
  // Construisez l'URL de l'icône en utilisant le code fourni par l'API OpenWeather
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}
</script>
