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


			<!-- 评论列表 -->
			<view class="cu-chat bg-white margin-top">
				<view class="cu-item flex-direction" v-for="(item, index) in list" :key='index'>
					<view class="main" style="max-width: none;">
						<view class="content shadow bg-red">
							<text>{{item.content}}</text>
						</view>
						<view class="cuIcon-delete margin-left" @click="removeItem(item.id)"></view>
					</view>
					<view class="date">
						{{item.expositor}} {{item.datetime}}
					</view>
					<block v-if="item.imgArr">
						<view class="flex justify-between flex-wrap" style="margin: 40rpx;">
							<view v-for="(child, i) in item.imgArr" :key='i'>
								<view class="cu-avatar radius lg"
								:style="{'background-image': 'url(' + imgUrl + child + ')'}"></view>
							</view>
						</view>
					</block>
				</view>
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

		<view class="drawer-footer">
			<button class="add-btn" @click="saveData">评价回复</button>
		</view>

	</view>

</template>

<script>
	import uniNumber from '../../../../components/uni-number-box/uni-number-box';
	import {
		getEvaluationDetail,
		sendAward,
		deleteTeacherComment
	} from '../../../../api/common/evaluation.js';
	import {failTip} from '../../../../utils/tip.js';
	export default {
		data() {
			return {
				id: null,
				info: {},
				list: [],
				imgUrl: this.$uploadUrl,
				showModal: false,
			}
		},
		components: {
			uniNumber
		},
		onLoad(options) {
			let {
				data
			} = options;
			let res = JSON.parse(data);
			console.log(res);
			this.info = res;
			this.id = res.lessonrecordofstudentid;
			this.getDetailData(res.lessonrecordofstudentid);
		},
		onShow() {
			this.getDetailData(this.id);
		},
		methods: {
			getDetailData(id) {
				getEvaluationDetail(id)
					.then(res => {
						let data = res.data.data.list,
						imgArr = [];
						data.forEach(item => {
							if(item.images !== '') {
								imgArr = item.images.split('|');
								item['imgArr'] = imgArr;
							}
						});
						this.list = data;
					})
					.catch(err => console.log(err))
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
						wx.navigateBack();
					} else {
						failTip(res.data.data.errmsg);
					}
				})
			},
			saveData() {
				let res = JSON.stringify(this.info);
				wx.navigateTo({
					url: `../detail/detail?data=${res}`
				})
			},
			removeItem(id) {
				deleteTeacherComment(id)
				.then(res => {
					if (res.data.data.errcode === 200) {
						this.getDetailData(this.id);
					} else {
						failTip(res.data.data.errmsg);
					}
				}).catch(err => console.log(err));
			}
		}
	}
</script>

<style>
</style>
