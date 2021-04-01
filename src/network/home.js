import {request} from './request'

export function getHomeData(){
   return request({
        url: '/api/index'
    })
}
export function getHomeGoods(type='sales',page=1){
    return request({
         url: '/api/index?'+ type +'&'+ page,
    })
         
 }