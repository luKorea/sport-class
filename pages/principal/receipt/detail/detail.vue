<template>
	<view>
		<view class="margin" style="padding-bottom: 100rpx">
			<view class="cu-bar bg-white">
				<view class="action">收据编号</view>
				<view class="action">{{info.orderinfo.number}}</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">缴费日期</view>
				<view class="action">{{info.orderinfo.datetime}}</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">学员</view>
				<view class="action">{{info.student.name}}</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">手机号码</view>
				<view class="action">{{info.student.contact}}</view>
			</view>

			<!--已选课程-->
			<block>
				<view class="cu-bar bg-white margin-top solid-bottom">
					<view class="action text-red">已选课程</view>
				</view>
				<block v-for="(item, index) in info.courseitem">
					<view :key="index">
						<view class="cu-bar bg-white">
							<view class="action text-red">
								<text class="cuIcon-titles text-red"></text>{{item.title}}
							</view>
						</view>
						<view class="cu-bar bg-white">
							<view class="action">优惠：￥{{item.discount}}</view>
							<view class="action">签约金额：￥{{item.subtotal}}</view>
						</view>
						<view class="cu-bar bg-white">
							<view class="action">1课时：￥{{(item.price/item.lessoncount).toFixed(2)}}</view>
							<view class="action">有效期限：{{item.etime}}</view>
						</view>
					</view>
				</block>
			</block>

			<!--缴费记录-->
			<block>
				<view class="cu-bar bg-white margin-top solid-bottom">
					<view class="action text-orange">缴费记录</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">交费日期: {{info.transactitem[0].paydate}}</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">金额: {{info.transactitem[0].paid}}</view>
					<view class="action">经办人：{{info.transactitem[0].marketer}}</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">付款方式：{{payType}}</view>
				</view>
			</block>
			<view class="cu-bar bg-white margin-top">
				<view class="action">应付金额</view>
				<view class="action">{{info.transactitem[0].money}}</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">实际金额</view>
				<view class="action">{{info.transactitem[0].paid}}</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">欠费金额</view>
				<view class="action">{{info.transactitem[0].money-info.transactitem[0].paid}}</view>
			</view>
		</view>

		<!--底部-->
		<view class="drawer-footer" v-if="type === 1 || type === 2">
			<button class="cu-btn bg-orange lg" style="width: 50%;" @click="deleteInfo">删除</button>
			<button class="cu-btn bg-red lg" style="width: 50%;" v-if="type === 1">续签</button>
			<button class="cu-btn bg-cyan lg" style="width: 50%;" v-if="type === 2">新签</button>
		</view>
		<view class="drawer-footer" v-else>
			<button class="cu-btn bg-gray lg" style="width: 100%;">已作废</button>
		</view>
	</view>
</template>

<script>
	import {
		getorderlist,
		getorderinfo,
		getorderabolish
	} from "../../../../api/principal/order";
	export default {
		name: "detail",
		data() {
			return {
				//  type：1 续签 2 新签 3 作废
				payType: '',
				type: '',
				info: {
					number: '123456789955',
					time: '2020-09-09  08:12:18',
					name: '陈晓彤',
					phone: '13800138000',
					class: [{
							gradeName: '篮球',
							youhui: '0.00',
							money: '100.00',
							timeMoney: 22,
							limit: '无限制'
						},
						{
							gradeName: '篮球',
							youhui: '0.00',
							money: '100.00',
							timeMoney: 22,
							limit: '无限制'
						}
					],
					recordingTime: '2020-09-09  08:12:18',
					recordingMoney: '101.00',
					recordingUser: '谢老师',
					recordingType: '现金',
					yingfuMoney: '101.00',
					shifuMoney: '101.00',
					qianfeiMoney: '0.00'
				}
			}
		},
		onLoad(options) {
			let item = JSON.parse(options.item);
			this.orderid = item.orderid;
			this.type = item.type;
			getorderinfo({
				orderid: item.orderid
			}).then((res) => {
				if (res.data.code === 0) {
					this.info = res.data.data;
					switch (String(this.info.transactitem[0].paymethod)) {
						case '0':
							this.payType = '平台默认支付'
							break;
						case '1':
							this.payType = '现金'
							break;
						case '2':
							this.payType = '网银转账'
							break;
						case '3':
							this.payType = '支付宝'
							break;
						case '4':
							this.payType = '微信'
							break;
						case '5':
							this.payType = 'POS机刷卡'
							break;
						case '6':
							this.payType = '会员卡'
							break;
					}

				}
			})
		},
		methods: {
			deleteInfo() {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
				            getorderabolish({
				            	orderid: this.orderid
				            }).then((res) => {
				            	if (res.data.code === 0) {
				            		uni.showToast({
				            			title: '删除成功',
				            			duration: 1000
				            		});
				            		let timeout = setTimeout(function() {
				            			wx.navigateBack();
				            		}, 1000)
				            	
				            	}
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			}
		}
	}
</script>

<style scoped>

</style>
