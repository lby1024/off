import urls from './url.js'
import axios from 'axios'

// 
function _get_data ({url, method, data}) {
    return new Promise((resolve, reject)=>{
        axios({
            url,                        // ------> '/table/base'     
            method,                     // get or post
            params: data,               // 参数
            baseURL: urls.mock_base,    // https://www.easy-mock.com/mock/5b5dc7fa9b54da5dcc7d1844/offo
            timeout: 5000
        })
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}
// 向 easy-mock 发送请求, 获取 用户数据

export function get_base_table () {
    let url = urls.base_table
    let method = 'get'
    return _get_data({url, method})
}
// 获取城市表单数据
export function get_city_table () {
    let url = urls.city_table
    let method = 'get'
    return _get_data({url, method})
}
// 获取订单数据
export function get_orders () {
    let url = urls.orders_table
    let method = 'get'
    return _get_data({url, method})
}
// 获取详情页面地图数据
export function get_map_data () {
    let url = urls.map_data
    let method = 'get'
    return _get_data({url, method})
}
// page/bikeMap 的地图数据
export function get_map_data02 () {
    let url = urls.map_data02
    let method = 'get'
    return _get_data({url, method})
}
// 获取管理人员名单
export function get_users () {
    let url = urls.users
    let method = 'get'
    return _get_data({url, method})
}