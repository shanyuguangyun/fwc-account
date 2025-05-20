import request from "../request/request";


export function getUsers() {
    return request({
        url: "/users",
        method: "get"
    });
}

export function createUser(data) {
    return request({
        url: "/users",
        method: "post",
        data
    });
}

export function getUserById(id) {
    return request({
        url: `/users/${id}`,
        method: "get"
    });
}

export function updateUser(data) {
    return request({
        url: `/users`,
        method: 'put',
        data
    });
}

export function getUserByKeyword(keyword) {
    return request({
        url: `/users/search?keyword=${keyword}`,
        method: 'get'
    });
}
