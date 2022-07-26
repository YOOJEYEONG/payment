const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/v1.0", {
            target: "https://testpgapi.payletter.com", // 비즈니스 서버 URL 설정
            changeOrigin: true,
        })
    );
};
