import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import store from '../vuex'




const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/~admin",
            name: "admin",
            component: () => import('../views/AdminView.vue'),
            beforeEnter: function (to, from) {
                // console.log(to);
                axios.post(`${store.state.api}/admin/CheckUser`).then(res => {
                    if (res.data.code == "00") {
                        return true;
                    } else {
                        layer.msg("登录身份失效,请先登录");
                        // 跳转到/login
                        router.push("/~login");
                    }
                }).catch(err => {
                    lauer.msg(err.msg)
                    return false;
                })
            },
            children: [
                {
                    path: "/~admin/index",
                    name: "admin_index",
                    component: () => import('@/components/admin/Index.vue')
                },
                {
                    path: "/~admin/cache",
                    name: "admin_cache",
                    component:  () => import('@/components/admin/Cache.vue')
                },
                {
                    path: "/~admin/show",
                    name: "admin_show",
                    component:  () => import('@/components/admin/Show.vue')
                },
                {
                    path: "/~admin/SEO",
                    name: "admin_SEO",
                    component:  () => import('@/components/admin/Seo.vue')
                },
                {
                    path: "/~admin/Link",
                    name: "admin_link",
                    component: () => import('@/components/admin/link.vue')
                }
            ]
        },
        {
            path: "/~login",
            name: "login",
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/',
            name: 'indedx',
            component: () => import('../views/IndexView.vue')
        },
        {
            path: '/:path+',
            name: 'list',
            component: () => import('../views/IndexView.vue')
        },
    ]
})

router.afterEach((to, from) => {
    // 刷新Google统计
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-130847064-2');

    // 刷新Google adsense
    (adsbygoogle = window.adsbygoogle || []).push({});

})

export default router
