<template>
	<view class="margin">
		<!--学员出勤率-->
		<view class="cu-bar margin-top bg-white justify-center">
			<view class="action">学员出勤率 单位:%</view>
		</view>
		<view class="cu-bar bg-white justify-center padding-bottom line-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="line"></canvas>
		</view>

		<view class="cu-bar bg-white margin-top">
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


		<!--课程续签率明细-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">{{showRedTitle ? '老师名称' : '课程名称'}}</view>
			<view class="action">点名次数</view>
			<view class="action">出勤率</view>
		</view>
		<block v-if="list.length > 0">
			<view v-for="(item, index) in list" :key="index" class="cu-bar bg-white">
				<view class="action" style="width: 124rpx">{{ item.name }}</view>
				<view class="action text-center">{{ item.number }} 次
				</view>
				<view class="action text-center">{{ (item.c1/item.c3)*100 }}%</view>
			</view>
		</block>
		<block wx:else>
			<view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
				<view class="title">暂无数据</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		getattendance,
		getcoursehourstatistics,
		getteacherhourstatistics,
	} from '../../../../../api/principal/attendanceRate.js'
	import uCharts from '../../../../../components/u-charts/u-charts.js';
	import {
		chooseTime
	} from '../../../../../utils/chooseTime.js';
	let _self;
	let canvaLineA = null;
	export default {
		name: "refunds",
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
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
				list: [
					// 	{
					// 	"id": 1877, //课程id
					// 	"name": "火星攀岩", //课程标题
					// 	"c1": 1, //总点名次数
					// 	"c2": 0, //总缺课人次
					// 	"c3": 1 //应到总人次
					// },
				]
			}
		},
		created() {
			_self = this;
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(300);
			this.getServerData();
			this.getList(this.dateIndex);
		},
		methods: {
			showTitle() {
				console.log(11);
				this.showRedTitle = !this.showRedTitle;
				console.log(this.showRedTitle);
				this.getList(this.dateIndex)
			},
			bindDateChange(e, data) {
				const {
					value
				} = e.detail;
				this.dateIndex = value;
				// this.form.grade = data[this.gradeIndex].id;

				this.getData((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							this.list = res.data.data.list;

						} else {
							this.list = []
						}
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
					monthArr.push(parseInt(m));
				}
				return monthArr.reverse();
			},
			getServerData() {
				// 判断时间
				let obj = {
					type: 1,
				}
				obj = chooseTime(obj, '4');
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
							_self.showLineA("canvasLineA", LineA);
						} else {
							let LineA = {
								categories: this.getMonths(),
								series: [{
									name: "出勤率",
									data: [0, 0, 0, 0, 0, 0]
								}]
							};

							// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
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
			getList(dateIndex) {
				this.getData((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							this.list = res.data.data.list;

						} else {
							this.list = []
						}
					}
				},dateIndex)
			},
			getData(call, time) {
				// 判断时间
				let obj = {
					type: 2
				}
				obj = chooseTime(obj, time);
				if (this.showRedTitle) {
					getteacherhourstatistics(obj).then((res) => {
						console.log(res)
						call && call(res);
					})
				} else {
					getcoursehourstatistics(obj).then((res) => {
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
