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