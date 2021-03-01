<!-- TODO 教师端 作业详情 -->
<template>
<view class="task-detail-container">
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">老师</view>
      <view class="action">{{detail.info.teachername}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">班级</view>
      <view class="action">{{detail.info.classname}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">作业标题</view>
      <view class="action text-right">{{detail.info.title}}</view>
    </view>
    <view class="cu-bar bg-white margin-top" @click="toRecord">
      <view class="action">完成情况</view>
      <view class="action arrow">
        <text class="margin-right-my-sm">已阅:{{readnum||0}}/{{studentcount}}</text>
        <text style="margin-right: 6rpx">提交:{{submitnum||0}}/{{studentcount}}</text>
        <text class="cuIcon-right text-gray text-sm"></text>
      </view>
    </view>
  </view>
  <view class="flex flex-direction fixed-bottom">
    <button class="add-btn" @click="editTask">编辑</button>
  </view>
</view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        teacher: '2020通用课程',
        grade: '篮球',
        title: '2020通用课程',
        yue: '1/6',
        send: '1/6'
      },
      detail:{info:{}},
      readnum: 0,
      submitnum: 0,
      studentcount: 0,
      id:''
    }
  },
  onLoad(options) {
    let {id,readnum,submitnum,studentcount} = options;
    this.readnum = readnum||0;
    this.submitnum = submitnum||0;
    this.studentcount = studentcount||0;
    this.id = id;
    this.getDetail();
  },
  //下拉刷新
  onPullDownRefresh(){
  	this.getDetail();
  },
  methods: {
    getDetail(){
      this.$api.lessonwork.lessonworkinfo({id:this.id}).then(res=>{
        this.detail = res.data.data;
      }).finally(()=>{
        uni.stopPullDownRefresh();
      })
    },
    editTask() {
      wx.navigateTo({
        url: `../addTask/addTask?id=${this.detail.info.id}`
      })
    },
    toRecord(){
      uni.navigateTo({
        url: './recordList?id='+this.detail.info.id
      })
    }
  }
}
</script>

<style scoped lang="scss">
  page{
    background-color: $uni-bg-color-grey;
  }
.task-detail-container .add-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background-color: #F4313E;
  color: #fff;
  font-family: Source Han Sans CN;
  font-weight: 400;
  border: none;
  border-radius: 0;
}
</style>
