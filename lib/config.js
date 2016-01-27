var env = process.env.NODE_ENV

module.exports = {
  port: process.env.PORT || 3000,
  dev: !env || env == 'development',
  prod: env == 'production',
}
