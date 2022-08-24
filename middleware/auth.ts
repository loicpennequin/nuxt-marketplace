export default defineNuxtRouteMiddleware(to => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn.value) navigateTo(`/login?from=${to.fullPath}`);
});
