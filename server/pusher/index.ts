import PusherServer from 'pusher';

const runtimeConfig = useRuntimeConfig();

export const pusherServerClient = new PusherServer({
  appId: runtimeConfig.pusherAppId,
  key: runtimeConfig.public.pusherAppKey,
  secret: runtimeConfig.pusherSecret,
  cluster: runtimeConfig.public.pusherCluster
  // useTLS: true
});
