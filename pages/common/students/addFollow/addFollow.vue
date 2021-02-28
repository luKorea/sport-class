<template>
	<view class="add-follow-container margin">
		<view class="cu-form-group align-start cu-bar bg-white">
			<view class="title">跟进内容</view>
		</view>
		<view class="cu-form-group align-start cu-bar bg-white">
			<textarea maxlength="-1" v-model="form.note" placeholder="请填写跟进内容，200字以内"></textarea>
		</view>
		<view class="cu-form-group margin-top cu-bar bg-white">
			<view class="title">跟进状态</view>
			<picker @change="bindStateChange($event, stateArray)" :value="stateIndex" :range="stateArray" range-key="label">
				<view class="picker">
					{{stateArray[stateIndex].label}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top cu-bar bg-white">
			<view class="title">意向级别</view>
			<picker @change="bindLevelChange($event, levelArray)" :value="levelIndex" mode='selector' :range="levelArray"
			 range-key="label">
				<view class="picker">
					{{levelArray[levelIndex].label}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group margin-top cu-bar bg-white">
			<view class="title">下次跟进时间</view>
			<picker mode="date" @change="bindDateChange" :value="date" :start="startDate" :end="endDate">
				<view class="picker">{{date}}</view>
			</picker>
		</view>

		<view class="flex flex-direction margin-top-xl" @click="sendFollow">
			<button class="cu-btn bg-my-red lg">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		getDate
	} from "../../../../utils";
	import {addOrEditStudentFollow} from '../../../../api/common/students.js';
	import {failTip} from '../../../../utils/tip.js';
	export default {
		data() {
			const currentDate = getDate({
				format: true
			})
			return {
				// 跟进状态
				stateIndex: 0,
				// 潜在学员:(0=待跟进,1=已跟进,2=要试课,3=已试课,4=已失效),
				// 在读/历史学员:(10=待跟进,11=要续费,12=要转课,13=已续费,14=已转课,15=已毕业)
				stateArray: [
					{
						label: '请选择',
						id: ''
					},
					{
						label: '待跟进',
						id: 0
					},
					{
						label: '要续费',
						id: 11
					},
					{
						label: '要转课',
						id: 12
					},
					{
						label: '已续费',
						id: 13
					},
					{
						label: '已转课',
						id: 14
					},
					{
						label: '已结业',
						id: 15
					}
				],
				date: currentDate,
				// 意向级别
				levelIndex: 0,
				// 0=不明确、1=低、2=中、3=高、4=无意向
				levelArray: [
					{
						label: '请选择',
						id: ''
					},
					{
						label: '不明确',
						id: 0
					},
					{
						label: '低',
						id: 1
					},
					{
						label: '中',
						id: 2
					},
					{
						label: '高',
						id: 3
					}
				],
				form: {
					followrecordid: 0,
					target: ' '
				}
			}
		},
		computed: {
			startDate() {
				return getDate('start')
			},
			endDate() {
				return getDate('end');
			}
		},
		onLoad(options) {
			let {
				id
			} = options;
			this.form['studentid'] = id;
			console.log(id);
		},
		methods: {
			// 选择下次跟进时间
			bindDateChange(e) {
				this.date = e.target.value;
				this.form.nexttime = e.target.value;
			},
			// 选择意向级别
			bindLevelChange(e, data) {
				const {
					value
				} = e.detail;
				this.levelIndex = value;
				this.form.grade = data[this.levelIndex].id;
				this.form.text2 = data[this.levelIndex].label;
			},
			// 选择跟进状态
			bindStateChange(e, data) {
				const {
					value
				} = e.detail;
				this.stateIndex = value;
				this.form.status = data[this.stateIndex].id;
				this.form.text1 = data[this.stateIndex].label;
			},
			// 提交跟进记录
			sendFollow() {
				this.form['intent'] = `${this.form.text1}(${this.form.text2})`;
				delete this.form.text1;
				delete this.form.text2;
				addOrEditStudentFollow(this.form)
				.then(res => {
					if (res.data.data.errcode === 200) {
						wx.navigateBack();
					} else {
						failTip(res.data.data.errmsg);
					}
				}).catch(err => console.log(err));
			}
		},
	}
</script>

<style scoped>

</style>
