<template>
    <div>
        <el-card v-if="!isShowForm">
            <template #header>
                <div class="card-header">
                    <h4>就诊人管理</h4>
                    <el-button :icon="User" @click="addUser" type="primary">添加就诊人</el-button>
                </div>
            </template>
            <div class="user">
                <Visitor @showForm="showForm" :isSelect="nowSelect == index" v-for="(user, index) in users"
                    :key="user.id" :user="user" class="item">
                </Visitor>
            </div>
        </el-card>
        <el-card v-show="isShowForm">
            <template #header>
                <h4>就诊人编辑</h4>
            </template>
            <el-divider content-position="left">就诊人信息</el-divider>
            <el-form style="width: 60%;margin: 0 auto;">
                <el-form-item label-width="90" label="用户姓名">
                    <el-input placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label-width="90" label="证件类型">
                    <el-select placeholder="请选择证件类型">
                        <el-option label="身份证" value="10"></el-option>
                        <el-option label="户口本" value="20"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="90" label="证件号码">
                    <el-input placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item label-width="90" label="用户性别">
                    <el-radio-group>
                        <el-radio value="1">男</el-radio>
                        <el-radio value="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label-width="90" label="出生日期">
                    <el-date-picker type="datetime" placeholder="请选择日期" />
                </el-form-item>
                <el-form-item label-width="90" label="手机号码">
                    <el-input placeholder="请输入手机号码"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">建档信息</el-divider>
            <el-form style="width: 60%;margin: 0 auto;">
                <el-form-item label-width="90" label="婚姻状况">
                    <el-radio-group>
                        <el-radio value="1">已婚</el-radio>
                        <el-radio value="2">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label-width="90" label="自费/医保">
                    <el-radio-group>
                        <el-radio value="1">自费</el-radio>
                        <el-radio value="2">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label-width="90" label="当前住址">
                    <el-cascader />
                </el-form-item>
                <el-form-item label-width="90" label="详细地址">
                    <el-input placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">联系人信息</el-divider>
            <el-form style="width: 60%;margin: 0 auto;">
                <el-form-item label-width="90" label="用户姓名">
                    <el-input placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label-width="90" label="证件类型">
                    <el-select placeholder="请选择证件类型">
                        <el-option label="身份证" value="10"></el-option>
                        <el-option label="户口本" value="20"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="90" label="证件号码">
                    <el-input placeholder="请输入证件号码"></el-input>
                </el-form-item>


                <el-form-item label-width="90" label="手机号码">
                    <el-input placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label-width="90">
                    <el-button type="primary">提交</el-button>

                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue"
import Visitor from "@/views/hospital/register/register_step2/Visitor.vue";
import { reqGetUser } from '@/api/hospital';
import type { User as UserInfo } from '@/api/hospital/type';
import { onMounted, reactive, ref } from 'vue';

const users = reactive<UserInfo[]>([])
const nowSelect = ref<number>(-1)
const fetchUserData = async () => {
    const res = await reqGetUser()
    if (res.code == 200) {
        Object.assign(users, res.data)
    }
}
// const props = {
//     lazy:true,
//     //@ts-ignore
//     async lazyLoad(node,resolve) {
//         const res = await reqGetUser(node.data || '86');
//         const data = res.data.map(() => {
//             return {
//                 label:res.data.name;
//                 value:res.data.value;
//                 leaf:!res.data.hasChild
//             }
//         })
//         resolve(data)
//     }
// }
const addUser = () => {
    isShowForm.value = true
}
const showForm = () => {
    isShowForm.value = true;
}
const isShowForm = ref(false)
onMounted(() => {
    fetchUserData()
})
</script>

<style lang="less" scoped>
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
</style>