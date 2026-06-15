import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readdir, rm } from "node:fs/promises";

const pruneOriginalGallery = () => ({
  name: "prune-original-gallery",
  apply: "build",
  async closeBundle() {
    const galleryDirectory = new URL("./dist/outsideoftech/", import.meta.url);

    try {
      const entries = await readdir(galleryDirectory, { withFileTypes: true });
      const originals = entries.filter(
        (entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name),
      );

      await Promise.all(
        originals.map((entry) => rm(new URL(entry.name, galleryDirectory))),
      );
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  },
});

export default defineConfig({
  plugins: [react(), pruneOriginalGallery()],
  base: "/",
});
