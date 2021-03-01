import axios from '../../utils/axios';

export default{
    //销售列表
    getuserlist(opt){
      return axios({
          url: '/venue/getuserlist',
          method: "post",
          data: opt
      })
    }, 
    
}