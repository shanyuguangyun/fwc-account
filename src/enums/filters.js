import Vue from "vue";

Vue.filter('genderText', gender => {
    const genderMap = {
        0: '女',
        1: '男',
        2: '未知'
    }
    return genderMap[gender] || '未知'
}) 

Vue.filter('deptUsingText', using => {
    const deptUsingMap = {
        1: '是',
        0: '否',
    }
    return deptUsingMap[using] || '未知'
})

Vue.filter('menuTypeText', menuType => {
    const menuTypeMap = {
        0: '一级菜单',
        1: '子菜单',
        2: '功能按钮',
    }
    return menuTypeMap[menuType] || '未知'
})

Vue.filter('menuStatusText', status => {
    const menuStatusMap = {
        1: '启用',
        0: '未启用',
    }
    return menuStatusMap[status] || '未知'
})

Vue.filter('interfaceTypeText', interfaceType => {
    const interfaceTypeMap = {
        0: '新增',
        1: '修改',
        2: '删除',
        3: '查询',
        4: '其他',
    }
    return interfaceTypeMap[interfaceType] || '未知'
})

Vue.filter('interfaceStatusText', status => {
    const interfaceStatusMap = {
        1: '启用',
        0: '未启用',
    }
    return interfaceStatusMap[status] || '未知'
})

Vue.filter('roleTypeText', type => {
    const roleTypeMap = {
        0: '部门角色',
        1: '个人角色',
    }
    return roleTypeMap[type] || '未知'
})

Vue.filter('roleStatusText', status => {
    const roleStatusMap = {
        1: '启用',
        0: '未启用',
    }
    return roleStatusMap[status] || '未知'
})

Vue.filter('deptStatusText', status => {
    const deptStatusMap = {
        1: '启用',
        0: '未启用',
    }
    return deptStatusMap[status] || '未知'
})


Vue.filter('userStatusText', status => {
    const userStatusMap = {
        1: '启用',
        0: '禁用',
    }
    return userStatusMap[status] || '未知'
})