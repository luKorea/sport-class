<!--TODO 请假申请 -->
<template>
  <view class="margin leave-container">
    <!--搜索区域-->
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入姓名或手机号" v-model="searchInput"/>
      </view>
      <view class="action" @click="searchValue">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>
    <view class="content">
      <block v-if="list.length > 0">
        <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
          <view class="action flex-direction flex-due">
            <view  style="margin: 20rpx 0">{{item.username}}的请假</view>
            <view class="text-sm">请假时间：{{item.leaveStartTime}} 至 {{item.leaveEndTime}}</view>
            <view style="margin: 20rpx 0" class="text-sm">申请时间：{{item.applicationTime}}</view>
          </view>
          <view class="action">
            <text class="bg-black my-padding" v-if="item.type == 0">已撤销</text>
            <text class="bg-gray my-padding" v-if="item.type == 1">已失效</text>
            <text class="bg-orange my-padding" v-if="item.type == 2">已通过</text>
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
  </view>
</template>

<script>
import {formatTime} from "../../../../../utils";

export default {
  data() {
    return {
      searchInput: '',
      list: [
        {
          id: 1,
          username: '陈小童',
          leaveStartTime: '2020-09-09',
          leaveEndTime: '2020-10-10',
          type: 0,
          applicationTime: formatTime(new Date())
        },
        {
          id: 2,
          username: '陈小童',
          leaveStartTime: '2020-09-09',
          leaveEndTime: '2020-10-10',
          type: 1,
          applicationTime: formatTime(new Date())
        },
        {
          id: 3,
          username: '陈小童',
          leaveStartTime: '2020-09-09',
          leaveEndTime: '2020-10-10',
          type: 2,
          applicationTime: formatTime(new Date())
        },
        {
          id: 4,
          username: '陈小童',
          leaveStartTime: '2020-09-09',
          leaveEndTime: '2020-10-10',
          type: 0,
          applicationTime: formatTime(new Date())
        },
      ]
    }
  },
  methods: {
    searchValue() {
      console.log(this.searchInput);
    },
    goDetail(id) {
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    }
  },
}
</script>

<style scoped>
.flex-due {
  justify-content: start;
  align-items: start;
}
.my-padding {
  padding: 8rpx 10rpx;
  border-radius: 8rpx;
  color: #fff;
}
</style>