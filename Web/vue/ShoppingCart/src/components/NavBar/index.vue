<template>
  <div class="nav-bar">
    <router-link to="/">home</router-link>
    <router-link to="/shopping"
      >shopping {{ count ? `(${count})` : '' }}</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NavBar',
  props: {
    count: Number,
    active: String,
  },
});
</script>

<style>
a {
  margin: 0 0.5em;
}
</style>
