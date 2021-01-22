<template>
  <view class="margin comment-page-container">
    <view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级名称</view>
        <view class="action">{{ info.className }}</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">课程名称</view>
        <view class="action">{{ info.gradeName }}</view>
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">上课时间</view>
        <view class="action">{{ info.time }}</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">授课课时</view>
        <view class="action text-red">{{ info.teaching }}课时</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="margin-right">点名情况</text>
          <text>{{ info.named }} 人</text>
        </view>
        <view class="action">
          <text class="margin-right">约课情况</text>
          <text>{{ info.named }} 人</text>
        </view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">上课老师</view>
        <view class="action text-red">{{ info.teacher }}</view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom text-center">
      <view class="action text-center">姓名</view>
      <view class="action text-center">剩余课时</view>
      <view class="action text-center">到课状态</view>
      <view class="action text-center">操作</view>
    </view>
    <block v-if="info.userInfo.length > 0">
      <view class="cu-bar bg-white solid-bottom text-center"
            v-for="(item, index) in info.userInfo" :key="index">
        <view class="action">{{ item.name }}</view>
        <view class="action">剩余{{ item.time }}课时</view>
        <view class="action">
          <button class="cu-btn sm bg-my-red border" v-if="item.status === 1">
            未点名
          </button>
        </view>
        <view class="action" v-if="item.opt === 1">
          <button class="cu-btn sm bg-orange border" v-if="item.opt === 1">未点评
          </button>
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
  name: "commentsPage",
  data() {
    return {
      info: {
        className: '体育',
        gradeName: '篮球',
        time: '2021-01-19  16:00:00-17:00:00',
        teaching: 1,
        named: '0 / 2',
        aboutClass: '0 / 2',
        teacher: '谢老师',
        userInfo: [
          {
            id: 1,
            name: '黄晓明',
            time: 1,
            status: 1,
            opt: 1
          },
          {
            id: 2,
            name: '黄晓明',
            time: 1,
            status: 1,
            opt: 1
          }
        ]
      }
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
  }
}
</script>

<style scoped>

</style>