import axios from '../../utils/axios';

export default{
    //老师列表
    teacherlist(data){
      return axios({ url: '/teacher/teacherlist', method: "post", data })
    }, 
    
}