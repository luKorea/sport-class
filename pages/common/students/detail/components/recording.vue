<!-- TODO 老师端 学员 报名记录 -->
<template>
  <view class="margin recording-container">
   <block v-if="list.length > 0">
     <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id">
       <view class="action flex-direction flex-due">
         <view style="margin: 20rpx 0" class="text-sm">
           <text class="ke-orange">课</text>
           <text>{{item.grade}}</text>
         </view>
         <view class="text-sm">订单号: {{item.order}}</view>
         <view style="margin: 20rpx 0" class="text-sm">按课时: {{item.classTime}}课时</view>
       </view>
       <view class="action flex-direction flex-due">
         <view style="margin: 20rpx 0" class="text-sm">课程总额: {{item.money}} 元</view>
         <view class="text-sm">报名时间: {{item.time}}</view>
         <view style="margin: 20rpx 0" class="text-sm">到期日期: {{item.due}}</view>
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

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          grade: '2020通用课程',
          order: '23456789789872',
          classTime: 1,
          money: 1000,
          time: '2020-01-01',
          due: '无限制'
        },
        {
          id: 2,
          grade: '2020通用课程',
          order: '2345678978987',
          classTime: 1,
          money: 1000,
          time: '2020-01-01',
          due: '无限制'
        },
        {
          id: 3,
          grade: '2020通用课程',
          order: '2345678978987',
          classTime: 1,
          money: 1000,
          time: '2020-01-01',
          due: '无限制'
        },
        {
          id: 4,
          grade: '2020通用课程',
          order: '2345678978987',
          classTime: 1,
          money: 1000,
          time: '2020-01-01',
          due: '无限制'
        },
        {
          id: 5,
          grade: '2020通用课程',
          order: '2345678978987',
          classTime: 1,
          money: 1000,
          time: '2020-01-01',
          due: '无限制'
        },
        {
          id: 6,
          grade: '2020通用课程',
          order: '2345678978987',
          classTime: 1,
          money: 1000,
          time: '2020-01-01',
          due: '无限制'
        }
      ]
    }
  },
}
</script>

<style scoped>
.flex-due {
  justify-content: start;
  align-items: start;
}
</style>