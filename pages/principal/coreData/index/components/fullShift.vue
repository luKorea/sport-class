<template>
  <view class="margin">
    <!--班级满班率-->
    <view class="cu-bar margin-top bg-white justify-center">
      <view class="action">班级满班率 单位：%</view>
    </view>
    <view class="cu-bar bg-white justify-center">
      <canvas canvas-id="canvaArcbar" id="canvaArcbar" style="margin-left: 220rpx"></canvas>
    </view>
    <!--课程满班率明细-->
    <view class="cu-bar bg-white margin-top justify-center solid-bottom">
      <view class="action text-center text-black">课程满班率明细</view>
    </view>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">课程名称</view>
      <view class="action">当前/设定人数</view>
      <view class="action">满班率</view>
    </view>
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index" class="cu-bar bg-white">
        <view class="action" style="width: 124rpx">{{ item.gradeName }}</view>
        <view class="action text-center">{{ item.number }}/{{ item.total }}
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
  </view>
</template>

<script>
import uCharts from '../../../../../components/u-charts/u-charts.js';

let _self;
let canvaArcbar = null;
export default {
  name: "fullShift",
  data() {
    return {
      cWidth3: '',//圆弧进度图
      cHeight3: '',//圆弧进度图
      arcbarWidth: '',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
      pixelRatio: 1,
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
    _self = this;
    this.cWidth3 = uni.upx2px(250);//这里要与样式的宽高对应
    this.cHeight3 = uni.upx2px(250);//这里要与样式的宽高对应
    this.arcbarWidth = uni.upx2px(20);
    this.getServerData();
  },
  methods: {
    getServerData() {
      let arcbar = {series: []};
      let data = {
        series: [
          {
            name: "",
            data: 0.85,
            color: "#ec6640"
          }
        ]
      }
      //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      arcbar.series = data.series;
      _self.textarea = JSON.stringify(data);
      _self.showArcbar("canvaArcbar", arcbar);
    },
    showArcbar(canvasId, chartData) {
      canvaArcbar = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'arcbar',
        fontSize: 11,
        legend: {show: false},
        background: '#fff',
        pixelRatio: _self.pixelRatio,
        series: chartData.series,
        animation: true,
        width: _self.cWidth3 * _self.pixelRatio,
        height: _self.cHeight3 * _self.pixelRatio,
        dataLabel: true,
        title: {
          name: Math.round(chartData.series[0].data * 100) + '%',
          color: chartData.series[0].color,
          fontSize: 25 * _self.pixelRatio
        },
        subtitle: {
          name: chartData.series[0].name,
          color: '#666666',
          fontSize: 15 * _self.pixelRatio
        },
        extra: {
          arcbar: {
            type: 'circle',
            width: _self.arcbarWidth * _self.pixelRatio,//圆弧的宽度
          }
        }
      });

    },
  }
}
</script>

<style scoped>
</style>