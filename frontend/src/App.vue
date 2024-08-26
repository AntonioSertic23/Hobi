<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Watchlist</RouterLink>
      <RouterLink to="/my_shows">My Shows</RouterLink>
      <RouterLink to="/discover">Discover</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  column-gap: 3rem;
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin: 2rem 0;
}
</style>
