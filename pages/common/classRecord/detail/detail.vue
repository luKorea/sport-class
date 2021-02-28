<template>
	<view class=" class-container" style="padding-bottom: 100rpx">
		<view class="margin">
			<view class="cu-bar bg-white">
				<view class='action'>申请人</view>
				<view class='action'>{{result.studentname}}</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class='action text-sm'>请假日期</view>
				<view class='action text-sm'>{{result.btime}} 至 {{result.etime}}</view>
			</view>
			<view class="margin-top">
				<view class="cu-form-group align-start cu-bar bg-white">
					<view class="title">
						<text class="cuIcon-titles text-orange"></text> 请假理由
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action">{{result.reason}}</view>
					<view class='action'>
						<text class="adopt" v-if='result.flags === 3'>通过</text>
						<text class="adopt" v-if='result.flags === 8'>不通过</text>
						<text class="adopt" v-if='result.flags === 2'>待处理</text>
						<text class="adopt" v-if='result.flags === 6'>已撤销</text>
					</view>
				</view>
			</view>
			<view class="margin-top">
				<view class="cu-form-group align-start cu-bar bg-white">
					<view class="title">
						<text class="cuIcon-titles text-red"></text> 处理说明
					</view>
				</view>
				<view class="cu-form-group align-start cu-bar bg-white padding-top">
					<textarea maxlength="-1" v-model="result.remark" placeholder="请填写跟进内容，200字以内"></textarea>
				</view>
				<view class="cu-form-group cu-bar bg-white">
					<checkbox-group @change="selectClassTime">
						<label class="check-text">
							<checkbox class="check-box" :value="result.select" />扣课时</label>
					</checkbox-group>
				</view>
			</view>

			<view class="margin-top">
				<view class="cu-bar solid-bottom">
					<view class="action">请假课程</view>
				</view>
				<blcok v-if="result.list.length > 0">
					<view v-for="(item, index) in result.list" :key="index">
						<view class="cu-bar bg-white justify-center solid-bottom solid-top">
							<view class="action">{{item.date}}</view>
						</view>
						<view class="cu-bar bg-white" v-for="(child, i) in item.info" :key="i">
							<view class="action">
								<text class="ban-reds">班</text>
								<text>{{child.message}}</text>
							</view>
							<view class="action">{{child.time}}</view>
						</view>
					</view>
				</blcok>
				<block v-else>
					<view class="cu-form-group cu-bar bg-white flex justify-center align-center">
						<view class="title">暂无数据</view>
					</view>
				</block>
			</view>

		</view>
		<view class="drawer-footer" v-if="result.flags === 2">
			<button class="cu-btn bg-orange lg" style="width: 50%;" @click="sendFlags(8)">不通过</button>
			<button class="cu-btn bg-red lg" style="width: 50%;" @click="sendFlags(3)">通过</button>
		</view>
	</view>
</template>

<script>
	import {
		formatTime
	} from "../../../../utils";
	import {failTip} from '../../../../utils/tip.js';
	import {
		getLeaveDetail,
		getStudentLesson,
		setFlags,
	} from '../../../../api/common/classRecord.js';
	export default {
		data() {
			return {
				result: {},
			}
		},
		onLoad(options) {
			let {
				id,
				studentid
			} = options;
			this.getDetail(id);
			this.getSutdentList(studentid);
		},
		methods: {
			// 获取详情
			getDetail(id) {
				getLeaveDetail(id)
					.then(res => {
						this.result = res.data.data.info;
					}).catch(err => console.log(err))
			},
			//  获取学员上课记录
			getSutdentList(id) {
				getStudentLesson(id)
				.then(res => {
					console.log(res)
				}).catch(err => console.log(err));
			},
			sendFlags(flags) {
				setFlags({
					askforleaveid: this.result.askforleaveid,
					remark: this.result.remark,
					flags: flags
				}).then(res => {
					if (res.data.data.errcode === 200) {
						wx.navigateBack();
					} else {
						failTip(res.data.data.errmsg);
					}
				}).catch(err => console.log(err));
			},
			selectClassTime(e) {
				console.log(this.result.select);
			}
		}
	}
</script>

<style scoped>
	.ban-reds {
		color: #ffffff;
		font-size: 20rpx;
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 8rpx;
		text-align: center;
		border-radius: 5rpx;
		margin-right: 10rpx;
		background: #F4313E;
	}
</style>
