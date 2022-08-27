/**
 * ---------------------
 * 🚗🚦 Generated by nuxt-typed-router. Do not modify !
 * ---------------------
 * */

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const routesList = {
    '404': '404',
    'cms-Page': 'cms-page',
    'email-Confirm-Error': 'email-confirm-error',
    'email-Confirm': 'email-confirm',
    'email-Confirm-Success': 'email-confirm-success',
    index: 'index',
    login: 'login',
    'lost-Password': 'lost-password',
    parameters: {
      account: 'parameters-account',
      profile: 'parameters-profile'
    },
    'profile-Slug': 'profile-slug',
    register: 'register',
    'reset-Password': 'reset-password',
    sell: 'sell'
  };

  return {
    provide: {
      typedRouter: nuxtApp.$router,
      routesList
    }
  };
});
