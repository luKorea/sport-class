<template>
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">接受者</view>
      <view class="action">
        <text class="text-gray text-sm">{{ info.user }}</text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">标题</view>
      <view class="action">
        <text class="text-gray text-sm">{{ info.title }}</text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom">
      <view class="action">内容</view>
    </view>
    <view class="cu-bar bg-white">
      <view class="action">
        <rich-text :nodes="info.content"></rich-text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom">
      <view class="action">图片上传</view>
    </view>
    <view class="cu-list grid col-4 no-border margin-bottom">
      <view class="cu-item flex justify-center align-center"
            v-for="(item, index) in info.imgList" :key="index"
      >
        <view class="cu-avatar xl bg-white"
              :style="{backgroundImage: `url(${item})`}"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      info: {
        user: '李老师,刘老师,张老师,黄老师',
        title: '2020课程测试',
        content: '<div>上课表现很好</div>',
        imgList: [
          'http://yundongke.gzbigbang.cn/logo.png', 'http://yundongke.gzbigbang.cn/logo.png',
          'http://yundongke.gzbigbang.cn/logo.png', 'http://yundongke.gzbigbang.cn/logo.png',
          'http://yundongke.gzbigbang.cn/logo.png', 'http://yundongke.gzbigbang.cn/logo.png',
          'http://yundongke.gzbigbang.cn/logo.png', 'http://yundongke.gzbigbang.cn/logo.png',
        ]
      }
    }
  },
}
</script>

<style scoped>

</style>