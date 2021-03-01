import axios from "../../utils/axios";
// 获取课程列表
export const getcoursebaselist = (params = {}) => {
    return axios({
        url: '/course/coursebaselist',
        method: 'POST',
        data: {
            ...params
        }
    })
}
// 获取课程价格
export const getselllist = (params = {}) => {
    return axios({
        url: '/course/getselllist',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 获取课程列表--详情
export const getCourseList = (params = {}) => {
    return axios({
        url: '/course/courselist',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 获取课程详情
export const getCourseinfo = (params = {}) => {
    return axios({
        url: '/course/info',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 修改课程启用状态
export const getchangeenable = (params = {}) => {
    return axios({
        url: '/course/changeenable',
        method: 'POST',
        data: {
            ...params
        }
    })
}
// 编辑课程
export const getoperatorcourse = (params = {}) => {
    return axios({
        url: '/course/operatorcourse',
        method: 'POST',
        data: {
            ...params
        }
    })
}

