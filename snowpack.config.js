/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-react-refresh',
    'snowpack-plugin-web-ext'
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    installTypes: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    metaDir: "snowpack_meta" // chrome issue with __snowpack__ because _ is reserved for system
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
