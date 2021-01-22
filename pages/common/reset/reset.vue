<!-- TODO 重置密码 -->
<template>
	<view class="margin reset-container">
    <view class="form-container">
      <view class="cu-form-group">
        <view class="cuIcon-lock margin-right-my-sm"></view>
        <input placeholder="请输入原密码" v-model="form.oldpassword" type="password" />
      </view>
      <view class="cu-form-group margin-top">
        <view class="cuIcon-lock margin-right-my-sm"></view>
        <input placeholder="请输入新密码" v-model="form.newpassword" type="password" />
      </view>
      <view class="cu-form-group margin-top">
        <view class="cuIcon-lock margin-right-my-sm"></view>
        <input placeholder="请重复输入新密码" v-model="form.newpasswordTwo" type="password" />
      </view>
      <view class="flex flex-direction margin-top" @click="resetPass">
        <button class="cu-btn bg-my-red margin-tb-sm lg">提交</button>
      </view>
      <view class="text-center margin-top text-gray">设置密码后可以使用手机+密码登录</view>
    </view>
	</view>
</template>

<script>
	import {resetPassword} from "../../../api/login";
  import {successTip} from "../../../utils/tip";
  import {redirectPage} from "../../../utils";

  export default {
		data() {
			return {
			  form: {
          oldpassword: '',
          newpassword: '',
          newpasswordTwo: ''
        }
			}
		},
		onLoad() {

		},
		methods: {
      resetPass() {
        if (this.form.newpassword !== this.form.newpasswordTwo) {
          wx.showModal({
            title: '您输入的两次密码不一致，请重新输入'
          })
        } else {
          resetPassword(this.form)
          .then(res => {
            if (res.data.data.errcode === 200) {
              successTip('修改成功，请重新登录');
              redirectPage();
            }
          }).catch(err => console.log(err));
        }
      }
		}
	}
</script>

<style>
</style>
