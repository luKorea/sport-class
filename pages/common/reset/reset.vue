<!-- TODO 重置密码 -->
<template>
	<view class="margin reset-container">
    <view class="form-container">
      <view class="cu-form-group">
        <view class="cuIcon-lock margin-right-my-sm"></view>
        <input placeholder="请输入原密码" v-model="form.oldPass" type="password" />
      </view>
      <view class="cu-form-group margin-top">
        <view class="cuIcon-lock margin-right-my-sm"></view>
        <input placeholder="请输入新密码" v-model="form.newPass" type="password" />
      </view>
      <view class="cu-form-group margin-top">
        <view class="cuIcon-lock margin-right-my-sm"></view>
        <input placeholder="请重复输入新密码" v-model="form.newPassTwo" type="password" />
      </view>
      <view class="flex flex-direction margin-top" @click="resetPass">
        <button class="cu-btn bg-my-red margin-tb-sm lg">提交</button>
      </view>
      <view class="text-center margin-top text-gray">设置密码后可以使用手机+密码登录</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  form: {
			    oldPass: '',
          newPass: '',
          newPassTwo: ''
        }
			}
		},
		onLoad() {

		},
		methods: {
      resetPass() {
        console.log(this.form);
      }
		}
	}
</script>

<style>
</style>
