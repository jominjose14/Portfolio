export default {
  build: {
    target: "es2015",
    outDir: "build",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: "src/script/index.js",
        projects: "src/script/projects.js",
        style: "src/style/style.css",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
};
