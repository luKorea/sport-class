<template>
  <view class="margin">
    <!--搜索区域-->
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入姓名/手机号" v-model="params.keywords"/>
      </view>
      <view class="action" @click="getStudentStyles(params)">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>

    <view class="cu-list menu-avatar margin-top">
      <block v-if="list.length > 0">
        <view class="cu-item solid-bottom margin-bottom" v-for="item in list"
              :key="item.id" @click="goDetail(item.id)">
          <view class="cu-avatar round lg"
                :style="{backgroundImage: `url(${imgUrl + item.image})`}"
                style="border-radius: 50%"></view>
          <view class="content">
            <view class="">{{ item.title }}</view>
            <view class="text-gray text-sm flex">
              <text class="text-cut">简介：{{ item.describe }}</text>
            </view>
          </view>
          <view class="action">
            <view class="text-orange" v-if="item.flags === 1">开启</view>
            <view class="text-grey" v-else>关闭</view>
          </view>
        </view>
      </block>
    </view>

    <view class="fixed-right" @click="addStudentStyles">
      <view class="cuIcon-edit"></view>
      <view class="text-sm">发布</view>
    </view>
  </view>
</template>

<script>
import {getSaleCommon} from "../../../../api/principal/saleCommon";

export default {
  name: "index",
  data() {
    return {
      list: [],
      imgUrl: this.$uploadUrl,
      params: {
        pi: 1,
        ps: 1000,
        paging: false,
        kind: 1,
        enable: -1
      }
    }
  },
  onShow() {
    this.getStudentStyles(this.params);
  },
  methods: {
    getStudentStyles(params) {
      getSaleCommon(params)
          .then(res => {
            this.list = res.data.data;
          }).catch(err => console.log(err))
    },
    goDetail(id) {
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    },
    addStudentStyles() {
      wx.navigateTo({
        url: '../addStudentStyles/addStudentStyles'
      })
    }
  }
}
</script>

<style scoped>
.fixed-right {
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  text-align: center;
  width: 110rpx;
  height: 110rpx;
  color: #ffffff;
  background: #52CDC0;
  border-radius: 50%;
}
</style>