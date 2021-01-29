<template>
  <view style="margin: 20rpx">
    <block v-if="info.length > 0">
      <view class="cu-card case isCard margin-bottom img-item" v-for="item in info"
            :key="item.id" @click="goDetail(item.id)">
        <view class="cu-item shadow img-item" style="margin: 0">
          <view class="image">
            <image :src="item.imgUrl"></image>
          </view>
        </view>
        <view class="cu-bar bg-white" style="min-height: 80rpx">
          <view class="action text-bold">{{item.title}}</view>
        </view>
        <view class="cu-bar bg-white" style="min-height: 80rpx">
          <view class="action text-gray">被发布数：<text class="text-red">{{item.sendNumber}}次</text></view>
          <view class="action text-gray">最高招生人数：<text class="text-red">{{item.studentNumber}}次</text></view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
name: "index",
  data() {
    return {
      info: [
        {
          id: 1,
          imgUrl: this.$imageurl + 'wei_bg.png',
          title: '课价你来定  疯狂砍到底',
          sendNumber: 2000,
          studentNumber: 3000
        },
        {
          id: 2,
          imgUrl: this.$imageurl + 'wei_bg.png',
          title: '课价你来定  疯狂砍到底',
          sendNumber: 2000,
          studentNumber: 3000
        },
        {
          id: 3,
          imgUrl: this.$imageurl + 'wei_bg.png',
          title: '课价你来定  疯狂砍到底',
          sendNumber: 2000,
          studentNumber: 3000
        }
      ]
    }
  },
  methods: {
    goDetail(id){
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.img-item {
  border-radius: 0;
}
</style>