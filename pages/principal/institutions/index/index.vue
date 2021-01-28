<template>
  <view class="margin">
    <!--搜索区域-->
    <view class="cu-bar search bg-white">
      <view class="search-form">
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="请输入标题" v-model="searchInput"/>
      </view>
      <view class="action" @click="searchValue">
        <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
      </view>
    </view>


    <block v-if="list.length > 0">
      <view class="cu-bar margin-top bg-white" v-for="item in list"
            :key="item.id" @click="goDetail(item)">
        <view class="action flex-due flex-direction" style="margin: 30rpx">
          <text class="margin-bottom-sm">{{item.title}}</text>
          <text class="text-gray text-sm">发布时间：{{item.time}}</text>
        </view>
        <view class="action">
          <view class="text-orange" v-if="item.type === 0">开启</view>
          <view class="text-grey" v-else>关闭</view>
        </view>
      </view>
    </block>

    <view class="fixed-right" @click="addInstitutions">
      <view class="cuIcon-edit"></view>
      <view class="text-sm">发布</view>
    </view>
  </view>
</template>

<script>
import {formatTime} from "../../../../utils";

export default {
  name: "index",
  data() {
    return {
      searchInput: '',
      list: [
        //  type: 0 开启 1 关闭
        {
          id: 1,
          title: '测试机构动态',
          time: formatTime(new Date()),
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          type: 0,
          state: 0
        },
        {
          id: 2,
          title: '测试机构动态',
          time: formatTime(new Date()),
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          type: 0,
          state: 0
        },
        {
          id: 3,
          title: '测试机构动态',
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          time: formatTime(new Date()),
          type: 1,
          state: 0
        },
        {
          id: 4,
          title: '测试机构动态',
          time: formatTime(new Date()),
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          type: 0,
          state: 1
        },
        {
          id: 4,
          title: '测试机构动态',
          time: formatTime(new Date()),
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          type: 1,
          state: 1
        },
        {
          id: 4,
          title: '测试机构动态',
          time: formatTime(new Date()),
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          type: 1,
          state: 1
        },
        {
          id: 4,
          title: '测试机构动态',
          time: formatTime(new Date()),
          content: ' 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
          type: 0,
          state: 0
        }

      ]
    }
  },
  methods: {
    searchValue() {
      console.log(this.searchInput);
    },
    goDetail(id) {
      let data = JSON.stringify(id);
      wx.navigateTo({
        url: `../detail/detail?id=${data}`
      })
    },
    addInstitutions() {
      wx.navigateTo({
        url: '../addInstitutions/addInstitutions'
      })
    }
  }
}
</script>

<style scoped>
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
.flex-due {
  justify-content: start;
  align-items: start;
}
</style>