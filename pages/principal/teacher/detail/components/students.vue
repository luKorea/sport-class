<template>
  <view class="margin">
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action">
            <view class="flex flex-direction padding-top-sm padding-bottom-sm">
              <view class="margin-bottom-sm">
                <text class="margin-right-sm">{{ item.name }}</text>
                <text class="margin-right-sm">
                  <text v-if="item.sex === 0"
                        class="cuIcon-male text-blue"></text>
                  <text v-else class="cuIcon-female text-pink"></text>
                </text>
                <text>{{ item.phone }}</text>
              </view>
              <view class="text-gray text-sm">
                <text v-if="item.time > 0">剩余
                  <text class="text-red">{{ item.time }}</text>
                  课时
                </text>
                <text v-else>无可用课时</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <block wx:else>
      <view
          class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "students",
  data() {
    return {
      list: [
        {
          id: 1,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 8
        },
        {
          id: 2,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 1,
          time: 8
        },
        {
          id: 3,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 0
        },
        {
          id: 4,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 1,
          time: 8
        },
        {
          id: 5,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 0
        },
        {
          id: 5,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 0
        },
      ]
    }
  },
}
</script>

<style scoped>

</style>