<script setup lang="ts">
const http = useHttp();
const { data: currentUser, suspense } = useCurrentUser();
const { data, error, isLoading, refetch } = useQuery(['users'], () =>
  http.get('/api/users', {
    params: {
      'query[]': [1, 2, 3]
    }
  })
);
const { jwt } = useJwt();

const register = async () => {
  await http.post('/api/users', {
    method: 'post',
    body: {
      username: 'Daria',
      email: 'daria@gmail.com',
      password: 'azerty'
    }
  });

  refetch();
};

const { login } = useAuth();
const onLogin = () => {
  login({ email: 'daria@gmail.com', password: 'azerty' });
};

const onRefetch = () => {
  refetch();
};

onServerPrefetch(suspense);
</script>

<template>
  <div>
    <h1>Hello, {{ currentUser ? currentUser.username : 'Friend' }}</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">An error has occured.</div>
    <div v-else-if="data && !data.length">There are no users yet.</div>
    <ul v-else-if="data">
      <li v-for="user in data" :key="user.id">
        {{ user.username }} - {{ user.email }}
      </li>
    </ul>
    <button bg-blue-300 p-3 m-2 @click="register">Register</button>
    <button bg-blue-300 p-3 m-2 @click="onLogin">Sign in</button>
    <button bg-blue-300 p-3 m-2 @click="onRefetch">Refresh users</button>
    <button bg-blue-300 p-3 m-2 @click="onRefetch">Refresh JWT</button>
    <p>Jwt: {{ jwt }}</p>
  </div>
</template>
