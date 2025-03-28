// @ts-ignore - not exists types for honeybadger-io/rollup-plugin
import HoneybadgerSourceMapPlugin from "@honeybadger-io/rollup-plugin";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  dir: {
    app: "app",
  },
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

  vuefire: {
    auth: { enabled: true },
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
        { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
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

  sourcemap: { client: true },

  vite: {
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          sourcemap: true,
        },
      },
    },
    plugins: [
      HoneybadgerSourceMapPlugin({
        apiKey: process.env.HONEYBADGER_API_KEY,
        assetsUrl: "https://protask.gabrielcaiana.com",
        revision: process.env.VERCEL_GIT_COMMIT_SHA || new Date().toISOString(),
      }),
    ],
  },

  runtimeConfig: {
    public: {
      honeybadger: {
        apiKey: process.env.HONEYBADGER_API_KEY,
        environment: process.env.HONEYBADGER_ENVIRONMENT,
      },
    },
  },

  compatibilityDate: "2025-03-23",
});
