<script setup lang="ts">
const { data: currentUser, suspense } = useCurrentUser();
const {
  data,
  error,
  isLoading,
  refetch: refetchUsers
} = useTrpcQuery(['user.findAll']);
const { jwt } = useJwt();

const { login, refreshToken, logout, isLoggedIn } = useAuth();

const onLogin = () => {
  login({ email: 'daria@gmail.com', password: 'azerty' });
};

const onLogout = () => logout(null);

const onRefetchUsers = () => {
  return refetchUsers();
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

    <button bg-blue-300 p-3 m-2 @click="onRefetchUsers">Refresh users</button>

    <div v-if="!isLoggedIn">
      <button bg-blue-300 p-3 m-2 @click="onLogin">Sign in</button>
    </div>
    <div v-else>
      <button bg-blue-300 p-3 m-2 @click="onLogout">Log out</button>
      <button bg-blue-300 p-3 m-2 @click="refreshToken(null)">
        Refresh JWT
      </button>
      <p>Jwt: {{ jwt }}</p>
    </div>
  </div>
</template>
