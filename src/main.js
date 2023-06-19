import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
// глобально реєструємо компонент, щоб не реєструвати його багато раз в інших компонентах
import components from '@/components/UI';
components.forEach(component => {
    app.component(component.name, component)
});

app.use(store).use(router).mount('#app');
// createApp(App).use(store).use(router).mount('#app');