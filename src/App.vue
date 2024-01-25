<template>
  <div :style="backgroundStyle">
    <router-view></router-view>
  </div>

  <div class="fixed inset-x-0 bottom-0 mt-12 pb-4 flex justify-center">
    <router-link
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold h-16 w-16 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl flex items-center justify-center"
      :to="{ name: 'Favoris' }"
    >
      +
    </router-link>
  </div>
</template>

<script>
// Dans votre composant Vue
import { computed } from 'vue';
import { getIconName } from './stores/background';

export default {
  setup() {
    const backgroundName = getIconName();

    const backgroundStyle = computed(() => {
      const imageUrl = `url('src/assets/backgrounds/${backgroundName.value}.jpg')`;
      return {
        backgroundImage: imageUrl,
        backgroundSize: 'cover',
      };
    });

    return { backgroundStyle };
  },
};


</script>


