import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/AlexanderPotiagalov.github.io/", // <-- Add this line (Replace with your repo name)
  plugins: [react()],
});
