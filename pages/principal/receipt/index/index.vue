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
			<!--筛选-->
			<view class="cu-bar search bg-white margin-top justify-around">
				<view class="action" @click="setTime">
					<text style="margin-right: 6rpx" :class="!showUp ? 'text-red' : ''">排序</text>
					<text class="text-gray text-sm" :class="showUp ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
				</view>
				<view class="action" @click="showDrawer">
					<text style="margin-right: 6rpx">筛选</text>
					<text class="cuIcon-triangledownfill text-gray text-sm"></text>
				</view>
			</view>
			<!--筛选侧边栏-->
			<uni-drawer ref='drawer' mode="right">
				<!--头部-->
				<view class="solids-bottom flex align-center justify-center">
					<view class="padding">筛选</view>
				</view>
				<!--内容区域-->
				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择课程</view>
					<picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="title">
						<view class="picker">{{gradeArray[gradeIndex].title}}</view>
					</picker>
				</view>
				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择班级</view>
					<picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="title">
						<view class="picker">{{classArray[classIndex].title}}</view>
					</picker>
				</view>
				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择老师</view>
					<picker @change="bindTeacherChange($event, teacherArray)" :value="teacherIndex" :range="teacherArray" range-key="name">
						<view class="picker">{{teacherArray[teacherIndex].name}}</view>
					</picker>
				</view>
				<view class="cu-form-group cu-bar bg-white">
					<view class="title">选择类型</view>
					<picker @change="bindLabelChange($event, labelArray)" :value="labelIndex" :range="labelArray" range-key="label">
						<view class="picker">{{labelArray[labelIndex].label}}</view>
					</picker>
				</view>
				<view class="cu-bar search bg-white">
					<view class="action">
						<picker mode="date" @change="bindStartDateChange" :value="startDate" :start="startDateFormat" :end="endDateFormat">
							<view class="picker">{{startDate}}</view>
						</picker>
					</view>
					<view class="action">至</view>
					<view class="action">
						<picker mode="date" @change="bindEndDateChange" :value="endDate" :start="endStartDateFormat" :end="endEndDateFormat">
							<view class="picker">{{endDate}}</view>
						</picker>
					</view>
				</view>
				<!--底部区域-->
				<view class="drawer-footer">
					<button class="bg-gray lg cu-btn" style="width: 50%;" @click="closeDrawer">关闭</button>
					<button class="bg-my-red lg cu-btn" style="width: 50%;" @click="searchData">确定</button>
				</view>
			</uni-drawer>
			<!--列表-->
			<block v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index">
					<view class="cu-bar bg-white solid-bottom margin-top" @click="goDetail(item)">
						<view class="action">
							<view class="flex flex-direction padding-top-sm padding-bottom-sm">
								<view class="margin-bottom-sm">
									<text class="margin-right-sm">{{item.studentname}}</text>
									<text>{{item.contact}}</text>
								</view>
								<view class="text-gray text-sm margin-bottom-sm">
									<text>{{item.total}} 元</text>
								</view>
								<view class="text-gray text-sm">
									<text>缴费日期: {{item.paydate}}</text>
								</view>
							</view>
						</view>
						<view class='action'> 
							<button class="cu-btn bg-orange" v-if="item.flagName==='续签'">续签</button>
							<button class="cu-btn bg-cyan" v-if="item.flagName==='新签'">新签</button>
							<button class="cu-btn bg-gray" v-if="item.flagName==='已作废'">已作废</button>
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
	</view>
</template>

