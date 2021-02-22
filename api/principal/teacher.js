import axios from "../../utils/axios";
let post = 'POST';

export const getTeacherList = data => {
    return axios({
        url: '/teacher/teacherlist',
        method: post,
        data: data
    })
}

// 获取老师详情
export const getTeacherDetail = teacherid => {
    return axios({
        url: '/teacher/info',
        method: post,
        data: {
            teacherid: teacherid
        }
    })
}


// 添加或者修改老师
export const addOrEditTeacher = data => {
    return axios({
        url: '/teacher/operatorteacher',
        method: post,
        data: data
    })
}
