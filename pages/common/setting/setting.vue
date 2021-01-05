<!-- TODO 消息设置 -->
<template>
  <view class="margin reset-container">
    <view class="form-container">
      <view class="cu-form-group">
        <view class="title">学生请假通知</view>
        <switch color="#FE853" @change="setStudent"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">家长评价通知</view>
        <switch color="#FE853" @change="setTeacher"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">上课提醒通知</view>
        <switch color="#FE853" @change="setStudy"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">请假审批通知</view>
        <switch color="#FE853" @change="setLeave"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">预约课程提醒</view>
        <switch color="#FE853" @change="setAppointment"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">线上报课提醒</view>
        <switch color="#FE853" @change="setOnline"/>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        oldPass: '',
        newPass: '',
        newPassTwo: ''
      }
    }
  },
  onLoad() {

  },
  methods: {
    setStudent(e) {
      let {value} = e.detail;
      console.log(value);
    },
    setTeacher(e) {
      let {value} = e.detail;
      console.log(value);
    },
    setStudy(e) {
      let {value} = e.detail;
      console.log(value);
    },
    setLeave(e) {
      let {value} = e.detail;
      console.log(value);
    },
    setAppointment(e) {
      let {value} = e.detail;
      console.log(value);
    },
    setOnline(e) {
      let {value} = e.detail;
      console.log(value);
    }
  }
}
</script>

<style>
</style>
