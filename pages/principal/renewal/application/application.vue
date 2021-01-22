<template>
  <view class="application-container">
    <view class="margin">
      <view class="cu-bar bg-white">
        <view class="action">学员姓名</view>
        <view class="action">{{info.name}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">手机号码</view>
        <view class="action">{{info.phone}}</view>
      </view>
      <view class="cu-bar bg-white margin-top" @click="goCorse">
        <view class="action">课程</view>
        <view class="action">
          <text class="text-sm text-gray">请选择</text>
          <view class="cuIcon-right text-sm text-gray"></view>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top" @click="goCharges">
        <view class="action">收费项</view>
        <view class="action">
          <text class="text-sm text-gray">请选择</text>
          <view class="cuIcon-right text-sm text-gray"></view>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top" @click="goPackage">
        <view class="action">套餐</view>
        <view class="action">
          <text class="text-sm text-gray">请选择</text>
          <view class="cuIcon-right text-sm text-gray"></view>
        </view>
      </view>
    </view>
    <view class="flex flex-direction fixed-bottom">
      <view class="cu-bar bg-white">
        <view class="action">
          <text class="margin-right">签约金额</text>
          <text class="text-red">￥ 300.00</text>
        </view>
        <view class="action">
          <button class="cu-btn bg-orange">去结算</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
name: "application",
  data() {
    return {
      info: {
        name: '陈晓婷',
        phone: '1380013800'
      }
    }
  },
}
</script>

<style scoped>

</style>