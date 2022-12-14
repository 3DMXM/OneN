// vuex
import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            api: "",
            host:"",
            site_name: "小莫的网盘",
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },        
    }
})

// 暴露
export default store