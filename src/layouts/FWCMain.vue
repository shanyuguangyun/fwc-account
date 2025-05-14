<template>
    <div class="main-wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
</script>

<style scoped>
.main-wrapper {
    /* 让主内容占据剩余空间 */
    flex-grow: 1;
    /* 主内容区bg-colors */
    background-color: #fff;
    border-radius: 10px;
    /* 确保主内容区至少占满整个视口高度 */
    min-height: calc(100vh - 16px);
    box-sizing: border-box;
    padding: 20px 50px;
    margin: 8px 8px 8px 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}
</style>