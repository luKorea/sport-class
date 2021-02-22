<template>
  <view class="margin">
    <!--搜索区域-->
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入标题" v-model="params.keywords"/>
      </view>
      <view class="action" @click="getInstitutions(params)">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>


    <block v-if="list.length > 0">
      <view class="cu-bar margin-top bg-white" v-for="item in list"
            :key="item.id" @click="goDetail(item.id)">
        <view class="action flex-due flex-direction" style="margin: 30rpx">
          <text class="margin-bottom-sm">{{item.title}}</text>
          <text class="text-gray text-sm">发布时间：{{item.datetime}}</text>
        </view>
        <view class="action">
          <view class="text-orange" v-if="item.flags === 1">开启</view>
          <view class="text-grey" v-else>关闭</view>
        </view>
      </view>
    </block>

    <block wx:else>
      <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title">暂无数据</view>
      </view>
    </block>

    <view class="fixed-right" @click="addInstitutions">
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
      params: {
        pi: 1,
        ps: 1000,
        paging: false,
        kind: 0,
        enable: -1
      }
    }
  },
  onShow() {
    this.getInstitutions(this.params);
  },
  methods: {
    getInstitutions(params) {
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
    addInstitutions() {
      wx.navigateTo({
        url: '../addInstitutions/addInstitutions'
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
.flex-due {
  justify-content: start;
  align-items: start;
}
</style>