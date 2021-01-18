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
        <view class="cu-bar margin-top bg-white" v-for="(item, index) in list" :key="index" @click="selectItem(item.id, index)">
          <view class="action">{{item.name}}</view>
          <view class="action flex-due">
            <block v-for="(child, i) in item.className" :key="i">
              <view class="text-red" style="margin: 15rpx">{{child.name}}</view>
            </block>
          </view>
          <view class="action flex-due">
            <block v-for="(child, i) in item.className" :key="i">
              <view class="text-gray" style="margin: 15rpx">剩余{{child.time}}课时</view>
            </block>
          </view>
          <view class="action" v-if="showBtn && index === selectIndex">
            <text class="cuIcon-roundcheckfill text-red"></text>
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
    <!--底部按钮-->
    <view class="drawer-footer" @click="goBack">
      <button class="cu-btn lg bg-red" style="width: 100%">完成</button>
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
      list: [
        {
          id: 1,
          name: '黄晓明',
          className: [
            {
              name: '全部通用',
              time: 17
            },
            {
              name: '足篮通课',
              time: 17
            }
          ]
        },
        {
          id: 2,
          name: '黄晓明',
          className: [
            {
              name: '全部通用',
              time: 17
            },
            {
              name: '足篮通课',
              time: 17
            }
          ]
        },
        {
          id: 3,
          name: '黄晓明',
          className: [
            {
              name: '全部通用',
              time: 17
            },
            {
              name: '足篮通课',
              time: 17
            }
          ]
        },
        {
          id: 4,
          name: '黄晓明',
          className: [
            {
              name: '全部通用',
              time: 17
            },
            {
              name: '足篮通课',
              time: 17
            }
          ]
        },
        {
          id: 5,
          name: '黄晓明',
          className: [
            {
              name: '全部通用',
              time: 17
            },
            {
              name: '足篮通课',
              time: 17
            }
          ]
        },
        {
          id: 6,
          name: '黄晓明',
          className: [
            {
              name: '全部通用',
              time: 17
            },
            {
              name: '足篮通课',
              time: 17
            }
          ]
        }
      ]
    }
  },
  methods: {
    searchValue() {
      console.log(this.searchInput);
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
      wx.navigateBack();
    }
  },
}
</script>

<style scoped>
.flex-due {
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
</style>