<!-- TODO 教师端 上课记录 -->
<template>
	<view class="class-container">
		<!--上课记录-->
		<view class="tabNav">
			<view v-for="(item, index) in navTab" :key="index" @click="setCurrentTab(index)" :class="currentTab === index ? 'cur' : ''">
				<text>{{item}}</text>
			</view>
		</view>
		<!--上课记录-->
		<view id="tab1" class="margin-top-sm" :class="tab1">
			<class-info />
		</view>
		<!--约课记录-->
		<view id="tab2" class="margin-top-sm" :class="tab2">
			<about-info />
		</view>
		<!--缺课记录-->
		<view id="tab3" class="margin-top-sm" :class="tab3">
			<absent-info />
		</view>
		<!--请假申请-->
		<view id="tab4" class="margin-top-sm" :class="tab4">
			<leave-info />
		</view>
	</view>
</template>

<script>
	import classInfo from './components/classInfo';
	import aboutInfo from './components/aboutInfo';
	import absentInfo from './components/absentInfo';
	import leaveInfo from './components/leaveInfo';

	export default {
		components: {
			classInfo,
			absentInfo,
			aboutInfo,
			leaveInfo
		},
		data() {
			return {
				studentId: '',
				navTab: ['上课记录', '约课记录', '缺课记录', '请假申请'],
				currentTab: 0,
				tab1: 'tabshow',
				tab2: 'tabhide',
				tab3: 'tabhide',
				tab4: 'tabhide',
			}
		},
		onLoad(options) {
			let {
				id
			} = options;
			this.studentId = String(id);
			console.log(this.studentId);
		},
		methods: {
			setCurrentTab(index) {
				if (this.currentTab === index) return;
				this.currentTab = index;
				if (index === 0) {
					this.tab1 = 'tabshow';
					this.tab2 = 'tabhide';
					this.tab3 = 'tabhide';
					this.tab4 = 'tabhide';
				} else if (index === 1) {
					this.tab1 = 'tabhide';
					this.tab2 = 'tabshow';
					this.tab3 = 'tabhide';
					this.tab4 = 'tabhide';
				} else if (index === 2) {
					this.tab1 = 'tabhide';
					this.tab2 = 'tabhide';
					this.tab3 = 'tabshow';
					this.tab4 = 'tabhide';
				} else if (index === 3) {
					this.tab1 = 'tabhide';
					this.tab2 = 'tabhide';
					this.tab3 = 'tabhide';
					this.tab4 = 'tabshow';
				}
			},
		},
		onReachBottom() {
			uni.$emit('onReachBottom');
		},
		onShow() {
			uni.$emit('onShow');
		}
	}
</script>

<style>
	.tabNav {
		z-index: 4;
		top: 0;
		left: 0;
		width: 100%;
		height: 102rpx;
		line-height: 102rpx;
		background: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #f5f5f5;
		box-sizing: border-box;
		text-align: center;
	}

	.tabNav>view {
		text-align: center;
	}

	.tabNav>view:last-child {
		margin-right: 0;
	}

	.tabNav>view text {
		height: 90rpx;
		line-height: 90rpx;
		display: inline-block;
	}

	.tabNav .cur text {
		border-bottom: 5rpx solid #F40001;
		color: #F40001;
	}

	.tabshow {
		visibility: visible;
		display: block;
	}

	.tabhide {
		visibility: hidden;
		display: none;
	}
</style>
