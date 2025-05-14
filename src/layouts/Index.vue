<template>
    <div class="container">
        <FWCSideBar></FWCSideBar>
        <FWCMain></FWCMain>
    </div>
</template>

<script>
import FWCSideBar from './FWCSideBar.vue'
import FWCMain from './FWCMain.vue'

export default {
    components: {
        FWCMain,
        FWCSideBar
    }
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    /* 整体bg-color */
    background-color: #f4f4f4;
    /* y轴滚动条 */
    overflow-y: auto;
}
</style>