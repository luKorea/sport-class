<template>
  <view class="margin">
    <!--学员出勤率-->
    <view class="cu-bar margin-top bg-white justify-center">
      <view class="action">学员出勤率  单位:%</view>
    </view>
    <view class="cu-bar bg-white justify-center padding-bottom line-charts">
      <canvas canvas-id="canvasLineA" id="canvasLineA" class="line"></canvas>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action text-bold" @click="showTitle">
        <text :class="showRedTitle ? 'text-red' : ''" class="margin-right">按老师分析</text>
        <text :class="showRedTitle ? '' : 'text-red'">按课程</text>
      </view>
      <view class="action">
        <picker @change="bindDateChange($event, dateArray)" :value="dateIndex" :range="dateArray" range-key="name">
          <view class="picker">{{dateArray[dateIndex].name}}</view>
        </picker>
        <text class="cuIcon-triangledownfill"></text>
      </view>
    </view>


    <!--课程续签率明细-->
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">{{showRedTitle ? '老师名称' : '课程名称'}}</view>
      <view class="action">点名次数</view>
      <view class="action">出勤率</view>
    </view>
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index" class="cu-bar bg-white">
        <view class="action" style="width: 124rpx">{{ item.gradeName }}</view>
        <view class="action text-center">{{ item.number }} 次
        </view>
        <view class="action text-center">{{ item.rate }}%</view>
      </view>
    </block>
    <block wx:else>
      <view
          class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title">暂无数据</view>
      </view>
    </block>

    <!--课程弹框-->
    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseDateItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in dateArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{item.name}}</text>
                </view>
                <radio class="round" :value="item.name"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uCharts from '../../../../../components/u-charts/u-charts.js';

let _self;
let canvaLineA = null;
export default {
  name: "refunds",
  data() {
    return {
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      serverData: '',
      showRedTitle: true,
      dateIndex: 0,
      dateArray:[
        {
          id: 1,
          name: '本月'
        },
        {
          id: 2,
          name: '本周'
        },
        {
          id: 3,
          name: '上月'
        },
        {
          id: 4,
          name: '上周'
        },
        {
          id: 5,
          name: '半年'
        },
        {
          id: 6,
          name: '一年'
        },
      ],
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
      ]
    }
  },
  created() {
    console.log(1);
    _self = this;
    this.cWidth = uni.upx2px(700);
    this.cHeight = uni.upx2px(300);
    this.getServerData();
  },
  methods: {
    showTitle() {
      console.log(11);
      this.showRedTitle = !this.showRedTitle;
      console.log(this.showRedTitle);
    },
    bindDateChange(e, data) {
      const {value} = e.detail;
      this.dateIndex = value;
      // this.form.grade = data[this.gradeIndex].id;
    },
    getServerData() {
      let LineA = {categories: [], series: []};
      let data = {
        categories: ['8月','9月','10月','11月','12月','1月'],
        series: [{
          name: "出勤率",
          data: [0,10,0,100,20,80]
        }]
      }
      // //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      LineA.categories=data.categories;
      LineA.series=data.series;
      _self.textarea = JSON.stringify(data);
      _self.showLineA("canvasLineA", LineA);
    },
    showLineA(canvasId, chartData) {
      canvaLineA = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'line',
        colors: ['#ea9846'],
        fontSize: 8,
        dataLabel: false,
        dataPointShape: true,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          line: {
            type: 'straight'
          }
        }
      });

    },
  }
}
</script>

<style scoped>
.arcbar-charts, .line-charts {
  width: 100%;
  height: 350rpx;
}
.line {
  width: 100%;
  height: 300rpx;
}
.charts {
  width: 250rpx;
  height: 300rpx;
}
</style>