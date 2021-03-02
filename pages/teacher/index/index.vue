<!-- TODO 教师端 首页 -->
<template>
  <view class="index-container">
    <!--头部区域-->
    <view class="bg-white indexbg flex"
          :style="{backgroundImage: `url(${imageurl + '/bg.png'})`}">
      <view class="grid col-1 text-center" style="width: 100%;">
        <view class="flex align-center">
          <view class="flex solid-bottom align-center justify-between"
                style="width: 100%;">
            <view class="left-button flex align-center justify-center"
                  @click="goPrincipal">
              切换
              <image :src="imageurl + '/qiehuan.png'"></image>
            </view>
            <view class="cententinfo flex align-center">
              <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></image>
              <text>{{ userInfo.realname }}</text>
              <text>本月课时：2.00</text>
            </view>
            <view class="right-button flex align-center justify-center">
              消息
              <image :src="imageurl + '/xiaoxi.png'"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--下部区域-->
    <view class="cu-list grid col-4 no-border margin-bottom">
      <view class="cu-item flex justify-center align-center"
            v-for="(item, index) in iconList" :key="index"
            @click="goPage(item.url)">
        <view class="cu-avatar sm bg-white"
              :style="{backgroundImage: `url(${item.img})`}"
        ></view>
        <text>{{ item.name }}</text>
      </view>
    </view>

    <view class="flex flex-direction margin" @click="goNamed">
      <button class="cu-btn bg-my-red lg">我要点名</button>
    </view>
<!--    <view class="flex flex-direction margin" @click="scanCode">-->
<!--      <button class="cu-btn bg-orange lg">扫描点名</button>-->
<!--    </view>-->
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageurl: '',
      userInfo: {},
      venue:{},
      iconList: [
        {
          img: this.$imageurl + 'banji.png',
          url: '../class/index/index',
          name: '我的班级'
        },
        {
          img: this.$imageurl + 'xueyuan.png',
          url: '/pages/common/students/index/index',
          name: '我的学员'
        },
        {
          img: this.$imageurl + 'kecheng.png',
          url: '/pages/common/schedule/index/index',
          name: '我的课表'
        },
        {
          img: this.$imageurl + 'shangkejilu.png',
          url: '/pages/common/classRecord/index/index',
          name: '上课记录'
        },
        {
          img: this.$imageurl + 'zuoye.png',
          url: '../task/index/index',
          name: '作业'
        },
        {
          img: this.$imageurl + 'huping.png',
          url: '/pages/common/evaluation/index/index',
          name: '师生互评'
        },
        {
          img: this.$imageurl + 'chengzhangjilu.png',
          url: '/pages/common/record/index/index',
          name: '成长记录'
        },
        {
          img: this.$imageurl + 'student-setting.png',
          url: '../mime/mime',
          name: '设置'
        },
      ]
    }
  },
  onLoad() {
    this.imageurl = this.$imageurl;
    let userInfo = uni.getStorageSync('userData');
    console.log(userInfo);
    this.userInfo = userInfo;
    const venulist = uni.getStorageSync('SET_LIST');
    this.venue = venulist.find(a=>a.id==userInfo.venueid);
    this.iconList[2].url+='?teacherid='+this.venue.teacherid
  },
  onShow() {
    wx.hideHomeButton();  
  },
  methods: {
    goPage(url) {
      uni.navigateTo({
        url: url
      })
    },
    // TODO 扫码点名
    scanCode() {
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
        success: res => {
          if (res.errMsg === 'scanCode:ok') {
            console.log(res.result);
            wx.showToast({
              title: '扫码成功'
            })
            // wx.navigateTo({
            //   url: '../../pages/search/search?keyword=' + res.result
            // })
          }
        },
        fail: res => {
          // 接口调用失败
          wx.showToast({
            icon: 'none',
            title: '接口调用失败！'
          })
        },
        complete: res => {
          // 接口调用结束
          console.log(res)
        }
      });
    },
    // 去校长端
    goPrincipal() {
      wx.redirectTo({
        url: '../../principal/index/index'
      })
    },
    goNamed() {
      wx.navigateTo({
        url: '../named/index/index'
      })
    }
  }
}
</script>

<style scoped>
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
  width: 200rpx;
  height: 200rpx;
}

.indexbg {
  height: 420rpx;
  background-size: 100%;
}

.left-button {
  width: 150rpx;
  height: 80rpx;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 0 15px 15px 0;
}

.right-button {
  width: 150rpx;
  height: 80rpx;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 15px 0 0 15px;
}

.right-button image {
  width: 30rpx;
  height: 30rpx;
  margin-left: 10rpx;
}

.left-button image {
  width: 30rpx;
  height: 30rpx;
  margin-left: 10rpx;

}

.cententinfo {
  flex-direction: column;
  color: #fff;
}

.cententinfo image {
  height: 160rpx;
  width: 160rpx;
  border-radius: 50%;
  margin-bottom: 10rpx;
}

.hexin {
  position: relative;
}

.hexin_top {
  width: 100%;
  text-align: center;
  background: no-repeat center center;
  background-size: 50%;
}

.hexin_more {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  right: 40rpx;
  top: 35rpx
}


</style>
