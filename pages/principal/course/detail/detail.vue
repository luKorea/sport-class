<template>
	<view class="margin">
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="text-red">*</text>
				<text>课程名称</text>
			</view>
			<view class="action text-right">
				<input type="text" v-model="info.className" placeholder="请输入课程名称">
			</view>
		</view>

		<block>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="text-red">*</text>
					<text>课程类型</text>
				</view>
				<view class="action text-right">
					<!-- <input type="text" v-model="info.type" placeholder="请输入课程名称"> -->
					<text>{{detailsinfo.info.type==1?'一对一':'一对多'}}</text>
				</view>
			</view>
		</block>

		<block>
			<view class="cu-bar bg-white margin-top solid-bottom" @click="setTongClassType1">
				<view class="action">
					<text>通用全部课程</text>
				</view>
				<view class="action" v-if="showClass">
					<text class="cuIcon-roundcheckfill text-orange"></text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" @click="setTongClassType2">
				<view class="action">
					<text>通用部分课程</text>
				</view>
				<view class="action" v-if="!showClass">
					<text class="cuIcon-roundcheckfill text-orange"></text>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="!showClass">
				<view class="action">
					<text>通用的课程</text>
				</view>
				<view class="action" @click="showGradeModal">
					<text class="text-gray" v-if="selectArray.length === 0">选择课程</text>
					<text class="text-gray" v-if="selectArray.length > 0">{{selectArray.length}} 门课程</text>
				</view>
			</view>
		</block>


		<!-- <view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="text-red">*</text>
				<text>课程类型</text>
			</view>
			<view class="action">
				<picker @change="bindTypeChange($event, typeArray)" :value="typeIndex" :range="typeArray" range-key="name">
					<view class="picker">{{typeArray[typeIndex].name}}</view>
				</picker>
				<text class="cuIcon-triangledownfill"></text>
			</view>
		</view> -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="text-red">*</text>
				<text>通用单价</text>
			</view>
			<view class="action text-right">
				<input type="text" v-model="info.money" placeholder="请输入价格">
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text>启用状态</text>
			</view>
			<view class="action">
				<switch v-if="detailsinfo.info.flags%2===1" checked @change="setState" />
				<switch v-else @change="setState" />
			</view>
		</view>
		<view class="cu-bar bg-white margin-top solid-bottom">
			<view class="action">
				<text>课程介绍</text>
			</view>
		</view>
		<view class="cu-form-group align-start cu-bar bg-white">
			<textarea maxlength="-1" v-model="info.content" placeholder="写下对课程的介绍，不超200字"></textarea>
		</view>

		<view class="cu-bar margin-top" @click="saveData">
			<button class="cu-btn lg bg-red" style="width: 100%">保存</button>
		</view>


		<!--弹框-->
		<view class="cu-modal show" v-if="gradeModal">
			<view class="cu-dialog">
				<checkbox-group class="block" @change="chooseGradeItem">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="item in classArray" :key="item.id">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.title}}</view>
								<checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
							</label>
						</view>
					</view>
				</checkbox-group>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="hideGradeModal">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="hideGradeModal">
						<button class="cu-btn bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getCourseinfo,
		getCourseList,
		getchangeenable,
		getoperatorcourse
	} from "../../../../api/principal/course";
	export default {
		name: "addCourse",
		data() {
			return {
				info: {
					type: '1对1'
				},
				typeIndex: 0,
				typeArray: [{
						id: 1,
						name: '一对一'
					},
					{
						id: 2,
						name: '一对多'
					}
				],
				classType: false,
				showClass: true,
				gradeModal: false,
				classArray: [],
				selectArray: [],
				detailsinfo: {}
			}
		},
		onLoad(options) {
			// {
			// 		"info": {
			// 			"id": 7, 课程id
			// 			"title": "西村足球课", 课程名称
			// 			"cover": "",封面照片
			// 			"times": 60, 课时,分钟
			// 			"coursenum": 0, 课节/总计多少课
			// 			"cost": 0,  费用
			// 			"score": 0,  积分（兑换所需）
			// 			"introduction": "", 课程介绍
			// 			"begintime": "2016/8/17 16:27:00", 开始时间
			// 			"endtime": "2016/9/21 16:27:03", 结束时间
			// 			"sportid": 24, 运动项目id
			// 			"sportname": "足球", 运动项目名称
			// 			"classroom": "",  上课教室
			// 			"flags": 1, 标记 //可不用
			// 			"status": "已经开课" 状态
			// 			"hits": 11 浏览次数
			// 			"sharestatnum": 12 分享次数
			// 			"comernumber": 11 报名人数
			// 			"link": "" 分享link
			// 			"tel": "" 电话号码(商家)
			// 			"key": "" 环信群组id
			// 			"address": "" 上课点地址
			// 			"type": 0 //课程类型(1=1对1，2=1对多)
			// 		}
			// 		"agreementlist": [{ //协议
			// 			"id": 7, 协议id
			// 			"title": "西村足球课", 协议名称
			// 			"flags": 1, //标记 （1=启用、0x40000000=删除/移除标记）
			// 		}]
			// 		"coursestructure": [{ //课程关系
			// 			"id": 7, 
			// 			"parentid": 1, //courseid
			// 			"childid": 1, //courseid  (childid=0时，表示对应全部课程)
			// 		}]
			// 	}
			let data = JSON.parse(options.data)
			getCourseinfo({
				id: data.id
			}).then(res => {
				if (res.data.code === 0) {
					this.detailsinfo = res.data.data;
					this.info.className = this.detailsinfo.info.title
					this.info.money = this.detailsinfo.info.cost
					this.info.content = this.detailsinfo.info.introduction
					// this.typeIndex = this.detailsinfo.info.type==1?0:1;
				}
			})
		},
		methods: {
			setClassType(e) {
				let {
					value
				} = e.detail;
				this.classType = value;
			},
			setTongClassType1() {
				this.showClass = true;
			},
			setTongClassType2() {
				this.showClass = false;
			},
			showGradeModal() {
				getCourseList({
					keywords: '',
					venueid: wx.getStorageSync('userData').venueid,
					flags: 1024
				}).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							this.classArray = res.data.data.list;
							this.gradeModal = true;
						}
					}
				})

			},
			hideGradeModal() {
				this.gradeModal = false;
			},
			setWeiDaoTime(e) {
				let {
					value
				} = e.detail;
				this.info.weidao = value ? 1 : 0;
			},
			setLevalTime(e) {
				let {
					value
				} = e.detail;
				this.info.leval = value ? 1 : 0;
			},
			setState(e) {
				let {
					value
				} = e.detail;
				getchangeenable({
					courseid: this.detailsinfo.info.id, // notnull 课程id
					enable: value ? true : false
				}).then((res) => {
					if (res.data.code === 0) {
						this.info.state = value ? 1 : 0;
					}
				})

			},
			bindTypeChange(e) {
				const {
					value
				} = e.detail;
				this.typeIndex = value;
			},
			chooseGradeItem(e) {
				let {
					value
				} = e.detail,
					data = [];
				value.forEach(item => {
					data.push(JSON.parse(item));
				});
				this.selectArray = data;
			},
			saveData() {
				let arr = []
				this.detailsinfo.agreementlist.map((item) => {
					arr.push(item.id)
				})
				let arr2 = []
				this.selectArray.map((item) => {
					arr2.push(item.id)
				})
				let param = {
					id: this.detailsinfo.info.id, // 课程id，添加时默认为0
					type: this.detailsinfo.info.type, // notnull 课程类型(1=1对1，2=1对多)
					cover: '', // length<=256 课程图片
					title: this.info.className, // notnull length<=100 课程标题
					begintime: this.detailsinfo.info.begintime, //string 开始时间
					endtime: this.detailsinfo.info.endtime, //string 结束时间
					classroom: this.detailsinfo.info.classroom, //string length<=100 上课教室
					tel: this.detailsinfo.info.tel, //string 联系方式
					introduction: this.info.content, // string 课程详情
					score: this.detailsinfo.info.score, //int 积分（兑换所需）
					coursenum: this.detailsinfo.info.coursenum, //int 总共多少节课
					cost: this.info.money, //decimal 总学费
					flags:this.info.state?(this.detailsinfo.info.flags%2==1?this.detailsinfo.info.flags:(this.detailsinfo.info.flags+1)):(this.detailsinfo.info.flags-1), //int course.flags（是否体验课，是否扣课时也请在这里处理一次，后期将移除相关2个参数）
					childidsstring: this.showClass ? 0 : arr2.join(','), //通用课程时关联的课程,多个以','隔开，全部课程时默认值=0
					agreementids: arr.join(','), //string 协议id,多个以','隔开
					selldata: '', // string 价格列表json,
					comerextenddata: ''
				}
				console.log(param, "param")
				// this.showClass
				getoperatorcourse(param).then((res) => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '修改成功',
							duration: 1000
						});
						let timeout = setTimeout(function() {
							wx.navigateBack();
						}, 1000)

					}
				})

			}
		}
	}
</script>

<style scoped>

</style>
