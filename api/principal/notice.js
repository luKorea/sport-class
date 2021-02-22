import axios from "../../utils/axios";

// 获取消息列表
export const getNoticeList = params => {
    return axios({
        url: '/notice/noticelist',
        method: 'POST',
        data: params
    })
}

// 获取消息详情
export const getNoticeDetail = noticeid => {
    return axios({
        url: '/notice/noticeinfo',
        method: 'POST',
        data: {
            noticeid: noticeid
        }
    })
}
// 发布消息通知
export const addNotice = data => {
    return axios({
        url: '/notice/noticeoperator',
        method: 'POST',
        data: data
    })
}

// 删除消息通知
export const deleteNotice = noticeids => {
    return axios({
        url: '/notice/noticedelete',
        method: 'POST',
        data: {
            noticeids: noticeids
        }
    })
}