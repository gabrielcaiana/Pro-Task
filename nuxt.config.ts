export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "initial-scale=1",
      meta: [{ name: "description", content: "Gerenciador de tarefas" }],
      link: [{ rel: "icon", type: "image/x-svg", href: "/favicon.svg" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-vuefire",
    "nuxt-icon",
    "@vite-pwa/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
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
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
    },
  },
});
