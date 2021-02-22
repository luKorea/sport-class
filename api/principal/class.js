import axios from "../../utils/axios";

let post = 'POST';


// 获取班级列表
export const getClassList = (params = {}) => {
    return axios({
        url: '/class/list',
        method: post,
        data: params
    })
}


// TODO 班级基础信息

// 获取班级详情
export const getClassDetails = (classid) => {
    return axios({
        url: '/class/get',
        method: post,
        data: {
            classid: classid
        }
    })
}
// 添加或者修改班级
export const addOrEditClass = data => {
    return axios({
        url: '/class/operatorclass',
        method: post,
        data: data
    })
}

// 删除班级
export const deleteClass = ids => {
    return axios({
        url: '/class/deleteclass',
        method: post,
        data: {
            ids: ids
        }
    })
}


// 班级添加老师
export const classAddTeacher = params => {
    return axios({
        url: '/class/addteacher',
        method: post,
        data: params
    })
}

// 班级结业
export const classOver = classid => {
    return axios({
        url: '/class/classover',
        method: post,
        data: {
            classid: classid
        }
    })
}

// TODO 公用模块

// 班级移除学员以及移除老师
export const deleteTeacherOrStudent = params => {
    return axios({
        url: '/class/deletemember',
        method: post,
        data: params
    })
}

// TODO 班级学员

// 获取班级详情成员
export const getClassStudent = classid => {
    return axios({
        url: '/class/getstudentlistbyclassid',
        method: post,
        data: {
            classid: classid
        }
    })
}
// 购买了指定班级课程的学生列表(能分配进班级的学生列表)
export const getBuyClassStudent = params => {
    return axios({
        url: '/class/getstudentlist',
        method: post,
        data: params
    })
}



// 班级添加学员
export const classAddStudent = params => {
    return axios({
        url: '/class/addstudent',
        method: post,
        data: params
    })
}


// TODO 班级排课

// 获取班级规则排课列表
export const getClassRules = classid => {
    return axios({
        url: '/lessontask/getlist',
        method: post,
        data: {
            classid: classid
        }
    })
}
// 获取班级日历排课列表
export const getClassCalendar = params => {
    return axios({
        url: '/lessontask/lessonlist',
        method: post,
        data: params
    })
}



// 获取所有课程下拉列表
export const getCourseBaseList = () => {
    return axios({
        url: '/course/coursebaselist',
        method: post,
        data: {
            inverseflags: 1024
        }
    })
}