<<<<<<< HEAD
=======

>>>>>>> 4dc73ac5cebfe7198ab4e5c5af93010d3d809609
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
<<<<<<< HEAD
      'fabric': 'fabric/dist/fabric.js',
=======
>>>>>>> 4dc73ac5cebfe7198ab4e5c5af93010d3d809609
    },
  },
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_',
}));
