<template>
	<view class="application-container">
		<view class="margin">
			<view class="cu-bar bg-white">
				<view class="action">学员姓名</view>
				<view class="action">{{info.name}}</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">手机号码</view>
				<view class="action">{{info.contact}}</view>
			</view>
			<view class="cu-bar bg-white margin-top" @click="goCorse">
				<view class="action">课程</view>
				<view class="action">
					<text class="text-sm text-gray">{{selectarr1.length===0?'请选择':selectarr1.length+'个'}}</text>
					<view class="cuIcon-right text-sm text-gray"></view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top" @click="goCharges">
				<view class="action">收费项</view>
				<view class="action">
					<text class="text-sm text-gray">{{selectarr2.length===0?'请选择':selectarr2.length+'个'}}</text>
					<view class="cuIcon-right text-sm text-gray"></view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top" @click="goPackage">
				<view class="action">套餐</view>
				<view class="action">
					<text class="text-sm text-gray">{{selectarr3.length===0?'请选择':selectarr3.length+'个'}}</text>
					<view class="cuIcon-right text-sm text-gray"></view>
				</view>
			</view>
		</view>
		<view class="flex flex-direction fixed-bottom">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="margin-right">签约金额</text>
					<text class="text-red">￥ 300.00</text>
				</view>
				<view class="action" @click="registerorder">
					<button class="cu-btn bg-orange">去结算</button>
				</view>
			</view>
		</view>
		<!--弹框-->
		<view class="cu-modal show" v-if="gradeModal1">
			<view class="cu-dialog">
				<checkbox-group class="block" @change="chooseGradeItem1">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="item in arr1" :key="item.id">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.title}}</view>
								<checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
							</label>
						</view>
					</view>
				</checkbox-group>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="hideGradeModal1">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="hideGradeModal1">
						<button class="cu-btn bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!--弹框-->
		<view class="cu-modal show" v-if="gradeModal2">
			<view class="cu-dialog">
				<checkbox-group class="block" @change="chooseGradeItem2">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="item in arr2" :key="item.id">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.title}}</view>
								<checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
							</label>
						</view>
					</view>
				</checkbox-group>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="hideGradeModal2">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="hideGradeModal2">
						<button class="cu-btn bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!--弹框-->
		<view class="cu-modal show" v-if="gradeModal3">
			<view class="cu-dialog">
				<checkbox-group class="block" @change="chooseGradeItem3">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="item in arr3" :key="item.id">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.title}}</view>
								<checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
							</label>
						</view>
					</view>
				</checkbox-group>
				<view class="cu-bar bg-white justify-around">
					<view class="action" @click="hideGradeModal3">
						<button class="cu-btn bg-white solid-right">取消</button>
					</view>
					<view class="action" @click="hideGradeModal3">
						<button class="cu-btn bg-white">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getpaylist,
		getcommoditylist, //收费项
		getcoursepacklist, //套餐
		getregisterorder
	} from "../../../../api/principal/renewal";
	import {
		getcoursebaselist //课程列表
	} from "../../../../api/principal/course";
	export default {
		name: "application",
		data() {
			return {
				info: '',
				gradeModal1:false,
				gradeModal2:false,
				gradeModal3:false,
				selectarr1:[],
				selectarr2:[],
				selectarr3:[]
			}
		},
		onLoad(info) {
			this.info = JSON.parse(info.info)
			this.getData()
		},
		methods:{
			getData() {
				getcommoditylist({
					keywords: '', //string 关键字
					kind: '', //int 商品种类commodity.kind
					warning: '', //bool 是否库存预警
					status: true, //bool 启用/禁用
					paging: false, //bool
					pi: '', //int notnull
					ps: '', //int notnull
				}).then((res) => { //收费项
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							this.arr1 = res.data.data.list
						}else{
							this.arr1 = []
						}
					}
				});
				getcoursebaselist({
					keywords: '', //string 关键字
					inschoolid: '', //int 入驻的430学校id
					type: 3, // int 课程包/套餐类型 1=课程，2=课程促销套餐,3=套餐(1,2为体验课程的分类，3为套餐的分类，目前type=2的类型不使用)
					courseid: '', //int 课程id
					enable: 1, // int 是否启用 -1:全部,1:启用,0:禁用
					paging: false, //bool 是否分页
					pi: '', //int notnull
					ps: '', //int notnull
				}).then((res) => { //课程列表
					if (res.data.code === 0) {
						if (res.data.data.length > 0) {
							this.arr2 = res.data.data
						}else{
							this.arr2 = []
						}
					}
				});
				getcoursepacklist({
					keywords: '', //string 关键字
					sid: '', //int 运动项目id
					experience: false, //bool? 是否体验课 true:是，false：否
					enable: 1, //int 是否启用：1:是，0：否,-1查询全部
					type: '', //int 类型：1=1vs1,2=1vsN，-1查询全部
					status: '', //int 审批状态（1=未审核，2=已通过，3=未通过）
					flags: '', //int course.flags
					inverseflags: '', //int 反选标记（不包含course.flags）的
					paging: false, //bool 是否分页
					pi: '', //int notnull
					ps: '', //int notnull
				}).then((res) => { //套餐
					if (res.data.code === 0) {
						if (res.data.data.list.length > 0) {
							this.arr3 = res.data.data.list
						}else{
							this.arr3 = []
						}
					}
				});
			},
			goCorse(){
				this.gradeModal1 = true
			},
			goCharges(){
				this.gradeModal2 = true
			},
			goPackage(){
				this.gradeModal3 = true
			},
			chooseGradeItem1(e) {
				let {
					value
				} = e.detail,
					data = [];
				value.forEach(item => {
					data.push(JSON.parse(item));
				});
				this.selectarr1 = data;
			},
			chooseGradeItem2(e) {
				let {
					value
				} = e.detail,
					data = [];
				value.forEach(item => {
					data.push(JSON.parse(item));
				});
				this.selectarr2 = data;
			},
			chooseGradeItem3(e) {
				let {
					value
				} = e.detail,
					data = [];
				value.forEach(item => {
					data.push(JSON.parse(item));
				});
				this.selectarr3 = data;
			},
			hideGradeModal1() {
				this.gradeModal1 = false;
				console.log(this.selectarr1,"dddd")
			},
			hideGradeModal2() {
				this.gradeModal2 = false;
			},
			hideGradeModal3() {
				this.gradeModal3 = false;
			},
			registerorder(){
				// let ar1 = [];
				// let ar2 = [];
				// let ar3 = [];
				// this.selectarr1.map(()=>{
					
				// })
				// [...selectarr1,...selectarr2,...selectarr3]
				let param = {
					method : '',//string 方式，pointexchange=积分兑换
					origin : 'phone',//string 来源, phone 表示手机端, web 表示网页端
					studentid : this.info.id,//int 学生id
					name : this.info.name,//string notnull length<=32 学生名称
					phone : this.info.contact,//string notnull 电话
					title : '',//string length<=64 订单标题
					data : JSON.stringify([]),//string JSON格式数据，可以是多条数据，每条数据对应一个人的描述信息,
					card : '',//string 会员卡,
					charge : [],//string 收费项,
					commodity : '',//string 物品(可选)
					employeeid : '',//int 业务员（雇员，可以是内部管理员或者是老师对应的用户ID）
					teacherid : '',//int 老师id
					payamount : '',//double payamount>=0 实收金额（支付金额）
					paymethod : '',//int 付款方式（0=平台默认支付、1=现金、2=网银转账、3=支付宝、4=微信、5=POS机刷卡）
					chargedate : '',//string notnull 缴费日期
					marketer : '',//string 经办人
					images : '',//string 凭证图片（合同），最多4张，用“|”分隔
					remark : '',//string length<=200 备注
					import : '',//bool 导入数据
					classdata : '',//string [{"courseid":0,"classid":0}]
					online : '',//bool 在线支付
					point : '',//int 积分
					studentdata : '',//string 学员信息data 同 operatorstudent接口格式
				}
				getregisterorder(param).then((res)=>{
					
				})
			}
		}
	}
</script>

<style scoped>

</style>
