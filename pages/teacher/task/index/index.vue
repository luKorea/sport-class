<!-- TODO 老师端 作业首页 -->
<template>
  <view class="follow-container">
    <view class="margin" style="margin-bottom: 140rpx">
        <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id" @click="goDetail(item)">
          <view class="action flex-direction flex-due">
            <view class="text-sm class-block">
              <view class="small-block-orange"></view>
              <text>{{item.title}}</text>
            </view>
            <view class="text-sm">{{item.classname}}</view>
            <view style="margin: 20rpx 0" class="text-sm">{{item.datetime}}</view>
          </view>
          <view class="action flex-direction flex-due">
            <view style="margin: 20rpx 0" class="text-sm">
              <text class="cuIcon-titles text-white"></text>
            </view>
            <view class="text-sm">已阅：{{item.readnum||0}}/{{item.studentcount}}</view>
            <view style="margin: 20rpx 0" class="text-sm">提交：{{item.submitnum||0}}/{{item.studentcount}}</view>
          </view>
        </view>
    </view>
    <uni-load-more :status="loadingType"></uni-load-more>
    <view class="flex flex-direction fixed-bottom">
      <button class="add-btn" @click="addTask">布置作业</button>
    </view>
  </view>
</template>

<script>

import {formatTime} from "../../../../utils";

export default {
  data() {
    return {
      list:[],
      listQuery:{
        paging: true,
        pi: 0,
        ps: 20,
        keywords:''
      },
      loadingType: 'more'
    }
  },
  onLoad() {
    this.loadData()
  },
  //下拉刷新
  onPullDownRefresh(){
  	this.loadData('refresh');
  },
  //加载更多
  onReachBottom(){
  	this.loadData();
  },
  
  methods: {
    loadData(type='add', loading) {
      //没有更多直接返回
      if(type === 'add'){
        if(this.loadingType === 'nomore'){
            return;
        }
        this.loadingType = 'loading';
      }else{
          this.loadingType = 'more'
      }
        if(type === 'refresh'){
          this.listQuery.pi=1
          this.list = [];
          this.loadingType = 'loading';
        }else{
            this.listQuery.pi++;
        }
      //模拟api请求数据
        this.$api.lessonwork.lessonworklist(this.listQuery).then((res)=>{
            this.list = this.list.concat(res.data.data.list);
            //判断是否还有下一页，有是more  没有是nomore(测试数据判断大于30就没有了)
            this.loadingType  = this.list.length >= res.data.data.page.total ? 'nomore' : 'more';
            
        }).catch(()=>{
            this.loadingType = 'nomore';
        }).finally(()=>{
            if(type === 'refresh'){
              if(loading == 1){
                  uni.hideLoading()
              }else{
                  uni.stopPullDownRefresh();
              }
            }
        })
      
    },
    goDetail(data) {console.log('data',data)
      uni.navigateTo({
        url: `../detail/detail?id=${data.id}&readnum=${data.readnum||0}&submitnum=${data.submitnum||0}&studentcount=${data.studentcount||0}`
      })
    },
    addTask() {
      wx.navigateTo({
        url: `../addTask/addTask`
      })
    }
  },
}
</script>

<style lang="scss">
  page{
    background-color: $uni-bg-color-grey;
  }
.flex-due {
  justify-content: start;
  align-items: start;
  width: 100%;
}

.flex-title {
  display: flex;
  flex-direction: column;
}

.follow-container .add-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background-color: #F4313E;
  color: #fff;
  font-family: Source Han Sans CN;
  font-weight: 400;
  border: none;
  border-radius: 0;
}

.class-block {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>