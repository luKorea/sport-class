<template>
  <view>
    <calendar :extra-data="extraData"
              @calendarTap="calendarTap"
              :showDot="true"
              :showText="false"
              @monthTap="monthTap"></calendar>

    <block v-if="list.length > 0">
      <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id" @click="goDetail(item)">
        <view class="action flex-common padding-top padding-bottom">
          <text class="margin-bottom-sm">{{item.classname}}</text>
          <text class="text-gray text-sm">{{item.teachername}}</text>
        </view>
        <view class="action">
          <button class="cu-btn bg-orange">查看</button>
        </view>
      </view>
    </block>
    <block v-else>
      <view
          class="cu-form-group cu-bar bg-white flex justify-center align-center">
        <view class="title">暂无数据</view>
      </view>
    </block>

  </view>

</template>

<script>
import calendar from "../../../../components/tale-calendar/calendar";
import {dateFormat} from '@/utils';

export default {
  name: "index",
  components: {
    calendar
  },
  data() {
    var now = new Date()
    return {
      extraData: [],
      listQuery:{classstatus:0,paging:false,btime:'',etime:''},
      factory:{courseteacher:[],schedulelist:[]},
      currentDate:{day: now.getDate(),month: now.getMonth()+1,year: now.getFullYear(),date: dateFormat(now,'yyyy-MM-dd'),week: now.getDay(),timestemp:now.getTime()},
      lessonlist:[]
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
    this.listQuery.teacherid = options.teacherid||''
    this.getLessonData();
    this.getAllData();
  },
  methods: {
    calendarTap(e) {
      const now = new Date()
      now.setYear(e.year);now.setMonth(e.month);now.setDate(e.day)
      this.currentDate = {day: now.getDate(),month: now.getMonth()+1,year: now.getFullYear(),date: dateFormat(now,'yyyy-MM-dd'),week: now.getDay(),timestemp: now.getTime()}
    },
    monthTap(val) {
      let {year, month} = val;
      this.month = {
        year: year,
        month: month,
      }
      this.getLessonData();
      var startDate = new Date(year, month, 1);
      var endDate = new Date(year, month+1, 0)
      this.setDot(startDate,endDate);
      
      
    },
    goDetail(data) {
      uni.navigateTo({
        url: `../detail/detail?classid=${data.classid}&coursename=${data.coursename}&classname=${data.classname}`
      })
    },
    getWeekDate(){
      var now1 = new Date(),year,month;
      if(this.month){
        year = this.month.year;
        month = this.month.month
      }else{
        year = now1.getFullYear()
        month = now1.getMonth()
      }
      var startDate = new Date(year,month , 1);
      var endDate = new Date(year, month+1, 0)
      var start = dateFormat(startDate,'yyyy-MM-dd');
      var end = dateFormat(endDate,'yyyy-MM-dd');
      return {start,end,startDate,endDate}
    },
    getAllData(){
      var {start,end,startDate,endDate}=this.getWeekDate()
      this.$api.lessontask.getlist().then(res1=>{
        var data = res1.data.data;
        data.schedulelist = data.schedulelist.filter(item=>{
          var pass = true;
          if(this.listQuery.teacherid){
            var courselist = data.courseteacher.filter(a=>a.teacherid == this.listQuery.teacherid);
            pass = courselist.some(a=>a.coursescheduleid == item.coursescheduleid)
          }
          var stime = new Date(item.begintime).getTime(),etime = new Date(item.endtime).getTime()
          var timepass =  stime > etime || (stime < etime && etime>=new Date(end).getTime())
          return pass && timepass;
        });
        this.factory = data;
        this.setDot(startDate,endDate)
      })
    },
    getLessonData(){
      var {start,end,startDate,endDate}=this.getWeekDate()
      this.listQuery.btime = start;
      this.listQuery.etime = end;
      this.$api.lessontask.lessonlist(this.listQuery).then(res=>{
        this.lessonlist = res.data.data;
        this.extraData = this.extraData.concat(this.lessonlist.map(a=>( {date: a.dates, dot: true})));
      })
      
    },
    setDot(startDate,endDate){
      /* 设置日历上的红点 */
      var x = startDate.getDate(),y=endDate.getDate();
      var weekMap = [1,2,4,8,16,32,64]
      for(let i=x;i<=y;i++){
        startDate.setDate(i);
        var week = startDate.getDay();
        var courseteachers = this.factory.courseteacher.filter(a=>a.day==weekMap[week-1])
        const result = this.factory.schedulelist.filter(item=>{
          var pass = courseteachers.some(c=>c.coursescheduleid == item.coursescheduleid);
          return pass;
        });
        
        if(result.length>0){
          this.extraData.push({date: dateFormat(startDate,'yyyy-MM-dd'), dot: true})
        }
      }
    },
  }
}
</script>

<style scoped>
.flex-common {
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
</style>