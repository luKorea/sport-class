<!--TODO 约课记录 -->
<template>
  <view class="margin">
    <view class="cu-bar search bg-white">
      <view class="action">
        <picker mode="date" @change="bindStartDateChange" :value="startDate"
                :start="startDateFormat" :end="endDateFormat">
          <view class="picker">{{ startDate }}</view>
        </picker>
      </view>
      <view class="action">至</view>
      <view class="action">
        <picker mode="date" @change="bindEndDateChange" :value="endDate"
                :start="endStartDateFormat" :end="endEndDateFormat">
          <view class="picker">{{ endDate }}</view>
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
      <view  v-for="item in list" :key="item.id" @click="goNamePage(item.id)">
        <view class="margin-top bg-white cu-bar  solid-bottom">
          <view class="action flex-due margin-top margin-bottom">
            <view class="margin-bottom-sm">
              <text class="cuIcon-title text-gray text-sm"></text>{{item.date}}
            </view>
            <view class="margin-bottom-sm">
              <text class="cuIcon-title text-gray text-sm"></text>{{item.name}}
            </view>
            <view>
              <text class="cuIcon-title text-gray text-sm"></text>{{item.className}}
            </view>
          </view>
          <view class="action flex flex-due margin-top margin-bottom">
            <view class="margin-bottom">
              <text class="cuIcon-title text-gray text-sm"></text>{{item.time}}
            </view>
            <view>
              <text class="cuIcon-title text-gray text-sm"></text>{{item.classTime}} 课时
            </view>
          </view>
        </view>
        <view class="bg-white cu-bar text-center justify-around">
          <view class="action text-center text-red">
            点名 {{item.number}}
          </view>
          <view class="action text-center text-orange">
            约 {{item.scope}}
          </view>
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
import {getDate} from "../../../../../utils";

export default {
  data() {
    const currentStartDate = getDate({format: true})
    const currentEndDate = getDate({format: true})
    return {
      searchInput: '',
      startDate: currentStartDate,
      endDate: currentEndDate,
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
      form: {},
      list: [
        {
          id: 1,
          name: '谢老师',
          date: '2020-12-12 星期四',
          className: '测试数据',
          time: '16:00-17:00',
          classTime: 1,
          number: '3/10',
          scope: '4/5'
        },
        {
          id: 2,
          name: '谢老师',
          date: '2020-12-12 星期四',
          className: '测试数据',
          time: '16:00-17:00',
          classTime: 2,
          number: '3/10',
          scope: '4/5'
        },
        {
          id: 3,
          name: '谢老师',
          className: '测试数据',
          date: '2020-12-12 星期四',
          time: '16:00-17:00',
          classTime: 3,
          number: '3/10',
          scope: '4/5'
        }
      ]
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
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    goNamePage(id) {
      wx.navigateTo({
        url: `/pages/common/namedPage/namedPage?id=${id}`
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
</style>