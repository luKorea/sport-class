<template>
  <view class="container">
    <view class="list">
      <view class="item item-arrow">
        <view>
          <view>{{detail.studentname}}</view>
          <view>{{detail.contact}}</view>
        </view>
        <view class="notes">{{getStatus(detail.flags)}}</view>
        <view class="arrow-right"><i class="cuIcon-right"></i></view>
      </view>
    </view>
  </view>
</template>

<script>
export default{
  data(){
    return {
      detail:{},
      id: ''
    }
  },
  onLoad(options){
    this.id = options.id
    this.getDetail()
  },
  methods:{
      getDetail(){
        this.$api.lessonwork.lessonrecordinfo({lessonworkrecordid:this.id}).then(res=>{
          this.detail = res.data.data;
        }).finally(()=>{
          uni.stopPullDownRefresh();
        })
      },
      getStatus(val){
        //标记(1=学生已查看、2=学生已提交、4=老师已批阅)
        var map = {0: '未查看',1: '已查看',2:'已提交',4:'已批阅'}
        return map[val]||val
      }
  }
}
</script>

<style lang="scss">
  page{
    background-color: $uni-bg-color-grey;
  }
  .list{
    .item{
      background: #fff;
      padding: 30rpx;
      margin: 30rpx;
      border-bottom: 1px solid $uni-border-color;
      position: relative;
      padding-right: 60rpx;
      display: flex;
      
      .notes{
        position: absolute;
        right: 60rpx;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }
      .arrow-right{
        position: absolute;
        top: 50%;
        right: 30rpx;
        transform: translateY(-50%);
      }
      .notes{
        
      }
    }
  }
</style>
