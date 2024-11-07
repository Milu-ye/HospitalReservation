<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button :icon="User" type="primary" size="default">添加就诊人</el-button>
                </div>
            </template>
            <div class="user">
                <Visitor :isSelect="nowSelect == index" @click="select(index)" v-for="(user, index) in users"
                    :key="user.id" :user="user" class="item">
                </Visitor>
            </div>

        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            就诊日期：
                        </div>
                    </template>
                    {{ docInfo.workDate }}
                </el-descriptions-item>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            就诊医院：
                        </div>
                    </template>
                    {{ docInfo.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            就诊科室：
                        </div>
                    </template>
                    {{ docInfo.param?.depname }}
                </el-descriptions-item>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            医生姓名：
                        </div>
                    </template>
                    {{ docInfo.docname }}
                </el-descriptions-item>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            医生职称：
                        </div>
                    </template>
                    {{ docInfo.title }}
                </el-descriptions-item>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            医生专长：
                        </div>
                    </template>
                    {{ docInfo.skill }}
                </el-descriptions-item>
                <el-descriptions-item min-width="200px" align="center">
                    <template #label>
                        <div class="cell-item">
                            医事服务费：
                        </div>
                    </template>
                    {{ docInfo.amount }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <div class="btn">
            <el-button type="primary" size="default " @click="submitOrder">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue';
import { reqSubmitOrder } from '@/api/user';
import { reqGetUser, reqDoctorInfo } from '@/api/hospital';
import type { User as UserInfo, Doctor } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
import Visitor from './Visitor.vue';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
const router = useRouter()
const route = useRoute()
const users = reactive<UserInfo[]>([])
const docInfo = reactive<Doctor>({} as Doctor)
const fetchUserData = async () => {
    const res = await reqGetUser()
    if (res.code == 200) {
        Object.assign(users, res.data)
    }
}
const nowSelect = ref<number>(0)
const select = (index: number) => {
    nowSelect.value = index
}
const fetchInfo = async () => {
    const res = await reqDoctorInfo(route.query.docId as string)
    Object.assign(docInfo, res.data)
}
const submitOrder = async () => {
    const res = await reqSubmitOrder(docInfo.hoscode, docInfo.id, users[nowSelect.value]?.id)
    if (res.code == 200) {
        router.push({
            path: '/user/order',
            query: {
                orderId: res.data
            }
        })
    }

}
onMounted(() => {
    fetchUserData()
    fetchInfo()
})
</script>

<style scoped lang="less">
.container {
    .tip {
        font-size: 25px;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

        }

        .user {
            display: flex;

            align-items: center;
            flex-wrap: wrap;

            .item {
                width: 32%;
                margin: 5px;

            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;

        .el-button {
            margin-bottom: 20px;
            width: 200px;
        }
    }

}

:deep(.el-descriptions__cell .el-descriptions__label .is-bordered-label) {
    width: 20%;
}
</style>