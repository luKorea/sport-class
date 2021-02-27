import axios from '../../utils/axios';

export default{
    //商品(费用/物品)列表
    commoditylist(data){
      return axios({ url: '/commodity/commoditylist', method: "post", data })
    },
    commodityinfo(data){
      return axios({ url: '/commodity/commodityinfo', method: "post", data })
    },
    //保存/编辑商品
    operatorcommodity(data){
      return axios({ url: '/commodity/operatorcommodity', method: "post", data })
    },
    
    /**
     * @description 删除商品
     * @param {Number} id
     */
    deletecommodity(id){
      return axios({ url: '/commodity/deletecommodity', method: "post", data:{commodityid: id} })
    },
}