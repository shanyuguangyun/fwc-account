<template>
    <div class="sidebar-wrapper">
        <FWCTitle></FWCTitle>
        <FWCMenu></FWCMenu>
        <FWCSubMenu :activeRouter="activeRouter" v-show="containsSubMenu"></FWCSubMenu>
        <FWCAvatar></FWCAvatar>
    </div>
</template>

<script>
import FWCTitle from './sidebar/FWCTitle.vue'
import FWCMenu from './sidebar/FWCMenu.vue'
import FWCSubMenu from './sidebar/FWCSubMenu.vue'
import FWCAvatar from './sidebar/FWCAvatar.vue'
export default {
    components: {
        FWCTitle,
        FWCMenu,
        FWCSubMenu,
        FWCAvatar,
    },
    data() {
        return {
            containsSubMenu: true
        }
    },
    computed: {
        activeRouter() {
            return this.$route.fullPath.split('/')[1];
        }
    },
    // 监听路由，如果是单页路由，则不显示子菜单
    watch: {
        $route: {
            immediate: true,
            handler(newRoute) {
                let parentRoute = newRoute.matched[0];
                if (parentRoute.meta.singlePage) {
                    this.containsSubMenu = false;
                } else {
                    this.containsSubMenu = true;
                }
            }
        }
    }
}
</script>

<style scoped>
.sidebar-wrapper {
    /* 固定宽度 */
    width: 230px;
    /* 使菜单栏在滚动时保持固定 */
    position: sticky;
    top: 0;
    /* 侧边栏字体大小 */
    font-size: 12px;
    letter-spacing: 0.8px;
}
</style>

<style>
.sidebar-wrapper {
    display: flex;
    flex-direction: column;
    user-select: none;
}

.sidebar-menu-wrapper,
.sidebar-menu-item-wrapper {
    /* 两级菜单占据剩余空间 */
    flex-grow: 1;
    overflow-y: auto;
}
</style>