<!-- TODO 校长端 首页 -->
<template>
	<view>
		<view style="padding-bottom: 140rpx">
			<!-- 头部 -->
			<view class="bg-white indexbg flex" :style="{backgroundImage: `url(${imageurl + '/bg.png'})`}">
				<view class="grid col-1 text-center" style="width: 100%;">
					<view class="flex align-center">
						<view class="flex solid-bottom align-center justify-between" style="width: 100%;">

							<view class="left-button flex align-center justify-center" @click="goTeacher">
								切换
								<image :src="imageurl + '/qiehuan.png'"></image>
							</view>

							<view class="cententinfo flex align-center">
								<image :src="imageurl + '/qq.jpg'"></image>
								我是校长
							</view>

							<view class="right-button flex align-center justify-center">
								消息
								<image :src="imageurl + '/xiaoxi.png'"></image>
							</view>

						</view>
					</view>
				</view>
			</view>
			<!-- 头部end -->

			<!--下部区域-->
			<view class="cu-list grid col-4 no-border margin-bottom">
				<view class="cu-item flex justify-center align-center" v-for="(item, index) in iconList" :key="index" @click="goPage(item.url)">
					<view class="cu-avatar sm bg-white" :style="{backgroundImage: `url(${item.img})`}"></view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!--下部区域end-->

			<!--核心数据统计-->
			<view class="cu-bar bg-white margin-top hexin">
				<view class="hexin_top" :style="{backgroundImage: `url(${imageurl+ '/hexin.png'})`}">核心数据统计</view>
				<image class="hexin_more" :src="imageurl + '/gengduo.png'" @click="goCoreData"></image>
			</view>
			<view class="cu-bar bg-white">
				<view class="cu-list grid col-3" style="width: 100%;">
					<view class="cu-item">
						<view>
							<view class="text-red text-bold">34.33%</view>
							<view>班级满班率</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="text-cyan text-bold">34.33%</view>
						<view>学员退费率</view>
					</view>
					<view class="cu-item">
						<view class="text-orange text-bold">34.33%</view>
						<view>续签金额比</view>
					</view>
				</view>
			</view>
			<!--核心数据统计end-->

			<!--本月课时-->
			<view class="cu-bar bg-white margin-top hexin">
				<view class="hexin_top">— 本月课时/课消 —</view>
				<image class="hexin_more" :src="imageurl + '/gengduo.png'" @click="goClassHour"></image>
			</view>
			<view class="cu-bar bg-white keshi">
				<view class="flex p-xs margin-bottom-sm mb-sm border" style="width: 100%;">
					<view class="flex-treble padding-sm margin-xs radius text-red text-bold">{{Zc}}课时</view>
					<view class="flex-twice padding-sm margin-xs radius flex flex-direction text-right">
						<text>{{Kc1}}课时</text>
						<text>{{Kc2}}课时</text>
					</view>
					<view class="flex-twice padding-sm margin-xs radius flex flex-direction text-right">
						<text>一对一</text>
						<text>一对多</text>
					</view>

				</view>
			</view>
			<view class="cu-bar bg-white keshi">
				<view class="flex p-xs margin-bottom-sm mb-sm border" style="width: 100%;">
					<view class="flex-treble padding-sm margin-xs radius text-orange text-bold">￥{{Xc}}</view>
					<view class="flex-twice padding-sm margin-xs radius flex flex-direction text-right">
						<text>{{Xc1}}￥</text>
						<text>{{Xc2}}￥</text>
					</view>
					<view class="flex-twice padding-sm margin-xs radius flex flex-direction text-right">
						<text>一对一</text>
						<text>一对多</text>
					</view>
				</view>
			</view>
			<!--本月课时end-->

			<!--本月出勤率-->
			<view class="cu-bar bg-white margin-top hexin">
				<view class="hexin_top">— 本月出勤率 —</view>
				<image class="hexin_more" :src="imageurl + '/gengduo.png'" @click="goAttendanceRate"></image>
			</view>
			<view class="cu-bar bg-white">
				<view class="action text-red text-bold">{{qCRate}}%</view>
				<view class="action text-sm">缺课人次{{qC1}}人</view>
				<view class="action text-sm">点名次数{{qC2}}次</view>
			</view>
			<view class="cu-bar bg-white solid-bottom padding-bottom justify-center line-charts">
				<canvas canvas-id="canvaLineA" id="canvaLineA" class="line"></canvas>
			</view>
			<!--本月出勤率end-->

		</view>
		<view class="cu-bar tabbar bg-white footer">
			<!--      @click="goItem(item.url)"-->
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
	import uCharts from '../../../components/u-charts/u-charts';
	import {
		getattendance,
		getcoursehourstatistics,
		getteacherhourstatistics,
		getdurationsummary,
		getcostsummary
	} from '../../../api/principal/attendanceRate.js'
	import {
		chooseTime
	} from '../../../utils/chooseTime.js';
	let _self;
	let canvaLineA = null;
	export default {
		data() {
			return {
				qC1: 0,
				qC2: 0,
				qCRate: 0,
				Kc1:0,
				Kc2:0,
				Zc:0,
				Xc1:0,
				Xc2:0,
				Xc:0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				imageurl: '',
				iconList: [{
						img: 'https://yundongke.gzbigbang.cn/laoshi.png',
						url: '../teacher/index/index',
						name: '老师'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/banji.png',
						url: '../class/index/index',
						name: '班级'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/qianbao.png',
						url: '../charges/index/index',
						name: '收费项'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/xueyuan.png',
						url: '/pages/common/students/index/index',
						name: '学员'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/shangkejilu.png',
						url: '/pages/common/classRecord/index/index',
						name: '上课记录'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/huping.png',
						url: '/pages/common/evaluation/index/index',
						name: '师生互评'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/xufei.png',
						url: '../renewal/index/index',
						name: '续费提醒'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/qingdan.png',
						url: '../receipt/index/index',
						name: '收据清单'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/kecheng.png',
						url: '../course/index/index',
						name: '课程'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/kecheng.png',
						url: '/pages/common/schedule/index/index',
						// url: /'',
						name: '课表'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/baoming.png',
						url: '',
						name: '报名'
					},
					{
						img: 'https://yundongke.gzbigbang.cn/kecheng.png',
						url: '',
						name: '课程套餐'
					},
				],
				list: [{
						id: 0,
						url: '',
						img: this.$imageurl + 'select_jiaowu.png',
						name: '教务'
					},
					{
						id: 1,
						url: '/pages/principal/sales/sales',
						img: this.$imageurl + 'xiaoshou.png',
						name: '销售'
					},
					{
						id: 2,
						url: '/pages/principal/mime/mime',
						img: this.$imageurl + 'wode.png',
						name: '我的'
					}
				]
			}
		},
		created() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(300);
			this.imageurl = this.image
		},
		onLoad(options) {
			this.getServerData();
		},
		methods: {
			goItem(url) {
				wx.redirectTo({
					url: url
				})
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					colors: ['#ea9846'],
					fontSize: 8,
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			goPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			goCoreData() {
				wx.navigateTo({
					url: '../coreData/index/index'
				})
			},
			goClassHour() {
				wx.navigateTo({
					url: '../classHour/index/index'
				})
			},
			goAttendanceRate() {
				wx.navigateTo({
					url: '../attendanceRate/index/index'
				})
			},
			goTeacher() {
				wx.redirectTo({
					url: '../../teacher/index/index'
				})
			},
			getMonths() {
				var monthArr = [];
				var data = new Date();
				var year = data.getFullYear();
				data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
				for (var i = 0; i < 6; i++) {
					data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
					var m = data.getMonth() + 1;
					m = m < 10 ? "0" + m : m;
					monthArr.push(`${m}月`);
				}
				return monthArr.reverse();
			},
			getServerData() {
				// 判断时间
				let obj = {
					type: 1,
				}
				obj = chooseTime(obj, '4');
				
				
				
				// 课时课消
				getdurationsummary(obj).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							
							let c1 = 0;
							let c2 = 0;
							res.data.data.list.map((item, index) => {
								if (item.type === 1) {
									c1+=Number(item.c1)
								} else {
									c2+=Number(item.c1)
								}
							})
							this.Kc1 = c1;
							this.Kc2 = c2;
							this.Zc = c1+c2;
						} 
					}
				});
				getcostsummary(obj).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							
							let c1 = 0;
							let c2 = 0;
							res.data.data.list.map((item, index) => {
								if (item.type === 1) {
									c1+=Number(item.c1)
								} else {
									c2+=Number(item.c1)
								}
							})
							this.Xc1 = c1;
							this.Xc2 = c2;
							this.Xc = c1+c2;
						} 
					}
				})
				
				// 出勤
				getattendance(obj).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							let LineA = {
								categories: [],
								series: [{
									name: "出勤率",
									data: []
								}]
							};

							res.data.data.list.map((item, index) => {
								LineA.categories.push(`${item.day}`);
								LineA.series[0].data.push(item.rate)
							})

							// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
							_self.showLineA("canvaLineA", LineA);
						} else {
							let LineA = {
								categories: this.getMonths(),
								series: [{
									name: "出勤率",
									data: [0, 0, 0, 0, 0, 0]
								}]
							};

							// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
							_self.showLineA("canvaLineA", LineA);
						}

					}

				})

				getcoursehourstatistics(obj).then((res) => {
					if (res.data.code === 0) {
						let c1 = 0;
						let c2 = 0;
						let c3 = 0;
						res.data.data.list.map((item, index) => {
							c1 += Number(item.c1);
							c2 += Number(item.c2);
							c3 += Number(item.c3);
						})
						this.qC1 = c1;
						this.qC2 = c2;
						this.qCRate = res.data.data.list.length > 0 ? c1 / c3 * 100 : 0;
					}
				})
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					colors: ['#ea9846'],
					fontSize: 8,
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},

		}
	}
</script>

<style>
	.footer {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		z-index: 99999;
		background-color: #FFFFFF;
	}

	.footer image {
		width: 15rpx;
		height: 15rpx;
	}

	.footertop {
		width: 100%;
		height: 50px;
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

	.keshi text {
		margin-bottom: 10rpx;
	}

	.line-charts {
		width: 100%;
		background-color: #ffffff;
		height: 350rpx;
	}

	.line {
		width: 100%;
		height: 300rpx;
	}
</style>
