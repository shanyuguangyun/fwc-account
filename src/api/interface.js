import request from "../request/request";


export function getInterfaces() {
    return request({
        url: "/interfaces",
        method: "get"
    });
}

export function createInterface(data) {
    return request({
        url: "/interfaces",
        method: "post",
        data
    });
}

export function getInterfaceById(id) {
    return request({
        url: `/interfaces/${id}`,
        method: "get"
    });
}

export function updateInterface(data) {
    return request({
        url: `/interfaces`,
        method: 'put',
        data
    });
}

export function getInterfacesByNameAndSystemId(systemId,name) {
    return request({
        url: `/interfaces/search?systemId=${systemId}&name=${name}`,
        method: 'get'
    });
}