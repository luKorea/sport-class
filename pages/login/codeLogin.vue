<!--suppress ALL -->
<template>
  <view class="login-container">
    <view class="content">
      <view class="image"><image :src="imgUrl + 'logo.png'"></image></view>
      <view class="form-container padding-xl">
        <view class="cu-bar bg-white margin-top solid-bottom justify-start">
          <text class="cuIcon-mobile text-gray margin-right-sm"></text>
          <input v-model="form.name" placeholder="请输入您的手机号码" />
        </view>
        <view class="cu-bar bg-white solid-bottom">
          <view class="action" style='margin-left: 10rpx !important;'>
            <text class="cuIcon-wenzi text-gray"></text>
            <input v-model="form.password" placeholder="请输入验证码" type="password" />
          </view>
          <view class="action"></view>
          <view class="action"  style='margin-right: 0 !important;'>
            <text v-if="isShowCode" class="uni-input text-gray" @click="getCode">{{fitstName}}</text>
            <text v-else class="text-right text-gray">{{countTime}} 秒</text>
          </view>
        </view>
        <view @click="login">
          <button class="lg cu-btn bg-red margin-top-xl" style="width: 100%">登陆</button>
        </view>
        <view class='margin-top-xl text-right text-gray' @click="goLogin">账号密码登陆</view>
      </view>
    </view>
  </view>
</template>

<script>
import {getUserInfo, userLogin} from "../../api/login";
import {failTip} from "../../utils/tip";

export default {
  name: "login",
  data() {
    return {
      isShowCode: true,
      fitstName: '获取验证码',
      countTime: 60,
      form: {},
      imgUrl: this.$imageurl
    }
  },
  onLoad() {
  },
  methods: {
    // 获取验证码
    getCode() {
      const _that = this;
      // _that.$request.get('/blade-anchor-user/sendMessage', {
      //   params: {
      //     phone: _that.phone
      //   }
      // }).then(res => {
      //   if(res.code === 200) {
      //     uni.showToast({
      //       duration: 3000,
      //       title: `验证码为: ${res.data.verifyCode} 请输入`
      //     })
      //     this.verifyCode = res.data.verifyCode;
      //     this.key = res.data.key;
      //   }
      // }).catch(err => {
      //       console.log(err)
      // })
      //获取验证码倒计时
      let time = 60;
      this.isShowCode = false;
      let timer = setInterval(() => {
        time--;
        this.countTime = time;
        if (time === 0) {
          clearInterval(timer);
          this.isShowCode = true;
          this.fitstName = '重新获取';
          this.countTime = 60;
        }
      }, 1000)
    },
    // 前往手机验证码登陆页面
    goLogin() {
      wx.redirectTo({
        url: '../login/login'
      });
    },
    // 用户登陆
    login() {
      let token = wx.getStorageSync('token');
      if (!token) {
        userLogin(this.form)
            .then(res => {
              let data = res.data.data;
              if (data.errcode === 200) {
                wx.setStorageSync('token', data.data);
                this.getUserData();
              } else {
                failTip(data.errmsg)
              }
            })
      } else {
        this.getUserData();
      }
    },
    // 获取用户信息
    getUserData() {
      getUserInfo()
          .then(res => {
            let data = res.data.data,
                per = data.permitlist[0],
                flags = per.flags,
                type = '';
            if ((flags % 1) > 0) {
              type = '管理员';
            } else if ((flags % 2) > 0) {
              type = '老师';
            }
            console.log(type);
          })
    },
  },
}
</script>

<style lang="scss">
page, view{
  width: 100%;
  background-color: #ffffff;
}

.login-container {
  width: 100%;
  background-color: #ffffff;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .image {
      width: 522rpx;
      height: 446rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>