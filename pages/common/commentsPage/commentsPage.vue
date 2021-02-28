<template>
	<view class="margin comment-page-container">
		<view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">班级名称</view>
				<view class="action">{{ info.classname }}</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">课程名称</view>
				<view class="action">{{ info.coursename }}</view>
			</view>
		</view>
		<view class="margin-top">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">上课时间</view>
				<view class="action">{{ info.datetime }} {{info.btime}}~{{info.etime}}</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">授课课时</view>
				<view class="action text-red">{{ info.duration }}课时</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="margin-right">点名情况</text>
					<text>{{info.signupnum}}/{{info.stucount}} 人</text>
				</view>
				<view class="action">
					<text class="margin-right">约课情况</text>
					<text>{{info.reservenum}}/{{info.amount}} 人</text>
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">上课老师</view>
				<view class="action text-red">{{ info.teachername }}</view>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top solid-bottom text-center">
			<view class="action text-center">姓名</view>
			<view class="action text-center">剩余课时</view>
			<view class="action text-center">到课状态</view>
			<view class="action text-center">操作</view>
		</view>
		<block v-if="list.length > 0">
			<view class="cu-bar bg-white solid-bottom text-center" v-for="(item, index) in list" :key="index">
				<view class="action">{{ item.name }}</view>
				<view class="action">剩余{{ item.duration }}课时</view>
				<view class="action">
					<picker @change="bindStatusChange($event, status)" 
					:value="statusIndex" :range="status" range-key="text">
					  <view class="picker">{{status[statusIndex].text}}</view>
					</picker>
					<!-- <text class="white-text" v-if="item.status === 1">
						未点名
					</text> -->
				</view>
				<view class="action" v-if="item.opt === 1">
					<text class="orange-text" v-if="item.opt === 1">未点评
					</text>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="cu-form-group cu-bar bg-white flex justify-center align-center">
				<view class="title">暂无数据</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		getClassDetail
	} from '../../../api/common/classRecord.js';
	export default {
		name: "commentsPage",
		data() {
			return {
				info: {},
				list: [],
				statusIndex: 0,
				status: [{
						id: 0,
						text: '到课'
					},
					{
						id: 1,
						text: '未到'
					},
					{
						id: 2,
						text: '请假'
					},
					{
						id: 3,
						text: '未点名'
					},
					{
						id: 4,
						text: '迟到'
					},
				]
			}
		},
		onLoad(options) {
			let {
				data
			} = options,
			res = JSON.parse(data);
			this.info = res;
			this.getData(res.lessontaskid);
		},
		methods: {
			getData(id) {
				getClassDetail(id)
					.then(res => {
						this.list = res.data.data.lessonstudent;
					}).catch(err => console.log(err))
			},
			bindStatusChange(e, data) {
				const {value} = e.detail;
				this.statusIndex = value;
			}
		}
	}
</script>

<style scoped>

</style>
