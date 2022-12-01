<template>
  <nav-bar :active="activeRouter" :count="count"></nav-bar>
  <div class="body">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from 'cp/NavBar/index.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';
import { computed } from 'vue';

const route = useRoute(),
  store = useStore();

const count = computed((): number => {
  return store.state.shopping.length;
});

const activeRouter = computed((): string => {
  return route.name?.toString() || '';
});
</script>

<style>
@import 'src/style/Template.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
.body {
  margin-top: 2em;
}
</style>
