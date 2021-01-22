<template>
  <view>
    <view class="margin" style="padding-bottom: 100rpx">
      <view class="cu-bar bg-white">
        <view class="action">收据编号</view>
        <view class="action">{{info.number}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">缴费日期</view>
        <view class="action">{{info.time}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">学员</view>
        <view class="action">{{info.name}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">手机号码</view>
        <view class="action">{{info.phone}}</view>
      </view>

      <!--已选课程-->
      <block>
        <view class="cu-bar bg-white margin-top solid-bottom">
          <view class="action text-red">已选课程</view>
        </view>
        <block v-for="(item, index) in info.class">
          <view :key="index">
            <view class="cu-bar bg-white">
              <view class="action text-red">
                <text class="cuIcon-titles text-red"></text>{{item.gradeName}}
              </view>
            </view>
            <view class="cu-bar bg-white">
              <view class="action">优惠：￥{{item.youhui}}</view>
              <view class="action">签约金额：￥{{item.money}}</view>
            </view>
            <view class="cu-bar bg-white">
              <view class="action">1课时：￥{{item.timeMoney}}</view>
              <view class="action">有效期限：{{item.limit}}</view>
            </view>
          </view>
        </block>
      </block>

<!--缴费记录-->
      <block>
        <view class="cu-bar bg-white margin-top solid-bottom">
          <view class="action text-orange">缴费记录</view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action">交费日期: {{info.recordingTime}}</view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action">金额: {{info.recordingMoney}}</view>
          <view class="action">经办人：{{info.recordingUser}}</view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action">付款方式：{{info.recordingType}}</view>
        </view>
      </block>
      <view class="cu-bar bg-white margin-top">
        <view class="action">应付金额</view>
        <view class="action">{{info.yingfuMoney}}</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">实际金额</view>
        <view class="action">{{info.shifuMoney}}</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">欠费金额</view>
        <view class="action">{{info.qianfeiMoney}}</view>
      </view>
    </view>

<!--底部-->
    <view class="drawer-footer" v-if="type === 1 || type === 2">
      <button class="cu-btn bg-orange lg" style="width: 50%;">删除</button>
      <button class="cu-btn bg-red lg" style="width: 50%;" v-if="type === 1">续签</button>
      <button class="cu-btn bg-cyan lg" style="width: 50%;" v-if="type === 2">新签</button>
    </view>
    <view class="drawer-footer" v-else>
      <button class="cu-btn bg-gray lg" style="width: 100%;">已作废</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      //  type：1 续签 2 新签 3 作废
      type: '',
      info: {
        number: '123456789955',
        time: '2020-09-09  08:12:18',
        name: '陈晓彤',
        phone: '13800138000',
        class: [
          {
            gradeName: '篮球',
            youhui: '0.00',
            money: '100.00',
            timeMoney: 22,
            limit: '无限制'
          },
          {
            gradeName: '篮球',
            youhui: '0.00',
            money: '100.00',
            timeMoney: 22,
            limit: '无限制'
          }
        ],
        recordingTime: '2020-09-09  08:12:18',
        recordingMoney: '101.00',
        recordingUser: '谢老师',
        recordingType: '现金',
        yingfuMoney: '101.00',
        shifuMoney: '101.00',
        qianfeiMoney: '0.00'
      }
    }
  },
  onLoad(options) {
    let {type} = options;
    this.type = Number(type);
  }
}
</script>

<style scoped>

</style>