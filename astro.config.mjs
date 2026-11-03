// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://www.redop.org",

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [react()],
});
