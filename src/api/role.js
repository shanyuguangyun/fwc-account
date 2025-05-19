import request from "../request/request";


export function getRoles() {
    return request({
        url: "/roles",
        method: "get"
    });
}

export function createRole(data) {
    return request({
        url: "/roles",
        method: "post",
        data
    });
}

export function getRoleById(id) {
    return request({
        url: `/roles/${id}`,
        method: "get"
    });
}

export function updateRole(data) {
    return request({
        url: `/roles`,
        method: 'put',
        data
    });
}

export function getRolesByNameAndType(type,name) {
    return request({
        url: `/roles/search?type=${type}&name=${name}`,
        method: 'get'
    });
}