<template>
  <view style="padding-bottom: 100rpx">
    <calendar :extra-data="extraData"
              @calendarTap="calendarTap"
              :showDot="true"
              :showText="false"
              @monthTap="monthTap"></calendar>
    <block v-if="list.length > 0">
     <view class="margin">
       <view  v-for="item in list" :key="item.id">
         <view class="margin-top bg-white cu-bar solid-bottom" @click="goTransferClass(item.id)">
           <view class="action flex-due margin-top margin-bottom">
             <view class="margin-bottom-sm">
               <text class="cuIcon-title text-gray text-sm"></text>
               <text class="text-sm">{{item.time}}</text>
             </view>
             <view>
               <text class="cuIcon-title text-gray text-sm"></text>
               <text class="text-sm">上课老师：{{item.name}}</text>
             </view>
           </view>
           <view class="action flex flex-end margin-top margin-bottom">
             <view class="margin-bottom-sm">
               <text class="cuIcon-right" style="padding-left: 190rpx"></text>
             </view>
             <view>
               <text class="cuIcon-title text-gray text-sm"></text>
               <text class="text-sm">授课课时：{{item.classTime}} 课时</text>
             </view>
           </view>
         </view>
         <view class="bg-white cu-bar text-center justify-around">
           <view class="action text-center text-red text-sm" @click="goNamedPage(item.id)">
             <text class="text-sm">点名 {{item.number}}</text>
           </view>
           <view class="action text-center text-orange text-sm" @click="goCommentsPage(item.id)">
             <text class="text-sm">点评 {{item.scope}}</text>
           </view>
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

    <view class="drawer-footer footer-class" @click="goClassSchedule">
      <text class="text-center text-red">没有排课？未排课直接考勤</text>
    </view>
  </view>

</template>

<script>
import calendar from "../../../../../components/tale-calendar/calendar";

export default {
  name: "index",
  components: {
    calendar
  },
  data() {
    return {
      extraData: [],
      list: [
        {
          id: 1,
          name: '谢老师',
          date: '2020-12-12 星期四',
          time: '16:00-17:00',
          classTime: 1,
          number: '3/10',
          scope: '4/5'
        },
        {
          id: 2,
          name: '谢老师',
          date: '2020-12-12 星期四',
          time: '16:00-17:00',
          classTime: 2,
          number: '3/10',
          scope: '4/5'
        },
        {
          id: 3,
          name: '谢老师',
          date: '2020-12-12 星期四',
          time: '16:00-17:00',
          classTime: 3,
          number: '3/10',
          scope: '4/5'
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
    goTransferClass(id) {
      wx.navigateTo({
        url: `../transferClass/transferClass?id=${id}`
      })
    },
    goClassSchedule() {
      wx.navigateTo({
        url: '/pages/common/classSchedule/classSchedule'
      })
    },
    goNamedPage(id) {
      wx.navigateTo({
        url: `/pages/common/namedPage/namedPage?id=${id}`
      })
    },
    goCommentsPage(id) {
      wx.navigateTo({
        url: `/pages/common/commentsPage/commentsPage?id=${id}`
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
.flex-end {
  flex-direction: column;
  justify-content: end;
  align-items: end;
}
</style>