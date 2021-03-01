import axios from '../../utils/axios';

export default{
    //获取学校配置，目前用于学员档案-》添加学员
    get430configure(opt){
      return axios({
          url: '/organize/get430configure',
          method: "post",
          data: opt
      })
    },
}