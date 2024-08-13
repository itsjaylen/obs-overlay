import { defineNuxtPlugin } from '#app';
import createDebug from '~/components/global/debug/debug';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('createDebug', createDebug);
});