<template>
    <div class="notice">
        <h1>{{ hospitalInfo?.hospital?.hosname }}挂号须知</h1>
        <p>为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
        <div class="content">
            <div class="item">
                <h4>一、预约实名制:</h4>
                <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
            </div>
        </div>
        <div class="content">
            <div class="item">
                <h4>二、预约挂号：</h4>
                <p>按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
                <ul>
                    <li>在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；</li>
                    <li>在同一自然周，同一就诊人，可以预约最多8个号源；</li>
                    <li>在同一自然月，同一就诊人，可以预约最多12个号源；</li>
                    <li>在同一自然季度，同一就诊人，可以预约最多24个号源。</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <div class="item">
                <h4>三、取消预约：</h4>
                <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
            </div>
        </div>
        <div class="content">
            <div class="item">
                <h4>四、爽约处理：</h4>
                <p>如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：</p>
                <ul>
                    <li>累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</li>
                    <li>累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail';
import { storeToRefs } from 'pinia';
const detail = useDetailStore()
const { hospitalInfo } = storeToRefs(detail)
</script>

<style scoped lang="less">
.notice {

    h1 {
        display: flex;
        justify-content: center;
        font-size: 28px;
        margin-bottom: 10px;
    }

    p {
        color: #7f7f7f;
    }

    .content {
        margin-top: 15px;
        line-height: 20px;
        margin-bottom: 35px;

        ul {
            margin-left: 3em;
        }

        li {
            color: #7f7f7f;
            text-decoration: dotted;
            list-style-type: disc
        }

        .item {
            ul li:nth-child(1) {
                margin-top: 15px;
            }
        }

        p {
            margin-top: 10px;
            padding-left: 2em;
        }
    }
}
</style>