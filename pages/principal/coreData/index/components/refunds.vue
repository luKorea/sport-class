<template>
  <view class="margin">
    <!--学员退费率-->
    <view class="cu-bar margin-top bg-white justify-center">
      <view class="action">学员退费率 单位：%</view>
    </view>
    <view class="cu-bar bg-white justify-center padding-bottom">
      <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas>
    </view>
    <!--课程退费率明细-->
    <view class="cu-bar bg-white margin-top justify-center solid-bottom">
      <view class="action text-center text-black">课程退费率明细</view>
    </view>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">课程名称</view>
      <view class="action">当前/设定人数</view>
      <view class="action">退费率</view>
    </view>
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index" class="cu-bar bg-white">
        <view class="action" style="width: 124rpx">{{ item.title }}</view>
        <view class="action text-center">{{ item.c2 }}/{{ item.c1 }}
        </view>
        <view class="action text-center">{{ (item.rate*100).toFixed(2)}}%</view>
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
import {
		getrefundratebytype,
		getrefundrate,
	} from '../../../../../api/principal/attendanceRate.js'
	import uCharts from '../../../../../components/u-charts/u-charts.js';
	import {
		chooseTime
	} from '../../../../../utils/chooseTime.js';
let _self;
let canvaLineA = null;
export default {
  name: "refunds",
  data() {
    return {
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      list: []
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
	  getMonths() {
	  	var monthArr = [];
	  	var data = new Date();
	  	var year = data.getFullYear();
	  	data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
	  	for (var i = 0; i < 6; i++) {
	  		data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
	  		var m = data.getMonth() + 1;
	  		m = m < 10 ? "0" + m : m;
	  		monthArr.push(`${m}月`);
	  	}
	  	return monthArr.reverse();
	  },
    getServerData() {
		
		// 判断时间
		let obj = {
			type: 1,
		}
		obj = chooseTime(obj, '4');
		getrefundratebytype(obj).then((res) => {
			if (res.data.code === 0) {
				if (res.data.data.list.length > 0) {
					let LineA = {
						categories: [],
						series: [{
							name: "退费率",
							data: []
						}]
					};
		
					res.data.data.list.map((item, index) => {
						LineA.categories.push(`${item.date}`);
						LineA.series[0].data.push(item.rate)
					})
		
					// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					_self.showLineA("canvasLineA", LineA);
				} else {
					let LineA = {
						categories: this.getMonths(),
						series: [{
							name: "退费率",
							data: [0, 0, 0, 0, 0, 0]
						}]
					};
		
					// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					_self.showLineA("canvasLineA", LineA);
				}
		
			}
		
		})
      getrefundrate(obj).then((res) => {
      	if (res.data.code === 0) {
      		if (res.data.data.list.length > 0) {
      			this.list = res.data.data.list
      		}
      	}
      })
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