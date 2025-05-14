import request from "../request/request";


export function getMenus() {
    return request({
        url: "/menus",
        method: "get"
    });
}

export function createMenu(data) {
    return request({
        url: "/menus",
        method: "post",
        data
    });
}

export function getMenuById(id) {
    return request({
        url: `/menus/${id}`,
        method: "get"
    });
}

export function updateMenu(data) {
    return request({
        url: `/menus`,
        method: 'put',
        data
    });
}

export function getMenusBySystemId(systemId) {
    return request({
        url: `/menus/by-system-id?systemId=${systemId}`,
        method: 'get'
    });
}