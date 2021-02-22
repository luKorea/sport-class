<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入关键字" v-model="params.keywords"/>
        </view>
        <view class="action" @click="getData(params)">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <block v-if="info.length > 0">
        <view v-for="item in info"  :key="item.noticeid" @click="goDetail(item.noticeid)">
          <view class="margin-top cu-bar bg-white">
            <view class="action text-bold">{{item.title}}</view>
            <view class="action">
              <text class="text-orange">已读{{item.readnum}} / {{item.numcount}}</text>
              <text class="text-gray cuIcon-right"></text>
            </view>
          </view>
          <view class="bg-white padding-left">
            <view class="action text-gray" style="margin-bottom: 10rpx">发送者：{{item.sendname}}</view>
            <view class="action text-gray" style="padding-bottom: 20rpx">发送时间：{{item.datetime}}</view>
          </view>
        </view>
      </block>
    </view>

    <view class="flex flex-direction fixed-bottom" @click="addNotice">
      <button class="add-btn">+ 添加</button>
    </view>
  </view>
</template>

<script>
import {getNoticeList} from '../../../../api/principal/notice';
export default {
  name: "index",
  data() {
    return {
      params: {
        pi: 1,
        ps: 1000
      },
      info: []
    }
  },
  onShow() {
    this.getData(this.params);
  },
  methods: {
    getData(params) {
      getNoticeList(params)
      .then(res => {
        this.info = res.data.data.list;
      }).catch(err => console.log(err));
    },
    goDetail(id) {
      console.log(id);
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    },
    addNotice() {
      wx.navigateTo({
        url: '../addNotice/addNotice'
      })
    }
  }
}
</script>

<style scoped>

</style>