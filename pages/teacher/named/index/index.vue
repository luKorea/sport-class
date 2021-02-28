<template>
  <view style="padding-bottom: 100rpx">
    <calendar :extra-data="extraData"
              @calendarTap="calendarTap"
              :showDot="true"
              :showText="false"
              @monthTap="monthTap"></calendar>

    <view class="cu-bar bg-white margin">
      <view class="action" v-if="list.length>0">有{{list.length}}次课</view>
      <view class="action" v-else>没有课</view>
      <view class="action" @click="scanCode">
        <text class="text-red">扫码点名</text>
      </view>
    </view>

    <view>
      <block v-if="list.length > 0">
        <view class="margin">
          <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.coursescheduleid" @click="goDetail(item.coursescheduleid)">
            <view class="action flex-common padding-top padding-bottom">
              <text class="margin-bottom-sm">{{item.btime}}-{{item.etime}}</text>
              <text class="text-gray text-sm margin-bottom-sm">
                <text class="text-gray text-sm margin-right">班级：{{item.classname}}</text>
                <text class="text-type">{{item.type==1?'1v1':'1vN'}}</text>
              </text>
              <text class="margin-bottom-sm text-gray text-sm">学生人数：{{item.stucount}}</text>
              <text class="text-gray text-sm">上课课时：  {{item.duration}}</text>
            </view>
            <view class="action">
              <text class="text-type" style="padding: 6rpx 10rpx">点名</text>
            </view>
          </view>
        </view>
      </block>
      <block v-else>
        <view class="cu-form-group cu-bar bg-white flex justify-center align-center">
          <view class="title">暂无数据</view>
        </view>
      </block>
    </view>

    <view class="drawer-footer footer-class" @click="showClassModal">
      <text class="text-center text-red">没有排课？未排课直接考勤</text>
    </view>

    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <view class="cu-bar bg-red justify-end solid-bottom">
          <view class="content">选择班级</view>
          <view class="action" @click="hideModal">
            <text class="cuIcon-close text-white"></text>
          </view>
        </view>
        <radio-group class="block" @change="goClassSchedule">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in classArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{ item.name }}</text>
                  <text class="margin-right">{{ item.teacher }}</text>
                  <!-- <text class="margin-right">学生：{{ item.number }}人</text> -->
                </view>
                <radio class="round" :value="item.id"></radio>
              </label>
            </view>
          </view>
        </radio-group>
      </view>
    </view>

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
      showModal: false,
      classArray: [],
      searchInput: '',
      extraData: [],
      listQuery:{classstatus:0,paging:false,btime:'',etime:''},
      factory:{courseteacher:[],schedulelist:[],teacherlist:[]},
      lessonlist:[],
      currentDate:{day: now.getDate(),month: now.getMonth()+1,year: now.getFullYear(),date: dateFormat(now,'yyyy-MM-dd'),week: now.getDay(),timestemp:now.getTime()}
    }
  },
  created() {
    
  },
  onLoad() {
    this.getLessonData();
    this.getAllData();
    this.getClassList();
  },
  computed:{
    list(){
      var weekMap = [1,2,4,8,16,32,64]
      const courseteachers = this.factory.courseteacher.filter(a=>a.day==weekMap[this.currentDate.week-1]);
      const result = this.factory.schedulelist.filter(item=>{
        var pass = courseteachers.some(c=>c.coursescheduleid == item.coursescheduleid);
        var stime = new Date(item.begintime).getTime(),etime = new Date(item.endtime).getTime()
        var timepass =  stime > etime || (stime < etime && etime>this.currentDate.timestamp)
        return pass && timepass;
      });
      const lessionresult = this.lessonlist.filter(item=>item.dates==this.currentDate.date);
      
      return [...lessionresult,...result];
    }
  },
  methods: {
    calendarTap(e) {
      console.log(e);
      const now = new Date()
      now.setYear(e.year);now.setMonth(e.month);now.setDate(e.day)
      this.currentDate = {day: now.getDate(),month: now.getMonth()+1,year: now.getFullYear(),date: dateFormat(now,'yyyy-MM-dd'),week: now.getDay(),timestemp: now.getTime()}
      // console.log('this.currentDate',this.currentDate,now)
    },
    monthTap(val) {
      let {year, month} = val;
      this.month = {
        year: year,
        month: month,
      }
      // console.log(this.extraData);
      // 此处获取动态的数据，赋值给extraData
      // this.extraData = [];
      this.getLessonData();
      var startDate = new Date(year, month, 1);
      var endDate = new Date(year, month+1, 0)
      this.setDot(startDate,endDate);
    },
    showClassModal() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    // TODO 扫码点名
    scanCode() {
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
        success: res => {
          if (res.errMsg === 'scanCode:ok') {
            wx.showToast({
              title: '扫码成功'
            })
            // wx.navigateTo({
            //   url: '../../pages/search/search?keyword=' + res.result
            // })
          }
        },
        fail: res => {
          // 接口调用失败
          wx.showToast({
            icon: 'none',
            title: '接口调用失败！'
          })
        },
        complete: res => {
          // 接口调用结束
          console.log(res)
        }
      });
    },
    goClassSchedule(e) {
      let {value} = e.detail;
      var classItem = this.classArray.find(a=>a.id==value)
      wx.navigateTo({
        url: `/pages/common/classSchedule/classSchedule?id=${value}&classname=${classItem.name}&date=${this.currentDate.date}`
      })
    },
    goDetail(coursescheduleid) {
      var data = this.list.find(a=>a.coursescheduleid==coursescheduleid);
      var lessonItem = this.lessonlist.find(a=>a.classid == data.classid);
      uni.navigateTo({
        url: `/pages/common/namedPage/namedPage?lessontaskid=${lessonItem&&lessonItem.lessontaskid||''}&coursescheduleid=${data.coursescheduleid}&date=${this.currentDate.date+' '+data.btime+':00'}`
      })
    },
    //获取一周的时间
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
          var stime = new Date(item.begintime).getTime(),etime = new Date(item.endtime).getTime()
          var timepass =  stime > etime || (stime < etime && etime>=new Date(end).getTime())
          return timepass;
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
    getClassList(){
      this.$api.class.classlist({status:0,paging: false}).then(res=>{
        this.classArray = res.data.data
      })
    }
    
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