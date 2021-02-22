<script>
	import {
		getUserInfo
	} from "./api/login";

	export default {
		// 获取用户信息，判断用户是否登陆过期
		onLaunch: function() {
			if(!wx.getStorageSync('token')) {
				wx.redirectTo({
					url: '/pages/login/login'
				})
			} else {
				getUserInfo()
					.then(res => {
						if (res.data.data.errcode === 510) {
							wx.showModal({
								title: '登陆',
								content: '用户登陆已过期，请重新登陆',
								showCancel: false,
								success(res) {}
							})
							wx.clearStorageSync();
							wx.redirectTo({
								url: '/pages/login/login'
							})
						} else {
							console.log('登陆未过期');
						}
					}).catch(err => {
						console.log(err);
					})
			}
		},
		onShow: function() {
			wx.hideHomeButton();
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "wxcomponents/vant/common/index.wxss";
	@import "colorui/main.wxss";
	@import "colorui/icon.wxss";
	@import "styles/common.css";
</style>
