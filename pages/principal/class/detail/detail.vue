<template>
  <view class="class-container">
    <!--学员区域-->
    <view class="tabNav">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(index)"
            :class="currentTab === index ? 'cur' : ''">
        <text>{{item}}</text>
      </view>
    </view>
    <!--基础资料-->
    <view id="tab1" class="margin-top-sm" :class="tab1">
      <basic-component :classId="classId" :courseid="courseid"  />
    </view>
    <!--班级学生-->
    <view id="tab2" class="margin-top-sm" :class="tab2">
      <students-component :classId="classId" :courseid="courseid"  />
    </view>
    <!--上课情况-->
    <view id="tab3" class="margin-top-sm" :class="tab3">
      <classes-component :classId="classId" :courseid="courseid" />
    </view>
    <!--班级排课-->
    <view id="tab4" class="margin-top-sm" :class="tab4">
      <scheduling-component :classId="classId" :courseid="courseid"  />
    </view>
  </view>
</template>

<script>
import BasicComponent from './components/basic';
import StudentsComponent from './components/students';
import ClassesComponent from './components/classes';
import SchedulingComponent from './components/scheduling';

import {getClassDetails} from '../../../../api/principal/class';

export default {
  components: {
    BasicComponent,
    StudentsComponent,
    ClassesComponent,
    SchedulingComponent
  },
  data() {
    return {
      classId: '',
      courseid: '',
      navTab: ['基础资料', '班级学生', '上课情况', '班级排课'],
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      tab3: 'tabhide',
      tab4: 'tabhide',
    }
  },
  onLoad(options) {
    let {id, courseid} = options;
    this.classId = String(id);
    this.courseid = String(courseid);
  },
  methods: {
    setCurrentTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      if (index === 0) {
        this.tab1 = 'tabshow';
        this.tab2 = 'tabhide';
        this.tab3 = 'tabhide';
        this.tab4 = 'tabhide';
      } else if (index === 1) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabshow';
        this.tab3 = 'tabhide';
        this.tab4 = 'tabhide';
      } else if (index === 2) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabhide';
        this.tab3 = 'tabshow';
        this.tab4 = 'tabhide';
      } else if (index === 3) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabhide';
        this.tab3 = 'tabhide';
        this.tab4 = 'tabshow';
      }
    },
  }
}
</script>

<style>
.tabNav {
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 102rpx;
  line-height: 102rpx;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  text-align: center;
}
.tabNav> view {
  text-align: center;
}
.tabNav> view:last-child {
  margin-right: 0;
}
.tabNav> view text {
  height: 90rpx;
  line-height: 90rpx;
  display: inline-block;
}
.tabNav .cur text {
  border-bottom: 5rpx solid #F40001;
  color: #F40001;
}
.tabshow{
  visibility: visible;
  display: block;
}
.tabhide{
  visibility: hidden;
  display: none;
}
</style>
