<!-- TODO 校长端 课时消耗 -->
<template>
  <view class="class-container">
    <view class="tabNav">
      <view v-for="(item, index) in navTab" :key="index"
            @click="setCurrentTab(index)"
            :class="currentTab === index ? 'cur' : ''">
        <text>{{item}}</text>
      </view>
    </view>
    <!--满班率-->
    <view id="tab1" class="margin-top-sm" :class="tab1">
      <teacher-hour-component />
    </view>
    <!--退费率-->
    <view id="tab2" class="margin-top-sm" :class="tab2">
     <class-expense-component/>
    </view>
    <!--续签率-->
    <view id="tab3" class="margin-top-sm" :class="tab3">
      <statistics-component/>
    </view>
  </view>
</template>

<script>
import teacherHourComponent from './components/teacherHour';
import classExpenseComponent from './components/classExpense';
import statisticsComponent from './components/statistics';
export default {
  components: {
    teacherHourComponent,
    classExpenseComponent,
    statisticsComponent,
  },
  data() {
    return {
      currentRate: 80,
      gradientColor: {
        '0%': '#ffd01e',
        '100%': '#ee0a24',
      },
      studentId: '',
      list: [
        {
          id: 1,
          gradeName: '篮球',
          total: 300,
          number: 11,
          rate: 11.19
        },
        {
          id: 2,
          gradeName: '足球',
          total: 300,
          number: 11,
          rate: 11.19
        },
        {
          id: 3,
          gradeName: '测试测试',
          total: 300,
          number: 11,
          rate: 11.19
        },
        {
          id: 4,
          gradeName: '武术',
          total: 300,
          number: 11,
          rate: 11.19
        }
      ],
      navTab: ['授课授时22', '课消金额', '出勤统计'],
      currentTab: 0,
      tab1: 'tabshow',
      tab2: 'tabhide',
      tab3: 'tabhide',
    }
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + '%';
    },
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
