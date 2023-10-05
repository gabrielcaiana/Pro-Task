export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-svg", href: "/favicon.svg" }],
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-vuefire",
    "nuxt-icon",
    "@vite-pwa/nuxt",
  ],
  vuefire: {
    config: {
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      appId: "...",
    },
  },
  pwa: {
    manifest: {
      name: "Gerenciador de tarefas",
      short_name: "Tarefas",
      theme_color: "#F5F5F5",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "gerenciador de tarefas",
        },
      ],
    },
  },
});
