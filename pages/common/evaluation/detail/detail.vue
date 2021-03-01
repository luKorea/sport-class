<template>
	<view style="padding-bottom: 120rpx;">
		<view class="margin">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="margin-right">{{info.classname}}</text>
					<text class="text-type">{{info.coursetype === 1 ? '1v1' : '1vN'}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-peoplefill"></text>
					<text class="margin-right">{{info.studentname}}</text>
					<view v-if="info.award !== ''">
						<text class="text-red">{{info.award}}朵</text>
						<text class="cuIcon-evaluate_fill text-red"></text>
					</view>
				</view>
				<view class="action" @click="showModals">赠送小红花 ></view>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" v-model="info.content" placeholder="请输入评价内容"></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">图片上传</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in images" :key="index">
						<image :src='imgUrl + item' mode='aspectFill'></image>
						<view class="cu-tag bg-red" @click="delImg(index)">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @click="chooseImage">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>

			<view class="cu-bar bg-white margin-top">
				<view class="action">评语标签</view>
				<view class="action" @click="goEditPage">
					<text class="text-type" style="padding: 4rpx 8rpx">
						{{labelList.length > 0 ? '编辑' : '新增'}}
					</text>
				</view>
			</view>
			<view class="cu-bar bg-white" style="flex-wrap: wrap;" v-if="labelList.length > 0">
				<view class="action" v-for="item in labelList" :key="item.id">
					<text class="text-sm bg-gray item" @click="pushToContent(item.content)">{{item.content}}</text>
				</view>
			</view>
		</view>

		<view class="drawer-footer">
			<button class="add-btn" @click="saveData">提交</button>
		</view>

		<!--赠送小红花-->
		<view class="cu-modal show" v-if="showModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-red justify-end">
					<view class="content">赠送小红花</view>
				</view>
				<view class="padding-xl solid-bottom bg-white">
					<view class="margin-bottom flex justify-center align-center">
						<text class="margin-right">小红花: </text>
						<uni-number step="1" @change="setFlower"></uni-number>
					</view>
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="hideModal">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="sendFlower">
						<button class="cu-btn bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumber from '../../../../components/uni-number-box/uni-number-box';
	import {
		getEvaluationDetail,
		getCommentaryList,
		sendAward,
		teacherComment
	} from '../../../../api/common/evaluation.js';
	import {
		failTip
	} from '../../../../utils/tip.js';
	export default {
		name: "detail",
		components: {
			uniNumber
		},
		data() {
			return {
				id: null,
				imgUrl: this.$uploadUrl,
				showModal: false,
				info: {},
				images: [],
				// 送花
				appendaward: null,
				labelList: []
			}
		},
		onLoad(options) {
			let {
				data
			} = options;
			let res = JSON.parse(data);
			console.log(res);
			this.info = res;
			this.id = res.lessonrecordofstudentid;
			this.info['content'] = '';
			this.getDetailData(this.id);
		},
		onShow() {
			this.getComment();
		},
		methods: {
			getDetailData(id) {
				getEvaluationDetail(id)
					.then(res => this.info['award'] = res.data.data.info.award)
					.catch(err => console.log(err))
			},
			// 获取评语列表
			getComment() {
				getCommentaryList()
					.then(res => this.labelList = res.data.data.list)
					.catch(err => console.log(err))
			},
			// 点击评语追加到输入框
			pushToContent(content) {
				this.info['content'] += `${content},`;
			},
			chooseImage() {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						wx.uploadFile({
							url: that.$upload + '/d/m/file/upload?type=22',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: res.tempFilePaths,
							header: {
								'Content-Type': 'multipart/form-data'
							},
							success(res) {
								let data = JSON.parse(res.data);
								console.log(data, that.images);
								if (that.images !== 0) {
									that.images = that.images.concat(data.data.path + data.data.name);
								} else {
									that.images = [data.data.path + data.data.name];
								}
							}
						})
					}
				});
			},
			delImg(index) {
				this.info.images.splice(index, 1);
			},
			showModals() {
				this.showModal = true;
			},
			hideModal() {
				this.showModal = false;
			},
			setFlower(e) {
				this.appendaward = e;
			},
			sendFlower() {
				sendAward({
					lessonrecordofstudentid: this.info.lessonrecordofstudentid,
					appendaward: this.appendaward
				}).then(res => {
					if (res.data.data.errcode === 200) {
						this.hideModal();
						this.getDetailData(this.id);
					} else {
						failTip(res.data.data.errmsg);
					}
				})
			},
			goEditPage() {
				wx.navigateTo({
					url: '../editComments/editComments'
				})
			},
			saveData() {
				let img = this.images.join('|').toString();
				console.log(img);
				teacherComment({
					lessonrecordofstudentid: this.info.lessonrecordofstudentid,
					content: this.info.content, 
					refer: this.info.refer,
					images: img
				}).then(res => {
					if(res.data.data.errcode === 200) {
						wx.navigateBack();
					} else {
						failTip(res.data.data.errmsg);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.item {
		margin: 0 20rpx 10rpx 10rpx;
		padding: 10rpx 10rpx;
		background: #EEEEEE;
		color: #7d7b7b;
		border: 1px solid #7f7d7d;
		border-radius: 10rpx;
	}
</style>
