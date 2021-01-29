<template>
  <view>
    <calendar :extra-data="extraData"
              @calendarTap="calendarTap"
              :showDot="true"
              :showText="false"
              @monthTap="monthTap"></calendar>

    <block v-if="list.length > 0">
      <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <view class="action flex-common padding-top padding-bottom">
          <text class="margin-bottom-sm">{{item.className}}</text>
          <text class="text-gray text-sm">{{item.teacherName}}</text>
        </view>
        <view class="action">
          <button class="cu-btn bg-orange">查看</button>
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
import calendar from "../../../../components/tale-calendar/calendar";

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
          className: '2020通用课程',
          teacherName: '陈老师'
        },
        {
          id: 2,
          className: '2020通用课程',
          teacherName: '陈老师'
        }, {
          id: 3,
          className: '2020通用课程',
          teacherName: '陈老师'
        },
        {
          id: 4,
          className: '2020通用课程',
          teacherName: '陈老师'
        },
        {
          id: 5,
          className: '2020通用课程',
          teacherName: '陈老师'
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
    goDetail(id) {
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
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