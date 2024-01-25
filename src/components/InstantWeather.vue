<template>
  <!-- Météo instantanée -->
  <section
    class="bg-white bg-opacity-50 rounded-lg shadow p-5 mb-6 grow flex flex-col"
    style="flex-grow: 1"
  >
    <header class="mb-4">
      <h2 class="font-bold text-xl">Météo Instantanée</h2>
    </header>
    <article
      v-if="instantWeather"
      class="flex items-center justify-between grow"
      style="flex-grow: 1"
    >
      <div>
        <!-- Affiche le nom de la ville -->
        <h3 class="text-lg font-semibold">{{ instantWeather.name }}</h3>
        <!-- Affiche l'heure de la mesure -->
        <time class="text-sm text-gray-600">{{ new Date(instantWeather.dt * 1000).toLocaleTimeString() }}</time>
      </div>
      <div class="flex">
        <div class="text-right">
          <!-- Affiche la température en Celsius -->
          <p class="text-5xl">{{ Math.round(instantWeather.main.temp) }}°C</p>
          <!-- Affiche la description de la météo -->
          <p class="text-lg text-gray-600">{{ instantWeather.weather[0].description }}</p>
        </div>
        <!-- Icône météo -->
<div class="ml-2 w-20 h-20 weather-icon" :style="{ backgroundImage: `url('http://openweathermap.org/img/w/${instantWeather.weather[0].icon}.png')` }"></div>

      </div>
    </article>
    <article v-else>
      <!-- Ajoutez ici une gestion pour le cas où les données ne sont pas encore disponibles -->
      <p>Chargement des données...</p>
    </article>
  </section>
</template>

<script>
import { getPosition } from '../stores/geoLocation';
import { getInstantWeather } from '../stores/instantWeather';
import { setIconName } from '../stores/background';

export default {
  data() {
    return {
      instantWeather: null,
    };
  },
  async mounted() {
    try {
      // Obtient la position géographique actuelle
      const position = await getPosition();
      // Obtient les données météorologiques instantanées en fonction de la position
      const instantWeather = await getInstantWeather(position);
      setIconName(instantWeather.weather[0].icon);
      // Stocke les données météorologiques instantanées dans la variable instantWeather
      this.instantWeather = instantWeather;
    } catch (error) {
      console.error('Une erreur s\'est produite', error);
    }
  },
};
</script>

<style scoped>
.weather-icon {
    width: 100px; /* Ajustez la largeur selon vos besoins */
    height: 100px; /* Ajustez la hauteur selon vos besoins */
    background-size: cover;
  }
</style>
