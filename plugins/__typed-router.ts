/**
 * ---------------------
 * 🚗🚦 Generated by nuxt-typed-router. Do not modify !
 * ---------------------
 * */

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const routesList = {
    'cms-Page': 'cms-page',
    'email-Confirm-Error': 'email-confirm-error',
    'email-Confirm': 'email-confirm',
    'email-Confirm-Success': 'email-confirm-success',
    index: 'index',
    login: 'login',
    'lost-Password': 'lost-password',
    'profile-Slug': 'profile-slug',
    register: 'register',
    'reset-Password': 'reset-password'
  };

  return {
    provide: {
      typedRouter: nuxtApp.$router,
      routesList
    }
  };
});
