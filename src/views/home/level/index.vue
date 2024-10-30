<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul>
                <li @click="changeLevel('')" :class="{ active: activeFlag == '' }">全部</li>
                <li v-for="item in levels" :class="{ active: activeFlag == item.value }" :key="item.id"
                    @click="changeLevel(item.value)">{{
                        item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { resHospitalLevelAndRegon } from '@/api/home';
import type { HospitalLevelAndRegionArr } from '@/api/home/type'
import { onMounted, reactive, ref } from 'vue';
const levels = reactive<HospitalLevelAndRegionArr>([])
const activeFlag = ref<string>('')
const emit = defineEmits(['get-level'])
const getLevel = async () => {
    const { data } = await resHospitalLevelAndRegon('Hostype')
    Object.assign(levels, data)
}
const changeLevel = (val: string): void => {
    activeFlag.value = val
    emit('get-level', val)
}
onMounted(() => {
    getLevel()
})


</script>

<style lang="less" scoped>
.level {
    color: #7f7f7f;

    h1 {
        font-weight: 900;
        font-size: 14px;
    }

    .content {
        display: flex;
        margin-top: 10px;

        .left {
            margin-right: 10px;
            width: 53px;
        }

        ul {
            display: flex;
            margin-left: 3px;

            li {
                margin-right: 10px;
                cursor: pointer;

                &.active {
                    color: #55a6fe;
                }

                &:hover {
                    color: #55a6fe;
                }
            }

        }
    }
}
</style>