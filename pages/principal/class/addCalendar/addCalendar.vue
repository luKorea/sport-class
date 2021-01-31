<template>
  <view class="margin">

    <view class="margin-top cu-bar bg-white">
      <view class="action">上课日期</view>
      <view class="action" @click="showCalendar = true">
        <text class="text-gray">
          {{ form.selectTime ? form.selectTime : '可多选' }}
        </text>
        <text class="cuIcon-right"></text>
      </view>
    </view>

    <view class="margin-top cu-bar bg-white">
      <view class="action">上课时间</view>
      <view class="action" @click="showModal">
        <text class="text-gray">{{ form.time ? form.time : '请选择' }}</text>
        <text class="cuIcon-right"></text>
      </view>
    </view>

    <view class="bg-white cu-bar margin-top">
      <view class="action">上课老师</view>
      <view class="action" @click="showTeacher">
        <text class="text-sm text-gray">
          {{ form.teacherName ? form.teacherName : '请选择上课老师' }}
        </text>
      </view>
    </view>


    <button class="cu-btn bg-red lg margin-top" style="width: 100%"
            @click="saveData">保存
    </button>


    <!--上课时间-->
    <view class="cu-modal show" v-if="showTimeModal">
      <view class="cu-dialog" style="margin-top: 100rpx;">
        <view class="cu-bar bg-red justify-end solid-bottom">
          <view class="content">请选择上课时间</view>
          <view class="action" @click="goTimePage">
            <text class="text-white"
                  style="border: 1px solid; padding: 4rpx 8rpx">配置
            </text>
          </view>
          <view class="action" @click="hideModal">
            <text class="cuIcon-close text-white"></text>
          </view>
        </view>
        <radio-group class="block" @change="chooseTimeItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in timeArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <text class="margin-right">
                  {{item.startTime}}~{{item.endTime}}
                </text>
                <radio class="round" :value="JSON.stringify(item)"></radio>
              </label>
            </view>
          </view>
        </radio-group>
      </view>
    </view>
    <!--老师-->
    <view class="cu-modal show" v-if="showTeacherModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseTeacherItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in teacherArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{ item.name }}</text>
                  <text class="text-type">{{ item.type === 0 ? '主教' : '助教' }}
                  </text>
                </view>
                <radio class="round" :value="item.name"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideTeacher">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="hideTeacher">
            <button class="cu-btn bg-white">确定</button>
          </view>
        </view>
      </view>
    </view>
    <!-- 多选日历 -->
    <van-calendar :show="showCalendar"
                  @close="onClose"
                  :close-on-click-overlay="true"
                  type="multiple" @confirm="onConfirm"/>
  </view>
</template>

<script>
import {getDate} from "../../../../utils";

export default {
  name: "addRules",
  data() {
    return {
      showCalendar: false,
      showTimeModal: false,
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
      showTeacherModal: false,
      teacherArray: [
        //  type 0 主教 1 助教
        {
          id: 1,
          name: '彭老师',
          type: 0
        },
        {
          id: 2,
          name: '彭老师',
          type: 1
        }
      ],
      form: {}
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
    onClose(e) {
      console.log(e);
      this.showCalendar = false;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(event) {
      let date = [];
      event.detail.forEach(item => {
        date.push(this.formatDate(item))
      });
      this.form.date = date;
      this.form.selectTime = `已选 ${event.detail.length} 天`;
      this.showCalendar = false;
    },
    showModal() {
      this.showTimeModal = true;
    },
    hideModal() {
      this.showTimeModal = false;
    },
    chooseTimeItem(e) {
      let {value} = e.detail,
          date = JSON.parse(value);
      this.form.time = `${date.startTime}~${date.endTime}`
      this.hideModal();
    },
    showTeacher() {
      this.showTeacherModal = true;
    },
    hideTeacher() {
      this.showTeacherModal = false;
    },
    chooseTeacherItem(e) {
      let {value} = e.detail;
      this.form.teacherName = value;
    },
    goTimePage() {
      wx.navigateTo({
        url: '../timePage/timePage'
      })
    },
    saveData() {
      wx.navigateBack();
    }
  }
}
</script>

<style scoped>

</style>