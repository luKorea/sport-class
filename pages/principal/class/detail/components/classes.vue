<template>
	<view style="padding-bottom: 100rpx">
		<calendar :extra-data="extraData"
		          @calendarTap="calendarTap"
		          :showDot="true"
		          :showText="false"
		          @monthTap="monthTap"></calendar>
			<view class="margin">
				<!-- <block v-if="list.length > 0"> -->
				<view v-for="(item, index) in list" :key="index">
					<view class="margin-top bg-white cu-bar solid-bottom" @click="goTransferClass(item.id)">
						<view class="action flex-due margin-top margin-bottom">
							<view class="margin-bottom-sm">
								<text class="cuIcon-title text-gray text-sm"></text>
								<text class="text-sm">{{item.btime}}-{{item.etime}}</text>
							</view>
							<view>
								<text class="cuIcon-title text-gray text-sm"></text>
								<text class="text-sm">上课老师：{{item.teachername}}</text>
							</view>
						</view>
						<view class="action flex flex-end margin-top margin-bottom">
							<view class="margin-bottom-sm">
								<text class="cuIcon-right" style="padding-left: 190rpx"></text>
							</view>
							<view>
								<text class="cuIcon-title text-gray text-sm"></text>
								<text class="text-sm">授课课时：{{item.duration}} 课时</text>
							</view>
						</view>
					</view>
					<view class="bg-white cu-bar text-center justify-around">
						<view class="action text-center text-red text-sm" @click="goNamedPage(item.lessontaskid)">
							<text class="text-sm">点名 {{item.signupnum}}/{{item.stucount}}</text>
						</view>
						<view class="action text-center text-orange text-sm" @click="goCommentsPage(item)">
							<text class="text-sm">点评 {{item.signupnum}}/{{item.stucount}}</text>
						</view>
					</view>
				</view>
				<view class="drawer-footer footer-class" @click="goClassSchedule">
					<text class="text-center text-red">没有排课？未排课直接考勤</text>
				</view>
				<!-- /block> -->
				<!-- <block v-else>
					<view class="cu-form-group cu-bar bg-white flex justify-center align-center">
						<view class="title">暂无数据</view>
					</view>
				</block> -->
			</view>
	</view>

</template>

