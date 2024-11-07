<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line"></div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>

            <div class="hosdepartment">{{ workData.baseMap?.depname }}</div>
        </div>
        <div class="center">
            <h1>{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div @click="selectDate(index)" v-for="(item, index) in workData?.bookingScheduleList"
                    :class="{ active: item.status == -1, select: nowSelect == index }" :key="index" class="item">
                    <div class="top">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
                    <div class="bottom">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-else-if="item.status == 0">{{ `剩余: ${item.availableNumber}` }}
                        </div>
                        <div v-else-if="item.status == 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page="pageNum" @current-change="fetchWorkData" layout="prev, pager, next"
                :total="total" v-model:page-size="limit" />
        </div>
        <div class="bottom">
            <div v-if="workData?.bookingScheduleList?.[nowSelect].status == 1" class="will">
                <span>2023年6月7日9点放号</span>

            </div>
            <div v-else class="doctor">
                <div class="pretime">
                    <div class="tip">
                        <svg t="1730810554458" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4307" width="32" height="32">
                            <path
                                d="M814.592 409.63l96.075-96.105-81.77-81.77-95.924 95.865a381.803 381.803 0 0 1 81.619 82.01zM881.965 572.597c2.952 18.823 4.427 38.189 4.427 57.826 0 19.606-1.505 38.972-4.427 57.825h136.011V572.597h-136.01zM569.826 259.223V124.446H454.174v134.355c18.402-2.801 37.195-4.247 56.38-4.277 20.15 0 39.936 1.627 59.272 4.699zM289.792 326.415l-94.66-94.66-81.77 81.77 94.42 94.449c22.98-31.202 50.658-58.76 82.01-81.559zM134.686 630.423c0-19.697 1.506-38.973 4.458-57.826H6.024v115.651h133.12c-2.952-18.853-4.458-38.159-4.458-57.825zM227.358 688.67h566.423c3.885-18.823 5.903-38.31 5.903-58.278 0-159.412-129.687-289.16-289.13-289.16-159.382 0-289.099 129.718-289.099 289.16 0 19.968 2.018 39.455 5.903 58.278zM902.837 779.083h-783.06c-33.249 0-60.234 26.986-60.234 60.236s26.985 60.235 60.235 60.235h783.059c33.25 0 60.235-26.986 60.235-60.235s-26.985-60.236-60.235-60.236z"
                                p-id="4308" fill="#7dc5eb"></path>

                        </svg>
                        <span>上午</span>
                    </div>
                    <div v-if="workData?.bookingScheduleList?.[nowSelect]?.status != -1"
                        v-for="doctor in morningDoctors" :key="doctor.id" class="doc_info">
                        <div class="left">
                            <div class="info"><span>{{ doctor.title }}</span><span
                                    style="display: inline-block; border: 1px solid skyblue;height: 15px;"></span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button @click="goStep2(doctor.id)" type="primary">剩余:{{ doctor.availableNumber
                                }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="pretime">
                    <div class="tip">
                        <svg t="1730812384769" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4494" width="32" height="32">
                            <path
                                d="M930.816 139.52c0 25.6-20.736 46.592-47.36 46.592H140.544c-26.112 0-47.36-21.504-47.36-46.592 0-25.6 20.736-46.592 47.36-46.592h742.912c26.112 0.256 47.36 21.76 47.36 46.592zM558.592 788.736v96.512c0 25.344-21.504 45.824-46.592 45.824-25.6 0-46.592-21.248-46.592-45.824v-96.512c30.976 3.328 62.208 3.328 93.184 0z m280.832-154.88l56.832 56.832c17.92 17.92 17.152 47.616-0.512 65.28-18.176 18.176-47.872 17.92-65.28 0.512l-56.832-56.832c24.064-19.456 46.336-41.472 65.792-65.792z m-588.8 65.792l-56.832 56.832c-17.92 17.92-47.616 17.152-65.28-0.512-18.176-18.176-17.92-47.872-0.512-65.28l56.832-56.832c19.2 24.32 41.472 46.336 65.792 65.792zM186.112 372.48c0 179.968 145.92 325.888 325.888 325.888s325.888-145.92 325.888-325.888h139.52c25.344 0 46.592-20.736 46.592-46.592 0-24.832-20.992-46.592-46.592-46.592H46.592c-25.344 0-46.592 20.736-46.592 46.592 0 25.088 20.992 46.592 46.592 46.592h139.52z m0 0"
                                p-id="4495" fill="#7dc5eb"></path>
                        </svg>
                        <span>下午</span>
                    </div>
                    <div v-if="workData?.bookingScheduleList?.[nowSelect]?.status != -1"
                        v-for="doctor in afternoonDoctors" :key="doctor.id" class="doc_info">
                        <div class="left">
                            <div class="info"><span>{{ doctor.title }}</span><span
                                    style="display: inline-block; border: 1px solid skyblue;height: 15px;"></span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button @click="goStep2(doctor.id)" type="primary">剩余:{{ doctor.availableNumber
                                }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HospitalWorkData, BookingScheduleList, Doctor } from '@/api/hospital/type'
import { onMounted, ref, reactive, computed } from 'vue';
import useUserStore from '@/store/modules/user';
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital/index'
import { useRoute, useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const workData = reactive<HospitalWorkData>({} as HospitalWorkData)
const route = useRoute()
const pageNum = ref<number>(1)
const limit = ref<number>(6)
const total = ref<number>(2)
const doctors = reactive<Doctor[]>([])
const nowSelect = ref<number>(0)
const fetchWorkData = async () => {
    const res = await reqHospitalWork(pageNum.value, limit.value, route.query.hoscode as string, route.query.depcode as string)
    total.value = res.data.total
    Object.assign(workData, res.data)
    nowSelect.value = 0;
    fetchDoctor()
}
const goStep2 = (docId: string) => {
    router.push({
        name: 'register_step2',
        query: {
            docId
        }
    })
}
const fetchDoctor = async () => {
    const res = await reqHospitalDoctor(route.query.hoscode as string, route.query.depcode as string, workData.bookingScheduleList?.[nowSelect.value]?.workDate)
    Object.assign(doctors, res.data)
}
const selectDate = (select: number) => {
    nowSelect.value = select
    fetchDoctor()
}
const morningDoctors = computed(() => doctors.filter((doc) => doc.workTime == 0))
const afternoonDoctors = computed(() => doctors.filter((item) => item.workTime == 1))
onMounted(() => {
    fetchWorkData()
})
</script>

<style scoped>
.wrap {
    .top {
        display: flex;
        color: #7f7f7f;

        .line {
            width: 2px;
            height: 20px;
            background-color: skyblue;
            margin: 0 7px;
        }

        .dot {
            line-height: 14px;
            margin: 0 7px;
        }
    }

    .center {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-size: 16px;
        }

        .container {
            display: flex;
            width: 100%;
            margin: 30px 0;


            .item {
                cursor: pointer;
                transition: all 0.1s;

                .top {
                    color: black;
                }

                width: 150px;
                border: 1px solid skyblue;
                margin: 0 5px;
                display: flex;
                flex-direction: column;
                align-items: center;

                &.active {
                    border: 1px solid #7f7f7f;
                    color: #7f7f7f;

                    .top {
                        color: #7f7f7f;
                    }
                }

                &.select {
                    transform: scale(1.1);
                }

                .top {
                    display: flex;
                    justify-content: center;
                    background-color: #e8f2ff;
                    height: 30px;
                    width: 100%;
                    text-align: center;
                }

                .bottom {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }

        }
    }

    .bottom {
        .will {
            text-align: center;
            font-size: 30px;
            font-weight: 900;
        }

        .pretime {
            .tip {

                display: flex;
                align-items: center;
                color: #7f7f7f;
                font-weight: 600;

                svg {
                    margin-right: 5px;
                }
            }

            .doc_info {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                border-bottom: 1px solid #7f7f7f;
                color: #7f7f7f;

                .left {
                    .info {
                        color: skyblue;
                        display: flex;
                        align-items: center;
                        margin: 10px 0;


                        span {
                            margin: 0 5px;
                            font-size: 18px;
                            font-weight: 500;
                        }
                    }

                    .skill {
                        margin: 10px 0;
                        color: #7f7f7f;
                    }
                }

                .right {
                    width: 150px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .el-button {
                        width: 3.5vw;
                    }

                    .money {
                        font-weight: 900;
                    }
                }
            }
        }
    }
}
</style>