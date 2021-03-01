<template>
  <view class="shift-container">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入学员姓名" v-model="searchInput"/>
        </view>
        <view class="action" @click="searchValue">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <!--学生区域-->
      <block v-if="list.length > 0">
      <block v-for="(item, index) in list">
        <view class="cu-bar margin-top bg-white" :key="index" v-if="!selectedIdMap[item.id]" @click="selectItem(item.id, index)">
          <view class="action">{{item.name}}</view>
          <view class="action flex-due">
            <radio-group @change="onCourseChange($event,index)">
            <block v-for="(child, i) in item.courselist" :key="i">
              <view class="text-red" style="margin: 15rpx"><radio :value="child.id" :checked="i === item.courseIndex" v-if="item.courselist.length>1"/>{{child.title}}</view>
            </block>
            </radio-group>
          </view>
          <view class="action flex-due">
            <block v-for="(child, i) in item.courselist" :key="i">
              <view class="text-gray" style="margin: 15rpx">剩余{{child.lessonnum}}课时</view>
            </block>
          </view>
          <view class="action">
            <text class="cuIcon-roundcheckfill text-red" v-if="showBtn && index === selectIndex"></text>
            <text class="cuIcon-round" v-else></text>
          </view>
        </view>
        </block>
      </block>
      <block v-else>
        <view
            class="cu-form-group cu-bar bg-white flex justify-center align-center">
          <view class="title">暂无数据</view>
        </view>
      </block>
    </view>
    <uni-load-more :status="loadingType"></uni-load-more>
    <!--底部按钮-->
    <view class="drawer-footer" @click="goBack">
      <button class="cu-btn lg bg-red" style="width: 100%;border-radius: 0">完成</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "shift",
  data() {
    return {
      searchInput: '',
      showBtn: false,
      selectIndex: null,
      courselist:[],
      list: [],
      listQuery:{
        paging: true,
        pi: 0,
        ps: 20,
        keywords:'',
        courseid:'',//id
        datetime:'',
        haslesson:true
      },
      selectedIdMap:{},
      loadingType: 'more'
    }
  },
  onLoad(options) {
    this.listQuery.courseid = options.courseid;
    this.listQuery.datetime = options.datetime;
    var selectedIds = options.selectedIds.split(',');
    for(const i in selectedIds){
      this.$set(this.selectedIdMap,selectedIds[i],true)
    }
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
        this.$api.class.getstudentlist(this.listQuery).then((res)=>{
          this.courselist = this.courselist.concat(res.data.data.courselist);
          this.list = this.list.concat(res.data.data.list.map(item=>{
            item.courselist = res.data.data.courselist.filter(a=>a.studentid==item.id);
            if(item.courselist.length>1){
              item.courseIndex = 0;
            }
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
    searchValue() {
      console.log(this.searchInput);
      this.listQuery.keywords = this.searchInput;
      this.loadData('refresh');
    },
    selectItem(id, i) {
      this.selectIndex = i;
      if (this.selectIndex === i) {
        this.selectIndex = i;
        this.showBtn = true;
      } else {
        this.selectIndex = i;
        this.showBtn = false;
      }
    },
    goBack() {
      if(this.selectIndex===null){
        return uni.showToast({ title:'请选择任何数据',icon: 'none'})
      }
      var student = this.list[this.selectIndex];
      student.course = student.courselist[student.courseIndex||0];
      this.prePage().setData({student})
      wx.navigateBack();
    },
    onCourseChange(e,index){
      this.list[index].courseIndex =  e.detail.value;
    }
  },
}
</script>

<style scoped lang="scss">
  page{
    background: $uni-bg-color-grey;
  }
  .shift-container{
    padding-bottom: 100rpx;
  }
.flex-due {
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
</style>