<template>
  <view class="margin">

    <view class="cu-form-group cu-bar bg-white">
      <view class="title">循环方式</view>
      <picker @change="bindWayChange($event, wayArray)" :value="wayIndex"
              :range="wayArray" range-key="label">
        <view class="picker">{{ wayArray[wayIndex].label }}</view>
      </picker>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">开始时间</view>
      <picker mode="date" @change="bindStartDateChange" :value="start"
              :start="startTime" :end="endTime">
        <view class="picker">{{ start }}</view>
      </picker>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">结束时间</view>
      <picker mode="date" @change="bindEndDateChange" :value="end"
              :start="startDate" :end="endDate">
        <view class="picker">{{ end }}</view>
      </picker>
    </view>

    <view class="margin-top cu-bar bg-white">
      <view class="action">上课时间</view>
      <view class="action" @click="showModal">
        <text class="text-gray">{{form.time ? form.time : '请选择'}}</text>
        <text class="cuIcon-right"></text>
      </view>
    </view>

    <button class="cu-btn bg-red lg margin-top" style="width: 100%"
            @click="saveData">保存
    </button>

    <button v-if="showDeleteBtn" class="cu-btn bg-red lg margin-top" style="width: 100%"
            @click="deleteData">删除
    </button>

    <view class="cu-modal show" v-if="showTimeModal">
      <view class="cu-dialog" style="margin-top: 100rpx">
        <view class="cu-bar bg-red justify-end solid-bottom">
          <view class="content">请选择上课时间</view>
          <view class="action" @click="goTimePage">
            <text class="text-white" style="border: 1px solid; padding: 4rpx 8rpx">配置</text>
          </view>
          <view class="action" @click="hideModal">
            <text class="cuIcon-close text-white"></text>
          </view>
        </view>
        <radio-group class="block" @change="chooseTimeItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in timeArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <text class="margin-right">{{item.startTime}}~{{item.endTime}}</text>
                <radio class="round" :value="JSON.stringify(item)"></radio>
              </label>
            </view>
          </view>
        </radio-group>
      </view>
    </view>

  </view>
</template>

<script>
import {getDate} from "../../../../utils";

export default {
  name: "addRules",
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      showTimeModal: false,
      showDeleteBtn: false,
      timeArray: [
        {
          id: 1,
          startTime: '09:00',
          endTime: '10:00',
        },
        {
          id: 2,
          startTime: '10:00',
          endTime: '11:00',
        },
        {
          id: 3,
          startTime: '11:00',
          endTime: '12:00',
        },
        {
          id: 4,
          startTime: '13:00',
          endTime: '14:00',
        },
        {
          id: 5,
          startTime: '14:00',
          endTime: '15:00',
        },
        {
          id: 6,
          startTime: '15:00',
          endTime: '16:00',
        },
        {
          id: 7,
          startTime: '16:00',
          endTime: '17:00',
        }
      ],
      start: currentDate,
      end: currentDate,
      wayArray: [
        {
          label: '每周循环',
          value: 1
        },
        {
          label: '隔周循环',
          value: 2
        }
      ],
      wayIndex: 0,
      form: {}
    }
  },
  onLoad(options) {
    let {type} = options;
    if (type && type === 'edit') {
      this.showDeleteBtn = true;
    }
  },
  computed: {
    startDate() {
      return getDate('start')
    },
    endDate() {
      return getDate('end');
    },
    startTime() {
      return getDate('start')
    },
    endTime() {
      return getDate('end');
    }
  },
  methods: {
    showModal(){
      this.showTimeModal = true;
    },
    hideModal(){
      this.showTimeModal = false;
    },
    chooseTimeItem(e) {
      let {value} = e.detail,
          date = JSON.parse(value);
      this.form.time = `${date.startTime}~${date.endTime}`
      console.log(value);
      this.hideModal();
    },
    bindWayChange(e, data) {
      const {value} = e.detail;
      this.wayIndex = value;
      this.form.wayType = data[this.wayIndex].value;
    },
    bindStartDateChange(e) {
      this.start = e.target.value;
      this.form.startTime = e.target.value;
    },
    bindEndDateChange(e) {
      this.end = e.target.value;
      this.form.endTime = e.target.value;
    },
    goTimePage() {
      wx.navigateTo({
        url: '../timePage/timePage'
      })
    },
    saveData() {
      wx.navigateBack();
    },
    deleteData() {
      wx.navigateBack();
    }
  }
}
</script>

<style scoped>

</style>