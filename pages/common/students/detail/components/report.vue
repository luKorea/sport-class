<!-- TODO 老师端 学员 报读班级 -->
<template>
	<view class="margin report-container">
		<block v-if="list.length > 0">
			<view class="margin-top" v-for="(item, index) in list" :key="index">
				<view class="cu-bar bg-white">
					<view class="text-sm action">
						<text class="ke-orange">课</text>
						<text>{{item.title}}</text>
					</view>
					<view class="action" v-if="item.title !== '全部课程通用'">
						<view class="text-sm">
							<button class="cu-btn sm bg-orange" 
							@click="showClassModals(item.courseid)">选班</button>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="text-sm action">
						剩余<text class="text-red">{{item.lessonnum}}</text>课时
					</view>
				</view>

				<block v-if="item.classArray.length > 0">
					<view class="cu-bar bg-white" v-for="(child, i) in item.classArray" :key="i">
						<view class="action text-sm">
							<text class="ban-red">班</text>
							<text>{{child.classname}}</text>
						</view>
						<view class="action text-sm">
							<button class="cu-btn sm" 
							style="background-color: #F4313E; color: #fff" 
							@click="removeClass(child)">退班</button>
						</view>
					</view>
				</block>
			</view>
		</block>
		<block v-else>
			<view class="cu-form-group cu-bar bg-white flex justify-center align-center">
				<view class="title">暂无数据</view>
			</view>
		</block>
		
		
		<!-- 选班 -->
		<view class="cu-modal show" v-if="showClassModal">
		  <view class="cu-dialog">
		    <checkbox-group class="block" @change="chooseClassItem">
		      <view class="cu-list menu text-left">
		        <view class="cu-item" v-for="(item, index) in classArray" :key="index">
		          <label class="flex justify-between align-center flex-sub">
		            <view class="flex-sub">
		              <text class="margin-right">{{item.name}}</text>
		              <text>{{item.contact}}</text>
		            </view>
		            <checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
		          </label>
		        </view>
		      </view>
		    </checkbox-group>
		    <view class="cu-bar bg-white justify-around">
		      <view class="action" @click="hideClassModal">
		        <button class="cu-btn bg-white solid-right">取消</button>
		      </view>
		      <view class="action" @click="addItem">
		        <button class="cu-btn bg-white">确定</button>
		      </view>
		    </view>
		  </view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		getReportList,
		getReportClassList,
		removeStudentClass,
		getSelectClassList,
		addStudentToClass
	} from '../../../../../api/common/students.js';
	import {failTip} from '../../../../../utils/tip.js';
	export default {
		props: {
			studentId: {
				type: Number,
				default: null
			}
		},
		data() {
			return {
				showClassModal: false,
				classArray: [],
				selectArray: [],
				params: {
					ids: null
				},
				info: {},
				list: [],
				backList: []
			}
		},

		mounted() {
			this.params['ids'] = this.studentId;
			this.getData(this.params);
		},
		methods: {
			// 获取课程班级
			getCourseClass(id) {
				getSelectClassList({
					courseid: id,
					paging: false,
					status: 0
				}).then(res => {
					this.classArray = res.data.data;
				})
			},
			showClassModals(id) {
			  this.showClassModal = true;
			  this.getCourseClass(id);
			},
			hideClassModal(id) {
			  this.showClassModal = false;
			},
			chooseClassItem(item) {
			  let {value} = item.detail,
			      data = [];
			  value.forEach(item => {
			    data.push(JSON.parse(item));
			  });
			  this.selectArray = data;
			},
			addItem() {
			  console.log(this.selectArray);
			  let data = [];
			  this.selectArray.forEach(item => {
				  data.push({
					  classid: item.id,
					  courseid: item.courseid,
					  studentid: this.studentId
				  })
			  });
			  addStudentToClass({
				  data: JSON.stringify(data)
			  })
			  .then(res=>{
			    if(res.data.data.errcode==200){
			  	  this.getData(this.params);
				   this.hideClassModal();
			    }else{
			      failTip(res.data.data.errmsg);
			    }
			  })
			},
			// 获取课程
			getData(params) {
				getReportList(params)
					.then(res => {
						this.backList = res.data.data;
						this.getClassData(this.studentId);
					}).catch(err => console.log(err))
			},
			// 获取班级
			getClassData(id) {
				getReportClassList(id)
					.then(res => {
						let data = res.data.data.list;
						if (data.length > 0) {
							this.backList.forEach(item => {
								item['classArray'] = [];
								data.forEach(child => {
									if (item.courseid === child.courseid) {
										item['classArray'].push(child);
									}
								})
							});
							this.list = this.backList;
						}
						console.log(this.list);
					}).catch(err => console.log(err));
			},
			// 退班
			removeClass(item) {
				console.log(item);
				let data = {
					classid: item.classid,
					type: 1,
					ids: this.studentId
				};
				removeStudentClass(data)
				.then(res=>{
				  if(res.data.data.errcode==200){
					  this.getData(this.params);
				  }else{
				    failTip(res.data.data.errmsg);
				  }
				})
			}
		}
	}
</script>

<style scoped>
	.flex-due {
		justify-content: start;
		align-items: start;
	}
</style>
