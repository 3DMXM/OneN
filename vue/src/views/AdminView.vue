<script setup>
import AdminHeader from '@/components/admin/Header.vue'
import AdminDrawer from '@/components/admin/Drawer.vue'

</script>

<template>
  <div class="admin">
    <AdminHeader />
    <AdminDrawer />
    <div class="mdui-container-fluid doc-container">
        <router-view />
    </div>
  </div>
</template>

<script>
export default {
    name: 'Admin',
    mounted() {
        // 在body 中添加 class 
        // class 列表： mdui-appbar-with-toolbar mdui-loaded mdui-theme-layout-dark mdui-theme-primary-cyan mdui-theme-accent-cyan
        document.body.classList.add('mdui-drawer-body-left','mdui-appbar-with-toolbar', 'mdui-loaded', 'mdui-theme-layout-dark', 'mdui-theme-primary-cyan', 'mdui-theme-accent-cyan')
        
    }
};
</script>

<style lang="less">
body{
    background-image: unset !important;
}
</style>