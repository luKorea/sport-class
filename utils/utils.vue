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


    <view class="cu-bar search bg-white margin-top solid-top">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入课程名称" v-model="searchInput"/>
      </view>
      <view class="action" @click="searchValue">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>



    <view class="drawer-footer footer">
      <text class="text-center text-red">没有排课？未排课直接考勤</text>
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