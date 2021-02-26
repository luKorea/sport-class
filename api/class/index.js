import axios from '../../utils/axios';

export default{
    /**
     * @param {Object} opt
     */
    classlist(opt){
        return axios({
            url: '/class/classlist',
            method: "post",
            data: opt
        })
    },
    list(opt){
        return axios({
            url: '/class/list',
            method: "post",
            data: opt
        })
    },
    get(opt){
      return axios({
          url: '/class/get',
          method: "post",
          data: opt
      })
    },
    getstudentlist(opt){
      return axios({
          url: '/class/getstudentlist',
          method: "post",
          data: opt
      })
    }
}