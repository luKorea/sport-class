<!-- TODO 教师端 学员详情 -->
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
      <basic-component :studentId='studentId' />
    </view>
    <!--报读班级-->
    <view id="tab2" class="margin-top-sm" :class="tab2">
      <report-component :studentId='studentId'  />
    </view>
    <!--报名记录-->
    <view id="tab3" class="margin-top-sm" :class="tab3">
      <recording-component :studentId='studentId' />
    </view>
    <!--跟进记录-->
    <view id="tab4" class="margin-top-sm" :class="tab4">
      <follow-component :studentId='studentId' />
    </view>
  </view>
</template>

<script>
import BasicComponent from './components/basic';
import ReportComponent from './components/report';
import RecordingComponent from './components/recording';
import FollowComponent from './components/follow';
export default {
  components: {
    BasicComponent,
    RecordingComponent,
    ReportComponent,
    FollowComponent
  },
  data() {
    return {
      studentId: '',
      navTab: ['基础资料', '报读班级', '报名记录', '跟进记录'],
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      tab3: 'tabhide',
      tab4: 'tabhide',
    }
  },
  onLoad(options) {
    let {id} = options;
    this.studentId = Number(id);
    console.log(typeof this.studentId);
  },
  onShow() {
  	uni.$emit('onShow')
  },
  onReachBottom() {
  	uni.$emit('onReachBottom');
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
