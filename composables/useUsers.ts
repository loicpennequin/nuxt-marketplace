export const useUsers = () => useQuery(['users'], () => $fetch('/api/users'));
