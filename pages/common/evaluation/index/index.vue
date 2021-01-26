<template>
  <view class="teacher-students-container">
    <view class="margin" style="margin-bottom: 140rpx">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入姓名或手机号" v-model="searchInput"/>
        </view>
        <view class="action" @click="searchValue">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
<!--筛选-->
      <view class="cu-bar search bg-white margin-top">
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
        <view class="action" @click="showDrawer">
          <button class="cu-btn shadow-blur text-white bg-orange">筛选</button>
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
          <picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="label">
            <view class="picker">{{gradeArray[gradeIndex].label}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择班级</view>
          <picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="label">
            <view class="picker">{{classArray[classIndex].label}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择老师</view>
          <picker @change="bindTeacherChange($event, teacherArray)" :value="teacherIndex" :range="teacherArray" range-key="label">
            <view class="picker">{{teacherArray[teacherIndex].label}}</view>
          </picker>
        </view>
        <!--底部区域-->
        <view class="drawer-footer">
          <button class="bg-gray lg cu-btn" style="width: 50%;" @click="closeDrawer">关闭</button>
          <button class="bg-my-red lg cu-btn" style="width: 50%;" @click="searchData">确定</button>
        </view>
      </uni-drawer>
      <!--列表-->
      <block v-if="list.length > 0">
        <view v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
          <view class="cu-bar bg-white solid-bottom margin-top">
            <view class="action">
              <text class="cuIcon-title text-gray text-sm"></text>{{item.time}}
            </view>
            <view class="action">
              <text class="margin-right">{{item.className}}</text>
              <text class="text-type">{{item.type}}</text>
            </view>
          </view>
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="ke-orange">课</text>
              <text>{{item.gradeName}}</text>
            </view>
            <view class="action text-ping" v-if="item.state === 0">未评价</view>
          </view>
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="ban-red">师</text>
              <text>{{item.teacher}}</text>
            </view>
            <view class="action text-ping" v-if="item.code === 0">未点评</view>
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
import {getDate} from "../../../../utils";
export default {
  components: {
    uniDrawer
  },
  data() {
    const currentStartDate = getDate({format: true})
    const currentEndDate = getDate({format: true})
    return {
      searchInput: '',
      startDate: currentStartDate,
      endDate: currentEndDate,
      list: [
        //  state 0 未评价 1 已评价
        //  code 0 未点评 1 已点评
        {
          id: 1,
          time: '9:00',
          className: '测试的数据',
          type: '1v1',
          gradeName: '测试的',
          teacher: '黄晓明',
          state: 0,
          code: 0
        },
        {
          id: 2,
          time: '9:00',
          className: '测试的数据',
          type: '1v1',
          gradeName: '测试的',
          teacher: '黄晓明',
          state: 0,
          code: 0
        },
        {
          id: 3,
          time: '9:00',
          className: '测试的数据',
          type: '1v1',
          gradeName: '测试的',
          teacher: '黄晓明',
          state: 0,
          code: 0
        }
      ],
      // 选择班级
      classIndex: 0,
      classArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择课程
      gradeIndex: 0,
      gradeArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择老师
      teacherIndex: 0,
      teacherArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      form: {}
    }
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
  onLoad() {
  },
  methods: {
    // 筛选区域
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
    // 选择班级
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.form.class = data[this.classIndex].id;
    },
    // 选择课程
    bindGradeChange(e, data) {
      const {value} = e.detail;
      this.gradeIndex = value;
      this.form.grade = data[this.gradeIndex].id;
    },
    // 选择课程
    bindTeacherChange(e, data) {
      const {value} = e.detail;
      this.teacherIndex = value;
      this.form.teacher = data[this.teacherIndex].id;
    },
    // 筛选
    searchData() {
      console.log(this.form);
    },
    searchValue() {
      console.log(this.searchInput);
    },
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    goDetail(id) {
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.text-ping {
  background: #EEEEEE;
  border-radius: 5px;
  padding: 10rpx;
  font-size: 24rpx;
}
</style>
