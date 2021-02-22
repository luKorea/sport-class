<template>
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">接受者</view>
      <view class="action">
        <text class="text-gray text-sm">{{ info.target }}</text>
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
	  <view class="action padding-top padding-bottom">
		  <view class="cu-avatar lg bg-white"
		        :style="{backgroundImage: `url(${imgUrl + info.images})`}"
		  ></view>
	  </view>
    </view>
  </view>
</template>

<script>
import {getNoticeDetail} from '../../../../api/principal/notice';
export default {
  name: "detail",
  data() {
    return {
      info: {},
	  imgUrl: this.$uploadUrl
    }
  },
  onLoad(options) {
    let {id} = options;
    this.getDetail(id);
  },
  methods: {
    getDetail(id) {
      getNoticeDetail(id)
      .then(res => {
        this.info = res.data.data.info;
      })
    }
  }
}
</script>

<style scoped>

</style>