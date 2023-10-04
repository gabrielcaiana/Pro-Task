export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-svg", href: "/favicon.svg" }],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-vuefire", "nuxt-icon"],
  vuefire: {
    config: {
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      appId: "...",
    },
  },
});
