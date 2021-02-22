<template>
  <view class="record-container">
    <!--学员区域-->
    <view class="tabNav">
      <view v-for="(item, index) in navTab" :key="index" @click="setCurrentTab(index)" :class="listQuery.type === index+1 ? 'cur' : ''">
        <text>{{item}}</text>
      </view>
    </view>
    <!--班级-->
    <view id="tab1" class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" :placeholder="listQuery.type==1?'请输入班级名称':'请输入姓名/手机号'" v-model="listQuery.keywords"/>
        </view>
        <view class="action">
          <button class="cu-btn shadow-blur text-white bg-red" @click="searchGrade">搜索</button>
         <view class="margin-left" @click="showDrawerClass">
           <text>筛选</text>
           <text class="cuIcon-triangledownfill text-gray"></text>
         </view>
        </view>
        <!--筛选侧边栏-->
        <uni-drawer ref='drawerClass' mode="right">
          <!--头部-->
          <view class="solids-bottom flex align-center justify-center">
            <view class="padding">筛选</view>
          </view>
          <!--内容区域-->
          <view class="cu-form-group cu-bar bg-white">
            <view class="title">模板类型</view>
            <picker @change="bindTemplateChange($event, templateArray)" :value="templateIndex" :range="templateArray" range-key="name">
              <view class="picker">{{templateArray[templateIndex]&&templateArray[templateIndex].name}}</view>
            </picker>
          </view>
          <view class="cu-form-group cu-bar bg-white" v-if="listQuery.type==1">
            <view class="title">所属班级</view>
            <picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="name">
              <view class="picker">{{classArray[classIndex] && classArray[classIndex].name}}</view>
            </picker>
          </view>
          <!--底部区域-->
          <view class="drawer-footer">
            <button class="bg-gray lg cu-btn" style="width: 50%;" @click="closeDrawerClass">关闭</button>
            <button class="bg-my-red lg cu-btn" style="width: 50%;" @click="searchData">确定</button>
          </view>
        </uni-drawer>
      </view>
      <view class="cu-bar bg-white margin-top" v-for="item in list" :key="item.id">
        <view class="action flex-direction">
          <view class="flex-due">
            <view style="margin: 16rpx 0 0 0" class="text-sm">
              <text class="ban-red" v-if="listQuery.type==1">班</text>
              <text class="ke-orange" v-else>课</text>
              <text>{{item.target}}</text>
            </view>
            <view style="margin: 16rpx 0"  class="text-sm text-gray">{{item.templatename}}</view>
            <view class="text-sm text-gray">{{item.datetime}}</view>
            <view style="margin: 16rpx 0" class="text-sm text-gray">{{item.content}}</view>
          </view>
        </view>
        <view class="action">
          <text class="text-orange">{{item.flags !== 0 ? '已推送' : '未推送'}}</text>
        </view>
      </view>
    </view>
    
    <uni-load-more :status="loadingType"></uni-load-more>
<!--添加-->
    <view class="flex flex-direction fixed-bottom">
      <button class="add-btn" @click="addRecord">+ 添加</button>
    </view>
  </view>
</template>

<script>
import {formatTime} from "../../../../utils";

export default {
  data() {
    return {
      navTab: ['班级', '学员'],
      templateIndex: 0,
      templateArray: [],
      classIndex: 0,
      classArray: [],
      list:[],
      listQuery:{
        type: 1,//1=班级、2=学员
        paging: true,
        pi: 0,
        ps: 20,
        keywords:'',
        sourceid:'',//摸版id
        
      },
      loadingType: 'more'
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
    this.loadData();
    this.getTemplates();
    this.getClasses();
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
        this.$api.student.growthlist(this.listQuery).then((res)=>{
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
    setCurrentTab(index) {
      if (this.listQuery.type === index+1) return;
      this.listQuery.type = index+1;
      this.listQuery.classid = '';
      this.listQuery.sourceid = '';
      this.listQuery.keywords = '';
      this.classIndex = 0;
      this.templateIndex = 0;
      this.loadData('refresh')
    },
    getTemplates(){
      this.$api.student.sourcelist({type: 3}).then((res)=>{
        res.data.data.list.unshift({id:'',name:'全部'})
        this.templateArray = res.data.data.list;
      })
    },
    getClasses(){
      this.$api.class.classlist({paging: false}).then((res)=>{
        res.data.data.unshift({id:'',name:'全部'})
        this.classArray = res.data.data;
      })
    },
    // 选择课程
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    showDrawerClass() {
      this.$refs['drawerClass'].open();
    },
    closeDrawerClass() {
      this.$refs['drawerClass'].close();
    },
    searchData() {
      // console.log(this.form);
      this.loadData('refresh');
      this.closeDrawerClass()
    },
    bindTemplateChange(e, data) {
      const {value} = e.detail;
      this.templateIndex = value;
      this.listQuery.sourceid = data[this.templateIndex].id;
    },
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.listQuery.classid = data[this.classIndex].id;
    },
    searchGrade() {
      this.loadData('refresh');
    },
    addRecord() {
      wx.navigateTo({
        url: '../addRecord/addRecord'
      })
    }
  }
}
</script>

<style scoped lang="scss">
page{
    background: $uni-bg-color-grey;
}
.flex-due {
  justify-content: start;
  align-items: start;
  width: 100%;
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
.tabshow{
  visibility: visible;
  display: block;
}
.tabhide{
  visibility: hidden;
  display: none;
}

.record-container .add-btn {
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
</style>
