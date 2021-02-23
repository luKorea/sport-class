import axios from '../../utils/axios';

export default{
    //成长记录模板详情
    lessonworklist(opt){
      return axios({
          url: '/lessonwork/lessonworklist',
          method: "post",
          data: opt
      })
    },
    lessonworkinfo(opt){
      return axios({
          url: '/lessonwork/lessonworkinfo',
          method: "post",
          data: opt
      })
    },
    lessonrecordinfo(opt){
      return axios({
          url: '/lessonwork/lessonrecordinfo',
          method: "post",
          data: opt
      })
    }
    
}