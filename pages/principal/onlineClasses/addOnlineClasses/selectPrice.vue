<template>
  <view class="container margin">
    <view class="list">
      <view class="item" v-for="(item,index) in selldata" :key="index">
        <view class="title">{{item.name}}</view>
        <view class="desc">
          <text class="s">课时：43课时</text><text class="s">赠送课时：42课时</text>
        </view>
        <view class="desc">
          <text class="s">有效期：36天</text>
        </view>
        <view class="desc">
          <text class="s">签约金额：{{item.subtotal}}元</text>
        </view>
        <view class="action">
          <text class="btn"><i class="cuIcon-post"></i></text>
          <text class="btn"><i class="cuIcon-delete"></i></text>
        </view>
      </view>
    </view>
    <view class="btn-add" @click="toEdit()"><i class="cuIcon-add"></i>添加费用</view>
    <view class="flex flex-direction fixed-bottom" @click="confirm">
      <button class="add-btn">确定</button>
    </view>
  </view>
</template>

<script>
export default{
  data(){
    return {
      itme:{},
      result:{
        courseid:'',
      },
      selldata:[]
    }
  },
  onLoad(options){
    this.result.courseid = options.courseid;
    this.selldata = JSON.parse(options.selldata);
  },
  methods:{
    toEdit(data){
      uni.navigateTo({
        url: './editPrice'
      })
    },
    setData(data){
      if(data.price){
        var cur = this.selldata.find(a=>a._id==data.price._id);
        if(cur){
          for(let i in cur){
            cur[i]=data.price[i];
          }
        }else{
          this.selldata.push(data.price)
        }
      }
    },
    confirm(){
      this.prePage().setData({selldata: this.selldata});
      uni.navigateBack()
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
    padding: 20rpx;
    position: relative;
    .title{
      font-weight: 400;
    }
    .desc{
      color: #999;
      .s{
        margin-right: 20rpx;
      }
    }
    .action{
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
      .btn{
        padding: 0 15rpx;
      }
    }
  }
}
.btn-add{
  display: block;
  line-height: 70rpx;
  text-align: center;
  margin: 30rpx 0;
  border: 1px solid $uni-color-base;
  color: $uni-color-base;
  background: #fff;
}
</style>
