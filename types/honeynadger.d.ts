import { Honeybadger } from "@honeybadger-io/js";

declare module '#app' {
  interface NuxtApp {
    $honeybadger: Honeybadger;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $honeybadger: Honeybadger;
  }
}
