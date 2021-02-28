import axios from '../../utils/axios';

export default{
    //报课列表
    coursepacklist(data){
      return axios({ url: '/course/coursepacklist', method: "post", data })
    },
    //线上课程详情
    coursepackinfo(data){
      return axios({ url: '/course/coursepackinfo', method: "post", data })
    },
    //课程列表
    coursebaselist(data){
      return axios({ url: '/course/coursebaselist', method: "post", data })
    }
}