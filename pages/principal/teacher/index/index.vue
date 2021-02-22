<!-- TODO 校长端 老师页面 -->
<template>
  <view class="teacher-students-container">
    <view class="margin" style="margin-bottom: 140rpx">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入姓名或手机号" v-model="params.keywords"/>
        </view>
        <view class="action" @click="getTeacherData(params)">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <!--筛选-->
      <view class="cu-bar search bg-white margin-top justify-around">
        <view class="action" @click="showSex">
          <text style="margin-right: 6rpx">{{form.name ? form.name : '性别'}}</text>
          <text class="cuIcon-triangledownfill text-gray text-sm"></text>
        </view>
        <view class="action" @click="setTime">
          <text :class="!showUp ? 'text-red' : ''" style="margin-right: 6rpx">课时消耗</text>
          <text class="text-gray text-sm" :class="showUp ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
        </view>
      </view>
      <!--列表-->
      <block v-if="list.length > 0">
        <view v-for="(item, index) in list" :key="index">
          <view class="cu-bar bg-white solid-bottom margin-top" @click="goDetail(item.id)">
            <view class="action">
              <view class="flex flex-direction padding-top-sm padding-bottom-sm">
                <view class="margin-bottom-sm">
                  <text class="margin-right-sm">{{item.name}}</text>
                  <text class="margin-right-sm">
                    <text v-if="item.gender === 1" class="cuIcon-male text-blue"></text>
                    <text v-else class="cuIcon-female text-pink"></text>
                  </text>
                  <text>{{item.contact}}</text>
                </view>
                <view class="text-gray text-sm">
                  <text v-if="item.thismonthnum !== null">剩余 <text class="text-red">{{item.thismonthnum}}</text> 课时</text>
                  <text v-else>无可用课时</text>
                </view>
              </view>
            </view>
            <view class='action'>
              <button class="cu-btn bg-orange" v-if="(item.flags&8) === 0">开启</button>
              <button class="cu-btn bg-red" v-else>关闭</button>
            </view>
          </view>
        </view>
      </block>
      <block wx:else>
        <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
          <view class="title">暂无数据</view>
        </view>
      </block>
    </view>
    <view class="flex flex-direction fixed-bottom" @click="addTeacher">
      <button class="add-btn">+ 添加老师</button>
    </view>

<!--性别弹框-->
    <view class="cu-modal show" v-if="showSexModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseSexItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in sexArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{item.label}}</text>
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
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {getTeacherList} from "../../../../api/principal/teacher";
import {failTip} from "../../../../utils/tip";

export default {
  data() {
    return {
      searchInput: '',
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
          label: '男性',
          value: 1
        },
        {
          id: 2,
          label: '女性',
          value: 2
        }
      ],
      list: [],
      form: {},
      params: {
        pi: 1,
        ps: 1000,
      }
    }
  },
  onShow() {
    this.getTeacherData(this.params);
  },
  methods: {
    getTeacherData(params){
      getTeacherList(params)
      .then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list;
          console.log(this.list);
        } else {
          failTip('出错啦');
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
      this.getTeacherData(this.params);
    },
    // 课时消耗操作
    setTime() {
      this.params = {
        ...this.params,
        order:'rank',
        by: this.showUp ? 'asc' : 'desc'
      }
      this.getTeacherData(this.params);
      this.showUp = !this.showUp;
    },
    addTeacher() {
      wx.navigateTo({
        url: `../addTeacher/addTeacher`
      })
    },
    goDetail(id) {
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
</style>
