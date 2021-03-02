<template>
  <view class="margin">
    <view class="bg-white cu-bar">
      <view class="action">班级名称</view>
      <view class="action">{{ info.className }}</view>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">上课日期</view>
      <picker mode="date" @change="bindDateChange" :value="date"
              :start="startDate" :end="endDate">
        <view class="picker">{{ date }}</view>
      </picker>
    </view>
    <view class="cu-form-group cu-bar bg-white">
      <view class="title">上课开始时间</view>
      <picker mode="time" @change="bindStartTimeChange" :value="startTime"
              start="00:00" end="23:59">
        <view class="picker">{{ startTime }}</view>
      </picker>
    </view>
    <view class="cu-form-group cu-bar bg-white">
      <view class="title">上课结束时间</view>
      <picker mode="time" @change="bindEndTimeChange" :value="endTime"
              start="00:00" end="23:59">
        <view class="picker">{{ endTime }}</view>
      </picker>
    </view>


    <view class="bg-white cu-bar margin-top">
      <view class="action">上课老师</view>
      <view class="action" @click="setTeacher">
        <text class="text-sm text-gray">{{info.teacherName ? info.teacherName : '请选择上课老师'}}</text>
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text class="margin-right">授课课时</text>
        <uni-number-box :step="0.5" @change="getStep" />
      </view>
    </view>

    <button class="cu-btn lg bg-red margin-top" style="width: 100%" @click="nextOption">下一步
    </button>

    <!--弹框-->
    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseTeacherItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in teacherArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text>{{item.name}}</text>
                  <gender-icon :value="item.gender" class="margin-right"></gender-icon>
                  <text class="text-type">{{item.type === 1 ? '主教' : '助教'}}</text>
                </view>
                <radio class="round" :value="item.name"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="sendTeacher">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>


  </view>
</template>

<script>
import uniNumberBox from '../../../components/uni-number-box/uni-number-box';
import {getDate} from "../../../utils";
import GenderIcon from '@/components/gender-icon'
export default {
  name: "transferClass",
  components: {
    uniNumberBox,GenderIcon
  },
  data() {
    const currentDate = getDate({
      format: true
    })
    var transfer = (val)=>val<10?"0"+val:val
    return {
      date: currentDate,
      startTime: `${transfer(new Date().getHours())}:${transfer(new Date().getMinutes())}`,
      endTime: `${transfer(new Date().getHours())}:${transfer(new Date().getMinutes())}`,
      showModal: false,
      teacherArray: [],//teacher.flags : 1=主教、2=助教
      selectedTeachers:[],
      info: {
        className: '',
        teacherName: '',
        content: '',
        date: ''
      },
      classid: ''
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
    this.classid = options.id;
    this.info.className = options.classname;
    this.date = options.date
    this.getTeacherList();
  },
  methods: {
    bindDateChange(e) {
      this.date = e.target.value;
      // this.info.birthday = e.target.value;
    },
    bindStartTimeChange(e) {
      this.startTime = e.target.value;
      // this.info.birthday = e.target.value;
    },
    bindEndTimeChange(e) {
      this.endTime = e.target.value;
      // this.info.birthday = e.target.value;
    },
    setTeacher() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    chooseTeacherItem(e) {
      let {value} = e.detail;
      this.info.teacherName = value;
    },
    sendTeacher() {
      this.showModal = false;
    },
    getStep(e) {
      this.timeLimit = e;
    },
    nextOption() {
      var temporary = {
		  classid:this.classid,
		  classname:this.info.className,
		  teacher: this.selectedTeachers.map(a=>a.id+":"+a.name).join(';'),
		  btime: this.startTime,
		  etime: this.endTime,
		  duration:this.timeLimit,
		  date: this.date,
		}
      wx.navigateTo({
        url: `/pages/common/namedPage/namedPage?temporary=${encodeURIComponent(JSON.stringify(temporary))}`
      })
    },
    getTeacherList(){
      this.$api.teacher.teacherlist({classid: this.classid,paging: false,enable: 1}).then(res=>{
        this.selectedTeachers = res.data.data
        this.info.teacherName = this.selectedTeachers.map(a=>a.name).join(',')
        this.getAllTeacherList();
      })
    },
    getAllTeacherList(){
      this.$api.teacher.teacherlist({paging: false,enable: 1}).then(res=>{
        this.teacherArray = res.data.data.map(item=>{
          item.type=this.selectedTeachers.some(a=>a.id==item.id)?1:2;
          return item;
        }).sort((a,b)=>a.type-b.type)
      })
    }
  }
}
</script>

<style scoped lang="scss">
page{
  background-color: $uni-bg-color-grey;
}
</style>