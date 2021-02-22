import axios from "../../utils/axios";

let post = 'POST';

// 获取学员列表
export const getStudentsList = params => {
    return axios({
        url: '/student/list1',
        method: post,
        data: params
    })
}