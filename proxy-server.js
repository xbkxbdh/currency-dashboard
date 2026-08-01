const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/', createProxyMiddleware({
  target: 'https://api-web.tabdeal.org',
  changeOrigin: true,
  pathRewrite: { '^/': '/r/plots/currencies/dynamic-info/' },
  on: {
    proxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
