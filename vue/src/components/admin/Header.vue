<template>
    <header class="mdui-appbar mdui-appbar-fixed">
      <div class="toolbar mdui-toolbar">
        <button
          class="drawer mdui-btn mdui-btn-icon mdui-ripple"
          mdui-drawer="{target: '#main-drawer', swipe: true}"
        >
          <i class="mdui-icon material-icons">menu</i>
        </button>
        <a class="headline" href="/" target="_blank">网站首页</a>
        <div class="title">OneX 后台管理系统</div>
        <div class="mdui-toolbar-spacer"></div>
      </div>
    </header>
</template>

<script>
export default {
    name:"AdminHeader"
}
</script>

<style>

</style>