<!-- TODO 老师端 学员 报名记录 -->
<template>
	<view class="margin recording-container">
		<block v-if="list.length > 0">
			<view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id">
				<view class="action flex-direction flex-due">
					<view style="margin: 20rpx 0" class="text-sm">
						<text class="ke-orange">课</text>
						<text>{{item.title}}</text>
					</view>
					<view class="text-sm">订单号: {{item.number}}</view>
					<view style="margin: 20rpx 0" class="text-sm">按课时: {{item.lessonnum}}课时</view>
				</view>
				<view class="action flex-direction flex-due">
					<view style="margin: 20rpx 0" class="text-sm">课程总额: {{item.price}} 元</view>
					<view class="text-sm">报名时间: {{item.datetime | FormatDate}}</view>
					<view style="margin: 20rpx 0" class="text-sm" v-if="item.endtime === '9999-12-31 00:00:00'">
						到期日期: 无限制
					</view>
					<view style="margin: 20rpx 0" class="text-sm" v-else>
						到期日期: {{item.endtime | FormatDate}}
					</view>
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
		getStudentsRecording
	} from '../../../../../api/common/students.js';
	export default {
		props: {
			studentId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
				params: {
					pi: 1,
					ps: 1000
				}
			}
		},
		mounted() {
			this.getData({
				...this.params,
				id: this.studentId
			});
		},
		methods: {
			getData(params) {
				getStudentsRecording(params)
					.then(res => {
						this.list = res.data.data.list;
					}).catch(err => console.log(err))
			}
		}
	}
</script>

<style scoped>
	.flex-due {
		justify-content: start;
		align-items: start;
	}
</style>
