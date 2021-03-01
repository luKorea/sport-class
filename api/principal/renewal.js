
import axios from "../../utils/axios";
let post = 'POST';
// 预警列表
export const getpaylist = data => {
    return axios({
        url: '/lessontask/paylist',
        method: post,
        data: data
    })
}
// 获取收费项
export const getcommoditylist = data => {
    return axios({
        url: '/commodity/commoditylist',
        method: post,
        data: data
    })
}
// 获取课程套餐
export const getcoursepacklist = data => {
    return axios({
        url: '/course/coursepacklist',
        method: post,
        data: data
    })
}

// 报名结算
export const getregisterorder = data => {
    return axios({
        url: '/order/registerorder',
        method: post,
        data: data
    })
}


