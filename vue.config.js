module.exports = {
  runtimeCompiler: true, // https://cli.vuejs.org/config/#runtimecompiler
  outputDir: 'html-plugin-errors-dist',
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/assets/stylesheet-hot-reload-styles.scss";`
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.entry('styles-a')
        .add('./src/assets/stylesheet-a.scss')
        .end()
      config.entry('styles-b')
        .add('./src/assets/stylesheet-b.scss')
        .end()
      config.entry('styles-c')
        .add('./src/assets/stylesheet-c.scss')
        .end()
      config.entry('styles-d')
        .add('./src/assets/stylesheet-d.scss')
        .end()
      config.plugin('html')
        .tap(([config, ...args]) => {
          config.excludeChunks = ['styles-a', 'stylesheet-b.scss', 'styles-c.css', /styles/]
          const returnArgs = [config, ...args]
          return returnArgs
        })
        .end()
    }
  }
}