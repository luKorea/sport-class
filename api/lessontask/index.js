import axios from '../../utils/axios';

export default{
    //课程列表
    lessonlist(data){
      return axios({ url: '/lessontask/lessonlist', method: "post", data })
    }, 
    getlist(data){
      return axios({ url: '/lessontask/getlist', method: "post", data })
    },
    info(data){
      return axios({ url: '/lessontask/info', method: "post", data })
    }, 
    //点名
    rollcall(data){
      return axios({ url: '/lessontask/rollcall', method: "post", data })
    },
    temporaryrollcalldetails(data){
      return axios({ url: '/lessontask/temporaryrollcalldetails', method: "post", data })
    },
    //插班点名
    temporaryrollcall(data){
      return axios({ url: '/lessontask/temporaryrollcall', method: "post", data })
    }
}