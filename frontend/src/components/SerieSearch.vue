<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a series..."
      class="search-bar"
    />
    <button @click="fetchSeries" class="search-button">Search</button>

    <ul v-if="series.length">
      <li v-for="serie in series" :key="serie.id">{{ serie.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Stores the user's search input
      series: [] // Holds the series fetched from the API
    }
  },
  methods: {
    // Method to fetch series from the API based on the user's input
    async fetchSeries() {
      if (this.searchQuery.trim() === '') {
        this.series = [] // Clear results if the search query is empty
        return
      }
      const apiKey = import.meta.env.VITE_TMDB_API_KEY

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: apiKey
        }
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${this.searchQuery}&page=1`,
          options
        )
        const data = await response.json()
        this.series = data.results || [] // Update series list with results
      } catch (error) {
        console.error('Failed to fetch series:', error)
      }
    }
  }
}
</script>

<style scoped>
.search-bar {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
  font-size: 18px;
}
</style>
