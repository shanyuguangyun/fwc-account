// router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from "../layouts/Index.vue";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    name: "Dashboard",
    meta: { title: '数据看板', name: 'Dashboard', singlePage: true, icon: () => import('../icons/DashboardIcon.vue') },
    component: Layout,
    redirect: "/dashboards",
    children: [
      {
        path: "dashboards",
        name: "Dashboards",
        component: () => import('../views/Dashborads/Index.vue'),
      },
    ],
  },
  {
    path: "/users",
    name: "Users",
    meta: { title: '用户管理', name: 'Users', icon: () => import('../icons/UserIcon.vue') },
    redirect: "/users/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "UsersList",
        meta: { title: '用户管理' },
        component: () => import('../views/Users/List.vue'),
      },
      {
        path: "query",
        name: "UsersQuery",
        meta: { title: '用户跟踪' },
        component: () => import('../views/Users/Query.vue'),
      },
      {
        path: "add",
        name: "UsersAdd",
        meta: { title: '创建用户', menuHide: true },
        component: () => import('../views/Users/Add.vue'),
      },
      {
        path: "info/:id",
        name: "UsersInfo",
        meta: { title: '用户详情', menuHide: true },
        component: () => import('../views/Users/Info.vue'),
      }
    ],
  },
  {
    path: "/depts",
    name: "Depts",
    meta: { title: '部门管理', name: 'Depts', icon: () => import('../icons/DeptIcon.vue') },
    redirect: "/depts/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "DeptsList",
        meta: { title: '部门管理' },
        component: () => import('../views/Depts/List.vue'),
      },
      {
        path: "query",
        name: "DeptsQuery",
        meta: { title: '部门查询' },
        component: () => import('../views/Depts/Query.vue'),
      },
      {
        path: "add",
        name: "DeptsAdd",
        meta: { title: '创建部门', menuHide: true },
        component: () => import('../views/Depts/Add.vue'),
      },
      {
        path: "info/:id",
        name: "DeptsInfo",
        meta: { title: '部门详情', menuHide: true },
        component: () => import('../views/Depts/Info.vue'),
      }
    ],
  },
  {
    path: "/roles",
    name: "Roles",
    meta: { title: '角色管理', name: 'Roles', icon: () => import('../icons/RoleIcon.vue') },
    redirect: "/roles/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "RolesList",
        meta: { title: '角色管理' },
        component: () => import('../views/Roles/List.vue'),
      },
      {
        path: "query",
        name: "RolesQuery",
        meta: { title: '查询角色' },
        component: () => import('../views/Roles/Query.vue'),
      },
      {
        path: "add",
        name: "RolesAdd",
        meta: { title: '创建角色', menuHide: true },
        component: () => import('../views/Roles/Add.vue'),
      },
      {
        path: "info/:id",
        name: "RolesInfo",
        meta: { title: '角色详情', menuHide: true },
        component: () => import('../views/Roles/Info.vue'),
      },
      {
        path: "update/:id?",
        name: "RolesUpdate",
        meta: { title: '修改角色', menuHide: true },
        component: () => import('../views/Roles/Update.vue'),
      }
    ],
  },
  {
    path: "/menus",
    name: "Menus",
    meta: { title: '菜单管理', name: 'Menus', singlePage: true, icon: () => import('../icons/MenusIcon.vue') },
    redirect: "/menus/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "MenusList",
        meta: { title: '菜单管理' },
        component: () => import('../views/Menus/List.vue'),
      },
      {
        path: "add",
        name: "MenusAdd",
        meta: { title: '新增菜单', menuHide: true },
        component: () => import('../views/Menus/Add.vue'),
      },
      {
        path: "info/:id",
        name: "MenusInfo",
        meta: { title: '菜单详情', menuHide: true },
        component: () => import('../views/Menus/Info.vue'),
      },
      {
        path: "update/:id?",
        name: "MenusUpdate",
        meta: { title: '修改菜单', menuHide: true },
        component: () => import('../views/Menus/Update.vue'),
      },
    ],
  },
  {
    path: "/interfaces",
    name: "Interfaces",
    meta: { title: '接口管理', name: 'Interfaces', singlePage: true, icon: () => import('../icons/InterfaceIcon.vue') },
    redirect: "/interfaces/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "InterfacesList",
        meta: { title: '接口管理' },
        component: () => import('../views/Interfaces/List.vue'),
      },
      {
        path: "add",
        name: "InterfacesAdd",
        meta: { title: '创建接口', menuHide: true },
        component: () => import('../views/Interfaces/Add.vue'),
      },
      {
        path: "info/:id",
        name: "InterfacesInfo",
        meta: { title: '接口详情', menuHide: true },
        component: () => import('../views/Interfaces/Info.vue'),
      },
      {
        path: "update/:id?",
        name: "InterfacesUpdate",
        meta: { title: '修改接口', menuHide: true },
        component: () => import('../views/Interfaces/Update.vue'),
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { title: '系统设置', name: 'Settings', singlePage: true, icon: () => import('../icons/SettingsIcon.vue') },
    redirect: "/settings/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "SettingsList",
        meta: { title: '系统设置' },
        component: () => import('../views/Settings/List.vue'),
      }
    ],
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
