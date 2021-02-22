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
// 本月出勤率--学员出勤率统计---有疑问
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