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
          <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
            <view class="action flex-common padding-top padding-bottom">
              <text class="margin-bottom-sm">{{item.time}}</text>
              <text class="text-gray text-sm margin-bottom-sm">
                <text class="text-gray text-sm margin-right">班级：{{item.className}}</text>
                <text class="text-type">{{item.type}}</text>
              </text>
              <text class="margin-bottom-sm text-gray text-sm">学生人数：{{item.studentNumber}}</text>
              <text class="text-gray text-sm">上课课时：{{item.timeNumber}}</text>
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
                  <text class="margin-right">学生：{{ item.number }}人</text>
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

export default {
  name: "index",
  components: {
    calendar
  },
  data() {
    return {
      showModal: false,
      classArray: [
        {
          id: 1,
          name: '高一一班',
          teacher: '李老师',
          number: 10,
          type: '1v1'
        },
        {
          id: 2,
          name: '高一二班',
          teacher: '李老师',
          number: 10,
          type: '1vN'
        },
        {
          id: 3,
          name: '高一三班',
          teacher: '李老师',
          number: 10,
          type: '1v1'
        },
        {
          id: 4,
          name: '高一四班',
          teacher: '李老师',
          number: 10,
          type: '1vN'
        },
      ],
      searchInput: '',
      extraData: [],
      list: [
        {
          id: 1,
          className: '2020通用课程',
          type: '1v1',
          studentNumber: '0/2',
          timeNumber: 1,
          time: '09:00-10:00'
        },
        {
          id: 2,
          className: '2020通用课程',
          type: '1v1',
          studentNumber: '0/2',
          timeNumber: 1,
          time: '09:00-10:00'
        }, {
          id: 3,
          className: '2020通用课程',
          type: '1v1',
          studentNumber: '0/2',
          timeNumber: 1,
          time: '09:00-10:00'
        },
        {
          id: 4,
          className: '2020通用课程',
          type: '1v1',
          studentNumber: '0/2',
          timeNumber: 1,
          time: '09:00-10:00'
        },
        {
          id: 5,
          className: '2020通用课程',
          type: '1v1',
          studentNumber: '0/2',
          timeNumber: 1,
          time: '09:00-10:00'
        }
      ]
    }
  },
  created() {
    this.extraData = [
      {date: '2021-01-18', dot: true},
      {date: '2021-01-21', dot: true},
      {date: '2021-01-22', dot: true},
      {date: '2021-01-1', dot: true},
      {date: '2021-01-6', dot: true},
      {date: '2021-01-25', dot: true},
      {date: '2021-01-9', dot: true},
      {date: '2021-01-27', dot: true}
    ];
  },
  methods: {
    calendarTap(e) {
      console.log(e);
    },
    monthTap(val) {
      console.log(val);
      let {year, month} = val;
      this.month = {
        year: year,
        month: month,
      }
      console.log(this.extraData);
      // 此处获取动态的数据，赋值给extraData
      this.extraData = this.extraData;
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
            console.log(res.result);
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
      wx.navigateTo({
        url: `/pages/common/classSchedule/classSchedule?id=${value}`
      })
    },
    goDetail(id) {
      wx.navigateTo({
        url: `/pages/common/namedPage/namedPage?id=${id}`
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