<template>
  <view style="margin: 20rpx">
    <view class="cu-card case isCard margin-bottom img-item" v-for="(item,index) in list"
          :key="index" @click="goDetail(item)">
      <view class="cu-item shadow img-item" style="margin: 0">
        <view class="image">
          <image :src="baseUrl+item.image" :alt="item.alias"></image>
        </view>
      </view>
      <view class="cu-bar bg-white" style="min-height: 80rpx">
        <view class="action text-bold">{{item.alias}}</view>
      </view>
      <view class="cu-bar bg-white" style="min-height: 80rpx">
        <view class="action text-gray">被发布数：<text class="text-red">{{item.hits}}次</text></view>
        <view class="action text-gray">最高招生人数：<text class="text-red">{{item.joincount}}次</text></view>
      </view>
    </view>
    <uni-load-more :status="loadingType"></uni-load-more>
  </view>
</template>

<script>
export default {
name: "index",
  data() {
    return {
      baseUrl: this.$imageprefix,
      list:[],
      listQuery:{
        paging: true,
        pi: 0,
        ps: 20,
        status: -1,
        keywords:'',
      },
      loadingType: 'more'
    }
  },
  onLoad(){
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
          this.listQuery.pi=1
          this.list = [];
          this.loadingType = 'loading';
        }else{
            this.listQuery.pi++;
        }
      //模拟api请求数据
        this.$api.microactivity.templatelist(this.listQuery).then((res)=>{
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
    goDetail(data){
      wx.navigateTo({
        url: `../detail/detail?id=${data.id}&image=${data.image}`
      })
    }
  }
}
</script>

<style scoped>
.img-item {
  border-radius: 0;
}
</style>