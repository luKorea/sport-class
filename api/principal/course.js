import axios from "../../utils/axios";


// 获取课程列表
export const getCourseList = (params = {}) => {
    return axios({
        url: '/course/courselist',
        method: 'POST',
        data: {
            ...params
        }
    })
}