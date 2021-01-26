<template>
  <view class='margin'>
    <view class="cu-bar bg-white">
      <view class="action">真实姓名</view>
      <view class="action text-right">
        <input v-model="info.name" placeholder="请输入老师姓名"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">手机号码</view>
      <view class="action text-right">
        <input v-model="info.phone" type="number" placeholder="请填写手机号码"/>
      </view>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">性别</view>
      <picker @change="bindSexChange($event, sexArray)" :value="sexIndex"
              :range="sexArray" range-key="label">
        <view class="picker">
          {{sexArray[sexIndex].label}}
        </view>
      </picker>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">出生日期</view>
      <picker mode="date" @change="bindDateChange" :value="date"
              :start="startDate" :end="endDate">
        <view class="picker">{{date}}</view>
      </picker>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">启用状态</view>
      <view class="action text-right">
        <switch  @change="setStatus"/>
      </view>
    </view>
    <view class="margin-top" @click="saveData">
      <button class="add-btn">保存</button>
    </view>
  </view>
</template>

<script>
import {getDate} from "../../../../../utils";

export default {
  name: "basic",
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      date: currentDate,
      // 性别
      sexIndex: 0,
      sexArray: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ],
      info: {}
    }
  },
  computed: {
    startDate() {
      return getDate('start')
    },
    endDate() {
      return getDate('end');
    }
  },
  methods: {
    setStatus(e) {
      let {value} = e.detail;
      this.info.status = value === true ? 1 : 0;
      console.log(this.info.status);
    },
    // 选择意向级别
    bindSexChange(e, data) {
      const {value} = e.detail;
      this.sexIndex = value;
      this.info.sex = data[this.sexIndex].id;
    },
    // 选择下次跟进时间
    bindDateChange(e) {
      this.date = e.target.value;
      this.info.time = e.target.value;
    },
    saveData() {
      console.log(this.info);
    }
  }
}
</script>

<style scoped>

</style>