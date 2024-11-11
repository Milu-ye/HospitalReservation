<template>
    <div class="card_box">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h4>挂号详情</h4>
                </div>
            </template>
            <div class="top">
                <el-tag type="success">
                    <div class="tag">
                        <svg t="1731028225098" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4416" width="16" height="16">
                            <path
                                d="M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z"
                                p-id="4417" fill="#8a8a8a"></path>
                        </svg>
                        <span>{{ orderInfo.param?.orderStatusString }}</span>
                    </div>

                </el-tag>
            </div>
            <div class="bottom">
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊人信息
                                </div>
                            </template>
                            {{ orderInfo.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊日期
                                </div>
                            </template>
                            {{ orderInfo.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊医院
                                </div>
                            </template>
                            {{ orderInfo.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊科室
                                </div>
                            </template>
                            {{ orderInfo.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    医生职称
                                </div>
                            </template>
                            {{ orderInfo.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    服务费
                                </div>
                            </template>
                            {{ orderInfo.amount }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    挂号订单
                                </div>
                            </template>
                            {{ orderInfo.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    挂号时间
                                </div>
                            </template>
                            {{ orderInfo.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="button" v-if="orderInfo.orderStatus >= 0">
                        <el-popconfirm @confirm="cancelOrder" title="确定取消预约吗">
                            <template #reference>
                                <el-button plain>取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button @click="openDialog" v-if="orderInfo.orderStatus == 0" type="primary">支付</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>注意事项</span>
                            </div>
                        </template>
                        <p>1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                        <p>2、【取号】就诊当天需在{{ orderInfo.fetchTime }}在医院取号，未取号视为爽约，该号不退不换；</p>
                        <p>3、【退号】在{{ orderInfo.quitTime }}前可在线退号 ，逾期将不可办理退号退费；</p>
                        <p>4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p>
                        <p>5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
    </div>
    <el-dialog :show-close="false" v-model="dialogVisible" title="微信支付" width="400">
        <div class="qrcode">
            <img :src="imgUrl" alt="">
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
        </div>
        <template #footer>
            <el-button type="primary" @click="closeDialog">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reqOrderInfo, reqCancelOrder, reqQrcode, reqQueryPayState } from '@/api/user';
import { useRoute } from 'vue-router';
import type { OrderInfo } from '@/api/user/type';
import { onMounted, reactive, ref } from 'vue';
import QRCode from 'qrcode'
// import { ElMessage } from 'element-plus';
const route = useRoute();
const dialogVisible = ref<boolean>(false)
let timer: any;
const imgUrl = ref<string>()
const openDialog = async () => {
    const res = await reqQrcode(route.query.orderId as string)
    if (res.data?.resultCode == "FAIL") {
        //@ts-ignore
        ElMessage({
            type: 'error',
            message: '二维码获取失败'
        })
    }
    else {
        imgUrl.value = await QRCode.toDataURL(res.data?.codeUrl)
        dialogVisible.value = true
        timer = setInterval(async () => {
            const res = await reqQueryPayState(route.query.orderId as string)
            if (res.data) {
                dialogVisible.value = false;
                //@ts-ignore
                ElMessage({
                    type: 'success',
                    message: '支付成功'
                })
                clearInterval(timer);
                getOrderInfo()
            }
        }, 2000)
    }
}
const closeDialog = () => {
    dialogVisible.value = false;
    clearInterval(timer);
}
const orderInfo = reactive<OrderInfo>({} as OrderInfo)
const getOrderInfo = async () => {
    const res = await reqOrderInfo(route.query.orderId as string);
    Object.assign(orderInfo, res.data);
}
const cancelOrder = async () => {

    const res = await reqCancelOrder(route.query.orderId as string);
    //@ts-ignore
    if (res.code != 200) {
        //@ts-ignore
        ElMessage({
            type: 'error',
            //@ts-ignore
            message: res.message
        })
    }
    else {
        getOrderInfo()
    }

}
onMounted(() => {
    getOrderInfo()

})
</script>

<style lang="less" scoped>
.card_box {
    width: 100%;
}

.qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 200px;
        height: 200px;
    }

    p {
        line-height: 30px;
    }
}


.tag {
    display: flex;
    align-items: center;
}

.bottom {
    display: flex;
    justify-content: space-between;

    margin-top: 10px;

    .left {
        flex: 4;

        .button {
            margin-top: 10px;
        }
    }

    .right {
        flex: 6;
        margin-left: 10px;
    }
}
</style>