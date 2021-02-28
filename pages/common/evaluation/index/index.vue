<template>
	<view class="teacher-students-container">
		<view class="margin" style="margin-bottom: 140rpx">
			<!--搜索区域-->
			<view class="cu-bar search bg-white">
				<view class="search-form">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="请输入姓名或手机号" v-model="params.keywords" />
				</view>
				<view class="action" @click="getData(params)">
					<button class="cu-btn shadow-blur text-white bg-red">搜索</button>
				</view>
			</view>
			<!--筛选-->
			<view class="cu-bar search bg-white margin-top">
				<view class="action">
					<picker mode="date" @change="bindStartDateChange" :value="startDate" :start="startDateFormat" :end="endDateFormat">
						<view class="picker">{{startDate}}</view>
					</picker>
				</view>
				<view class="action">至</view>
				<view class="action">
					<picker mode="date" @change="bindEndDateChange" :value="endDate" :start="endStartDateFormat" :end="endEndDateFormat">
						<view class="picker">{{endDate}}</view>
					</picker>
				</view>
				<view class="action" @click="showDrawer">
					<button class="cu-btn shadow-blur text-white bg-orange">筛选</button>
				</view>
			</view>
			<!--筛选侧边栏-->
			<uni-drawer ref='drawer' mode="right">
				<!--头部-->
				<view class="solids-bottom flex align-center justify-center">
					<view class="padding">筛选</view>
				</view>
				<!--内容区域-->
				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择课程</view>
					<picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="title">
						<view class="picker">{{gradeArray[gradeIndex].title}}</view>
					</picker>
				</view>
				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择老师</view>
					<picker @change="bindTeacherChange($event, teacherArray)" :value="teacherIndex" :range="teacherArray" range-key="name">
						<view class="picker">{{teacherArray[teacherIndex].name}}</view>
					</picker>
				</view>

				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择班级</view>
					<picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="name">
						<view class="picker">{{classArray[classIndex].name}}</view>
					</picker>
				</view>
				<!--底部区域-->
				<view class="drawer-footer">
					<button class="bg-gray lg cu-btn" style="width: 50%;" @click="closeDrawer">关闭</button>
					<button class="bg-my-red lg cu-btn" style="width: 50%;" @click="searchData">确定</button>
				</view>
			</uni-drawer>
			<!--列表-->
			<block v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index" @click="goDetail(item)">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-gray text-sm"></text>{{item.bt}}
						</view>
						<view class="action">
							<text class="margin-right">{{item.classname}}</text>
							<text class="text-type">{{item.coursetype === 1 ? '1v1' : '1vN'}}</text>
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="ke-orange">学</text>
							<text>{{item.studentname}}</text>
						</view>
						<view class="action text-read" v-if="(item.flags&32)>0">已评价</view>
						<view class="action text-ping" v-if="(item.flags&32)<=0">未评价</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="ban-red">师</text>
							<text>{{item.teachers}}</text>
						</view>
						<view class="action text-read" v-if="(item.flags&16)>0">已点评</view>
						<view class="action text-ping" v-if="(item.flags&16)<=0">未点评</view>
					</view>
				</view>
			</block>
			<block wx:else>
				<view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
					<view class="title">暂无数据</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import uniDrawer from '../../../../components/uni-drawer/uni-drawer';
	import {
		getDate
	} from "../../../../utils";
	import {
		getEvaluationList
	} from '../../../../api/common/evaluation.js';
	import {
		getCourseSelect,
		getTeacherSelect,
		getClassSelect
	} from '../../../../api/select.js';
	export default {
		components: {
			uniDrawer
		},
		data() {
			const currentStartDate = getDate({
				format: true
			})
			const currentEndDate = getDate({
				format: true
			})
			return {
				startDate: currentStartDate,
				endDate: currentEndDate,
				list: [],
				// 选择班级
				classIndex: 0,
				classArray: [{
					id: '',
					name: '所有班级'
				}],
				// 选择课程
				gradeIndex: 0,
				gradeArray: [{
					id: '',
					title: '所有课程'
				}],
				// 选择老师
				teacherIndex: 0,
				teacherArray: [{
					id: '',
					name: '所有老师'
				}],
				form: {},
				params: {
					pi: 1,
					ps: 20
				},
				total: 0
			}
		},
		computed: {
			startDateFormat() {
				return getDate('start')
			},
			endDateFormat() {
				return getDate('end');
			},
			endStartDateFormat() {
				return getDate('start')
			},
			endEndDateFormat() {
				return getDate('end');
			},
		},
		onShow() {
			this.getData({
				...this.params,
				vid: wx.getStorageSync('venueid')
			});
			this.getClass();
			this.getGrade();
			this.getTeacher();
		},
		methods: {
			getData(params) {
				getEvaluationList(params)
					.then(res => {
						this.total = res.data.data.page.total;
						this.list = res.data.data.list;
					}).catch(err => console.log(err))
			},
			// 筛选区域
			// 开始时间
			bindStartDateChange(e) {
				this.startDate = e.target.value;
				this.params.btime = e.target.value;
			},
			// 结束时间
			bindEndDateChange(e) {
				this.endDate = e.target.value;
				this.params.etime = e.target.value;
				this.getData(this.params);
			},
			// 选择班级
			getClass() {
				getClassSelect()
					.then(res => {
						this.classArray = this.classArray.concat(res.data.data.list);
					})
			},
			bindClassChange(e, data) {
				const {
					value
				} = e.detail;
				this.classIndex = value;
				this.params.classid = data[this.classIndex].id;
			},
			// 筛选区域
			getGrade() {
				getCourseSelect()
					.then(res => {
						this.gradeArray = this.gradeArray.concat(res.data.data);
					})
			},
			bindGradeChange(e, data) {
				const {
					value
				} = e.detail;
				this.gradeIndex = value;
				this.params.courseid = data[this.gradeIndex].id;
			},

			getTeacher() {
				getTeacherSelect()
					.then(res => {
						this.teacherArray = this.teacherArray.concat(res.data.data);
					})
			},

			bindTeacherChange(e, data) {
				const {
					value
				} = e.detail;
				this.teacherIndex = value;
				this.params.teacherid = data[this.teacherIndex].id;
			},
			// 筛选
			searchData() {
				this.params['ps'] = 20;
				this.getData(this.params);
				this.closeDrawer();
			},
			showDrawer() {
				this.$refs['drawer'].open();
			},
			closeDrawer() {
				this.$refs['drawer'].close();
			},
			goDetail(data) {
				let res = JSON.stringify(data);
				if((data.flags&32)>0 || (data.flags&16)>0) {
					wx.navigateTo({
						url: `../commentDetail/commentDetail?data=${res}`
					})
				} else {
					wx.navigateTo({
						url: `../detail/detail?data=${res}`
					})
				}
			}
		},
		onReachBottom(e) {
			if (this.params.ps > this.total) {
				uni.showToast({
					icon: 'none',
					title: '已经没有更多数据啦'
				})
				return;
			} else {
				this.getData({
					...this.params,
					ps: this.params.ps += 20
				})
			}
		}
	}
</script>

<style scoped>
	.text-ping {
		background: #EEEEEE;
		border-radius: 5px;
		padding: 10rpx;
		font-size: 24rpx;
	}
	.text-read {
		background: #4CA2FF;
		color: #fff;
		border-radius: 5px;
		padding: 10rpx;
		font-size: 24rpx;
	}
</style>