<script>
	import calendar from "../../../../../components/tale-calendar/calendar";
	import {dateFormat} from '@/utils';
	export default {
		name: "index",
		props: {
			classId: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			}
		},
		components: {
			calendar
		},
		data() {
			var now = new Date()
			return {
				extraData: [],
				listQuery:{paging:false,btime:'',etime:''},
				factory:{courseteacher:[],schedulelist:[]},
				currentDate:{day: now.getDate(),
				month: now.getMonth()+1,year: now.getFullYear(),
				date: dateFormat(now,'yyyy-MM-dd'),week: now.getDay(),timestemp:now.getTime()},
				lessonlist:[],
				current:{
						  day: now.getDate(),
						  month: now.getMonth()+1,
						  year: now.getFullYear(),
						  date: dateFormat(now,'yyyy-MM-dd'),
						  week: now.getDay(),
						  timestemp:now.getTime()}
			}
		},
		computed:{
		  list(){
		    var weekMap = [1,2,4,8,16,32,64]
		    const courseteachers = this.factory.courseteacher.filter(a=>a.day==weekMap[this.currentDate.week-1]);
		    const result = this.factory.schedulelist.filter(item=>{
		      var teachers = courseteachers.filter(c=>c.coursescheduleid == item.coursescheduleid);
		      if(teachers.length){
		        var teacherItems = teachers.map(a=>this.factory.teacherlist.find(b=>b.id==a.teacherid));
		        item.teachername = teacherItems.map(a=>a.name).join(',')
		        item.teacherid = teacherItems.map(a=>a.id).join(',')
		      }
		      return teachers.length>0;
		    });
		    const lessionresult = this.lessonlist.filter(item=>item.dates==this.currentDate.date);
		    
		    return [...lessionresult,...result];
		  }
		},
		onLoad(options){
		  this.listQuery.classid = options.classid||''
		  this.getLessonData();
		  this.getAllData();
		},
		methods: {
			calendarTap(e) {
				const now = new Date()
				now.setYear(e.year);
				now.setMonth(e.month);
				now.setDate(e.day)
				this.currentDate = {
					day: now.getDate(),
					month: now.getMonth() + 1,
					year: now.getFullYear(),
					date: dateFormat(now, 'yyyy-MM-dd'),
					week: now.getDay(),
					timestemp: now.getTime()
				}
			},
			monthTap(val) {
				let {
					year,
					month
				} = val;
				this.month = {
					year: year,
					month: month,
				}
				this.getLessonData();
				var startDate = new Date(year, month, 1);
				var endDate = new Date(year, month + 1, 0)
				this.setDot(startDate, endDate);


			},
			getWeekDate() {
				var now1 = new Date(),
					year, month;
				if (this.month) {
					year = this.month.year;
					month = this.month.month
				} else {
					year = now1.getFullYear()
					month = now1.getMonth()
				}
				var startDate = new Date(year, month, 1);
				var endDate = new Date(year, month + 1, 0)
				var start = dateFormat(startDate, 'yyyy-MM-dd');
				var end = dateFormat(endDate, 'yyyy-MM-dd');
				return {
					start,
					end,
					startDate,
					endDate
				}
			},
			getAllData() {
				var {
					start,
					end,
					startDate,
					endDate
				} = this.getWeekDate()
				this.$api.lessontask.getlist().then(res1 => {
					var data = res1.data.data;
					data.schedulelist = data.schedulelist.filter(item => {
						var pass = true;
						if (this.listQuery.classid) {
							var courselist = data.courseteacher.filter(a => a.classid == this.listQuery.classid);
							pass = courselist.some(a => a.coursescheduleid == item.coursescheduleid)
						}
						var stime = new Date(item.begintime).getTime(),
							etime = new Date(item.endtime).getTime()
						var timepass = stime > etime || (stime < etime && etime >= new Date(end).getTime())
						return pass && timepass;
					});
					this.factory = data;
					this.setDot(startDate, endDate)
				})
			},
			getLessonData() {
				var {
					start,
					end,
					startDate,
					endDate
				} = this.getWeekDate()
				this.listQuery.btime = start;
				this.listQuery.etime = end;
				this.$api.lessontask.lessonlist(this.listQuery).then(res => {
					this.lessonlist = res.data.data;
					this.extraData = this.extraData.concat(this.lessonlist.map(a => ({
						date: a.dates,
						dot: true
					})));
				})

			},
			setDot(startDate, endDate) {
				/* 设置日历上的红点 */
				var x = startDate.getDate(),
					y = endDate.getDate();
				var weekMap = [1, 2, 4, 8, 16, 32, 64]
				for (let i = x; i <= y; i++) {
					startDate.setDate(i);
					var week = startDate.getDay();
					var courseteachers = this.factory.courseteacher.filter(a => a.day == weekMap[week - 1])
					const result = this.factory.schedulelist.filter(item => {
						var pass = courseteachers.some(c => c.coursescheduleid == item.coursescheduleid);
						return pass;
					});

					if (result.length > 0) {
						this.extraData.push({
							date: dateFormat(startDate, 'yyyy-MM-dd'),
							dot: true
						})
					}
				}
			},
			goTransferClass(id) {
				// wx.navigateTo({
				// 	url: `../transferClass/transferClass?id=${id}`
				// })
			},
			goClassSchedule() {
				wx.navigateTo({
				  url: `/pages/common/classSchedule/classSchedule?id=${this.classId}&classname=${this.className}&date=${this.current.date}`
				})
			},
			goNamedPage(id) {
				wx.navigateTo({
					url: `/pages/common/namedPage/namedPage?lessontaskid=${id}`
				})
			},
			goCommentsPage(item) {
				let lesson = JSON.stringify(item);
				wx.navigateTo({
					url: `/pages/common/commentsPage/commentsPage?lesson=${lesson}`
				})
			}
		}
	}
</script>

<style scoped>
	.flex-due {
		flex-direction: column;
		justify-content: start;
		align-items: start;
	}

	.flex-end {
		flex-direction: column;
		justify-content: end;
		align-items: end;
	}
</style>
