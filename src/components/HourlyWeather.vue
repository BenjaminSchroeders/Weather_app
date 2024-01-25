<template>
  <!-- Prévisions par tranches de 2 heures -->
  <section class="bg-white bg-opacity-50 rounded-lg shadow p-5 mb-6">
    <h2 class="font-bold text-xl mb-4">Prochaines Heures</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <!-- Blocs de prévisions horaires ici -->
        <template v-if="limitedHourlyData">
          <!-- Boucle à travers les données horaires limitées -->
          <div v-for="hourlyData in limitedHourlyData" :key="hourlyData.dt" class="text-center">
            <!-- Affiche l'heure au format 24 heures -->
            <p class="text-lg">{{ new Date(hourlyData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
            <!-- Affiche l'icône météo en tant que fond -->
            <div :style="{ backgroundImage: `url('http://openweathermap.org/img/w/${hourlyData.weather[0].icon}.png')` }" class="w-10 h-10 bg-blue-300 rounded-full mx-auto my-2"></div>
            <!-- Affiche la température en Celsius -->
            <p class="text-lg">{{ Math.round(hourlyData.main.temp) }}°C</p>
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
import { limitDataTo24Hours } from '../stores/filtreHourlyData';

// Référence réactive pour stocker les données horaires complètes
const hourlyWeatherData = ref(null);
// Référence réactive pour stocker les données horaires limitées
const limitedHourlyData = ref(null);

onMounted(async () => {
  try {
    // Récupère les données horaires complètes
    hourlyWeatherData.value = await getHourlyWeather();

    // Utilisez la fonction de filtre pour limiter à 24 heures
    limitedHourlyData.value = limitDataTo24Hours(hourlyWeatherData.value.list);
  } catch (error) {
    console.error('Erreur lors de la récupération des prévisions horaires', error);
  }
});
</script>
