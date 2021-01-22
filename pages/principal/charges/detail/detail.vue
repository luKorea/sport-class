<template>
  <view class="margin charges-container">
    <view class="cu-bar bg-white">
      <view class="action">名称</view>
      <view class="action">{{ info.ban }}</view>
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
        <input v-model="info.money" placeholder="请填写价格"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">库存</view>
      <view class="action">{{ info.inventory }}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">库存预警值</view>
      <view class="action text-right">
        <input v-model="info.setInventory" placeholder="请填写价格"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">启用状态</view>
      <view class="action text-right">
        <switch :checked="info.status === 1" @change="setStatus"/>
      </view>
    </view>
    <view class="margin-top">
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
  onLoad(options) {
    let {data} = options;
    if (data) {
      this.info = JSON.parse(data);
      console.log(this.info);
    }
  },
  methods: {
    setStatus(e) {
      let {value} = e.detail;
      this.info.status = value === true ? 1 : 0;
      console.log(this.info.status);
    }
  }
}
</script>

<style scoped>

</style>