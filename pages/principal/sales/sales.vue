<template>
  <view style="padding-bottom: 100rpx">

    <view class="cu-list grid col-4 no-border margin">
      <view class="cu-item flex justify-center align-center"
            v-for="(item, index) in iconList" :key="index"
            @click="goPage(item.url)">
        <view class="cu-avatar sm bg-white"
              :style="{backgroundImage: `url(${item.img})`}"
        ></view>
        <text>{{ item.name }}</text>
      </view>
    </view>

    <view class="cu-bar margin bg-white">
      <view class="action">
        <text class="red-block"></text>
        <text>报名用户数</text>
      </view>
      <view class="action">
        <text class="text-red">线上课程{{info.user}}次</text>
      </view>
    </view>
    <view class="cu-bar margin bg-white">
      <view class="action">
        <text class="orange-block"></text>
        <text>浏览量</text>
      </view>
      <view class="action">
        <text class="text-orange">线上课程{{info.user}}次</text>
      </view>
    </view>
    <view class="cu-bar margin bg-white">
      <view class="action">
        <text class="cyan-block"></text>
        <text>分享次数</text>
      </view>
      <view class="action">
        <text class="text-cyan">线上课程{{info.user}}次</text>
      </view>
    </view>
    
    
<!--底部-->
    <view class="cu-bar tabbar bg-white footer">
      <view class="action" v-for="item in list" :key="item.id" @click="goItem(item.url)">
        <view class="cuIcon-cu-image">
          <image :src="item.img"></image>
        </view>
        <view>{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "sales",
  data() {
    return {
      iconList: [
        {
          img: this.$imageurl + 'jigoudongtai.png',
          url: '/pages/principal/institutions/index/index',
          name: '机构动态'
        },
        {
          img: this.$imageurl + 'mingshifengcai.png',
          url: '/pages/principal/teacherStyles/index/index',
          name: '名师风采'
        },
        {
          img: this.$imageurl + 'mingxingxueyuan.png',
          url: '/pages/principal/studentStyles/index/index',
          name: '明星学员'
        },
        {
          img: this.$imageurl + 'tongzhi.png',
          url: '/pages/principal/notice/index/index',
          name: '消息通知'
        },
        {
          img: this.$imageurl + 'xchengzhangjilu.png',
          url: '/pages/common/record/index/index',
          name: '成长记录'
        },
        {
          img: this.$imageurl + 'weihuodong.png',
          url: '/pages/principal/microActivities/index/index',
          name: '微活动'
        },
        {
          img: this.$imageurl + 'xueyuandangan.png',
          url: '/pages/principal/studentFiles/index/index',
          name: '学员档案'
        },
        {
          img: this.$imageurl + 'xianshangbaoming.png',
          url: '/pages/principal/onlineClasses/index/index',
          name: '线上报课'
        },
      ],
      list: [
        {
          id: 0,
          url: '../index/index',
          img: this.$imageurl + 'school.png',
          name: '教务'
        },
        {
          id: 1,
          url: '',
          img: this.$imageurl + 'select_tongji.png',
          name: '销售'
        },
        {
          id: 2,
          url: '../mime/mime',
          img: this.$imageurl + 'wode.png',
          name: '我的'
        }
      ],
      info: {
        user: 25,
        visit: 25,
        share: 25
      }
    }
  },
  methods: {
    goPage(url) {
      uni.navigateTo({
        url: url
      })
    },
	onShow() {
		wx.hideHomeButton();  
	},
    goItem(url) {
      wx.redirectTo({
        url: url
      })
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 99999;
}

.footer image {
  width: 15rpx;
  height: 15rpx;
}
</style>