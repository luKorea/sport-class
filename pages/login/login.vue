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
import {
  changeEvenue,
  getClassDetail,
  getUserInfo,
  userLogin
} from "../../api/login";
import {failTip} from "../../utils/tip";
import Cookies from 'js-cookie';
import {getDate} from "../../utils";

export default {
  name: "login",
  data() {
    return {
      form: {
		  name: 15918773196,
		  password: 123456
	  }
    }
  },
  onShow() {
	wx.hideHomeButton();  
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
		console.log(111112221)
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
    },
    // 获取用户信息
    getUserData() {
      getUserInfo()
          .then(res => {
            let data = res.data.data,
                token = data.token;
            wx.setStorageSync('userData', token);
            let floowname = token.permitname ? token.permitname : token.name;
            Cookies.set("userTele", floowname);
            wx.setStorageSync('userTele', floowname);
            // 上课点ID
            wx.setStorageSync('venueid', token.venueid);
            // 机构ID
            wx.setStorageSync('organizeid', token.organizeid);
            /*恢复上次打开的上课点*/
            let storageId = Cookies.get('venueid');
            let name = Cookies.get("user");
            let hasvenue = true;
            if( name && storageId && name == token.name && (token.venueid != storageId) ){
              changeEvenue({
                venueid: storageId
              }).then(res => {
                let data = res.data.data;
                if (data.errcode === 200) {
                  Cookies.set("venueid", storageId)
                  window.location.reload();
                  wx.redirectTo({
                    url: '/pages/principal/index/index'
                  })
                } else {
                  Cookies.remove('venueid');
                  window.location.reload()
                }
              })
            }
            else {
              /*获取信息主要业务*/
              wx.setStorageSync('SET_LIST', data.venuelist);
              data.venuelist.forEach((val,i) => {
                if(val.id == token.venueid){
                  hasvenue = false
                  token.cover = val.cover;
                  token.icon = val.icon;
                  token.expired = val.expired;
                  token.title = val.title;
                }
              });
              if(hasvenue){
                if(storageId){
                  Cookies.remove('venueid')
                }
                window.location.reload();
              }
              /*4-17 上课点增加标记4096后逻辑修改 zwl*/
              getClassDetail({
                venueid: token.venueid
              }).then(res => {
                console.log(res);
                let result = res.data.data;
                data.permitlist.forEach(function (val, i) {
                  if (val.id == token.venueid) {
                    /*仅老师角色时权限固定*/
                    if(val.flags === 2){
                      let permitlist=['2010','1011','1014','1012','1013','1016','1024','1030','1028','1029','1123'];
                      wx.setStorageSync('SET_ROLES', permitlist);
                      wx.redirectTo({
                        url: '/pages/teacher/index/index'
                      })
                    }else {
                      // if ((!(system.state.systemSetting[4])) && ((val.permit.indexOf('1107')) != -1)) {
                      if (((val.permit.indexOf('1107')) != -1)) {
                        let novip = val.permit.split(',')
                        let vipIndex = novip.findIndex(item => item === '1107')
                        novip.splice(vipIndex, 1);
                        wx.setStorageSync('SET_ROLES', novip)
                      } else {
                        wx.setStorageSync('SET_ROLES', val.permit.split(','));
                      }
                      wx.redirectTo({
                        url: '/pages/principal/index/index'
                      })
                    }
                  }
                });
              })
            }
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