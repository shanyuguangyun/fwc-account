<template>
    <div class="sidebar-menu-item-wrapper">
        <div class="sidebar-menu-item-title">
            子菜单
        </div>
        <ul>
            <li v-for="(route, index) in menus" @click="selectItem(index)" v-if="!route.menuHide">
                <router-link :to=route.path>{{ route.title }}</router-link>
            </li>
        </ul>
        <div class="slidebar" :style="slidebarStyle"></div>
    </div>
</template>

<style scoped>
.sidebar-menu-item-wrapper {
    /* menu上下分割线 */
    border-top: 1px solid rgb(228, 220, 208);
    border-bottom: 1px solid rgb(228, 220, 208);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
}

/* '子菜单'字体设置 */
.sidebar-menu-item-title {
    height: 20px;
    padding-top: 20px;
    padding-left: 30px;
    font-size: 12px;
    font-weight: bold;
    color: #979797;
}

.sidebar-menu-item-wrapper ul {
    flex-grow: 1;
    display: flex;
    list-style: none;
    flex-direction: column;
    /* 去除ul默认样式 */
    margin: 0;
    padding: 20px;
    min-height: 120px;
    max-height: 120px;
}

.sidebar-menu-item-wrapper li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-weight: bold;
    /* 文本垂直居中 */
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.sidebar-menu-item-wrapper li:hover {
    background-color: rgb(228, 228, 224);
    border-radius: 5px;
}

.sidebar-menu-item-wrapper li span {
    margin-left: 5px;
}

.sidebar-menu-item-wrapper li a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
}

.slidebar {
    position: absolute;
    top: 65px;
    height: 16px;
    width: 2px;
    background-color: #000000;
    transition: top 0.5s ease;
}
</style>

<script>
export default {
    props: {
        activeRouter: String
    },
    created() {
        let routes = this.$router.options.routes;
        console.log(routes);
        for (let index = 0; index < routes.length; index++) {
            const route = routes[index];
            console.log(route)
            if(this.$route.path.startsWith(route.path)) {
                this.routerIndex = index
            }
        }
    },
    data() {
        return {
            routerIndex: 0,
            subMenus: this.$router.options.routes.filter(item => `/${this.activeRouter}` == item.path)
        }
    },
    methods: {
        selectItem(index) {
            this.routerIndex = index;
        }
    },
    computed: {
        slidebarStyle() {
            return {
                top: `${65 + this.routerIndex * 30}px`
            }
        },
        // 计算属性menus，监听到路由变化时，subMenus变化
        menus() {
            if (this.subMenus && this.subMenus.length === 1) {
                let parentPath = this.subMenus[0].path;
                return this.subMenus[0].children.map(item => ({
                    path: parentPath + '/' + item.path,
                    name: item.name,
                    title: item.meta.title,
                    menuHide: item.meta.menuHide
                }))
            }
        }
    },
    watch: {
        activeRouter(newValue, oldValue) {
            console.log(newValue + ":" + oldValue);
            // 当路由发生变化时，重新计算slidebar的top值
            if (newValue !== oldValue) {
                this.routerIndex = 0;
            }
            // 重新计算subMenus和menus
            this.subMenus = this.$router.options.routes.filter(item => `/${this.activeRouter}` == item.path);
            console.log(this.subMenus);
        }
    }
}
</script>