<script>
	import uniDrawer from '../../../../components/uni-drawer/uni-drawer';
	import {
		getDate
	} from "../../../../utils";
	import {
		getorderlist,
		getorderinfo,
		getorderabolish
	} from "../../../../api/principal/order";
	import {
		getcoursebaselist, //选择课程
	} from "../../../../api/principal/course";
	import {
		getClassList, //选择班级
	} from "../../../../api/principal/class";
	import {
		getTeacherList, //选择老师
	} from "../../../../api/principal/teacher";

	export default {
		components: {
			uniDrawer
		},
		data() {

			return {
				startDate: '',
				endDate: '',
				searchInput: '',
				showUp: true,
				list: [],
				// 选择课程
				classIndex: 0,
				classArray: [],
				// 选择课程
				gradeIndex: 0,
				gradeArray: [],
				// 选择老师
				teacherIndex: 0,
				teacherArray: [],
				// 选择课程套餐
				packageIndex: 0,
				packageArray: [],
				// 选择标签
				labelIndex: 0,
				labelArray: [{
						label: '全部',
						id: 0
					},
					{
						label: '新签',
						id: 1
					},
					{
						label: '续签',
						id: 2
					},
					{
						label: '废除',
						id: 3
					},
					{
						label: '退费',
						id: 4
					},
					{
						label: '欠费',
						id: 5
					},
					{
						label: '退课/退订',
						id: 6
					},
					{
						label: '转课',
						id: 7
					}
				],
				form: {}
			}
		},
		onLoad() {
			this.getList()
		},
		computed: {
			startDateFormat() {
				return getDate('start')
			},
			endDateFormat() {
				return getDate('end');
			},
			endStartDateFormat() {
				return getDate('start')
			},
			endEndDateFormat() {
				return getDate('end');
			},
		},
		methods: {
			// 筛选区域
			// 选择课程
			bindClassChange(e, data) {
				const {
					value
				} = e.detail;
				this.classIndex = value;
				this.form.class = data[this.classIndex].id;
			},
			// 选择课程
			bindGradeChange(e, data) {
				const {
					value
				} = e.detail;
				this.gradeIndex = value;
				this.form.grade = data[this.gradeIndex].id;
			},
			// 选择课程
			bindTeacherChange(e, data) {
				const {
					value
				} = e.detail;
				this.teacherIndex = value;
				this.form.teacher = data[this.teacherIndex].id;
			},
			// 选择课程
			bindPackageChange(e, data) {
				const {
					value
				} = e.detail;
				this.packageIndex = value;
				this.form.package = data[this.packageIndex].id;
			},
			// 选择课程
			bindLabelChange(e, data) {
				const {
					value
				} = e.detail;
				this.labelIndex = value;
				this.form.label = data[this.labelIndex].id;
			},
			// 开始时间
			bindStartDateChange(e) {
				this.startDate = e.target.value;
				this.form.startTime = e.target.value;
			},
			// 结束时间
			bindEndDateChange(e) {
				this.endDate = e.target.value;
				this.form.endTime = e.target.value;
			},
			// 筛选
			searchData() {
				this.getList();
				this.closeDrawer();
				console.log(this.form);
			},
			searchValue() {
				this.getList();
				console.log(this.searchInput);
			},
			showDrawer() {
				this.$refs['drawer'].open();
				const currentStartDate = getDate({
					format: true
				})
				const currentEndDate = getDate({
					format: true
				})
				this.startDate = this.startDate == '' ? currentStartDate : this.startDate
				this.endDate = this.endDate == '' ? currentEndDate : this.endDate
			},
			closeDrawer() {
				this.$refs['drawer'].close();
			},
			// 课时消耗操作
			setTime() {
				this.showUp = !this.showUp;
			},
			addStudents() {
				console.log(1);
			},
			goDetail(item) {
				wx.navigateTo({
					url: `../detail/detail?item=${JSON.stringify(item)}`
				})
			},
			getList() {
				let param = {
					tags: this.form.label || 0, //int 订单类型 全部(0)、新签(1)、续签(2)、废除(3)、退费(4)、欠费(5)、退课/退订(6)、转课(7)
					courseid: this.form.grade || '', //int 课程id
					classid: this.form.class || '', //int 班级id
					teacherid: this.form.teacher || '', //int 老师id
					coursepackid: '', //int 课包/套餐 coursepack.id
					expenseid: '', //int 收费项id expense.id
					commodityid: '', //int 商品id commodity.id
					saleuserid: '', //int 跟进人userid
					paymethod: '', //int 付款方式（0=平台默认支付、1=现金、2=网银转账、3=支付宝、4=微信、5=POS机刷卡、6=会员卡）
					btime: '', //string 下单开始时间
					etime: '', //string 下单结束时间
					btime1: this.startDate || '', //string 支付开始时间
					etime1: this.endDate || '', //string 支付结束时间
					keywords: this.searchInput || '', //string 关键字
					original: '', //string 学生来源
					itemdata: '', //bool 是否返回订单项列表
					oflags: '', //int orderform.flags 1=用户已提交、2=用户已支付、4=商家已确认、8=商家已发货、16=用户已收货、32=有退货、64=有退款、128=有投诉、256=有协调、512=已结算并且商家已收款、1024=需开发票、2048=需发货、4096=有手续费、8192=有优惠、0x4000=提前预订、0x8000=线下现场开单（不参与结算）、0x10000=有保证金、0x20000=用户删除、0x40000=商家删除、0x80000=已部分消费、0x100000=已全部使用、0x200000=已评价、0x400000=已取消/废除、0x800000=已过期、0x1000000=手机APP订单、0x2000000=已开发票、0x4000000=已发送通知、0x8000000=测试数据、0x10000000=续签订单|新签、0x20000000=导入数据、0x40000000=是否有交易流水
					inverseoflags: '', //int orderform.flags(不包含的标记 如：inverseoflags=4,查询条件为orderform.flags&4=0的) 
					oflag2: '', //int orderform.flag2 1=退订|退课、2=转换|转课、4=跨上课点、8=有效订单、16=包含课程Course、32=包含会员卡Card、64=包含促销规则Promotion、128=包含商品Commodity、256=包含费用Expense、0x8000=线上支付、0x10000=积分兑换
					paging: false, //bool
					pi: '', //int notnull
					ps: '', //int notnull
				}
				getorderlist(param).then((res) => {
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							res.data.data.list.map((item)=>{
								if((item.flags&0x10000000)>0){//续签
									item['flagName'] = '续签'
								}else if((item.flags&0x10000000)<=0){//新签
									item['flagName'] = '新签'
								}else if((item.flags&0x400000)<=0){//已作废
									item['flagName'] = '已作废'
								}
							})
							this.list = res.data.data.list
						} else {
							this.list = [];
						}
					}
				});

				getcoursebaselist({
					paging: false
				}).then((res) => { //kecheng
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							this.gradeArray = res.data.data
						}
					}

				})
				getClassList({
					paging: false
				}).then((res) => { //banji
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							this.classArray = res.data.data
						}
					}

				})
				getTeacherList({
					paging: false,
					enable: 1
				}).then((res) => { //laoshi
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							this.teacherArray = res.data.data
						}
					}

				})
			}
		}
	}
</script>

<style scoped>
</style>
