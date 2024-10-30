<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="content">
      <router-view>

      </router-view>
    </div>
    <HospitalBottom></HospitalBottom>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import request from './utils/request';
import { onMounted } from 'vue';
onMounted(() => {

})
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 1200px;
  margin-top: 70px;
  min-height: 700px;
}
</style>
