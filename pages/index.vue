<script setup lang="ts">
const { data: users, error, isLoading } = useTrpcQuery(['user.findAll']);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">An error has occured.</div>
    <div v-else-if="users && !users.length">There are no users yet.</div>
    <ul v-else-if="users">
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
