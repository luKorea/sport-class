<!-- TODO 教师端 班级详情 -->
<template>
  <view class="margin class-container">
    <view class="cu-bar bg-white">
      <view class='action'>课程名称</view>
      <view class='action'>{{ info.coursename }}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class='action'>班级名称</view>
      <view class='action'>{{ info.classname}}</view>
    </view>

    <!--学员区域-->
    <view class="tabNav margin-top">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(index)"
            :class="currentTab === index ? 'cur' : ''">
        <text>{{ item }}</text>
      </view>
    </view>
    <!--在线学员-->
    <view id="tab1" class="margin-top-sm" :class="tab1">
      <block v-if="result.studentlist.length > 0">
        <view class="cu-list grid col-4 gridBorder">
          <view class="cu-item flex justify-center align-center"
                v-for="(item, index) in result.studentlist" :key="index">
            <view class="cu-avatar lg bg-white" :style="{backgroundImage: `url(${item.avatar})`}" style="border-radius: 50%"><i class="cuIcon-my" v-if="!item.avatar"></i></view>
            <text>{{ item.name }}</text>
          </view>
        </view>
      </block>
      <block v-else>
        <view
            class="cu-form-group cu-bar bg-white flex justify-center align-center">
          <view class="title">暂无数据</view>
        </view>
      </block>
    </view>
    <!--点名记录-->
    <view id="tab2" class="margin-top-sm" :class="tab2">
      <view  v-for="(item,index) in list" :key="index">
        <view class="margin-top bg-white cu-bar  solid-bottom">
          <view class="action flex-due margin-top margin-bottom">
            <view class="margin-bottom-sm">
              <text class="cuIcon-title text-gray text-sm"></text>{{item.dates}}{{item.week}}
            </view>
            <view>
              <text class="cuIcon-title text-gray text-sm"></text>{{item.schedulename}}
            </view>
          </view>
          <view class="action flex flex-due margin-top margin-bottom">
            <view class="margin-bottom-sm">
              <text class="cuIcon-title text-gray text-sm"></text>{{item.btime}}-{{item.etime}}
            </view>
            <view>
              <text class="cuIcon-title text-gray text-sm"></text>{{item.duration}} 课时
            </view>
          </view>
        </view>
        <view class="bg-white cu-bar text-center justify-around">
          <view class="action text-center text-red" @click="goNamedPage(item)">
            点名 {{item.signstudent && item.signstudent.length||0}}/{{item.stucount}}
          </view>
          <view class="action text-center text-orange" @click="goCommentsPage(item)">
            点评 {{item.commentnum}}/{{item.stucount}}
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingType"></uni-load-more>
    </view>
  </view>
</template>

<script>
  import {dateFormat} from '@/utils'
export default {
  data() {
    return {
      navTab: ['在读学生', '点名记录'],
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      result: {},
      list:[],
      listQuery:{
        classid: '',
        clsssstatus: -1,
        by: 'desc',
        paging: true,
        pi: 0,
        ps: 20,
        filternostudent: true
      },
      loadingType: 'more',
      info:{
        classid:''
      }
    }
  },
  onLoad(options) {
    this.info = options;
    this.listQuery.classid = options.classid;
    this.getStudents();
    this.loadData();
  },
  //下拉刷新
  onPullDownRefresh(){
    this.getStudents();
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
        this.$api.lessontask.lessonlist(this.listQuery).then((res)=>{
            this.list = this.list.concat(res.data.data.list.map(item=>{
              var w = new Date(item.dates).getDay();
              item.week='星期'+['天','一','二','三','四','五','六'][w];
              return item
            }));
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
      if (this.currentTab === index) return;
      this.currentTab = index;
      if (index === 0) {
        this.tab1 = 'tabshow';
        this.tab2 = 'tabhide';
      } else if (index === 1) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabshow';
      }
    },
    goNamedPage(data) {
      uni.navigateTo({
        url: `/pages/common/namedPage/namedPage?lessontaskid=${data.lessontaskid||''}&coursescheduleid=${data.coursescheduleid}&date=${data.dates+' '+data.btime+':00'}`
      })
    },
    goCommentsPage(data) {
      var lesson = encodeURIComponent(JSON.stringify(data));
      uni.navigateTo({
        url: `/pages/common/commentsPage/commentsPage?lesson=${lesson}`
      });
    },
    getWeekDate(){
      var now1 = new Date(),year,month;
      if(this.month){
        year = this.month.year;
        month = this.month.month
      }else{
        year = now1.getFullYear()
        month = now1.getMonth()
      }
      var startDate = new Date(year,month , 1);
      var endDate = new Date(year, month+1, 0)
      var start = dateFormat(startDate,'yyyy-MM-dd');
      var end = dateFormat(endDate,'yyyy-MM-dd');
      return {start,end,startDate,endDate}
    },
    getStudents(){
      this.$api.class.getstudentlistbyclassid({paging:false,classid: this.info.classid}).then(res=>{
        this.result.studentlist = res.data.data.list
      })
    },
    getLessons(){
      const {start,end,startDate,endDate} = this.getWeekDate()
      this.$api.lessontask.lessonlist({paging:false,classid: this.info.classid,btime: start,etime: end}).then(res=>{
        this.result.lessonlist = res.data.data.map(item=>{
          var w = new Date(item.dates).getDay();
          item.week='星期'+['天','一','二','三','四','五','六'][w];
          return item
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  text-align: center;
}

.tabNav > view {
  text-align: center;
  margin-right: 100rpx;
}

.tabNav > view:last-child {
  margin-right: 0;
}

.tabNav > view text {
  height: 90rpx;
  line-height: 90rpx;
  display: inline-block;
}

.tabNav .cur text {
  border-bottom: 5rpx solid #F40001;
  color: #F40001;
}

.tabshow {
  visibility: visible;
  display: block;
}

.tabhide {
  visibility: hidden;
  display: none;
}
.flex-due {
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
</style>
