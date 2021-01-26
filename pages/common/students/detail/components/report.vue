<!-- TODO 老师端 学员 报读班级 -->
<template>
  <view class="margin report-container">
   <block v-if="list.length > 0">
     <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id">
       <view class="action flex-direction flex-due">
         <view style="margin: 20rpx 0" class="text-sm">
           <text class="ke-orange">课</text>
           <text>{{item.grade}}</text>
         </view>
         <view class="text-sm">剩余<text class="text-red">{{item.time}}</text>课时</view>
         <view style="margin: 20rpx 0" class="text-sm">
           <text class="ban-red">班</text>
           <text>{{item.class}}</text>
         </view>
       </view>
       <view class="action flex-direction">
         <view style="margin: 20rpx 0" class="text-sm">
           <button class="cu-btn sm bg-orange" @click="sendPhone">选班</button>
         </view>
         <view style="margin: 20rpx 0" class="text-sm">
           <button class="cu-btn sm" style="background-color: #F4313E; color: #fff" @click="sendPhone">退班</button>
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

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          grade: '2020通用课程',
          class: '测试',
          type: '一对多',
          time: 1
        },
        {
          id: 2,
          grade: '2020通用课程',
          class: '测试',
          type: '一对多',
          time: 1
        },
        {
          id: 3,
          grade: '2020通用课程',
          class: '测试',
          type: '一对多',
          time: 1
        },
        {
          id: 4,
          grade: '2020通用课程',
          class: '测试',
          type: '一对多',
          time: 1
        },
        {
          id: 5,
          grade: '2020通用课程',
          class: '测试',
          time: 1
        },
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