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
        <picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="title">
          <view class="picker">{{ gradeArray[gradeIndex].title }}</view>
        </picker>
      </view>
      <view class="cu-form-group cu-bar bg-white">
        <view class="title">选择班级</view>
        <picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="name">
          <view class="picker">{{ classArray[classIndex].name }}</view>
        </picker>
      </view>
      <view class="cu-form-group cu-bar bg-white">
        <view class="title">选择老师</view>
        <picker @change="bindTeacherChange($event, teacherArray)" :value="teacherIndex" :range="teacherArray" range-key="name">
          <view class="picker">{{ teacherArray[teacherIndex].name }}</view>
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
      <view  v-for="(item, index) in list" :key="index" @click="goNamePage(item.id)">
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
          class=" margin-top cu-form-group cu-bar bg-white flex justify-center align-center">
        <view class="title">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
import {getDate} from "../../../../../utils";
import {
  failTip
} from '../../../../../utils/tip.js';
import {
  getAboutList,
  setTime
} from '../../../../../api/common/classRecord.js';
import {
  getClassSelect,
  getCourseSelect,
  getTeacherSelect
} from "../../../../../api/select";
export default {
  data() {
    const currentStartDate = getDate({format: true})
    const currentEndDate = getDate({format: true})
    return {
      params: {
        pi: 1,
        ps: 20
      },
      total: null,
      startDate: currentStartDate,
      endDate: currentEndDate,
      // 选择班级
      classIndex: 0,
      classArray: [{
        id: '',
        name: '所有班级'
      }],
      // 选择课程
      gradeIndex: 0,
      gradeArray: [{
        id: '',
        title: '所有课程'
      }],
      // 选择老师
      teacherIndex: 0,
      teacherArray: [{
        id: '',
        name: '所有老师'
      }],
      list: []
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
  mounted() {
    let that = this;
    that.getData(that.params);
    that.getClass();
    that.getGrade();
    that.getTeacher();
    uni.$on('onShow', (e) => {
      that.params['ps'] = 20;
      that.getData(that.params)
    })
    uni.$on('onReachBottom', function(data) {
      if (that.params.ps > that.total) {
        uni.showToast({
          icon: 'none',
          title: '已经没有更多数据啦'
        })
        return;
      } else {
        that.getData({
          ...that.params,
          ps: that.params.ps += 20
        })
      }
    });
  },
  methods: {
    getData(params) {
      getAboutList(params)
          .then(res => {
            this.total = res.data.data.page.total;
            this.list = res.data.data.list;
            console.log(this.list);
          }).catch(err => console.log(err));
    },
    // 筛选区域
    // 选择班级
    getClass() {
      getClassSelect()
          .then(res => {
            this.classArray = this.classArray.concat(res.data.data.list);
          }).catch(err => console.log(err));
    },
    bindClassChange(e, data) {
      const {
        value
      } = e.detail;
      this.classIndex = value;
      this.params.classid = data[this.classIndex].id;
    },
    // 选择课程
    getGrade() {
      getCourseSelect()
          .then(res => {
            this.gradeArray = this.gradeArray.concat(res.data.data);
          }).catch(err => console.log(err));
    },
    bindGradeChange(e, data) {
      const {
        value
      } = e.detail;
      this.gradeIndex = value;
      this.params.courseid = data[this.gradeIndex].id;
    },
    // 选择老师
    getTeacher() {
      getTeacherSelect()
          .then(res => {
            this.teacherArray = this.teacherArray.concat(res.data.data);
          }).catch(err => console.log(err));
    },
    bindTeacherChange(e, data) {
      const {
        value
      } = e.detail;
      this.teacherIndex = value;
      this.params.teacherid = data[this.teacherIndex].id;
    },
    // 开始时间
    bindStartDateChange(e) {
      this.startDate = e.target.value;
      this.params.btime = e.target.value;
    },
    // 结束时间
    bindEndDateChange(e) {
      this.endDate = e.target.value;
      this.params.etime = e.target.value;
      this.getData(this.params);
    },
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    searchData() {
      this.closeDrawer();
      this.getData(this.params);
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