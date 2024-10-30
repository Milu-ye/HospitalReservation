<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li @click="changeRegion('')" :class="{ active: regionFlag == '' }">全部</li>
                <li v-for="item in regions" :key="item.id" @click="changeRegion(item.value)"
                    :class="{ active: regionFlag == item.value }">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { resHospitalLevelAndRegon } from '@/api/home/index'
import type { HospitalLevelAndRegion, HospitalLevelAndRegionArr } from '@/api/home/type'
import { onMounted, reactive, ref } from 'vue';
const emit = defineEmits(['getRegion'])
const regions = reactive<HospitalLevelAndRegionArr>([])
const regionFlag = ref<string>('')
const getRegion = async () => {
    const { data } = await resHospitalLevelAndRegon('Beijin')
    Object.assign(regions, data);

}
const changeRegion = (val: string) => {
    regionFlag.value = val
    emit('getRegion', val)
}
onMounted(() => {
    getRegion()
})
</script>

<style scoped>
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;
        margin-top: 10px;

        .left {
            margin-right: 10px;
            width: 60px;
        }

        ul {
            display: flex;

            flex-wrap: wrap;

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