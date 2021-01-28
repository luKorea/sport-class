<template>
  <view style="padding-bottom: 100rpx">
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
      <block v-if="info.length > 0">
        <view v-for="item in info"  :key="item.id" @click="goDetail(item.id)">
          <view class="margin-top cu-bar bg-white">
            <view class="action text-bold">{{item.title}}</view>
            <view class="action">
              <text class="text-orange">已读{{item.readNumber}}</text>
              <text class="text-gray cuIcon-right"></text>
            </view>
          </view>
          <view class="bg-white padding-left">
            <view class="action text-gray" style="margin-bottom: 10rpx">发送者：{{item.sendUser}}</view>
            <view class="action text-gray" style="padding-bottom: 20rpx">发送时间：{{item.sendTime}}</view>
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
export default {
  name: "index",
  data() {
    return {
      searchInput: '',
      info: [
        {
          id: 1,
          title: '消息通知啦',
          sendUser: '李老师',
          readNumber: '1/12',
          sendTime: '2020-12-21 18:52'
        },
        {
          id: 2,
          title: '消息通知啦',
          sendUser: '李老师',
          readNumber: '1/12',
          sendTime: '2020-12-21 18:52'
        },
        {
          id: 3,
          title: '消息通知啦',
          sendUser: '李老师',
          readNumber: '1/12',
          sendTime: '2020-12-21 18:52'
        },
        {
          id: 4,
          title: '消息通知啦',
          sendUser: '李老师',
          readNumber: '1/12',
          sendTime: '2020-12-21 18:52'
        },
        {
          id: 5,
          title: '消息通知啦',
          sendUser: '李老师',
          readNumber: '1/12',
          sendTime: '2020-12-21 18:52'
        }
      ]
    }
  },
  methods: {
    searchValue() {
      console.log(this.searchInput);
    },
    goDetail(id) {
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