// Dans votre fichier store (par exemple, background.js)
import { ref } from 'vue';

const backgroundIcon = ref('default');

export function setIconName(data) {
    backgroundIcon.value = data;
}

export function getIconName() {
    return backgroundIcon;
}
