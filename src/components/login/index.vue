<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visiable" width="40%" title="用户登录">
            <div class="content">
                <el-row>
                    <el-col :span="12">
                        <div class="login">
                            <el-form :model="loginParam" :rules="rules" v-show="isPhoneLogin" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" v-model="loginParam.phone"
                                        :prefix-icon="User"></el-input>
                                </el-form-item>

                                <el-form-item prop="code">
                                    <el-button @click="getCode" type="primary" plain
                                        :disabled="!isPhoneRight || pastTime > 0">获取验证码{{ pastTime > 0 ?
                                            ' (' + pastTime + ')' : ''
                                        }}</el-button>
                                    <el-input v-model="loginParam.code"
                                        style=" width: 200px; margin-left: 10px;"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="webchat" v-show="!isPhoneLogin">
                                <div id="login_container"></div>
                            </div>
                            <div class="bottom">
                                <el-button @click="login" :disabled="!isPhoneRight || loginParam.code.length < 6"
                                    v-show="isPhoneLogin" style="width: 90%;" type="primary">登录</el-button>
                                <p>{{ isPhoneLogin ? '微信登录' : '手机登录' }}</p>
                                <svg v-show="isPhoneLogin" @click="changeLoginMethod" t="1730527296276" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5370"
                                    width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="5371"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="5372"></path>
                                </svg>
                                <svg @click="changeLoginMethod" v-show="!isPhoneLogin" t="1730527942768" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6727"
                                    width="32" height="32">
                                    <path
                                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                        fill="#1296db" p-id="6728"></path>
                                </svg>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="leftContent">
                            <div class="top">
                                <div class="item">
                                    <img src="../../assets/images/code_app.png" alt="">
                                    <svg t="1730527296276" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5370" width="16" height="16">
                                        <path
                                            d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                            fill="#8a8a8a" p-id="5371"></path>
                                        <path
                                            d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                            fill="#8a8a8a" p-id="5372"></path>
                                    </svg>
                                    <p>微信扫一扫关注</p>
                                    <p>快速预约挂号</p>
                                </div>
                                <div class="item">
                                    <img src="../../assets//images/code_login_wechat.png" alt="">
                                    <svg t="1730527942768" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="6727" width="16" height="16">
                                        <path
                                            d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                            fill="#000000" p-id="6728"></path>
                                    </svg>
                                    <p>扫一扫下载</p>
                                    <p>“预约挂号”APP</p>
                                </div>
                            </div>
                            <p class="tip">
                                官方指定平台
                            </p>
                            <p class="tip">快速挂号 安全放心</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <el-button type="primary" @click="">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { User } from '@element-plus/icons-vue'
import { reqCode, reqUserLogin, reqWxLogin } from '@/api/hospital';
import { ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus';
const userStore = useUserStore()
const isPhoneLogin = ref(true)
const pastTime = ref<number>(0)
const changeLoginMethod = async () => {
    isPhoneLogin.value = !isPhoneLogin.value
    if (!isPhoneLogin.value) {
        console.log(1)
        const res = await reqWxLogin(encodeURIComponent(location.origin + '/wxlogin'))
        console.log(res)
        //@ts-ignore
        new WxLogin({
            self_redirect: true,
            id: "login_container",
            appid: res.data.appid,
            scope: "snsapi_login",
            redirect_uri: res.data.redirectUri,
            state: res.data.state,
            style: "black",
            href: ""
        });
    }
}
const form = ref<any>(null)
const login = async () => {
    await form.value.validate()
    try {
        await userStore.userLogin(loginParam)
        userStore.visiable = false
    } catch (error: Error) {
        ElMessage({
            type: 'error',
            message: error.message
        })
    }
}
const loginParam = reactive({
    phone: '',
    code: ''
})
const validatorPhone = (rule: any, val: any, cb: any) => {
    const reg = /^[1][3456789][0-9]{9}$/
    if (reg.test(val)) {
        cb()
    } else {
        cb(new Error('请输入正确手机号'))
    }
}
const validatorCode = (rule: any, val: any, cb: any) => {
    if (val.length == 6) {
        cb()
    } else {
        cb(new Error('验证码位数错误'))
    }
}
const rules = reactive({
    phone: [{ validator: validatorPhone, trigger: 'blur' }],
    code: [{ validator: validatorCode, trigger: 'blur' }]
})
const getCode = async () => {
    pastTime.value = 5;
    const timer = setInterval(() => {
        pastTime.value--;
        if (pastTime.value <= 0) {
            clearInterval(timer)
        }
    }, 1000)
    const res = await reqCode(loginParam.phone)
    if (res.code == 200) {
        console.log(res.data)
        if (res.data) {
            loginParam.code = res.data
        }
    }
}

const isPhoneRight = computed(() => {
    const reg = /^[1][3456789][0-9]{9}$/
    return reg.test(loginParam.phone)
})
</script>

<style lang="less" scoped>
.webchat {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login_container {
    .login {

        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 2px;

        .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;

            svg {
                cursor: pointer;
            }

            p {
                margin: 10px 0;
            }

        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0;
                }
            }
        }

        .tip {
            text-align: center;
            margin: 20px 0;
            font-size: 20px;
            font-weight: 900;
        }
    }

}

:deep(.el-form-item__content) {
    justify-content: space-between;
}
</style>