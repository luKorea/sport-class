import axios from '../../utils/axios';

// 获取我的班级数据
export const getMyClassList = params => {
    return axios({
        url: '/class/list',
        method: 'POST',
        data: params
    })
}