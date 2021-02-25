<template>
  <view class="class-container">
    <view class="tabNav" :style="{top: headerTop}">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(item)"
            :class="listQuery.types === item.value ? 'cur' : ''">
        <text>{{item.label}}</text>
      </view>
    </view>
    <view id="tab1" class="margin-top-sm">
      <potential-component :list="list" />
      <uni-load-more :status="loadingType"></uni-load-more>
    </view>
    <view class="drawer-footer" @click="addStudents" v-if="listQuery.types==1">
      <button class="add-btn">添加</button>
    </view>
    <view class="fixed-right" @click="goSalesAllocation">
      <view class="text-sm">销售分配</view>
    </view>

  </view>
</template>

<script>
import potentialComponent from './components/potentialStudent';
import readComponent from './components/readStudent';
import historyComponent from './components/historyStudent';
export default {
  components: {
    potentialComponent,
    readComponent,
    historyComponent
  },
  data() {
    return {
			headerTop:"0px",
      navTab: [{value: 1,label:'潜在学员'}, {value: 3,label:'在读学员'}, {value: 2,label:'历史学员'}],
      listQuery:{
        pi: 0,
        ps: 20,
        types: 1
      },
      list: [],
      loadingType: 'more'
    }
  },
  onLoad(options) {
    let {id} = options;
    // #ifdef H5
    this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
    // #endif
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
        this.$api.student.intentstudent(this.listQuery).then((res)=>{
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
    setCurrentTab(data) {
      if (this.listQuery.types === data.value) return;
      this.listQuery.types = data.value;
      this.loadData('refresh')
    },
    addStudents() {
      wx.navigateTo({
        url: '../addStudents/addStudents'
      })
    },
    goSalesAllocation() {
      wx.navigateTo({
        url: '../salesAllocation/salesAllocation?types='+this.listQuery.types
      })
    },
  }
}
</script>

<style lang="scss">
  page{
    background-color: $uni-bg-color-grey;
  }
.tabNav {
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 102rpx;
  line-height: 102rpx;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  text-align: center;
  position: fixed;
}
.tabNav> view {
  text-align: center;
}
.tabNav> view:last-child {
  margin-right: 0;
}
.tabNav> view text {
  height: 90rpx;
  line-height: 90rpx;
  display: inline-block;
}
.tabNav .cur text {
  border-bottom: 5rpx solid #F40001;
  color: #F40001;
}
.class-container{
  padding-top: 100rpx;
  padding-bottom: 100rpx;
}
.fixed-right {
  position: fixed;
  right: 30rpx;
  bottom: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //z-index: 999;
  text-align: center;
  width: 120rpx;
  height: 120rpx;
  color: #ffffff;
  background: #52CDC0;
  border-radius: 50%;
}
</style>
