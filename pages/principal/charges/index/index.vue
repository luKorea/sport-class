<!-- TODO 教师端 我的班级 -->
<template>
  <view class=" class-container">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入关键字" v-model="searchInput"/>
        </view>
        <view class="action" @click="searchValue">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <!--列表-->
      <block v-if="list.length > 0">
        <view v-for="(item, index) in list" :key="index">
          <view class="cu-bar bg-white solid-bottom margin-top" @click="goDetail(item)">
            <view class="action">
              <view class="flex flex-direction padding-top padding-bottom">
                <view class="margin-bottom-sm">
                  <text class="wu-gran" v-if="item.type === 1">物</text>
                  <text class="ban-red" v-else>费</text>
                  <text class="text-center">{{item.ban}}</text>
                </view>
                <view>
                  <text class="text-center text-gray text-sm">{{item.money}} 元</text>
                </view>
              </view>
            </view>
            <view class='action' @click="goDetail(item)">
              <button class="cu-btn bg-orange" v-if="item.status === 1">开启</button>
              <button class="cu-btn bg-red" v-else>关闭</button>
            </view>
          </view>
        </view>
      </block>
      <block wx:else>
        <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
          <view class="title">暂无数据</view>
        </view>
      </block>
    </view>
    <view class="flex flex-direction fixed-bottom" @click="addCharges">
      <button class="cu-btn bg-red lg" style="width: 100%;">+添加</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      list: [
        //  type: 1 物品 2. 费用
        //  status 0 关闭 1 打开
        {
          id: 1,
          ban: '2020通用课程',
          money: 20,
          type: 1,
          status: 0,
          inventory: 99,
          setInventory: 0,
        },
        {
          id: 2,
          ban: '2020通用课程',
          money: 20,
          type: 2,
          status: 1,
          inventory: 99,
          setInventory: 0,
        },
        {
          id: 3,
          ban: '2020通用课程',
          money: 20,
          type: 1,
          status: 0,
          inventory: 99,
          setInventory: 0,
        },
        {
          id: 4,
          ban: '2020通用课程',
          money: 20,
          type: 2,
          status: 1,
          inventory: 99,
          setInventory: 0,
        }
      ],
    }
  },
  methods: {

    searchValue() {
      console.log(this.searchInput);
    },
    goDetail(res) {
      let data = JSON.stringify(res);
      uni.navigateTo({
        url: `../detail/detail?data=${data}`
      });
    },
    addCharges() {
      uni.navigateTo({
        url: `../addCharges/addCharges`
      });
    }
  }
}
</script>

<style>
</style>
