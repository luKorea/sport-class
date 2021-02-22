<template>
	<view class="margin">
		<!--课时概况-->
		<view class="cu-bar margin-top bg-white justify-center">
			<view class="action">课时概况 单位:课时</view>
		</view>
		<view class="cu-bar bg-white justify-center padding-bottom line-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="line"></canvas>
		</view>

		<view class="cu-bar bg-white margin-top solid-bottom">
			<view class="action text-bold" @click="showTitle">
				<text :class="showRedTitle ? 'text-red' : ''" class="margin-right">按老师分析</text>
				<text :class="showRedTitle ? '' : 'text-red'">按课程</text>
			</view>
			<view class="action">
				<picker @change="bindDateChange($event, dateArray)" :value="dateIndex" :range="dateArray" range-key="name">
					<view class="picker">{{dateArray[dateIndex].name}}</view>
				</picker>
				<text class="cuIcon-triangledownfill"></text>
			</view>
		</view>
		<view class="cu-bar bg-white justify-center flex-direction arcbar-charts">
			<canvas canvas-id="canvaArcbar" id="canvaArcbar" class="charts"></canvas>
			<text>{{showRedTitle ? '谢老师' : '篮球'}}</text>
			<text>￥ 7.00</text>
		</view>
	</view>
</template>

<script>
	import {
		getdurationsummary,
		getdurationbycourse,
		getdurationbyteacher,
		getlessonduration
	} from '../../../../../api/principal/attendanceRate.js'
	import uCharts from '../../../../../components/u-charts/u-charts.js';
	import {
		chooseTime
	} from '../../../../../utils/chooseTime.js';
	let _self;
	let canvaLineA = null;
	let canvaArcbar = null;
	export default {
		name: "refunds",
		data() {
			return {
				showRedTitle: true,
				dateIndex: 0,
				dateArray: [{
						id: 1,
						name: '本月'
					},
					{
						id: 2,
						name: '本周'
					},
					{
						id: 3,
						name: '上月'
					},
					{
						id: 4,
						name: '上周'
					},
					{
						id: 5,
						name: '半年'
					},
					{
						id: 6,
						name: '一年'
					},
				],
				// 线形图
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				//圆弧进度图
				arcWidth: '',
				arcHeight: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				list: [{
						id: 1,
						gradeName: '篮球',
						total: 300,
						number: 11,
						rate: 11.19
					},
					{
						id: 2,
						gradeName: '足球',
						total: 300,
						number: 11,
						rate: 11.19
					},
					{
						id: 3,
						gradeName: '测试测试',
						total: 300,
						number: 11,
						rate: 11.19
					},
					{
						id: 4,
						gradeName: '武术',
						total: 300,
						number: 11,
						rate: 11.19
					}
				]
			}
		},
		created() {
			_self = this;
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(300);
			this.arcWidth = uni.upx2px(250); //这里要与样式的宽高对应
			this.arcHeight = uni.upx2px(300); //这里要与样式的宽高对应
			this.arcbarWidth = uni.upx2px(10);
			this.getServerData();
			this.getArcbarData(this.dateIndex);
		},
		methods: {
			showTitle() {
				console.log(11);
				this.showRedTitle = !this.showRedTitle;
				console.log(this.showRedTitle);
				this.getArcbarData(this.dateIndex)
			},
			bindDateChange(e, data) {
				const {
					value
				} = e.detail;
				this.dateIndex = value;
				// this.form.grade = data[this.gradeIndex].id;
				this.getData((res) => {
					if (res.data.code === 0) {
						let arcbar = {
							series: []
						};
						let data = {
							series: [{
								name: "",
								data: 1,
								color: "#ea9846"
							}]
						}
						// res.data.data.list
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						arcbar.series = data.series;
						_self.textarea = JSON.stringify(data);
						_self.showArcbar("canvaArcbar", arcbar);
					}
				}, value)
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
					monthArr.push(`${year}${m}`);
				}
				return monthArr.reverse();
			},
			// 线形图
			getServerData() {
				let obj = {
					type: 1,
				}
				obj = chooseTime(obj, '4');

				getdurationsummary(obj).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							
							let LineA = {
								categories: [],
								series: [{
										name: "一对一",
										data: []
									},
									{
										name: "一对多",
										data: []
									}
								]
							};
							res.data.data.list.map((item, index) => {
								LineA.categories.push(`${item.day}`);
								if (item.type === 1) {
									LineA.series[0].data.push(item.c1)
								} else {
									LineA.series[1].data.push(item.c1)
								}
							})
							LineA.categories = [...new Set(LineA.categories)]
							_self.showLineA("canvasLineA", LineA);
						} else {
							let LineA = {
								categories: this.getMonths(),
								series: [{
										name: "一对一",
										data: [0, 0, 0, 0, 0, 0]
									},
									{
										name: "一对多",
										data: [0, 0, 0, 0, 0, 0]
									}
								]
							};
							LineA.categories = [...new Set(LineA.categories)]
							_self.showLineA("canvasLineA", LineA);
						}


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
			// 圆弧图
			getArcbarData(dateIndex) {
				this.getData((res) => {
					if (res.data.code === 0) {
						let arcbar = {
							series: []
						};
						let data = {
							series: [{
								name: "",
								data: 1,
								color: "#ea9846"
							}]
						}
						// res.data.data.list
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						arcbar.series = data.series;
						_self.textarea = JSON.stringify(data);
						_self.showArcbar("canvaArcbar", arcbar);
					}
				}, dateIndex)
			},
			showArcbar(canvasId, chartData) {
				canvaArcbar = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: '#fff',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.arcWidth * _self.pixelRatio,
					height: _self.arcHeight * _self.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%',
						color: chartData.series[0].color,
						fontSize: 25 * _self.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio
					},
					extra: {
						arcbar: {
							type: 'circle',
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						}
					}
				});

			},
			getData(call, time) {
				let obj = {
					type: 2
				}
				obj = chooseTime(obj, time);
				if (this.showRedTitle) {
					getdurationbyteacher(obj).then((res) => {
						console.log(res)
						call && call(res);
					})
				} else {
					getdurationbycourse(obj).then((res) => {
						console.log(res);
						call && call(res);
					})
				}
			}
		}
	}
</script>

<style scoped>
	.arcbar-charts,
	.line-charts {
		width: 100%;
		height: 350rpx;
	}

	.line {
		width: 100%;
		height: 300rpx;
	}

	.charts {
		width: 250rpx;
		height: 300rpx;
	}
</style>
