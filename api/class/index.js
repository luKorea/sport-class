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
}