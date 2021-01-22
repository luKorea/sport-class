<!-- TODO 校长端 学员 跟进记录 -->
<template>
  <view class="follow-container">
    <view class="margin" style="margin-bottom: 140rpx">
      <block v-if="list.length > 0">
        <view class="cu-bar bg-white margin-top" v-for="item in list"
              :key="item.id">
          <view class="action flex-direction flex-due">
            <view class="text-sm flex-title">
              <text class="bg-orange" style="padding: 8rpx 20rpx">
                {{item.name}}
              </text>
              <text>{{item.time}}</text>
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              {{item.start}}
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              {{item.leave}}
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              {{item.endTime}}
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              {{item.content}}
            </view>
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
    <view class="flex flex-direction fixed-bottom">
      <button class="add-btn" @click="addFollow">+ 添加跟进记录</button>
    </view>
  </view>
</template>

<script>

import {formatTime} from "../../../../../utils";

export default {
  props: {
    studentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '谢老师',
          start: '待跟进',
          leave: '不明确',
          endTime: '2020-01-01',
          content: '我们在上课',
          time: formatTime(new Date())
        },
        {
          id: 2,
          name: '谢老师',
          start: '待跟进',
          leave: '不明确',
          endTime: '2020-01-01',
          content: '我们在上课',
          time: formatTime(new Date())
        },
        {
          id: 3,
          name: '谢老师',
          start: '待跟进',
          leave: '不明确',
          endTime: '2020-01-01',
          content: '我们在上课',
          time: formatTime(new Date())
        },
        {
          id: 4,
          name: '谢老师',
          start: '待跟进',
          leave: '不明确',
          endTime: '2020-01-01',
          content: '我们在上课',
          time: formatTime(new Date())
        },
        {
          id: 5,
          name: '谢老师',
          start: '待跟进',
          leave: '不明确',
          endTime: '2020-01-01',
          content: '我们在上课',
          time: formatTime(new Date())
        },
        {
          id: 6,
          name: '谢老师',
          start: '待跟进',
          leave: '不明确',
          endTime: '2020-01-01',
          content: '我们在上课',
          time: formatTime(new Date())
        }
      ]
    }
  },
  methods: {
    addFollow() {
      console.log(this.studentId);
      wx.navigateTo({
        url: `../addFollow/addFollow?id=${this.studentId}`
      })
    }
  },
}
</script>

<style scoped>
.flex-due {
  justify-content: start;
  align-items: start;
  width: 100%;
}

.flex-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx 0 10rpx 0;
}

.follow-container .add-btn {
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