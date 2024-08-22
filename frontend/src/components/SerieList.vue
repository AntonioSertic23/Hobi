<template>
  <div>
    <h2>Serie List</h2>
    <ul v-if="series.length">
      <li v-for="serie in series" :key="serie._id">
        {{ serie.name }} ({{ serie.first_air_date }}) - Overview: {{ serie.overview }}
      </li>
    </ul>
    <p v-else>No series available.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: []
    }
  },
  async created() {
    await this.fetchSeries()
  },
  methods: {
    async fetchSeries() {
      try {
        const response = await fetch('http://localhost:3000/series')
        if (!response.ok) {
          throw new Error('Failed to fetch series')
        }

        this.series = await response.json()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px 0;
}
</style>
