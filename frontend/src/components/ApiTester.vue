<template>
  <div class="api-tester">
    <h1>Restaurante</h1>

    <input v-model="url" placeholder="http://localhost:3000/admin" class="control" />

    <select v-model="method" class="control">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>DELETE</option>
    </select>

    <textarea
      v-model="body"
      v-if="method !== 'GET' && method !== 'DELETE'"
      placeholder="JSON body"
      class="control"
    ></textarea>

    <button @click="sendRequest" class="btn">Enviar</button>

    <h2>Respuesta:</h2>
    <pre>{{ response }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../assets/tester.css'  // ✅ llamado correcto al CSS externo

const url = ref('')
const method = ref('GET')
const body = ref('')
const response = ref('')

const sendRequest = async () => {
  try {
    const options = {
      method: method.value,
      headers: { 'Content-Type': 'application/json' },
    }

    if (method.value !== 'GET' && method.value !== 'DELETE') {
      options.body = body.value
    }

    const res = await fetch(url.value, options)
    const data = await res.json()
    response.value = JSON.stringify(data, null, 2)
  } catch (err) {
    response.value = `Error: ${err.message}`
  }
}
</script>
