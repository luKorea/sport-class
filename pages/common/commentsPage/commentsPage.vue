<template>
  <view class="margin comment-page-container">
    <view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级名称</view>
        <view class="action">{{ info.classname }}</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">课程名称</view>
        <view class="action">{{ info.coursename }}</view>
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">上课时间</view>
        <view class="action">{{ info.dates }} {{ info.btime }}:00-{{ info.etime }}:00</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">授课课时</view>
        <view class="action text-red">{{ info.duration }}课时</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="margin-right">点名情况</text>
          <text>{{ info.signupnum }}/{{info.stucount}} 人</text>
        </view>
        <view class="action">
          <text class="margin-right">约课情况</text>
          <text>{{ info.reservenum }}/{{info.stucount}} 人</text>
        </view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">上课老师</view>
        <view class="action text-red">{{ info.teachername }}</view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom text-center">
      <view class="action text-center">姓名</view>
      <view class="action text-center">剩余课时</view>
      <view class="action text-center">到课状态</view>
      <view class="action text-center">操作</view>
    </view>
    <block v-if="list.length > 0">
      <view class="cu-bar bg-white solid-bottom text-center"
            v-for="(item, index) in list" :key="index">
        <view class="action">{{ item.studentname }}</view>
        <view class="action">剩余{{ item.lessonnum }}课时</view>
        <view class="action">
          <text class="white-text" v-if="item.status === 1">
            未点名
          </text>
        </view>
        <view class="action" v-if="item.opt === 1">
          <text class="orange-text" v-if="item.opt === 1">未点评
          </text>
        </view>
      </view>
    </block>
    <block v-else>
      <view
          class="cu-form-group cu-bar bg-white flex justify-center align-center">
        <view class="title">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "commentsPage",
  data() {
    return {
      info: {
        className: '体育',
        gradeName: '篮球',
        time: '2021-01-19  16:00:00-17:00:00',
        teaching: 1,
        named: '0 / 2',
        aboutClass: '0 / 2',
        teacher: '谢老师',
        userInfo: [
          {
            id: 1,
            name: '黄晓明',
            time: 1,
            status: 1,
            opt: 1
          },
          {
            id: 2,
            name: '黄晓明',
            time: 1,
            status: 1,
            opt: 1
          }
        ]
      },
      list:[],
      listQuery:{
        pi: 1,
        ps: 20,
        paging: true,
        vid: ''
      },
      studentlist:[]
    }
  },
  onLoad(options) {
    let {id} = options;
    this.info = JSON.parse(decodeURIComponent(options.lesson));
    console.log('options',this.info)
    const user = uni.getStorageSync("userData");
    this.listQuery.vid = user.venueid;
    this.listQuery.classid = this.info.classid;
    this.listQuery.courseid = this.info.courseid;
    this.listQuery.btime = this.info.btime;
    // this.listQuery.etime = this.info.etime;
    this.getList();
  },
  methods:{
    getList(){
      this.$api.comment.commentlist(this.listQuery).then(res=>{
        this.list = res.data.data.list;
        this.getStudents()
      })
    },
    getStudents(){
      this.$api.class.getstudentlistbyclassid({paging:false,classid: this.info.classid}).then(res=>{
        this.studentlist = res.data.data.list.map(a=>{
          a.course = res.data.data.courselist.find(b=>b.studentid==a.id) || {lessonnum:0};
          return a;
        })
        this.list.map(item=>{
          var student = this.studentlist.find(a=>a.id==item.studentid);
          this.$set(item,'lessonnum',student && student.course.lessonnum ||0)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>