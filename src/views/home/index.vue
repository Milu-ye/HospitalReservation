<template>
    <div>
        <!-- 轮播图 -->
        <Carousel></Carousel>
        <Search></Search>
        <el-row style="margin-top: 40px;" :gutter="20">
            <el-col :span="20">
                <Level @getLevel="getLevel"></Level>
                <Region @getRegion="getRegion"></Region>
                <div class="hospital">
                    <card class="item" v-for="(item, index) in hasHospitalArr" :hospitalInfo="item" :key="index"></card>
                </div>
                <el-pagination class="pagegation" v-model:current-page="pageNo" v-model:page-size="pageSize"
                    :background="true" layout=" prev, pager, next, jumper,total" :total="total"
                    @current-change="currentChange" />
            </el-col>
            <el-col :span="4">
                <Tip></Tip>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Tip from './tip/index.vue'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import { reqHospital } from '@/api/home'
import { ref, onMounted, reactive } from 'vue'
import type { Content, HospitalResponseData } from '@/api/home/type'
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const hasHospitalArr = reactive<Content[]>([])
const total = ref<number>(0)
//存储医院等级
const hosType = ref<string>('');
//存储医院地区
const districtCode = ref<string>('')
//获取医院数据
const getHospitalInfo = async () => {
    let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hosType.value, districtCode.value)
    if (result.code == 200) {
        hasHospitalArr.splice(0, hasHospitalArr.length)

        Object.assign(hasHospitalArr, result.data.content)

        total.value = result?.data?.totalElements
    }
}
//分页器页码变化
const currentChange = () => {
    getHospitalInfo()
}
//子组件传送数据
const getLevel = (level: string) => {
    hosType.value = level
    getHospitalInfo()
}
const getRegion = (region: string) => {
    districtCode.value = region
    getHospitalInfo()
}
onMounted(() => {
    getHospitalInfo()
})
</script>

<style scoped lang="less">
.hospital {
    margin-top: 3vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        margin: 10px 0;
    }
}

.pagegation {
    margin: 3vh 0;
}
</style>