<!-- TODO 校长端 底部 -->
<template>
  <view>
		 <view class="cu-bar tabbar bg-white footer">
		    <view class="action">
		      <view class="cuIcon-cu-image">
		        <image :src="imageurl + '/jiaowu.png'"></image>
		      </view>
		      <view class="text-red">教务</view>
		    </view>
		   <view class="action">
		      <view class="cuIcon-cu-image">
		        <image :src="imageurl + '/xiaoshou.png'"></image>
		      </view>
		      <view class="text-gray">销售</view>
		    </view>
		    <view class="action">
		      <view class="cuIcon-cu-image">
		        <image :src="imageurl + '/wode.png'"></image>
		      </view>
		      <view class="text-gray">我的</view>
		    </view>
		  </view>
		  <view class="footertop"></view>
  </view>
</template>

<script>
export default {
  data() {
	return {
		imageurl:''
	}
  },
  created() {
		this.imageurl = this.image
  },
  onLoad(options) {
		console.log(this.imageurl)
  },
  methods: {
    
  }
}
</script>

<style>
.footer{
	position: fixed;
	bottom:0;
	width: 100%;
}
.footer image{
	width: 15rpx;
	height: 15rpx;
}
.footertop{
	width: 100%;
	height: 50px;
}
</style>