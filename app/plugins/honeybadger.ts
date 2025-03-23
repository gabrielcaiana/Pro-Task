import Honeybadger from "@honeybadger-io/js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const options = {
    apiKey: config.public.honeybadger.apiKey,
    environment: config.public.honeybadger.environment,
    revision: "main",
  };

  const honeybadger = Honeybadger.configure(options);
  nuxtApp.provide("honeybadger", honeybadger);
});
