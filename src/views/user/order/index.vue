<template>
    <div>
        <div v-if="route.query.orderId">
            <Detail></Detail>
        </div>
        <div v-else>
            <AllOrder></AllOrder>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Detail from './detail/index.vue'
import AllOrder from './allOrder/index.vue'
const route = useRoute()
</script>

<style scoped></style>