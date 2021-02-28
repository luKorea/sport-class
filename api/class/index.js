import axios from '../../utils/axios';

export default{
    /**
     * @param {Object} opt
     */
    classlist(data){
      return axios({ url: '/class/classlist', method: "post", data })
    },
    list(data){
      return axios({ url: '/class/list', method: "post", data })
    },
    get(data){
      return axios({ url: '/class/get', method: "post", data })
    },
    getstudentlist(data){
      return axios({ url: '/class/getstudentlist', method: "post", data })
    },
    getstudentlistbyclassid(data){
      return axios({ url: '/class/getstudentlistbyclassid', method: "post", data })
    }
}