<template>
  <view class="margin">
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入课程名称" v-model="searchInput"/>
      </view>
      <view class="action" @click="searchValue">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>

    <view class="cu-list menu-avatar margin-top">
      <block v-if="list.length > 0">
        <view class="cu-item solid-bottom margin-bottom" v-for="item in list"
              :key="item.id" @click="goDetail(item)">
          <view class="cu-avatar round lg"
                :style="{backgroundImage: `url(${item.imgList})`}"
                style="border-radius: 50%"></view>
          <view class="content">
            <view>
              <text class="margin-right">{{item.className}}</text>
              <text class="text-red">{{item.price}}</text>
            </view>
            <view class="text-gray text-sm flex">
              <text class="text-gray">截至时间：{{ item.time }}</text>
            </view>
          </view>
          <view class="action">
            <view class="text-orange" v-if="item.type === 0">开启</view>
            <view class="text-red" v-else>关闭</view>
          </view>
        </view>
      </block>
    </view>

    <view class="fixed-right" @click="addOnlineClasses">
      <view class="cuIcon-edit"></view>
      <view class="text-sm">发布</view>
    </view>

  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      searchInput: '',
      list: [
        //  type: 0 开启 1 关闭
        {
          id: 1,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          className: '篮球',
          price: '免费体验',
          time: '2020-10-11',
          type: 0,
          state: 0
        },
        {
          id: 2,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          className: '篮球',
          price: '￥10-￥299',
          time: '2020-10-11',
          type: 0,
          state: 0
        },
        {
          id: 3,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          className: '篮球',
          price: '￥10-￥299',
          time: '2020-10-11',
          type: 1,
          state: 0
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          className: '篮球',
          price: '￥10-￥299',
          time: '2020-10-11',
          type: 0,
          state: 1
        },
      ]
    }
  },
  methods: {
    searchValue() {
      console.log(this.searchInput);
    },
    goDetail(item) {
      let data = JSON.stringify(item);
      wx.navigateTo({
        url: `../detail/detail?id=${data}`
      })
    },
    addOnlineClasses() {
      wx.navigateTo({
        url: '../addOnlineClasses/addOnlineClasses'
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