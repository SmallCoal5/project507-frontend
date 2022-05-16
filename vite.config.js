import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    server: {
        host:"172.31.225.62",
        port:"3000",
        proxy: {
          '/base': {
            target: 'http://172.31.225.62:8000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/base/, '')
          }
        }
     },

}