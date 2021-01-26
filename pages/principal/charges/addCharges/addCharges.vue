<template>
  <view class="margin charges-container">
    <view class="cu-bar bg-white">
      <view class="action">名称</view>
      <view class="action text-right">
        <input v-model="info.name" placeholder="请填写名称"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">类型</view>
      <view class="action">
        <text v-if="info.type === 1">物品</text>
        <text v-else>费用</text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">价格</view>
      <view class="action text-right">
        <input v-model="info.money" type="number" placeholder="请填写价格"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">启用状态</view>
      <view class="action text-right">
        <switch  @change="setStatus"/>
      </view>
    </view>
    <view class="margin-top" @click="saveData">
      <button class="cu-btn lg bg-my-red" style="width: 100%">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      info: {}
    }
  },
  methods: {
    setStatus(e) {
      let {value} = e.detail;
      this.info.status = value === true ? 1 : 0;
      console.log(this.info.status);
    },
    saveData() {
      wx.navigateBack();
      console.log(this.info);
    }
  }
}
</script>

<style scoped>

</style>