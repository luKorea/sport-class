import axios from '../../utils/axios';

export default{
    //微活动列表
    componentlist(opt){
      return axios({
          url: '/microactivity/componentlist',
          method: "post",
          data: opt
      })
    }    
    
}