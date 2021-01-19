import axios from "../utils/axios";

// 用户登陆
export const userLogin = data => {
    return axios({
        url: '/account/login',
        method: 'POST',
        data: {
            ...data,
            from: 2
        }
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return axios({
        url: '/account/getuserinfo',
        method: 'POST'
    })
}

// 退出登陆
export const logout = () => {
    return axios({
        url: '/account/loginout',
        method: 'POST'
    })
}

// 重置密码
export const initPassword = data => {
    return axios({
        url: '/account/initpassword',
        method: 'POST',
        data: data
    })
}

// 修改密码
export const resetPassword = data => {
    return axios({
        url: '/account/changepassword',
        method: 'POST',
        data: data
    })
}
