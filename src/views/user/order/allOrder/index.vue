<template>
    <el-card style="max-width: 2000px;">
        <template #header>
            <div class="card-header">
                <h3 style="font-size: 20px;">挂号订单</h3>
            </div>
        </template>
        <el-form :inline="true">
            <el-form-item label-width="70" style="max-width: 300px; width: 400px;" label="就诊人">
                <el-select placeholder="请选择就诊人" v-model="patientId" @change="getOrderInfo">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in userArr" :key="item.id" :label="item.name" :value="item.id"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label-width="70" style="max-width: 300px;width: 400px;" label="订单状态">
                <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="getOrderInfo">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in orderStateArr" :label="item.comment" :value="item.status"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table :row-style="{ fontSize: '14px', textAlign: 'center' }" :cell-style="{ textAlign: 'center' }"
            :data="orderArr" :header-cell-style="{ textAlign: 'center' }" border>
            <el-table-column label="就诊时间" prop="reserveDate" width="150"></el-table-column>
            <el-table-column label="医院" prop="hosname"></el-table-column>
            <el-table-column label="科室" prop="depname"></el-table-column>
            <el-table-column label="医生" prop="title"></el-table-column>
            <el-table-column label="服务费" prop="amount"></el-table-column>
            <el-table-column label="就诊人" prop="patientName"></el-table-column>
            <el-table-column label="订单状态" prop="param.orderStatusString" width="100"></el-table-column>
            <el-table-column label="操作" prop="" width="60">
                <template #default="{ row }">
                    <el-button type="text" @click="goDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handler" v-model:current-page="pageNow" v-model:page-size="pageSize"
            style="margin: 20px 0;" :page-sizes="[10, 20, 30, 40]" layout=" prev, pager, next, jumper, ->,sizes,total"
            :total="total" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqUserOrderInfo, reqAllUser, reqOrderState } from '@/api/user';
import type { OrderState, User, OrderInfo } from '@/api/user/type';
import { useRouter } from 'vue-router';
const router = useRouter()
const pageNow = ref(1)
const total = ref(0);
const pageSize = ref(10)
const patientId = ref<string>('')
const orderStatus = ref('')
const orderArr = reactive<OrderInfo[]>([])
const userArr = reactive<User[]>([])
const orderStateArr = reactive<OrderState[]>([])
const getOrderInfo = async () => {
    const res = await reqUserOrderInfo(pageNow.value, pageSize.value, patientId.value, orderStatus.value)
    if (res.code == 200) {
        orderArr.splice(0, orderArr.length);
        Object.assign(orderArr, res.data?.records)
        total.value = res.data?.total
    }
}
const goDetail = (row: any) => {
    console.log(1)
    router.push({
        path: '/user/order',
        query: {
            orderId: row.id
        }
    })
}
const handler = () => {
    getOrderInfo()
}
const getData = async () => {
    const resUser = await reqAllUser()
    const resOrder = await reqOrderState()
    userArr.splice(0, userArr.length)
    Object.assign(userArr, resUser.data)
    orderStateArr.splice(0, orderStateArr.length)
    Object.assign(orderStateArr, resOrder.data)
}
onMounted(() => {
    getOrderInfo()
    getData()

})
</script>

<style scoped></style>