import axios from "../../utils/axios";

// 机构动态，明星学员，名师风采
/**
 * @method getSaleCommon
 * @param params {Object}
 * kind: int 种类 0=新闻动态、1=明星学生、2=师资介绍
 * enable: int 是否启用：-1：查询全部，1：启用，0：禁用
 */
export const getSaleCommon = params => {
    return axios({
        url: '/introduce/list',
        method: 'POST',
        data: params
    })
}
/**
 * @method getSaleCommonDetail
 * @param id {Number}
 */
export const getSaleCommonDetail = id => {
    return axios({
        url: '/introduce/info',
        method: 'POST',
        data: {
            id: id
        }
    })
}

/**
 * @method editOrAddSaleCommon
 * @param params {Object}
 */
export const editOrAddSaleCommon = params => {
    return axios({
        url: '/introduce/operatorintroduce',
        method: 'POST',
        data: params
    })
}


/**
 * @method deleteSaleCommon
 * @param ids {String}
 */
export const deleteSaleCommon = ids => {
    return axios({
        url: '/introduce/deleteintroduce',
        method: 'POST',
        data: {
            ids: ids
        }
    })
}