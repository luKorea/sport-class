<template>
  <view class="container margin">
    <view class="detail-cover bg-white">
      <image class="img" :src="$uploadUrl + detail.info.cover"></image>
    </view>
    <view class="detail-head bg-white margin-top">
        <view>{{detail.info.title}}</view>
        <view>截止日期：{{detail.info.endtime}}</view>
    </view>
    <view class="cu-bar bg-white margin-top detail-state">
      <view class="action flex-direction">
        <view class="num">{{detail.info.ordernum}}</view>
        <view class="txt">报名</view>
      </view>
      <view class="action flex-direction">
        <view class="num">{{detail.info.hits}}</view>
        <view class="txt">浏览</view>
      </view>
      <view class="action flex-direction">
        <view class="num">{{detail.info.shartnum}}</view>
        <view class="txt">分享</view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top detail-state">
      <view class="action flex-direction" @click="toEdit">
        <view class="num"><i class="cuIcon-edit"></i></view>
        <view class="txt">课程修改</view>
      </view>
      <view class="action flex-direction">
        <view class="num"><i class="cuIcon-roundclose" v-if="detail.info.enable"></i><i v-else class="cuIcon-roundcheck"></i></view>
        <view class="txt" v-if="detail.info.enable">关闭课程</view>
        <view class="txt" v-else>启用课程</view>
      </view>
    </view>
    <view class="cu-bar bg-white detail-state">
      <view class="action flex-direction">
        <view class="num"><i class="cuIcon-friend"></i></view>
        <view class="txt">报名信息</view>
      </view>
      <view class="action flex-direction">
        <view class="num"><i class="cuIcon-share"></i></view>
        <view class="txt">分享课程</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "detail",
  data(){
    return {
      id:'',
      detail:{info:{},cplist:[],crelate:[]}
    }
  },
  onLoad(options){
    this.id = options.id
    this.getData();
  },
  methods:{
    getData(){
      this.$api.course.coursepackinfo({id: this.id}).then(res=>{
        this.detail = res.data.data
      })
    },
    toEdit(){
      uni.navigateTo({
        url: '../addOnlineClasses/addOnlineClasses?data='+encodeURIComponent(JSON.stringify(this.detail.info))
      })
    }
  }
}
</script>

<style scoped lang="scss">
page{
  background: $uni-bg-color-grey;
}
.detail-cover{
  
}
.detail-head{
  padding: 30rpx;
}
.detail-state{
  .action{
    text-align: center;
    flex: 1;
    padding: 20rpx 0;
    .num{
      padding: 20rpx 0;
    }
    .txt{
      color: #999;
    }
  }
}
</style>