<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
const route = useRoute()
localStorage.setItem('USERINFO', JSON.stringify(route.query))
Object.assign(userStore.userInfo, route.query),
    userStore.visiable = false


</script>

<style lang="less" scoped></style>