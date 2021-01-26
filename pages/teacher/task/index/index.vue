<!-- TODO 老师端 作业首页 -->
<template>
  <view class="follow-container">
    <view class="margin" style="margin-bottom: 140rpx">
      <block v-if="list.length > 0">
        <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
          <view class="action flex-direction flex-due">
            <view class="text-sm class-block">
              <view class="small-block-orange"></view>
              <text>{{item.class}}</text>
            </view>
            <view class="text-sm">{{item.grade}}</view>
            <view style="margin: 20rpx 0" class="text-sm">{{item.time}}</view>
          </view>
          <view class="action flex-direction flex-due">
            <view style="margin: 20rpx 0" class="text-sm">
              <text class="cuIcon-titles text-white"></text>
            </view>
            <view class="text-sm">已阅：{{item.yue}}</view>
            <view style="margin: 20rpx 0" class="text-sm">提交：{{item.send}}</view>
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
      <button class="add-btn" @click="addTask">布置作业</button>
    </view>
  </view>
</template>

<script>

import {formatTime} from "../../../../utils";

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          class: '2020通用课程',
          grade: '足球2+1班',
          yue: '1/6',
          send: '1/6',
          time: formatTime(new Date())
        },
        {
          id: 2,
          class: '2020通用课程',
          grade: '足球2+1班',
          yue: '1/6',
          send: '1/6',
          time: formatTime(new Date())
        },
        {
          id: 3,
          class: '2020通用课程',
          grade: '足球2+1班',
          yue: '1/6',
          send: '1/6',
          time: formatTime(new Date())
        },
        {
          id: 4,
          class: '2020通用课程',
          grade: '足球2+1班',
          yue: '1/6',
          send: '1/6',
          time: formatTime(new Date())
        },
        {
          id: 5,
          class: '2020通用课程',
          grade: '足球2+1班',
          yue: '1/6',
          send: '1/6',
          time: formatTime(new Date())
        },
        {
          id: 6,
          class: '2020通用课程',
          grade: '足球2+1班',
          yue: '1/6',
          send: '1/6',
          time: formatTime(new Date())
        }
      ]
    }
  },
  methods: {
    goDetail(id) {
      uni.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    },
    addTask() {
      wx.navigateTo({
        url: `../addTask/addTask`
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
  display: flex;
  flex-direction: column;
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

.class-block {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>