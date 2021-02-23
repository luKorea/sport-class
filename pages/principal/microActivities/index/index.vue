<template>
  <view style="margin: 20rpx">
    <view class="cu-card case isCard margin-bottom img-item" v-for="item in list"
          :key="item.id" @click="goDetail(item.id)">
      <view class="cu-item shadow img-item" style="margin: 0">
        <view class="image">
          <image :src="baseUrl+item.image"></image>
        </view>
      </view>
      <view class="cu-bar bg-white" style="min-height: 80rpx">
        <view class="action text-bold">{{item.title}}</view>
      </view>
      <view class="cu-bar bg-white" style="min-height: 80rpx">
        <view class="action text-gray">被发布数：<text class="text-red">{{item.sendNumber}}次</text></view>
        <view class="action text-gray">最高招生人数：<text class="text-red">{{item.studentNumber}}次</text></view>
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
      baseUrl: this.$imageurl,
      list:[],
      listQuery:{
        paging: true,
        pi: 0,
        ps: 20,
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
        this.$api.microactivity.componentlist(this.listQuery).then((res)=>{
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
    goDetail(id){
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
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