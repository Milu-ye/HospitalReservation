<template>
    <div class="search">
        <el-autocomplete @select="goDetail" :trigger-on-focus="false" v-model="keywords" style="width: 600px;" clearable
            :fetch-suggestions="fetchData" class="" placeholder="请输入医院名称" />
        <el-button style="height: 40px;" type="primary" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { reqHospitalInfo } from '@/api/home/index'
import type { Content, Hospital } from '@/api/home/type'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const keywords = ref<string>('')
const router = useRouter()
const fetchData = async (keywords: string, cb: any) => {
    console.log(1)
    const { data } = await reqHospitalInfo(keywords)
    console.log(data)
    cb(data.map((val: Hospital) => {
        return {
            value: val.hosname,
            hoscode: val.hoscode

        }
    }))
}
const goDetail = (val: any) => {
    router.push({
        path: '/hospital'
    })
}
</script>

<style lang="less" scoped>
.search {

    width: 100%;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}

:deep(.el-input__wrapper) {
    width: 300px;
    height: 40px;
    margin-right: 10px;
}

.el-bottom {
    height: 40px;
}
</style>