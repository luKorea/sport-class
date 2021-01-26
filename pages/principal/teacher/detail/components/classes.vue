<template>
  <view class="margin">
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action">
            <view class="flex flex-direction padding-top padding-bottom">
              <view class="margin-bottom-sm">
                <text class="ban-red">班</text>
                <text class="margin-right">{{item.ban}}</text>
                <text class="text-type">{{item.type}}</text>
              </view>
              <view class="margin-bottom-sm">
                <text class="ke-orange">课</text>
                <text>{{item.ke}}</text>
              </view>
              <view>
                <text class="ren-green">人</text>
                <text>学生: {{item.number}} 人</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <block wx:else>
      <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "classes",
  data() {
    return {
      list: [
        {
          id: 1,
          ban: '2020通用课程',
          ke: '篮球',
          number: 10,
          type: '1v1'
        },
        {
          id: 2,
          ban: '2020通用课程',
          ke: '篮球',
          number: 88,
          type: '1v1'
        },
        {
          id: 3,
          ban: '2020通用课程',
          ke: '篮球',
          number: 66,
          type: '1v1'
        },
        {
          id: 4,
          ban: '2020通用课程',
          ke: '篮球',
          number: 20,
          type: '1v1'
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>