<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p v-if="!userStore.userInfo.name" class="login" @click="login">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo?.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>实名认证</el-dropdown-item>
                            <el-dropdown-item>挂号订单</el-dropdown-item>
                            <el-dropdown-item>就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue'
const userStore = useUserStore()
const router = useRouter()
const goHome = () => {
    router.push({
        path: '/home'
    })
}
const login = () => {
    userStore.visiable = true
}
const logout = () => {
    userStore.logout()
    router.push({
        path: '/home'
    })
}
</script>

<style style="less" scoped>
.el-dropdown {
    span {
        cursor: pointer;

        &:hover {
            color: skyblue;
        }
    }

}

.top {
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 999;

    .content {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    .left {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        p {
            font-size: 20px;
            color: rgb(68, 144, 241)
        }
    }

    .right {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #939191;


        p {
            cursor: pointer;

            &:hover {
                color: skyblue
            }
        }

        .help {
            margin-right: 10px;
            cursor: pointer;

            &:hover {
                color: skyblue
            }

            ;
        }
    }
}
</style>