import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [paraglideVitePlugin({ project: "./project.inlang", outdir: "./src/paraglide" }),svelte()],
  resolve: {
    alias: {
      $public: path.resolve("./public"),
      $assets: path.resolve("./src/assets"),
      $components: path.resolve("./src/components"),
      $config: path.resolve("./src/config"),
      $data: path.resolve("./src/data"),
      $lib: path.resolve("./src/lib"),
      $pages: path.resolve("./src/pages"),
      $paraglide: path.resolve("./src/paraglide"),
      $services: path.resolve("./src/services"),
      $stores: path.resolve("./src/stores"),
      $types: path.resolve("./src/types"),
      $utils: path.resolve("./src/utils"),
    },
  }
})
