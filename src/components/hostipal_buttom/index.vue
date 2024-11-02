<template>
    <div class="bottom">
        <div class="content">
            <div class="left">京ICP备13018369号 &nbsp;电话挂号010-56253825</div>
            <div class="right">
                <span>联系我们</span><span>合作伙伴</span><span>用户协议</span><span>隐私协议</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bottom {
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    background-color: #f0f2f5;
    justify-content: center;
    position: absolute;
    bottom: 0;

    .content {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .right {
            display: flex;
            justify-content: space-around;
            align-items: center;

            span {
                margin: 0 5px;
            }
        }
    }
}
</style>