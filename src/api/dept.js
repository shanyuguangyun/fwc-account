import request from "../request/request";


export function getDepts() {
    return request({
        url: "/depts",
        method: "get"
    });
}

export function createDept(data) {
    return request({
        url: "/depts",
        method: "post",
        data
    });
}

export function getDeptById(id) {
    return request({
        url: `/depts/${id}`,
        method: "get"
    });
}

export function updateDept(data) {
    return request({
        url: `/depts`,
        method: 'put',
        data
    });
}

export function getDeptsByNameOrParentName(name) {
    return request({
        url: `/depts/search?name=${name}&parentName=${name}`,
        method: 'get'
    });
}

export function getParentDeptData() {
    return request({
        url: '/depts/parentDepts',
        method: 'get'
    })
}