<template>
  <view class="container">
    <view class="uhead">
      <view class="avatar"><image :src="$uploadUrl + detail.info.avatar" mode="scaleToFill"></image><i class="cuIcon-my" v-if="!detail.info.avatar"></i></view>
      <view class="u-name">{{detail.info.name}}</view>
      <view class="desc">{{detail.info.flags|constant('student.flags')}}</view>
      <view class="desc">不明确</view>
      <view class="control">
        <view class="btn right">查看资料</view>
        <view class="btn">报名</view>
        <view class="btn">试课</view>
      </view>
    </view>
    <view class="uadd">
      <i class="cuIcon-add"></i>添加跟进记录
    </view>
    <view class="steps">
      <view class="item">
        <view class="wrapper">
          <view class="title">
            <text class="time">2020-12-09 12:10:11</text>
            <text class="name">谢老师</text>
          </view>
          <view class="info">
            <text class="s">跟进状态：待跟进</text>
            <text class="s">意向级别：不明确</text>
          </view>
          <view class="info">我们在工作</view>
          <view class="date">
            下次跟进：2020-12-09
          </view>
        </view>
      </view>
      <view class="item">
        <view class="wrapper">
          <view class="title">
            <text class="time">2020-12-09 12:10:11</text>
            <text class="name">谢老师</text>
          </view>
          <view class="info">
            <text class="s">跟进状态：待跟进</text>
            <text class="s">意向级别：不明确</text>
          </view>
          <view class="date">
            下次跟进：2020-12-09
          </view>
        </view>
      </view>
    </view>
    <view class="empty" v-if="!followuprecord.length">跟进记录空空的</view>
  </view>
</template>

<script>
export default {
  name: "detail",
  data(){
    return {
      id: '',
      detail:{info:{},extendfield:[],extentdatalist:[]},
      followuprecord:[]
    }
  },
  onLoad(options){
    this.id = options.id;
    this.getData()
  },
  methods:{
    getData(){
      this.$api.student.info({id: this.id}).then(res=>{
        this.detail = res.data.data
      })
    },
    getFollow(){
      this.$api.student.followup({studentid: this.id}).then(res=>{
        this.followuprecord = res.data.data.followuprecord ||[]
      })
    }
  }
}
</script>

<style scoped lang="scss">
  page{
    background-color: $uni-bg-color-grey;
  }
.uhead{
  background-color: $uni-color-base;
  color: #fff;
  padding: 20rpx 40rpx;
  position: relative;
  .avatar{
    position: absolute;
    width: 160rpx;
    height: 160rpx;
    right: 40rpx;
    top:20rpx;
    image{
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 50%;
    }
  }
  .u-name{
    font-size: 40rpx;
    font-weight: 700;
  }
  .control{
    margin-top: 50rpx;
    .btn{
      display: inline-block;
      background:#feffed;
      margin-right: 20rpx;
      color: $uni-color-base;
      padding: 0 35rpx;
      border-radius: 60rpx;
    }
    .right{
      float: right;
      margin-right: 0;
    }
  }
}
.uadd{
  padding: 20rpx 30rpx;
  background-color: #fff;
}
.steps{
  padding: 20rpx 0;
  .item{
    margin: 0 30rpx;
    padding-left: 40rpx;
    position: relative;
    &:before{
      content: "";
      display: block;
      background-color: $uni-color-base;
      width: 1px;
      top:30rpx;
      bottom: -50rpx;
      left:0;
      position: absolute;
    }
    &:last-child:before{
      display: none;
    }
    &:after{
      content: "";
      display: block;
      position: absolute;
      width: 20rpx;
      height: 20rpx;
      background: $uni-color-base;
      border-radius: 50%;
      left:0;
      transform: translateX(-50%);
      top: 30rpx;
    }
    .wrapper{
      background-color: #fff;
      padding: 20rpx;
      margin-bottom: 20rpx;
    }
    .title{
      .time{
        float: right;
        color: #999;
      }
    }
    .info{
      .s{
        margin-right: 50rpx;
      }
    }
    .date{
      margin-top: 20rpx;
      color: $uni-color-base;
    }
  }
}
.empty{
  text-align: center;
  padding: 30rpx 0;
  color: #999;
}
</style>