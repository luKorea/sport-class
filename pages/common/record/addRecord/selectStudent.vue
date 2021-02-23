<template>
  <view class="teacher-students-container">
    <view class="margin" style="margin-bottom: 140rpx">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入姓名或手机号" v-model="params.keywords"/>
        </view>
        <view class="action" @click="getListData(params)">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <!--筛选-->
      <view class="cu-bar search bg-white margin-top">
        <view class="action" @click="showSex">
          <text style="margin-right: 6rpx">
            {{ form.name ? form.name : '全部性别' }}
          </text>
          <text class="cuIcon-triangledownfill text-gray text-sm"></text>
        </view>
        <view class="action" @click="setTime">
          <text :class="!showUp ? 'text-red' : ''" style="margin-right: 6rpx">
            课时消耗
          </text>
          <text class="text-gray text-sm"
                :class="showUp ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
        </view>
        <view class="action" @click="showDrawer">
          <text style="margin-right: 6rpx">筛选</text>
          <text class="cuIcon-triangledownfill text-gray text-sm"></text>
        </view>
      </view>
      <!--筛选侧边栏-->
      <uni-drawer ref='drawer' mode="right">
        <!--头部-->
        <view class="solids-bottom flex align-center justify-center">
          <view class="padding">筛选</view>
        </view>
        <!--内容区域-->
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择课程</view>
          <picker @change="bindGradeChange($event, gradeArray)"
                  :value="gradeIndex" :range="gradeArray" range-key="title">
            <view class="picker">{{ gradeArray[gradeIndex].title }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择班级</view>
          <picker @change="bindClassChange($event, classArray)"
                  :value="classIndex" :range="classArray" range-key="name">
            <view class="picker">{{ classArray[classIndex].name }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择老师</view>
          <picker @change="bindTeacherChange($event, teacherArray)"
                  :value="teacherIndex"
                  :range="teacherArray" range-key="name">
            <view class="picker">{{ teacherArray[teacherIndex].name }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择课程套餐</view>
          <picker @change="bindPackageChange($event, packageArray)"
                  :value="packageIndex"
                  :range="packageArray" range-key="title">
            <view class="picker">{{ packageArray[packageIndex].title }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">选择标签</view>
          <picker @change="bindLabelChange($event, labelArray)"
                  :value="labelIndex"
                  :range="labelArray" range-key="name">
            <view class="picker">{{ labelArray[labelIndex].name }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <radio-group @change="timeRadioChange" class="radio-group">
            <label v-for="(item, index) in timeRadio" :key="item.value"
                   class="radio-group-item">
              <radio :value="item.value" :checked="index === timeCurrent"
                     class="radio-group-item-round"/>
              <text class="radio-group-item-text">{{ item.name }}</text>
            </label>
          </radio-group>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <radio-group @change="studentRadioChange" class="radio-group">
            <label v-for="(item, index) in studentRadio" :key="item.value"
                   class="radio-group-item">
              <radio :value="item.value" :checked="index === studentCurrent"
                     class="radio-group-item-round"/>
              <text class="radio-group-item-text">{{ item.name }}</text>
            </label>
          </radio-group>
        </view>
        <!--底部区域-->
        <view class="drawer-footer">
          <button class="bg-gray lg cu-btn" style="width: 50%;"
                  @click="closeDrawer">关闭
          </button>
          <button class="bg-my-red lg cu-btn" style="width: 50%;"
                  @click="searchData">确定
          </button>
        </view>
      </uni-drawer>
      <!--列表-->
      <checkbox-group @change="checkboxChange">
        <view v-for="(item, index) in list" :key="index" >
          <view class="class-item cu-bar bg-white solid-bottom margin-top" :class="{'is-active': checkMap[item.id]}" @click="checked(item.id)">
            <view class="action">
              <view
                  class="flex flex-direction padding-top-sm padding-bottom-sm">
                <view class="margin-bottom-sm">
                  <text class="margin-right-sm">{{ item.name }}</text>
                  <text class="margin-right-sm">
                    <text v-if="item.gender === 1"
                          class="cuIcon-male text-blue"></text>
                    <text v-else class="cuIcon-female text-pink"></text>
                  </text>
                  <text>{{ item.contact }}</text>
                </view>
                <view class="text-gray text-sm">
                  <text v-if="item.lessonnum > 0">剩余
                    <text class="text-red">{{ item.lessonnum }}</text>
                    课时
                  </text>
                  <text v-else>无可用课时</text>
                </view>
              </view>
            </view>
            <view class='action'>
              <checkbox :value="item.id+''" :checked="checkMap[item.id]" />
            </view>
          </view>
        </view>
        </checkbox-group>
        <uni-load-more :status="loadingType"></uni-load-more>
    </view>
    <view class="flex flex-direction fixed-bottom" @click="confirm">
      <button class="add-btn">确定</button>
    </view>

    <!--性别弹框-->
    <view class="cu-modal show" v-if="showSexModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseSexItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in sexArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{ item.label }}</text>
                </view>
                <radio class="round" :value="JSON.stringify(item)"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideSex">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="searchSex">
            <button class="cu-btn bg-white">确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniDrawer from '../../../../components/uni-drawer/uni-drawer';
import {getStudentsList} from "../../../../api/common/students";
import {
  getClassSelect, getClassTag,
  getCourseSelect, getPackSelect, getTeacherSelect
} from "../../../../api/select";

export default {
  components: {
    uniDrawer
  },
  data() {
    return {
      searchInput: '',
      params: {
        pi: 0,
        ps: 20
      },
      showUp: true,
      showSexModal: false,
      sexArray: [
        {
          id: 0,
          label: '全部性别',
          value: 0
        },
        {
          id: 1,
          label: '男',
          value: 1
        },
        {
          id: 2,
          label: '女',
          value: 2
        }
      ],
      list: [],
      // 选择班级
      classIndex: 0,
      classArray: [
        {
          id: '',
          name: '所有班级'
        }
      ],
      // 选择课程
      gradeIndex: 0,
      gradeArray: [
        {
          id: '',
          title: '所有课程'
        }
      ],
      // 选择老师
      teacherIndex: 0,
      teacherArray: [
        {
          id: '',
          name: '所有老师'
        }
      ],
      // 选择课程套餐
      packageIndex: 0,
      packageArray: [
        {
          id: '',
          title: '所有套餐'
        }
      ],
      // 选择标签
      labelIndex: 0,
      labelArray: [
        {
          id: 0,
          name: '所有标签'
        }
      ],
      // 课时单选
      timeRadio: [
        {
          value: 101,
          name: '全部'
        },
        {
          value: 8,
          name: '课时有余'
        },
        {
          value: 16,
          name: '课时耗尽'
        }
      ],
      timeCurrent: 0,
      // 学员单选
      studentRadio: [
        {
          value: 101,
          name: '全部'
        },
        {
          value: 5,
          name: '在读/历史'
        },
        {
          value: 2,
          name: '潜在学员'
        }
      ],
      studentCurrent: 0,
      form: {},
      checkMap:{}
    }
  },
  onLoad(options) {
    if(options.data){
      var ids = options.data.split(',')
      var checkMap = {};
      for(let i in ids){
        checkMap[ids[i]]=true
      }
      this.checkMap = checkMap
    }
    this.loadData();
    this.getClass();
    this.getGrade();
    this.getPackage();
    this.getTag();
    this.getTeacher();
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
        getStudentsList(this.params).then((res)=>{
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
    showSex() {
      this.showSexModal = true;
    },
    hideSex() {
      this.showSexModal = false;
    },
    chooseSexItem(e) {
      let {value} = e.detail,
          data = JSON.parse(value);
      this.form.name = data.label;
      this.params.gender = data.value;
    },
    searchSex() {
      this.hideSex();
      this.loadData();
    },
    // 筛选区域
    // 选择班级
    getClass() {
      getClassSelect()
          .then(res => {
            this.classArray = this.classArray.concat(res.data.data.list);
          }).catch(err => console.log(err));
    },
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.params.classid = data[this.classIndex].id;
    },
    // 选择课程
    getGrade() {
      getCourseSelect()
          .then(res => {
            this.gradeArray = this.gradeArray.concat(res.data.data);
          }).catch(err => console.log(err));
    },
    bindGradeChange(e, data) {
      const {value} = e.detail;
      this.gradeIndex = value;
      this.params.courseid = data[this.gradeIndex].id;
    },
    // 选择老师
    getTeacher() {
      getTeacherSelect()
          .then(res => {
            this.teacherArray = this.teacherArray.concat(res.data.data);
          }).catch(err => console.log(err));
    },
    bindTeacherChange(e, data) {
      const {value} = e.detail;
      this.teacherIndex = value;
      this.params.teacherid = data[this.teacherIndex].id;
    },
    // 选择套餐
    getPackage() {
      getPackSelect()
          .then(res => {
            this.packageArray = this.packageArray.concat(res.data.data.list);
          }).catch(err => console.log(err));
    },
    bindPackageChange(e, data) {
      const {value} = e.detail;
      this.packageIndex = value;
      this.params.coursepackid = data[this.packageIndex].id;
    },
    // 选择标签
    getTag() {
      getClassTag(2)
          .then(res => {
            this.labelArray = this.labelArray.concat(res.data.data.list);
          }).catch(err => console.log(err));
    },
    bindLabelChange(e, data) {
      const {value} = e.detail;
      this.labelIndex = value;
      if (data[this.labelIndex].id === 0) {
        this.params.tags = '';
      } else {
        this.params.tags = data[this.labelIndex].name;
      }
    },
    // 单选课时
    timeRadioChange(e) {
      this.params.flags = e.detail.value;
    },
    studentRadioChange(e) {
      this.params.flags = e.detail.value;
    },
    // 筛选
    searchData() {
      this.loadData('refresh');
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
      this.showUp = !this.showUp;
      this.params.flags = this.showUp ? 101 : 1125;
      this.loadData('refresh');
    },
      checkboxChange(e){
          var values = e.target.value
          var newCheckMap = {}
          for(const i in values){
            newCheckMap[values[i]] = true
          }
          this.checkMap = newCheckMap;
      },
      checked(id){
        this.$set(this.checkMap,id,!this.checkMap[id])
      },
      confirm(){
        this.prePage().setData({studentList: this.list.filter(item=>this.checkMap[item.id])});
        uni.navigateBack()
      }
  }
}
</script>

<style lang="scss">
.teacher-students-container {
  padding-bottom: 100rpx;
  .add-btn {
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
}
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