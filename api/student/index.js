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
    growthinfo(opt){
      return axios({
        url: '/student/growthinfo',
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
    },
    //学员档案
    /**
     * @param {Object} opt
     * btime : string 开始时间
     * etime : string 结束时间
     * courseid : int
     * classid : int
     * teacherid : int
     * followuserid : int 跟进人userid
     * staffflags : int 跟进人标记(配合followuserid使用)followstaff.flags
     * salefollowuserid : int? 销售跟进人userid (id=-1时，查询没有分配销售跟进人的数据)
     * educationaluserid : int? 教务跟进人userid (id=-1时，查询没有分配教务跟进人userid的数据)
     * followtype : int? 跟进类型:10=已付费
     * status : int 跟进状态 followup.status
     * grade : int followup.grade
     * keywords : string 学生姓名或手机号码
     * original : string 学生来源
     * types : int 1=潜在学员，2=历史学员，3=在读学员
     * tags : string 标签
     * flags : int 标记 student.flags
     * details: bool 是否获取学生详情
     * paging: bool
     * pi: int notnull
     * ps: int notnull
     */
    intentstudent(opt){
      return axios({
          url: '/student/intentstudent',
          method: "post",
          data: opt
      })
    },
    operatorstudent(opt){
      return axios({
          url: '/student/operatorstudent',
          method: "post",
          data: opt
      })
    },
    //批量添加跟进人
    addfollowstaff(opt){
      return axios({
          url: '/student/addfollowstaff',
          method: "post",
          data: opt
      })
    }
    
    
    
    
}