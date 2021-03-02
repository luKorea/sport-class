<!-- TODO 教师端 我的班级 -->
<template>
  <view class="margin class-container">
    <!--搜索区域-->
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入班级名称" v-model="params.keywords"/>
      </view>
      <view class="action" @click="getListData(params)">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>
<!--列表-->
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top" @click="goDetail(item)">
          <view class="action">
            <view class="flex flex-direction padding-top padding-bottom">
              <view class="margin-bottom-sm">
                <text class="ban-red">班</text>
                <text>{{item.name}}</text>
              </view>
              <view class="margin-bottom-sm">
                <text class="ke-orange">课</text>
                <text>{{item.title}}</text>
              </view>
              <view>
                <text class="ren-green">人</text>
                <text>{{item.signnum}}</text>
              </view>
            </view>
          </view>
          <view class='action'><view class="cuIcon-right"></view></view>
        </view>
      </view>
    </block>
    <block wx:else>
      <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
import {getClassList} from "../../../../api/principal/class";
export default {
  data() {
    return {
	  params: {
	    pi: 1,
	    ps: 100,
	  		kind: 3,
	    status: -1,
	    keywords: ''
	  },
      list: [],
    }
  },
  onLoad() {
    this.getListData(this.params);
  },
  methods: {
    getListData(params){
      getClassList(params)
      .then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list;
          console.log(this.list);
        }
      }).catch(err => console.log(err));
    },
    
    goDetail(data) {
		console.log(data)
      uni.navigateTo({
        url: `../detail/detail?classid=${data.id}&coursename=${data.title}&classname=${data.name}`
      })
    }
  }
}
</script>

<style>
</style>
