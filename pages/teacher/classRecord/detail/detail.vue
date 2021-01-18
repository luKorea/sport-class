<!-- TODO 教师端 班级详情 -->
<template>
  <view class="margin class-container">
    <view class="cu-bar bg-white">
      <view class='action'>申请人</view>
      <view class='action'>{{result.username}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class='action'>请假日期</view>
      <view class='action text-sm'>
        {{result.leaveStartTime}} 至 {{result.leaveEndTime}}
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-form-group align-start cu-bar bg-white">
        <view class="title">
          <text class="cuIcon-titles text-orange"></text> 请假理由
        </view>
      </view>
      <view class="cu-form-group align-start cu-bar bg-white padding-top">
        <input v-model="result.infoData" disabled/>
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-form-group align-start cu-bar bg-white">
        <view class="title">
          <text class="cuIcon-titles text-red"></text> 处理说明
        </view>
      </view>
      <view class="cu-form-group align-start cu-bar bg-white padding-top">
        <textarea maxlength="-1" v-model="result.content" placeholder="请填写跟进内容，200字以内"></textarea>
      </view>
      <view class="cu-form-group cu-bar bg-white">
        <checkbox-group @change="selectClassTime">
          <label class="check-text"><checkbox class="check-box" :value="result.select"/>扣课时</label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script>
import {formatTime} from "../../../../utils";

export default {
  data() {
    return {
      result: {
        username: '陈晓通',
        leaveStartTime: formatTime(new Date()),
        leaveEndTime: formatTime(new Date()),
        infoData: '家里有事，特此请假！',
        result: '',
        select: null
      },
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
  },
  methods: {
    selectClassTime(e) {
      console.log(this.result.select);
    }
  }
}
</script>

<style>
</style>
