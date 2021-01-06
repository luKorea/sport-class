<!-- TODO 教师端 班级详情 -->
<template>
  <view class="margin class-container">
    <view class="cu-bar bg-white">
      <view class='action'>课程名称</view>
      <view class='action'>{{result.ban}}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class='action'>班级名称</view>
      <view class='action'>{{result.ke}}</view>
    </view>

    <!--学员区域-->
    <view class="tabNav margin-top">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(index)"
            :class="currentTab === index ? 'cur' : ''">
        <text>{{item}}</text>
      </view>
    </view>
    <!--在线学员-->
    <view id="tab1" class="margin-top-sm" :class="tab1">
      <block v-if="result.student.length > 0">
        <view class="cu-list grid col-4 gridBorder">
          <view class="cu-item flex justify-center align-center" v-for="(item, index) in result.student" :key="index">
            <view class="cu-avatar lg bg-white"
                  :style="{backgroundImage: `url(${item.url})`}"
                  style="border-radius: 50%"></view>
            <text>{{item.name}}</text>
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
      <block v-if="result.list.length > 0">
        <view class="">
          在线
        </view>
      </block>
      <block v-else>
        <view
            class="cu-form-group cu-bar bg-white flex justify-center align-center">
          <view class="title">暂无数据</view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navTab: ['在读学生', '点名记录'],
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      result: {
        ban: '2020通用课程',
        ke: '篮球',
        student: [
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          },
          {
            name: '测试',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
          }
        ],
        list: []
      },
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
  },
  methods: {
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
  }
}
</script>

<style>
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
.tabNav> view {
  text-align: center;
  margin-right: 100rpx;
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
</style>
