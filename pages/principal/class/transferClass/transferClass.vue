<template>
  <view class="margin">
    <view class="bg-white cu-bar">
      <view class="action">班级名称</view>
      <view class="action">{{ info.className }}</view>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">上课日期</view>
      <picker mode="date" @change="bindDateChange" :value="date"
              :start="startDate" :end="endDate">
        <view class="picker">{{ date }}</view>
      </picker>
    </view>
    <view class="cu-form-group cu-bar bg-white">
      <view class="title">上课开始时间</view>
      <picker mode="time" @change="bindStartTimeChange" :value="startTime"
              start="00:00" end="23:59">
        <view class="picker">{{ startTime }}</view>
      </picker>
    </view>
    <view class="cu-form-group cu-bar bg-white">
      <view class="title">上课结束时间</view>
      <picker mode="time" @change="bindEndTimeChange" :value="endTime"
              start="00:00" end="23:59">
        <view class="picker">{{ endTime }}</view>
      </picker>
    </view>


    <view class="bg-white cu-bar margin-top">
      <view class="action">上课老师</view>
      <view class="action">{{ info.className }}</view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom">
      <view class="action">停课、调课理由</view>
    </view>
    <view class="cu-bar bg-white padding-top">
      <view class="action">
        <textarea v-model="info.content" maxlength="-1"
                  placeholder="请备注理由(必填)"></textarea>
      </view>
    </view>

    <button class="cu-btn lg bg-red margin-top" style="width: 100%"
            @click="setClass('update')">调整课次
    </button>
    <button class="cu-btn block line-red lg margin-top" style="width: 100%"
            @click="setClass('remove')">删除课次(停课)
    </button>

  </view>
</template>

<script>
import {getDate} from "../../../../utils";

export default {
  name: "transferClass",
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      date: currentDate,
      startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      endTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      info: {
        className: '测试班级',
        teacherName: '李老师',
        content: ''
      }
    }
  },
  computed: {
    startDate() {
      return getDate('start')
    },
    endDate() {
      return getDate('end');
    }
  },
  methods: {
    bindDateChange(e) {
      this.date = e.target.value;
      // this.info.birthday = e.target.value;
    },
    bindStartTimeChange(e) {
      this.startTime = e.target.value;
      // this.info.birthday = e.target.value;
    },

    bindEndTimeChange(e) {
      this.endTime = e.target.value;
      // this.info.birthday = e.target.value;
    },
    setClass(type) {
      if (this.info.content === '') {
        wx.showToast({
          title: '请输入调课理由',
          icon: 'none'
        })
      }
      // type todo
      console.log(type);
    }
  }
}
</script>

<style scoped>

</style>