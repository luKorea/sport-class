<template>
  <view class="class-container">
    <view class="tabNav">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(index)"
            :class="currentTab === index ? 'cur' : ''">
        <text>{{item}}</text>
      </view>
    </view>
    <!--潜在学员-->
    <view id="tab1" class="margin-top-sm" :class="tab1">
      <potential-component />
    </view>
    <!--在读学员-->
    <view id="tab2" class="margin-top-sm" :class="tab2">
      <read-component/>
    </view>
    <!--历史学员-->
    <view id="tab3" class="margin-top-sm" :class="tab3">
      <history-component/>
    </view>
  </view>
</template>

<script>
import potentialComponent from './components/potentialStudent';
import readComponent from './components/readStudent';
import historyComponent from './components/historyStudent';
export default {
  components: {
    potentialComponent,
    readComponent,
    historyComponent
  },
  data() {
    return {
      studentId: '',
      navTab: ['潜在学员', '在读学员', '历史学员'],
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      tab3: 'tabhide'
    }
  },
  onLoad(options) {
    let {id} = options;
    this.studentId = String(id);
    console.log(this.studentId);
  },
  methods: {
    setCurrentTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      if (index === 0) {
        this.tab1 = 'tabshow';
        this.tab2 = 'tabhide';
        this.tab3 = 'tabhide';
      } else if (index === 1) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabshow';
        this.tab3 = 'tabhide';
      } else if (index === 2) {
        this.tab1 = 'tabhide';
        this.tab2 = 'tabhide';
        this.tab3 = 'tabshow';
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
</style>
