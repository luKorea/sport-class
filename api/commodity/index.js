import axios from '../../utils/axios';

export default{
    //商品(费用/物品)列表
    commoditylist(opt){
      return axios({ url: '/commodity/commoditylist', method: "post", data: opt })
    }, 
    
}