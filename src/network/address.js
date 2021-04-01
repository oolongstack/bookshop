import {request} from './request'

//添加地址
export function addAddress(data){
    return request({
        url:'/api/address',
        method:'post',
        data
    })
}
//修改地址
export function editAddress(id,data){
    return request({
        url:`/api/address/${id}`,
        method:'PUT',
        data
    })
}
//删除地址
export function deleteAddress(id){
    return request({
        url:`/api/address/${id}`,
        method:'DELETE',
    })
}
//地址列表
export function listAddress(){
    return request({
        url:'/api/address',
        method:'GET',
    })
}
//地址详情
export function getAddressDetail(id){
    return request({
        url:`/api/address/${id}`,
        method:'GET',
        
    })
}