import axios from '../../utils/axios';


// 本月出勤率--统计课时（按天、按月统计）
export const getdurationsummary = params => {
    return axios({
        url: '/businessstatistics/durationsummary',
        method: 'POST',
        data: params
    })
	
}
// 本月出勤率--按课程统计课时
export const getdurationbycourse = params => {
    return axios({
        url: '/businessstatistics/durationbycourse',
        method: 'POST',
        data: params
    })
}
// 本月出勤率--按老师统计课时
export const getdurationbyteacher = params => {
    return axios({
        url: '/businessstatistics/durationbyteacher',
        method: 'POST',
        data: params
    })
}

//=====================================================
// 本月出勤率--课消统计（按日，按月统计）
export const getcostsummary = params => {
    return axios({
        url: '/businessstatistics/costsummary',
        method: 'POST',
        data: params
    })
}
// 本月出勤率--按课程统计课消
export const getcostbycourse = params => {
    return axios({
        url: '/businessstatistics/costbycourse',
        method: 'POST',
        data: params
    })
}
// 本月出勤率--按老师统计课消
export const getcostbyteacher = params => {
    return axios({
        url: '/businessstatistics/costbyteacher',
        method: 'POST',
        data: params
    })
}
//=====================================================
// 本月出勤率--学员出勤率统计
export const getattendance = params => {
    return axios({
        url: '/educationalstatistics/attendance',
        method: 'POST',
        data: params
    })
}
// 本月出勤率--按课程统计出勤率
export const getcoursehourstatistics = params => {
    return axios({
        url: '/educationalstatistics/coursehourstatistics',
        method: 'POST',
        data: params
    })
}
// 本月出勤率--按老师统计出勤率
export const getteacherhourstatistics = params => {
    return axios({
        url: '/educationalstatistics/teacherhourstatistics',
        method: 'POST',
        data: params
    })
}
//=====================================================
// 班级满班率
export const getfullclassrate = params => {
    return axios({
        url: '/educationalstatistics/fullclassrate',
        method: 'POST',
        data: params
    })
}
// 退费率统计（百分比汇总）
export const getrefundratebytype = params => {
    return axios({
        url: '/educationalstatistics/refundratebytype',
        method: 'POST',
        data: params
    })
}
// 续费率统计（百分比汇总）
export const getrenewratebytype = params => {
    return axios({
        url: '/educationalstatistics/renewratebytype',
        method: 'POST',
        data: params
    })
}
//=========================================================
// 按课程统计满班率
export const getfullclassratebycourse = params => {
    return axios({
        url: '/educationalstatistics/fullclassratebycourse',
        method: 'POST',
        data: params
    })
}
// 按课程统计退费率
export const getrefundrate = params => {
    return axios({
        url: '/educationalstatistics/refundrate',
        method: 'POST',
        data: params
    })
}
// 按课程统计续费率
export const getrenewrate = params => {
    return axios({
        url: '/educationalstatistics/renewrate',
        method: 'POST',
        data: params
    })
}