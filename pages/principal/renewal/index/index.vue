<!-- TODO 校长端 续费提醒 -->
<template>
	<view class="teacher-students-container">
		<view class="margin" style="margin-bottom: 140rpx">
			<!--搜索区域-->
			<view class="cu-bar search bg-white">
				<view class="search-form">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="请输入姓名或手机号" v-model="searchInput" />
				</view>
				<view class="action" @click="searchValue">
					<button class="cu-btn shadow-blur text-white bg-red">搜索</button>
				</view>
			</view>
			
			<!--列表-->
			<block v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<view class="flex flex-direction padding-top-sm padding-bottom-sm">
								<view class="margin-bottom-sm">
									<text class="margin-right-sm">{{item.name}}</text>
									<text class="margin-right-sm">
										<text v-if="item.gender === 1" class="cuIcon-male text-blue"></text>
										<text v-else class="cuIcon-female text-pink"></text>
									</text>
								</view>
								<view class="text-gray text-sm">
									<text class="margin-right">{{item.title}}</text>
									<text v-if="item.lessonnum > 0">剩余 <text class="text-red">{{item.lessonnum}}</text> 课时</text>
									<text v-else>无可用课时</text>
								</view>
							</view>
						</view>
						<view class='action' @click="setOption(item,index)">
							<button class="cu-btn bg-orange">操作</button>
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
		<view class="flex flex-direction fixed-bottom" @click="settingRenewal">
			<button class="add-btn">设置预警</button>
		</view>


		<!--显示操作-->
		<view class="cu-modal show" v-if="showOptModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-red justify-end">
					<view class="content">选择操作</view>
				</view>
				<view class="padding-xl solid-bottom bg-white">
					<view>
						<button class="cu-btn xl bg-orange margin-bottom" style="width: 100%" @click="goApplication">续费报名</button>
						<button class="cu-btn xl bg-white b margin-bottom" style="width: 100%">发通知</button>
						<button class="cu-btn xl bg-white b" style="width: 100%" @click="callFn">拨打：{{concact}}</button>
					</view>
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="showOptModal = false">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="successOpt">
						<button class="cu-btn bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!--设置预警弹框-->
		<view class="cu-modal show" v-if="showSetting">
			<view class="cu-dialog">
				<view class="cu-bar bg-red justify-end">
					<view class="content">设置预警值</view>
				</view>
				<view class="padding-xl solid-bottom bg-white">
					<view class="margin-bottom flex justify-center align-center">
						<text class="margin-right">剩余课时小于</text>
						<uni-number step="0.5" @change="setClassTime"></uni-number>
						<text>课时</text>
					</view>
					<view class="margin-bottom flex justify-center align-center">
						<text class="margin-right">剩余时间小于</text>
						<uni-number step="0.5" @change="setTime"></uni-number>
						<text class="margin-left">天</text>
					</view>
					<view class="text-center text-gray text-sm">"剩余时间"包括按月课程和设置有效 的课程到期时间</view>
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="showSetting = false">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="successModal">
						<button class="cu-btn  bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumber from '../../../../components/uni-number-box/uni-number-box';
	import {
		getpaylist,
		getcommoditylist,//收费项
		getcoursepacklist//套餐
	} from "../../../../api/principal/renewal";
	import {
		getcoursebaselist//课程列表
	} from "../../../../api/principal/course";
	
	export default {
		components: {
			uniNumber
		},
		data() {
			return {
				searchInput: '',
				showOptModal: false,
				showSetting: false,
				list: [],
				userId: '',
				concact:''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			searchValue() {
				console.log(this.searchInput);
			},
			// 显示操作
			setOption(info,index) {
				// this.userId = id;
				this.info = info
				this.concact = this.list[index].concact
				this.showOptModal = true;
				
				
			},
			successOpt() {
				// console.log(this.userId);
				this.showOptModal = false;
			},
			goApplication() {
				wx.navigateTo({
					url: `../application/application?info=${JSON.stringify(this.info)}`
				})
			},
			// 显示设置预警
			settingRenewal() {
				this.showSetting = true;
			},
			setClassTime(e) {
				console.log(e);
			},
			setTime(e) {
				console.log(e);
			},
			successModal() {
				this.showSetting = false;
				console.log(1);
			},
			getList() {
				let param = {
					keywords: this.searchInput, //string 关键字
					num: '', //double 课时剩余
					day: '', //double 天数剩余
					coursetype: '', //int 课程类型 1=1vs1,2=1vsN
					courseid: '', //int 课程id
					coursepackid: '', //int 课程包id
					teacherid: '', //int 老师id
					classid: '', //int 班级id
					tags: '', //string 学员标签
					classtags: '', //string 班级标签
					item: '', //bool? 其他项
					paging: false, //bool
					flags: '', //int 筛选标记,1=在读学员,2=潜在学员,4=历史学员,8=有课时剩余,16=课时耗尽,32=分配班级,64=未分配班级,128=绑定微信,512=未绑定微信,1024=无可用课时,2048=已分配班级 ,4096=未分配班级
					pi: '', //int notnull
					ps: '', //int notnull
				}
				getpaylist(param).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							this.list = res.data.data.list
						}
					}
				});
				
				
			},
			callFn(){
				wx.makePhoneCall({phoneNumber: this.info.contact})
			}
		}
	}
</script>

<style scoped>
	.teacher-students-container .add-btn {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #F4313E;
		color: #fff;
		font-family: Source Han Sans CN;
		font-weight: 400;
		border: none;
		border-radius: 0;
	}
</style>
