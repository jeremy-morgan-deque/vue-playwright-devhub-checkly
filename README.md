# vue-playwright

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deploy to GitHub Pages

Production builds use `/vue-playwright-devhub-checkly/` as the `publicPath` in
[`vue.config.js`](./vue.config.js). Development continues to use `/`.

Run `npm run build`, then publish the contents of `dist/` to GitHub Pages
using a Pages deployment workflow or a dedicated publishing branch. The
site URL for this repository is:

https://jeremy-morgan-deque.github.io/vue-playwright-devhub-checkly/

This configuration prepares the build for Pages; it does not deploy it
automatically. Configure the matching publishing source under the
repository's **Settings > Pages**. If the repository is renamed, update
`publicPath` to match; for a custom domain or a user/organization site
served at the domain root, use `/` instead.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
