const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/afikoman',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true,
    })
  );

  const wsProxy = createProxyMiddleware('/ws', {
    pathRewrite: {'^/ws' : ''},
    target: 'http://localhost:3030',
    ws: true,
    changeOrigin: true
  });
  app.use(wsProxy);

  app.on('upgrade', wsProxy.upgrade);
};