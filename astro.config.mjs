import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const markdownProcessor = unified({
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
});

export default defineConfig({
  site: "https://swpelc.eu",
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: markdownProcessor,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
