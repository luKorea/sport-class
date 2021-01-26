<template>
  <view class="margin">
    <!--学员续签率-->
    <view class="cu-bar margin-top bg-white justify-center">
      <view class="action">学员续签率 单位：%</view>
    </view>
    <view class="cu-bar bg-white justify-center padding-bottom">
      <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas>
    </view>
    <!--课程续签率明细-->
    <view class="cu-bar bg-white margin-top justify-center solid-bottom">
      <view class="action text-center text-black">课程续签率明细</view>
    </view>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">课程名称</view>
      <view class="action">当前/设定人数</view>
      <view class="action">续签比</view>
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
let canvaLineA = null;
export default {
  name: "refunds",
  data() {
    return {
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      serverData: '',
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
    this.cWidth = uni.upx2px(550);
    this.cHeight = uni.upx2px(300);
    this.getServerData();
  },
  methods: {
    getServerData() {
      let LineA = {categories: [], series: []};
      let data = {
        categories: ['8月','9月','10月','11月','12月','1月'],
        series: [{
          name: "续签率",
          data: [0,10,0,100,20,80]
        }]
      }
      // //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      LineA.categories=data.categories;
      LineA.series=data.series;
      _self.textarea = JSON.stringify(data);
      _self.showLineA("canvasLineA", LineA);
      // uni.request({
      //   url: 'https://www.ucharts.cn/data.json',
      //   data: {},
      //   success: function (res) {
      //     console.log(res.data.data)
      //     let LineA = {categories: [], series: []};
      //     let data = {
      //       categories: ['8月','9月','10月','11月','12月','1月'],
      //       series: [{
      //         name: "",
      //         data: [0,10,0,100,20,80]
      //       }]
      //     }
      //     // //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      //     LineA.categories=data.categories;
      //     LineA.series=data.series;
      //     _self.textarea = JSON.stringify(data);
      //     _self.showLineA("canvasLineA", LineA);
      //   },
      //   fail: () => {
      //     _self.tips = "网络错误，小程序端请检查合法域名";
      //   },
      // });
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

</style>