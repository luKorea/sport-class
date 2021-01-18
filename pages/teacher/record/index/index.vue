<!-- TODO 教师端 成长记录 -->
<template>
  <view class="record-container">
    <!--学员区域-->
    <view class="tabNav">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(index)"
            :class="currentTab === index ? 'cur' : ''">
        <text>{{item}}</text>
      </view>
    </view>
    <!--班级-->
    <view id="tab1" class="margin" :class="tab1">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入班级名称" v-model="searchGradeInput"/>
        </view>
        <view class="action" @click="searchGrade">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
         <view class="margin-left" @click="showDrawerClass">
           <text>筛选</text>
           <text class="cuIcon-triangledownfill text-gray"></text>
         </view>
        </view>
        <!--筛选侧边栏-->
        <uni-drawer ref='drawerClass' mode="right">
          <!--头部-->
          <view class="solids-bottom flex align-center justify-center">
            <view class="padding">筛选</view>
          </view>
          <!--内容区域-->
          <view class="cu-form-group cu-bar bg-white">
            <view class="title">模板类型</view>
            <picker @change="bindTemplateChange($event, templateArray)" :value="templateIndex" :range="templateArray" range-key="label">
              <view class="picker">{{templateArray[templateIndex].label}}</view>
            </picker>
          </view>
          <!--底部区域-->
          <view class="drawer-footer">
            <button class="bg-gray lg" style="width: 50%;" @click="closeDrawerClass">关闭</button>
            <button class="bg-my-red lg" style="width: 50%;" @click="searchData">确定</button>
          </view>
        </uni-drawer>
      </view>
      <view class="cu-bar bg-white margin-top" v-for="item in result.grade" :key="item.id">
        <view class="action flex-direction">
          <view class="flex-due">
            <view style="margin: 16rpx 0 0 0" class="text-sm">
              <text class="ban-red">班</text>
              <text>{{item.class}}</text>
            </view>
            <view style="margin: 16rpx 0"  class="text-sm text-gray">{{item.template}}</view>
            <view class="text-sm text-gray">{{item.time}}</view>
            <view style="margin: 16rpx 0" class="text-sm text-gray">{{item.content}}</view>
          </view>
        </view>
        <view class="action">
          <text class="text-orange">{{item.type === 0 ? '已推送' : '未推送'}}</text>
        </view>
      </view>
    </view>
    <!--学员-->
    <view id="tab2" class="margin" :class="tab2">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入班级名称" v-model="searchGradeInput"/>
        </view>
        <view class="action" @click="searchGrade">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
          <view class="margin-left" @click="showDrawer">
            <text>筛选</text>
            <text class="cuIcon-triangledownfill text-gray"></text>
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
            <view class="title">模板类型</view>
            <picker @change="bindTemplateChange($event, templateArray)" :value="templateIndex" :range="templateArray" range-key="label">
              <view class="picker">{{templateArray[templateIndex].label}}</view>
            </picker>
          </view>
          <!--底部区域-->
          <view class="drawer-footer">
            <button class="bg-gray lg" style="width: 50%;" @click="closeDrawer">关闭</button>
            <button class="bg-my-red lg" style="width: 50%;" @click="searchData">确定</button>
          </view>
        </uni-drawer>
      </view>
      <view class="cu-bar bg-white margin-top" v-for="item in result.student" :key="item.id">
        <view class="action flex-direction">
          <view class="flex-due">
            <view style="margin: 16rpx 0 0 0" class="text-sm">
              <text class="ke-orange">课</text>
              <text>{{item.class}}</text>
            </view>
            <view class="text-sm text-gray" style="margin: 16rpx 0">{{item.template}}</view>
            <view class="text-sm text-gray">{{item.time}}</view>
            <view class="text-sm text-gray" style="margin: 16rpx 0">{{item.content}}</view>
          </view>
        </view>
        <view class="action">
          <text class="text-orange">{{item.type === 0 ? '已推送' : '未推送'}}</text>
        </view>
      </view>
    </view>

<!--添加-->
    <view class="flex flex-direction fixed-bottom">
      <button class="add-btn" @click="addRecord">+ 添加</button>
    </view>
  </view>
</template>

<script>
import {formatTime} from "../../../../utils";

export default {
  data() {
    return {
      navTab: ['班级', '学员'],
      searchGradeInput: '',
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      result: {
        student: [
          {
            id: 1,
            class: '2020课程测试',
            template: '阶段评测',
            time: formatTime(new Date()),
            content: '还可以',
            type: 0
          },
          {
            id: 2,
            class: '2020课程测试',
            template: '阶段评测',
            time: formatTime(new Date()),
            content: '还可以',
            type: 0
          }
        ],
        grade: [
          {
            id: 1,
            class: '2020课程测试',
            template: '阶段评测',
            time: formatTime(new Date()),
            content: '还可以',
            type: 0
          },
          {
            id: 2,
            class: '2020课程测试',
            template: '阶段评测',
            time: formatTime(new Date()),
            content: '还可以',
            type: 0
          }
        ],
      },
      // 选择模板类型
      form: {},
      templateIndex: 0,
      templateArray: [
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
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
  },
  methods: {
    setCurrentTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      if (index === 0) {
        this.tab1 = 'tabshow';
        this.tab2 = 'tabhide';
      } else if (index === 1) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabshow';
      }
    },
    // 选择课程
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    showDrawerClass() {
      this.$refs['drawerClass'].open();
    },
    closeDrawerClass() {
      this.$refs['drawerClass'].close();
    },
    searchData() {
      console.log(this.form);
    },
    bindTemplateChange(e, data) {
      const {value} = e.detail;
      this.templateIndex = value;
      this.form.template = data[this.templateIndex].id;
    },
    searchGrade() {
      console.log(this.searchGradeInput);
    },
    addRecord() {
      wx.navigateTo({
        url: '../addRecord/addRecord'
      })
    }
  }
}
</script>

<style scoped>
.flex-due {
  justify-content: start;
  align-items: start;
  width: 100%;
}

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

.record-container .add-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background-color: #F4313E;
  color: #fff;
  font-family: Source Han Sans CN;
  font-weight: 400;
  border: none;
  border-radius: 0;
}
</style>
