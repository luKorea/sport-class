<!-- TODO 教师端 作业详情 -->
<template>
<view class="task-detail-container">
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">老师</view>
      <view class="action">{{form.teacher}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">班级</view>
      <view class="action">{{form.grade}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">作业标题</view>
      <view class="action text-right">{{form.title}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">完成情况</view>
      <view class="action arrow">
        <text class="margin-right-my-sm">已阅:{{form.yue}}</text>
        <text style="margin-right: 6rpx">提交:{{form.send}}</text>
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
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
  },
  methods: {
    editTask() {
    }
  }
}
</script>

<style scoped>
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
