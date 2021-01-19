<!--suppress ALL -->
<template>
  <view class="login-container">
    <view class="content">
      <view class="image"><image src="/static/logo.png" mode="aspectFill"></image></view>
      <view class="form-container padding-xl">
        <view class="cu-bar bg-white margin-top solid-bottom justify-start">
          <text class="cuIcon-mobile text-gray margin-right"></text>
          <input v-model="form.name" placeholder="请输入您的手机号码" />
        </view>
        <view class="cu-bar bg-white solid-bottom justify-start">
          <text class="cuIcon-lock text-gray margin-right"></text>
          <input v-model="form.password" placeholder="请输入密码" type="password" />
        </view>
        <view @click="login">
          <button class="lg cu-btn bg-red margin-top-xl" style="width: 100%">登陆</button>
        </view>
        <view class='margin-top-xl text-right text-gray' @click="goCodeLogin">手机验证码登录</view>
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
      form: {}
    }
  },
  onLoad() {
    let token = wx.getStorageSync('token');
    if (token) {
      wx.redirectTo({
        url: '/pages/teacher/index/index'
      })
    }
  },
  methods: {
    // 切换登陆方式
    goCodeLogin() {
      wx.redirectTo({
        url: '../login/codeLogin'
      })
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
                wx.redirectTo({
                  url: '/pages/teacher/index/index'
                })
                this.getUserData();
              } else {
                failTip(data.errmsg)
              }
            })
      } else {
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