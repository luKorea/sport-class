<template>
  <view style="padding-bottom: 120rpx">
    <view class="margin">
      <view class="cu-bar bg-white">
        <view class="action">上传头像</view>
        <view class="action" style="margin: 20rpx">
          <image :src='info.imgList' mode='aspectFill' class="img"></image>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">老师姓名</view>
        <view class="action">{{info.teacherName}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">简介</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <textarea maxlength="-1" v-model="info.content" disabled></textarea>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">老师风采</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <textarea maxlength="-1" v-model="info.content" disabled></textarea>
        </view>
      </view>

      <view class="cu-bar margin-top bg-white">
        <view class="action">是否只在本上课点展示</view>
        <view class="action"><switch :checked="info.type === 0"/></view>
      </view>
      <view class="cu-bar margin-top bg-white">
        <view class="action">是否启用</view>
        <view class="action"><switch :checked="info.state === 0"/></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "addTeacherStyles",
  data() {
    return {
      info: {}
    }
  },
  onLoad(options) {
    let {data} = options;
    this.info = JSON.parse(data);
  }
}
</script>

<style scoped>
.img {
  width: 100rpx;
  height: 100rpx;
}
</style>