// webpack.config.js
const webpack = require("webpack");

module.exports = {
  // your existing configuration...
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"), // Add this if you also want to polyfill https
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
