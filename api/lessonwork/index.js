import axios from '../../utils/axios';

export default{
    //作业列表
    lessonworklist(opt){
      return axios({
          url: '/lessonwork/lessonworklist',
          method: "post",
          data: opt
      })
    },
    //编辑、添加作业
    operatorlessonwork(opt){
      return axios({
          url: '/lessonwork/operatorlessonwork',
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