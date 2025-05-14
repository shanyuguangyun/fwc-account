<template>
    <div class="sidebar-menu-wrapper">
        <ul>
            <li v-for="(route, index) in routes" @click="navigate(route.name, index)">
                <component :is="route.icon"></component>
                <span>{{ route.title }}</span>
            </li>
        </ul>
        <div class="slidebar" :style="slidebarStyle"></div>
    </div>
</template>

<style scoped>
.sidebar-menu-wrapper {
    /* menu上下分割线 */
    border-top: 1px solid rgb(228, 220, 208);
    border-bottom: 1px solid rgb(228, 220, 208);
    display: flex;
    height: 300px;
    overflow-y: auto;
    position: relative;
}

.sidebar-menu-wrapper ul {
    display: flex;
    list-style: none;
    flex-direction: column;
    /* 去除ul默认样式 */
    margin: 0;
    padding: 20px;
    width: 100%;
}

.sidebar-menu-wrapper li {
    /* 等分剩余空间 */
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    font-weight: bold;
    /* 文本垂直居中 */
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.sidebar-menu-wrapper li:hover {
    background-color: rgb(228, 228, 224);
    border-radius: 5px;
}

.sidebar-menu-wrapper li span {
    margin-left: 5px;
}

.slidebar {
    position: absolute;
    top: 25px;
    height: 16px;
    width: 2px;
    background-color: #000000;
    transition: top 0.5s ease;
}
</style>

<script>
import DashboardIcon from '../../icons/DashboardIcon.vue';
import DeptIcon from '../../icons/DeptIcon.vue';
import UserIcon from '../../icons/UserIcon.vue'
import RoleIcon from '../../icons/RoleIcon.vue'
import PermissionIcon from '../../icons/PermissionIcon.vue'

export default {
    components: {
        DashboardIcon,
        DeptIcon,
        UserIcon,
        RoleIcon,
        PermissionIcon,
    },
    // 刷新页面时，菜单栏左侧黑框跟踪到刷新前菜单
    created() {
        let routes = this.$router.options.routes;
        for (let index = 0; index < routes.length; index++) {
            const route = routes[index];
            if (this.$route.path.startsWith(route.path)) {
                this.routerIndex = index
            }
        }
    },
    data() {
        return {
            routerIndex: 0,
            routes: this.$router.options.routes.map(route => ({
                title: route.meta.title,
                path: route.path,
                name: route.name,
                icon: route.meta.icon
            }))
        }
    },
    methods: {
        navigate(routerName, index) {
            this.routerIndex = index;
            this.$router.push({ name: routerName })
        }
    },
    computed: {
        slidebarStyle() {
            return {
                top: `${this.routerIndex * 35 + 25}px`
            }
        }
    }
}
</script>
