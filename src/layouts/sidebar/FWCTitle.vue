<template>
    <div class="sidebar-top-wrapper" @click="$router.push('/')">
        <Logo />
        <div class="title">
            FWC ACCOUNT
        </div>
    </div>
</template>

<style scoped>
.sidebar-top-wrapper {
    height: 55px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    gap: 1px;
    cursor: pointer;
}

svg {
    vertical-align: center;
}

.title {
    padding-left: 10px;
    padding-top: 2px;
    font-weight: bold;
}
</style>

<script setup>
import Logo from '../../icons/Logo.vue'
</script>