import axios from '../../utils/axios';

export default{
    /**
     * @param {Object} opt
     * type : int notnull 类型（1=学生来源、2=学生标签、3=成长记录、4=班级标签
     * enable : bool? 启用
     */
    sourcelist(opt){
        return axios({
            url: '/student/sourcelist',
            method: "post",
            data: opt
        })
    },
    /**
     * @param {Object} opt
     * sourceid : int 成长记录模板id
     * classid : int
     * studentid : int
     * type : int growth.type
     * keywords : string (班级名称或者学生名称及联系方式)
     * flags : int 标记growth.flags
     * inverseflags : int 反选标记growth.flags
     * paging: bool
     * pi: int notnull
     * ps: int notnull
     */
    growthlist(opt){
        return axios({
            url: '/student/growthlist',
            method: "post",
            data: opt
        })
    },
    /**
     * @param {Object} opt
     * id : int (添加默认传0)
     * sourceid : int 成长记录模板id( datasource.id)
     * type : int notnull 类型 （1=班级、2=学生）
     * target : string length<=64 目标对象
     * title : string length<=128 标题
     * content : string length<=1024 内容
     * images : string length<=1024 图片,多个以','隔开
     * fielddata : string notnull
     * targetdata : string notnull 
     */
    operatorgrowth(opt){
      return axios({
          url: '/student/operatorgrowth',
          method: "post",
          data: opt
      })
    },
    //成长记录模板详情
    growthtemplateinfo(opt){
      return axios({
          url: '/student/growthtemplateinfo',
          method: "post",
          data: opt
      })
    }    
    
}