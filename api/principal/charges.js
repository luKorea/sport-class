import axios from "../../utils/axios";

let post = 'POST';

// 获取收费项列表
export const getChargesList = params => {
    return axios({
        url: '/expense/expenselist',
        method: post,
        data: params
    })
}

// 获取收费项详情
export const getChargesDetail = id => {
    return axios({
        url: '/expense/expenseinfo',
        method: post,
        data: {
            id: id
        }
    })
}
// 新增编辑收费项
export const addOrEditCharges = data => {
    return axios({
        url: '/expense/expenseoperator',
        method: post,
        data: data
    })
}

// 删除收费项
export const removeCharges = ids => {
    return axios({
        url: '/expense/deleteexpense',
        method: post,
        data: {
            ids: ids
        }
    })
}
