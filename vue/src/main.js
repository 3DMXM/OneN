import { createApp } from 'vue'
import VueLoaders from 'vue-loaders';




import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex
import vuex from './vuex'



const app = createApp(App)

// Google Ad
import ScriptX from 'vue-scriptx'
app.use(ScriptX)
import Adsense from 'vue-google-adsense/dist/Adsense.min.js'
import InArticleAdsense from 'vue-google-adsense/dist/InArticleAdsense.min.js'
import InFeedAdsense from 'vue-google-adsense/dist/InFeedAdsense.min.js'
app.use(Adsense)
app.use(InArticleAdsense)
app.use(InFeedAdsense)


app.use(VueLoaders)
app.use(router)
app.use(vuex)


app.mount('#app')
 