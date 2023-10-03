const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend server URL
        host: '', // Replace with the desired hostna
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
