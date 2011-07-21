var cluster = require('cluster')

module.exports = function() {
  return cluster(__dirname + '/app')
          .use(cluster.logger('logs', 'debug'))
          .use(cluster.debug())
          .listen(3000)
}
