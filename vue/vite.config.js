import { fileURLToPath, URL } from 'url'

import { defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import exp from 'constants'


// https://vitejs.dev/config/
export default  defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },        
    },
    server:{
        proxy: {
            '/api': {
                target: 'http://172.26.17.27:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})

