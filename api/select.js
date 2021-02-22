/**
 * @desc 所有页面筛选下拉框
 */
import axios from "../utils/axios";
//  所有课程
export const getCourseSelect = () => {
    return axios({
        url: '/course/coursebaselist',
        method: 'POST',
        data: {
            inverseflags: 1024
        }
    })
}
//  所有老师
export const getTeacherSelect = () => {
    return axios({
        url: '/teacher/teacherlist',
        method: 'POST',
        data: {
            paging: false
        }
    })
}
// 所有班级标签
export const getClassTag = type => {
    return axios({
        url: '/student/sourcelist',
        method: 'POST',
        data: {
            type: type
        }
    })
}
// 所有班级
export const getClassSelect = () => {
    return axios({
        url: '/class/classlist',
        method: 'POST',
    })
}
// 所有课程套餐
export const getPackSelect = () => {
    return axios({
        url: '/course/coursepacklist',
        method: 'POST',
    })
}