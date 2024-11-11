<template>
    <el-card>
        <template #header>
            <h4 style="font-size: 18px;font-weight: 900;">实名信息</h4>
        </template>

        <el-descriptions v-if="userInfo.authStatus == 1" min-width="0" class="margin-top" :column="1" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        姓名
                    </div>
                </template>
                {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">

                        证件类型
                    </div>
                </template>
                {{ userInfo.certificatesType == '10' ? '身份证 ' : '户口本' }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">

                        证件号码
                    </div>
                </template>
                {{ userInfo.certificatesNo }}
            </el-descriptions-item>

        </el-descriptions>
        <el-form v-if="userInfo.authStatus == 0" :model="form" label-width="80" style="width: 60%;margin: 20px auto;">
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="form.name" />
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select v-model="form.region" placeholder="请选择证件类型">
                    <el-option label="身份证" value="IDcard" />
                    <el-option label="户口本" value="Homecard" />
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input placeholder="请输入证件号码" v-model="form.name" />
            </el-form-item>
            <el-form-item label="上传证件">
                <el-upload list-type="picture-card">
                    <el-icon>

                    </el-icon>
                </el-upload>

                <el-dialog>
                    <img w-full alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button type="primary">重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { onMounted, reactive } from 'vue';
import { reqUserInfo } from '@/api/user';
import type { Userinfo } from '@/api/user/type';
const userInfo = reactive<Userinfo>({} as Userinfo)
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const getUserInfo = async () => {
    const res = await reqUserInfo()
    if (res.code == 200) {
        Object.assign(userInfo, res.data)
    }
}
onMounted(() => {
    getUserInfo()
})
</script>

<style lang="less" scoped>
.cell-item {
    width: 100%;
    text-align: center;
}

.el-descriptions .margin-top {
    :deep(.el-descriptions__cell .el-descriptions__label .is-bordered-label) {
        width: 30px;
    }
}
</style>