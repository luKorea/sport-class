import axios from '../../utils/axios';

export default{
    //列表
    commentlist(data){
      return axios({ url: '/comment/commentlist', method: "post", data })
    },
    
}