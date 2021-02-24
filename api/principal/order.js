import axios from "../../utils/axios";
let post = 'POST';

// 收据清单列表
export const getorderlist = data => {
    return axios({
        url: '/order/orderlist',
        method: post,
        data: data
    })
}
// 收据清单详情
export const getorderinfo = data => {
    return axios({
        url: '/order/orderinfo',
        method: post,
        data: data
    })
}
// 收据清单删除
export const getorderabolish = data => {
    return axios({
        url: '/order/orderabolish',
        method: post,
        data: data
    })
}
