<!--TODO 请假申请 -->
<template>
	<view class="margin leave-container">
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
		<view class="content">
			<block v-if="list.length > 0">
				<view class="cu-bar bg-white margin-top" v-for="(item, index) in list" :key="index" 
				@click="goDetail(item.id, item.studentid)">
					<view class="action flex-direction flex-due">
						<view style="margin: 20rpx 0">{{item.name}}的请假</view>
						<view class="text-sm">请假时间：{{item.btime | FormatDate}} 至 {{item.etime | FormatDate}}</view>
						<view style="margin: 20rpx 0" class="text-sm">申请时间：{{item.datetime}}</view>
					</view>
					<view class="action">
						<text class="bg-black my-padding" v-if="item.flags == 2">待处理</text>
						<text class="bg-orange my-padding" v-if="item.flags == 3">已通过</text>
						<text class="bg-orange my-padding" v-if="item.flags == 19">已通过</text>
						<text class="bg-black my-padding" v-if="item.flags == 6">已撤销</text>
						<text class="bg-gray my-padding" v-if="item.flags == 8">不通过</text>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="cu-form-group cu-bar bg-white flex justify-center align-center">
					<view class="title">暂无数据</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		getLeaveList
	} from '../../../../../api/common/classRecord.js';
	export default {
		data() {
			return {
				params: {
					pi: 1,
					ps: 20
				},
				total: null,
				list: []
			}
		},
		mounted() {
			let that = this;
			that.getData(that.params);
			uni.$on('onShow', (e) => {
				that.params['ps'] = 20;
				that.getData(that.params)
			})
			uni.$on('onReachBottom', function(data) {
				if (that.params.ps > that.total) {
					uni.showToast({
						icon: 'none',
						title: '已经没有更多数据啦'
					})
					return;
				} else {
					that.getData({
						...that.params,
						ps: that.params.ps += 20
					})
				}
			});
		},
		methods: {
			getData(params) {
				getLeaveList(params)
					.then(res => {
						this.total = res.data.data.page.total;
						this.list = res.data.data.list;
					})
					.catch(err => console.log(err));
			},
			goDetail(id, studentid) {
				wx.navigateTo({
					url: `../detail/detail?id=${id}&studentid=${studentid}`
				})
			},
		}
	}
</script>

<style scoped>
	.flex-due {
		justify-content: start;
		align-items: start;
	}

	.my-padding {
		padding: 8rpx 10rpx;
		border-radius: 8rpx;
		color: #fff;
	}
</style>
