<!-- TODO 教师端 首页 -->
<template>
  <view class="index-container">
    <!--头部区域-->
    <view class="UCenter-bg">
      <view class="cu-avatar xl round"
            style="border-radius: 50%"
            :style="{backgroundImage: `url(${userInfo.imgUrl})`}"></view>
      <view class="text-xl margin-top-sm">{{userInfo.identity}}</view>
      <view class="margin-top-my-sm">本月课时: {{userInfo.time}}</view>
    </view>
    <!--下部区域-->
    <view class="cu-list grid col-4 no-border margin-top margin-bottom">
      <view class="cu-item flex justify-center align-center"
            v-for="(item, index) in iconList" :key="index"
            @click="goPage(item.url)">
        <view class="cu-avatar sm bg-white"
              :style="{backgroundImage: `url(${item.img})`}"
        ></view>
        <text>{{item.name}}</text>
      </view>
    </view>

    <view class="flex flex-direction margin">
      <button class="cu-btn bg-my-red lg">我要点名</button>
    </view>
    <view class="flex flex-direction margin">
      <button class="cu-btn bg-orange lg">扫描点名</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        identity: '我是老师',
        imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
        time: '30.00'
      },
      iconList: [
        {
          img: 'https://yundongke.gzbigbang.cn/banji.png',
          url: '../class/index/index',
          name: '我的班级'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/xueyuan.png',
          url: '../class/index/index',
          name: '我的学员'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/kecheng.png',
          url: '../class/index/index',
          name: '我的课表'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/shangkejilu.png',
          url: '../class/index/index',
          name: '上课记录'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/banji.png',
          url: '../class/index/index',
          name: '作业'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/huping.png',
          url: '../class/index/index',
          name: '师生互评'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/banji.png',
          url: '../class/index/index',
          name: '成长记录'
        },
        {
          img: 'https://yundongke.gzbigbang.cn/banji.png',
          url: '../mime/mime',
          name: '设置'
        },
      ]
    }
  },
  onLoad() {

  },
  methods: {
    goPage(url) {
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style>
page {
  background-color: #fff;
}

.UCenter-bg {
  background-image: url(https://yundongke.gzbigbang.cn/mime-bg.png);
  background-size: cover;
  height: 440rpx;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200 rpx;
  height: 200 rpx;
}
</style>
