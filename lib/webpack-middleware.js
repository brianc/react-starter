import webpack from 'webpack'
import mw from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'
import hotMiddlware from 'webpack-hot-middleware'
import config from '../lib/config'

export default app => {
  if (config.dev) {
    const compiler = webpack(webpackConfig)
    app.use(mw(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))

    app.use(hotMiddlware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }))
  }
}
