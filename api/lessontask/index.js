import axios from '../../utils/axios';

export default{
    //销售列表
    lessonlist(opt){
      return axios({
          url: '/lessontask/lessonlist',
          method: "post",
          data: opt
      })
    }, 
    getlist(opt){
      return axios({
          url: '/lessontask/getlist',
          method: "post",
          data: opt
      })
    },
    info(opt){
      return axios({
          url: '/lessontask/info',
          method: "post",
          data: opt
      })
    }, 
    rollcall(opt){
      return axios({
          url: '/lessontask/rollcall',
          method: "post",
          data: opt
      })
    }
}