<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入班级名称" v-model="params.keywords" />
        </view>
        <view class="action" @click="loadData">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <!--筛选-->
      <!-- <view class="cu-bar search bg-white margin-top justify-around">
        <view class="action" @click="setTime">
          <text style="margin-right: 6rpx" :class="!showUp ? 'text-red': ''">人数</text>
          <text class="text-gray text-sm" :class="showUp ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
        </view>
        <view class="action" @click="showDrawer">
          <text style="margin-right: 6rpx">筛选</text>
          <text class="cuIcon-triangledownfill text-gray text-sm"></text>
        </view>
      </view> -->
      <!--筛选侧边栏-->
      <uni-drawer ref='drawer' mode="right">
        <!--头部-->
        <view class="solids-bottom flex align-center justify-center">
          <view class="padding">筛选</view>
        </view>
        <!--内容区域-->
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择课程</view>
          <picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="title">
            <view class="picker">{{gradeArray[gradeIndex].title}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择老师</view>
          <picker @change="bindTeacherChange($event, teacherArray)" :value="teacherIndex" :range="teacherArray"
            range-key="name">
            <view class="picker">{{teacherArray[teacherIndex].name}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择标签</view>
          <picker @change="bindLabelChange($event, labelArray)" :value="labelIndex" :range="labelArray" range-key="name">
            <view class="picker">{{labelArray[labelIndex].name}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <radio-group @change="timeRadioChange" class="radio-group">
            <label v-for="(item, index) in timeRadio" :key="item.value" class="radio-group-item">
              <radio :value="item.value" :checked="index === timeCurrent" class="radio-group-item-round" />
              <text class="radio-group-item-text">{{item.name}}</text>
            </label>
          </radio-group>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <radio-group @change="studentRadioChange" class="radio-group">
            <label v-for="(item, index) in studentRadio" :key="item.value" class="radio-group-item">
              <radio :value="item.value" :checked="index === studentCurrent" class="radio-group-item-round" />
              <text class="radio-group-item-text">{{item.name}}</text>
            </label>
          </radio-group>
        </view>
        <!--底部区域-->
        <view class="drawer-footer">
          <button class="bg-gray lg cu-btn" style="width: 50%;" @click="closeDrawer">关闭</button>
          <button class="bg-my-red lg cu-btn" style="width: 50%;" @click="searchData">确定</button>
        </view>
      </uni-drawer>
      <!--列表-->
      <checkbox-group @change="checkboxChange">
      <view v-for="(item, index) in list" :key="index">
        <view class="class-item cu-bar bg-white solid-bottom margin-top" :class="{'is-active': checkMap[item.id]}" @click="checked(item.id)">
          <view class="action">
            <view class="flex flex-direction padding-top padding-bottom">
              <view class="margin-bottom-sm">
                <text class="ban-red">班</text>
                <text class="margin-right">{{item.name}}</text>
                <text class="text-type">{{item.type === 1 ? '1v1': '1vN'}}</text>
              </view>
              <view class="margin-bottom-sm">
                <text class="ke-orange">课</text>
                <text>{{item.title}}</text>
              </view>
              <view>
                <text class="ren-green">师</text>
                <text>{{item.teachers !== '' ? item.teachers : '暂未添加老师'}}</text>
              </view>
            </view>
          </view>
          <view class='action'>
            <checkbox :value="item.id+''" :checked="checkMap[item.id]" v-if="!isSingle" />
            <view class="cuIcon-right" v-else></view>
          </view>
        </view>
      </view>
      </checkbox-group>
      <uni-load-more :status="loadingType"></uni-load-more>
    </view>
    <view class="flex flex-direction fixed-bottom" @click="confirm" v-if="!isSingle">
      <button class="add-btn">确定</button>
    </view>
  </view>
</template>

<script>
  import {
    getClassList
  } from "../../../../api/principal/class";
  import {
    getCourseSelect,
    getTeacherSelect,
    getClassTag
  } from '../../../../api/select.js';

  export default {
    data() {
      return {
        searchInput: '',
        showUp: true,
        list: [],
        params: {
          pi: 0,
          ps: 20,
          // kind: 3,
          status: -1,
          keywords: ''
        },
        // 选择课程
        gradeIndex: 0,
        gradeArray: [{
          id: '',
          title: '所有课程'
        }],
        // 选择老师
        teacherIndex: 0,
        teacherArray: [{
          id: '',
          name: '所有老师'
        }],
        // 选择标签
        labelIndex: 0,
        labelArray: [{
          id: 0,
          name: '所有标签'
        }],
        timeRadio: [{
            value: 0,
            name: '全部'
          },
          {
            value: 1,
            name: '一对一'
          },
          {
            value: 2,
            name: '一对多'
          }
        ],
        timeCurrent: 0,
        studentRadio: [{
            value: -1,
            name: '全部'
          },
          {
            value: 1,
            name: '已结业'
          },
          {
            value: 0,
            name: '未结业'
          }
        ],
        studentCurrent: 0,
        loadingType: 'more',
        checkMap:{},
        isSingle: false//是否是单选
      }
    },
    onShow: function() {
      this.getCourse();
      this.getTeacher();
      this.getTag();
    },
    onLoad(options){
      if(options.data){
        var ids = options.data.split(',')
        var checkMap = {};
        for(let i in ids){
          checkMap[ids[i]]=true
        }
        this.checkMap = checkMap
      }
      if(options.params){
        this.params = {
          ...this.params,
          ...JSON.parse(options.params)
        }
      }
      this.isSingle = typeof(options.single)=='undefined'?false:options.single
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
          getClassList(this.params).then((res)=>{
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
      getListData(params) {
        getClassList(params)
          .then(res => {
            if (res.data.code === 0) {
              this.list = res.data.data.list;
              console.log(this.list);
            }
          }).catch(err => console.log(err));
      },

      // 筛选区域
      getCourse() {
        getCourseSelect()
          .then(res => {
            this.gradeArray = this.gradeArray.concat(res.data.data);
          })
      },
      bindGradeChange(e, data) {
        const {
          value
        } = e.detail;
        this.gradeIndex = value;
        this.params.courseid = data[this.gradeIndex].id;
      },

      getTeacher() {
        getTeacherSelect()
          .then(res => {
            this.teacherArray = this.teacherArray.concat(res.data.data);
          })
      },

      bindTeacherChange(e, data) {
        const {
          value
        } = e.detail;
        this.teacherIndex = value;
        this.params.teacherid = data[this.teacherIndex].id;
      },

      getTag() {
        getClassTag(4)
          .then(res => {
            this.labelArray = this.labelArray.concat(res.data.data.list);
          })
      },

      bindLabelChange(e, data) {
        const {
          value
        } = e.detail;
        this.labelIndex = value;
        if (data[this.labelIndex].id === 0) {
          this.params.tags = '';
        } else {
          this.params.tags = data[this.labelIndex].name;
        }
      },
      // 单选课时
      timeRadioChange(e) {
        this.params.kind = e.detail.value;
      },
      studentRadioChange(e) {
        this.params.status = e.detail.value;
      },
      // 筛选
      searchData() {
        this.getListData(this.params);
        this.closeDrawer();
      },
      showDrawer() {
        this.$refs['drawer'].open();
      },
      closeDrawer() {
        this.$refs['drawer'].close();
      },
      // 课时消耗操作
      setTime() {
        this.params = {
          ...this.params,
          order: 'signnum',
          by: this.showUp ? 'asc' : 'desc'
        }
        this.getListData(this.params);
        this.showUp = !this.showUp;
      },
      checkboxChange(e){
          var values = e.target.value
          var newCheckMap = {}
          for(const i in values){
            newCheckMap[values[i]] = true
          }
          this.checkMap = newCheckMap;console.log(this.checkMap)
      },
      checked(id){
        this.$set(this.checkMap,id,!this.checkMap[id]);
        if(this.isSingle){
          var checkMap = {};checkMap[id] = true;this.checkMap = checkMap
          return this.confirm();
        }
      },
      confirm(){
        this.prePage().setData({classList: this.list.filter(item=>this.checkMap[item.id])});
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: $uni-bg-color-grey;
  }
  .class-item{
    border: 1px solid transparent;
    &.is-active{
      border: 1px solid $uni-color-base;
    }
    .action{
      pointer-events: none;
    }
  }
  /deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
    color: $uni-color-base!important;
    border: 1px solid $uni-color-base;
    
  }
  
  /deep/ uni-radio::before, uni-checkbox::before{
    display: none;
  }
  .fixed-bottom{
    z-index: 10;
  }
</style>
