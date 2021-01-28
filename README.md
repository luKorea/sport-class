# 目录结构

1. pages 页面

   1. common 公用页面

      1. reset 重置密码

      2. namedPage 点名页面

      3. commentsPage 点评页面

      4. shift 插班

      5. classRecord 上课记录

         1. index 首页
            1. components
            2. classInfo 上课记录
            3. aboutInfo 约课记录
            4. absentInfo 缺课记录
            5. leaveInfo 请假申请

         2. detail 详情

      6. evaluation 师生互评

        7. index 首页
                2. detail 详情
                3. editComments 编辑评语

      8. students 学员
         1. index 首页
         2. addFollow 添加跟进记录页面
         3.  detail 详情页面
            1. components
               1. basic 基础资料
               2. recording 报名记录
               3. report 报读班级
               4. follow 跟进记录
         4. addStudents 添加学员页面

      9. record 成长记录
            1. index 首页
            2. addRecord 添加成长记录

   2. teacher 老师端

      1.  class 我的班级

         1. index 首页
         2. detail 详情页面
         5.  shift 插班页面

      2. index 首页

      3. mime 我的个人中心
      5. task 作业
         1. index 首页
         2. detail 详情页

   3. principal 校长端

      1. index 首页
      2. mime 我的个人中心
      3. renewal 续费提醒
        4. index 首页
        5. application 报名
      6. charges 收费项
         1. index 首页
         2. detail 详情
         3. addCharges 新增
      7. receipt 收费清单
         1. index 首页
         2. detail 详情
      8. teacher 老师页面
         1. index 首页
         2. detail 详情
            1. components
               1. basic 基础信息
               2. classes 当前授课班级
               3. students 学员
         3. addTeacher 添加老师页面
      9. 课程套餐（未完成）
         1. index 首页
         2. 添加课程套餐页面
      10. coreData 核心数据
          1. index 首页
             1. components
                1. fullShift 满班率
                2. refunds 退费率
                3. renew 续签率
      11. classHour 课时消耗
          1. index 首页
             1. components
                1. teacherHour 授课课时
                2. classExpense 课消金额
                3. statistics 出勤统计
      12. class 班级
          1. index 首页
          2. detail 详情
             1. components
                1. basic 基础资料
                2. students 班级学生
                3. classes 上课情况
                4. scheduling 班级排课
          3. addStudents 添加学员
          4. addClass 添加班级
          5. addRules 规则排课
          6. addCalendar 日历排课
      13. sales 销售
      14. mime 个人中心
      15. attendanceRate 本月出勤率
          1. index 首页
             1. components
                1. teacherHour 授课课时
                2. classExpense 课消金额
                3. statistics 出勤统计
      16. notice 消息通知
          1. index 首页
          2. detail 详情
          3. addNotice 添加通知
      17. teacherStyles 名师风采
          1. index 首页
          2. detail 详情页
          3. preview 预览
          4. addTeacherStyles 新增名师风采
      18. studentStyles 明星学员
          1. index 首页
          2. detail 详情页
          3. preview 预览
          4. addStudentStyles 新增明星学员
      19. institutions 机构动态
          1. index 首页
          2. detail 详情页
          3. preview 预览
          4. addInstitutions 新增机构动态
      20. microActivities 微活动
          1. index 首页
          2. detail 详情页