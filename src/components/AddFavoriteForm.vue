<template>
  <div class="favorites-container min-h-screen max-w-md mx-auto p-5 shadow-lg rounded-lg bg-white bg-opacity-50">
    <form @submit.prevent="addFavorite" class="flex flex-col gap-2.5">
      <input v-model="newFavorite" placeholder="Ajouter un lieu" class="p-2.5 border border-gray-300 rounded-md text-base"/>
      <button type="submit" class="p-2.5 bg-green-500 text-white rounded-md text-base hover:bg-green-600">Ajouter</button>
    </form>
    <button @click="addCurrentLocation" class="mt-2.5 p-2.5 bg-green-500 text-white rounded-md text-base hover:bg-green-600">Ajouter ma position actuelle</button>

    <div v-if="favorites.length" class="mt-5">
      <h2 class="text-center text-xl mb-5">Mes lieux favoris</h2>
      <ul class="list-none p-0">
        <li v-for="(favorite, index) in favorites" :key="favorite.name" class="bg-gray-200 mt-2.5 p-2.5 rounded-md flex justify-between items-center">
          <div @click="selectFavorite(favorite)" class="cursor-pointer">
            {{ favorite.name }}
          </div>
          <button @click.stop="removeFavorite(index)" class="p-1.5 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-700">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { setFavPosition, getCurrentPosition } from '../stores/geoLocation';

export default {
  data() {
    return {
      newFavorite: '',
      favorites: []
    };
  },
  methods: {
    async addFavorite() {
      if (this.newFavorite) {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.newFavorite}&limit=1&appid=36d6237367ff42ae26eecee20ea83d69`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Erreur lors de la requête à l'API");
          }
          const data = await response.json();
          const locationData = data[0];

          const favorite = {
            name: this.newFavorite,
            lat: locationData.lat,
            lon: locationData.lon
          };

          this.favorites.push(favorite);
          this.saveFavorites();
          this.newFavorite = '';
        } catch (error) {
          console.error("Erreur lors de la récupération des données de localisation", error);
        }
      }
    },
    async addCurrentLocation() {
      try {
        const position = await getCurrentPosition();
        const geocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.lat}&lon=${position.lon}&limit=1&appid=36d6237367ff42ae26eecee20ea83d69`;

        const response = await fetch(geocodeUrl);
        if (!response.ok) {
          throw new Error("Erreur lors de la requête à l'API de géocodage");
        }
        const data = await response.json();
        const locationData = data[0];

        const favorite = {
          name: locationData.name || 'Lieu Inconnu',
          lat: position.lat,
          lon: position.lon
        };

        this.favorites.push(favorite);
        this.saveFavorites();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la position actuelle", error);
      }
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    loadFavorites() {
      if (localStorage.getItem('favorites')) {
        this.favorites = JSON.parse(localStorage.getItem('favorites'));
      }
    },
    removeFavorite(index) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    },
    selectFavorite(favorite) {
      setFavPosition(favorite.lat, favorite.lon);
    }
  },
  mounted() {
    this.loadFavorites();
  }
};
</script>




