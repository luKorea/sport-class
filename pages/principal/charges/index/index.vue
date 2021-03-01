<template>
  <view class=" class-container" style="padding-bottom: 100rpx">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入关键字" v-model="params.keywords"/>
        </view>
        <view class="action" @click="loadData('refresh')">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <!--列表-->
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top"
              @click="goDetail(item.id)">
          <view class="action">
            <view class="flex flex-direction padding-top padding-bottom">
              <view class="margin-bottom-sm">
                <text class="wu-gran" v-if="item.kind === 2">物</text>
                <text class="ban-red" v-if="item.kind === 1">费</text>
                <text class="text-center">{{ item.title }}</text>
              </view>
              <view>
                <text class="text-center text-gray text-sm">{{ item.price }} 元</text>
              </view>
            </view>
          </view>
          <view class='action'>
            <button class="cu-btn bg-orange" v-if="item.status === 1">开启
            </button>
            <button class="cu-btn bg-red" v-else>关闭</button>
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingType"></uni-load-more>
    </view>
    <view class="flex flex-direction fixed-bottom" @click="addCharges">
      <button class="cu-btn bg-red add-btn" style="width: 100%;">+添加</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        keywords: '',
        kind: '', // int 种类（1=费用、2=物品）-1:查询全部
        status: '', //int 状态（0=停用、1=启用）-1:查询全部
        paging: true,
        pi: 0,
        ps: 20,
        warning: false
      },
      list: [],
    }
  },
  onShow() {
    this.loadData();
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
          this.params.pi=1
          this.list = [];
          this.loadingType = 'loading';
        }else{
            this.params.pi++;
        }
      //模拟api请求数据
        this.$api.commodity.commoditylist(this.params).then((res)=>{
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
    goDetail(id) {
      uni.navigateTo({
        url: `../detail/detail?id=${id}`
      });
    },
    addCharges() {
      uni.navigateTo({
        url: `../addCharges/addCharges`
      });
    }
  }
}
</script>

<style lang="scss">
page{
  background-color: $uni-bg-color-grey;
}
</style>
