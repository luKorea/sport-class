<template>
	<view class=" class-container" style="padding-bottom: 100rpx">
		<view class="margin">
			<!--搜索区域-->
			<view class="cu-bar search bg-white">
				<view class="search-form">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="请输入关键字" v-model="searchInput" />
				</view>
				<view class="action" @click="searchValue">
					<button class="cu-btn shadow-blur text-white bg-red">搜索</button>
				</view>
			</view>
			<!--列表-->
			<block v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index">
					<view class="cu-bar bg-white solid-bottom margin-top" @click="goDetail(item)">
						<view class="action">
							<view class="flex flex-direction padding-top padding-bottom">
								<view class="margin-bottom-sm">
									<text class="text-center margin-right">{{item.title}}</text>
									<text class="text-type" style="padding: 2rpx" v-if="item.type === 0">通</text>
									<text class="text-type" style="padding: 2rpx" v-if="item.type === 1">1v1</text>
									<text class="text-type" style="padding: 2rpx" v-if="item.type === 2">1vN</text>
								</view>
								<view>
									<text class="text-center text-gray text-sm">{{item.cost}}元/课时</text>
								</view>
							</view>
						</view>
						<view class='action' @click.stop="changeVal(item)">
							<button class="cu-btn bg-orange" v-if="item.flags%2===1">开启</button>
							<button class="cu-btn bg-gray" v-else>关闭</button>
						</view>
					</view>
				</view>
			</block>
			<block wx:else>
				<view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
					<view class="title">暂无数据</view>
				</view>
			</block>
		</view>
		<view class="flex flex-direction fixed-bottom" @click="addCharges">
			<button class="cu-btn bg-red add-btn" style="width: 100%;">+添加课程</button>
		</view>
	</view>
</template>

<script>
	import {
		getCourseList,
		getchangeenable
	} from "../../../../api/principal/course";

	export default {
		data() {
			return {

				searchInput: '',
				list: []

			}
		},
		onLoad() {
			// venueid: int 上课点id
			// keywords: string 关键字
			// sid: int 运动项目id
			// type: int 类型：1=1vs1,2=1vsN
			// flags: int course.flags
			// inverseflags: int 反选标记（不包含course.flags）的
			// enable: int 是否启用：1:是，0：否,-1查询全部
			// experience: bool? 是否体验课 true:是，false：否
			this.getListData({
				keywords: this.searchInput,
				venueid: wx.getStorageSync('userData').venueid,
			});
		},
		onShow(){
			this.getListData({
				keywords: this.searchInput,
				venueid: wx.getStorageSync('userData').venueid,
			});
		},
		methods: {
			getListData(params) {
				getCourseList(params)
					.then(res => {
						if (res.data.code === 0) {
							if (res.data.data.list.length > 0) {
								this.list = res.data.data.list;
							}
						}
					})
			},

			searchValue() {
				this.getListData({
					keywords: this.searchInput
				});
			},
			goDetail(res) {
				let data = JSON.stringify(res);
				uni.navigateTo({
					url: `../detail/detail?data=${data}`
				});
			},
			addCharges() {
				uni.navigateTo({
					url: `../addCourse/addCourse`
				});
			},
			changeVal(item) {
				this.list.map((val) => {
					if (val.id === item.id) {
						getchangeenable({
							courseid: item.id, // notnull 课程id
							enable: item.flags%2===1 ? false : true
						}).then((res) => {
							this.getListData({
								keywords: this.searchInput,
								venueid: wx.getStorageSync('userData').venueid,
							});
						})
					}
				})
			}

		}
	}
</script>

<style>
</style>
