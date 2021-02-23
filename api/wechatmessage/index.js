import axios from '../../utils/axios';

export default{
    //成长记录模板详情
    growthmessage(opt){
      return axios({
          url: '/wechatmessage/growthmessage',
          method: "post",
          data: opt
      })
    }    
    
}