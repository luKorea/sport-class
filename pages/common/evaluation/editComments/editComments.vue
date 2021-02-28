<template>
	<view style="padding-bottom: 100rpx">

		<view class="margin">
			<view class="cu-bar" v-for="(item, index) in list" :key="index">
				<view class="action comments-item">{{item.content}}</view>
				<view class="action" @click="removeItem(item.id)">
					<text class="cuIcon-roundclose text-red"></text>
				</view>
			</view>
		</view>

		<view class="drawer-footer">
			<button class="add-btn" @click="addComments">+ 添加</button>
		</view>

		<view class="cu-modal show" v-if="showModal">
			<view class="cu-dialog">
				<view class="cu-bar justify-end solid-bottom">
					<view class="content">添加常用评语</view>
				</view>
				<view class="bg-white border flex justify-center padding">
					<textarea style="border: 1px solid #eee; padding: 4rpx" maxlength="-1" v-model="content" placeholder="不能为空"></textarea>
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="hideModal">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="addItem">
						<button class="cu-btn  bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getRandomNum
	} from "../../../../utils";
	import {
		getCommentaryList,
		addOrEditCommentary,
		removeCommentary
	} from '../../../../api/common/evaluation.js';
	export default {
		name: "editComments",
		data() {
			return {
				showModal: false,
				content: '',
				list: []
			}
		},
		onShow() {
			this.getComment();
		},
		methods: {
			getComment() {
				getCommentaryList()
					.then(res => this.list = res.data.data.list)
					.catch(err => console.log(err))
			},
			hideModal() {
				this.showModal = false;
				this.content = '';
			},
			addItem() {
				addOrEditCommentary({
					id: 0,
					content: this.content
				}).then(res => {
					if (res.data.data.errcode === 200) {
						this.hideModal();
						this.getComment();
					} else {
						failTip(res.data.data.errmsg);
					}
				}).catch(err => console.log(err));
			},
			removeItem(id) {
				removeCommentary(id)
					.then(res => {
						if (res.data.data.errcode === 200) {
							this.hideModal();
							this.getComment();
						} else {
							failTip(res.data.data.errmsg);
						}
					}).catch(err => console.log(err));
			},
			addComments() {
				this.content = '';
				this.showModal = true;
			}
		}
	}
</script>

<style>
	page,
	view {
		background-color: #fff;
	}

	.comments-item {
		width: 80%;
		padding: 16rpx;
		background: #EEEEEE;
		color: #b9b6b6;
		border: 1px solid #dad7d7;
		border-radius: 4rpx;
	}
</style>
