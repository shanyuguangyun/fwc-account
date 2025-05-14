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
        0: '否',
        1: '是',
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
        0: '未启用',
        1: '启用',
    }
    return menuStatusMap[status] || '未知'
})