<template>
  <div>
    <h2>Add New Serie</h2>
    <form @submit.prevent="submitSerie">
      <div>
        <label for="name">Name:</label>
        <input v-model="serie.name" type="text" id="name" required />
      </div>

      <div>
        <label for="overview">Overview:</label>
        <textarea v-model="serie.overview" id="overview" required></textarea>
      </div>

      <div>
        <label for="first_air_date">First air date:</label>
        <input v-model="serie.first_air_date" type="number" id="first_air_date" required />
      </div>

      <button type="submit">Add Serie</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serie: {
        name: '',
        overview: '',
        first_air_date: ''
      }
    }
  },
  methods: {
    async submitSerie() {
      try {
        const response = await fetch('http://localhost:3000/series', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.serie)
        })

        if (!response.ok) {
          throw new Error('Failed to add serie')
        }

        const result = await response.json()
        console.log('Serie added:', result)
        // Clear form
        this.serie = { name: '', overview: '', first_air_date: '' }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input,
textarea {
  padding: 8px;
  margin-top: 5px;
  font-size: 16px;
}

button {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
}
</style>
