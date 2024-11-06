// @ts-ignore
import HoneybadgerSourceMapPlugin from '@honeybadger-io/rollup-plugin';

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "initial-scale=1",
      meta: [{ name: "description", content: "Pro Task" }],
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
    registerType: "autoUpdate",
    manifest: {
      name: "Pro Task",
      short_name: "Pro Task",
      theme_color: "#5030E5",
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
          purpose: "any maskable",
        },
      ],
    },
  },
  imports: {
    dirs: ["stores"],
  },
  vite: {
    build: {
      rollupOptions: {
        plugins: [
          HoneybadgerSourceMapPlugin({
            apiKey: process.env.HONEYBADGER_API_KEY,
            assetsUrl: 'https://protask.gabrielcaiana.com/_nuxt/',
            revision: process.env.COMMIT_SHA || new Date().toISOString(),
          }),
        ],
      },
    },
  },
  runtimeConfig: {
    public: {
      honeybadger: {
        apiKey: process.env.HONEYBADGER_API_KEY,
        environment: process.env.HONEYBADGER_ENVIRONMENT,
      },
    },
  },
});
