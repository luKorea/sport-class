<template>
  <view class="margin">
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入课程名称" v-model="listQuery.keywords"/>
      </view>
      <view class="action" @click="searchValue">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>

    <view class="cu-list menu-avatar margin-top">
      <block v-if="list.length > 0">
        <view class="cu-item solid-bottom margin-bottom" v-for="item in list"
              :key="item.id" @click="goDetail(item)">
          <view class="cu-avatar round lg" :data-url="$uploadUrl + item.cover"
                :style="{backgroundImage: `url(${$uploadUrl + item.cover})`}"
                style="border-radius: 50%"></view>
          <view class="content">
            <view>
              <text class="margin-right">{{item.title}}</text>
              <text class="text-red">{{item.subtotalsum}}</text>
            </view>
            <view class="text-gray text-sm flex">
              <text class="text-gray">截至时间：{{ item.endtime }}</text>
            </view>
          </view>
          <view class="action">
            <view class="text-orange" v-if="item.enable">开启</view>
            <view class="text-red" v-else>关闭</view>
          </view>
        </view>
      </block>
    </view>
    <uni-load-more :status="loadingType"></uni-load-more>

    <view class="fixed-right" @click="addOnlineClasses">
      <view class="cuIcon-edit"></view>
      <view class="text-sm">发布</view>
    </view>

  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list:[],
      listQuery:{
        paging: true,
        pi: 0,
        ps: 20,
        type: 1,
        keywords:'',
      },
      loadingType: 'more'
    }
  },
  onLoad() {
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
        this.$api.course.coursepacklist(this.listQuery).then((res)=>{
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
    searchValue() {
      this.loadData('refresh')
    },
    goDetail(item) {
      wx.navigateTo({
        url: `../detail/detail?id=${item.id}`
      })
    },
    addOnlineClasses() {
      wx.navigateTo({
        url: '../addOnlineClasses/addOnlineClasses'
      })
    }
  }
}
</script>

<style scoped lang="scss">
page{
  background-color: $uni-bg-color-grey;
}
.fixed-right {
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  text-align: center;
  width: 110rpx;
  height: 110rpx;
  color: #ffffff;
  background: #52CDC0;
  border-radius: 50%;
}
</style>