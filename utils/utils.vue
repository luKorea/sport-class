<template>
  <view class="cu-modal show" v-if="showModal">
    <view class="cu-dialog">
      <checkbox-group class="block" @change="chooseItem">
        <view class="cu-list menu text-left">
          <view class="cu-item" v-for="item in teacherArray" :key="item.id">
            <label class="flex justify-between align-center flex-sub">
              <view class="flex-sub">{{item.name}}</view>
              <checkbox class="round" :value="JSON.stringify(item)"></checkbox>
            </label>
          </view>
        </view>
      </checkbox-group>
      <view class="cu-bar bg-white justify-around">
        <view class="action" @click="hideModal">
          <button class="cu-btn bg-white solid-right">取消</button>
        </view>
        <view class="action" @click="addItem">
          <button class="cu-btn bg-white" >确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "utils"
}
</script>

<style scoped>

</style>