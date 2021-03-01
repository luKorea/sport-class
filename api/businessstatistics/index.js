import axios from '../../utils/axios';

export default{
    /**
     * @description 课包相关统计
     * @param {Object} opt
     */
    summary(opt){
        return axios({
            url: '/businessstatistics/summary',
            method: "post",
            data: opt
        })
    },
    durationsummary(opt){
        return axios({
            url: '/businessstatistics/durationsummary',
            method: "post",
            data: opt
        })
    },
}