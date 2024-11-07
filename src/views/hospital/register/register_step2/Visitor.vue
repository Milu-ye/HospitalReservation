<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span>{{ props.user.isInsure == 1 ? '医保' : '自费' }}</span>
                <span>{{ props.user.name }}</span>
            </div>
            <div class="right">
                <el-button circle type="primary" :icon="Edit"></el-button>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型：{{ props.user.certificatesType }}</p>
            <p>证件号码：{{ props.user.certificatesNo }}</p>
            <p>用户性别：{{ props.user.sex == 0 ? '女' : '男' }}</p>
            <p>出生日期：{{ props.user.birthdate }}</p>
            <p>手机号码：{{ props.user.phone ? props.user.phone : '未填写' }}</p>
            <p>婚姻状况：{{ props.user.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址：{{ props.user.param.cityString ? props.user.param.cityString : '未填写' }}</p>
            <div v-show="props.isSelect" class="confirm">已选择</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import type { User } from '@/api/hospital/type';
const props = defineProps(['user', 'isSelect'])

</script>

<style lang="less" scoped>
.visitor {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    cursor: pointer;

    .top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60px;
        background-color: #e5e5e5;

        .left {
            :first-child {
                background-color: white;
                padding: 5px;
                margin-right: 5px;
                border-radius: 4px;
            }

            :nth-child(2) {
                color: #7f7f7f;
            }
        }
    }

    .bottom {
        padding: 10px;
        line-height: 30px;
        padding-left: 30px;
        position: relative;

        .confirm {
            position: absolute;
            left: 20%;
            top: 0;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            text-align: center;
            line-height: 200px;
            border: 1px dashed red;
            transform: rotate(35deg);
            font-weight: 900;
            opacity: 0.5;
        }
    }
}
</style>