<!-- TODO 老师端 学员 跟进记录 -->
<template>
  <view class="follow-container">
    <view class="margin" style="margin-bottom: 140rpx">
      <block v-if="list.length > 0">
        <view class="cu-bar bg-white margin-top" v-for="(item, index) in list"
              :key="index">
          <view class="action flex-direction flex-due">
            <view class="text-sm flex-title">
              <text class="bg-orange" style="padding: 8rpx 20rpx">
                {{item.name}}
              </text>
              <text>{{item.datetime}}</text>
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              {{item.intent}}
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              下次跟进时间：{{item.nexttime | FormatDate}}
            </view>
            <view class="text-sm" style="margin: 10rpx 0">
              <text class="cuIcon-title text-orange"></text>
              {{item.note}}
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
import {getStudentFollow} from '../../../../../api/common/students.js';

export default {
  props: {
    studentId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
  	this.getData(this.studentId);
	uni.$on('onShow', e => this.getData(this.studentId));
  },
  methods: {
	getData(id) {
		getStudentFollow(id)
		.then(res => {
			this.list = res.data.data.followuprecord;
		}).catch(err => console.log(err));
	},  
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