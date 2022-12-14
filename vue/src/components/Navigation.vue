<script setup>

</script>


<template>
    <div class="mdui-toolbar nexmoe-item">
        <RouterLink to="/">{{$store.state.site_name}}</RouterLink>
        <template v-if="isChild">
            <template v-for=" (p,index) in pathList" :key="index" >
                <i class="mdui-icon material-icons mdui-icon-dark" style="margin:0;">chevron_right</i>
                <RouterLink :to="p.path">{{p.name}}</RouterLink>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name:"Navigation",
    props:['isChild', 'pathList']
}   
</script>
