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
        <input v-model="info.contact" type="number" placeholder="请填写手机号码"/>
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
import {getDate} from "../../../../utils";
import {addOrEditTeacher} from "../../../../api/principal/teacher";
import {failTip} from "../../../../utils/tip";

export default {
  name: "index",
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
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      info: {
        isused: false,
        id: 0,
        name: '',
        gender: 1,
        contact: '',
        birthday: ''
      }
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
      this.info.isused = value;
    },
    bindSexChange(e, data) {
      const {value} = e.detail;
      this.sexIndex = value;
      this.info.gender = data[this.sexIndex].value;
    },
    bindDateChange(e) {
      this.date = e.target.value;
      this.info.birthday = e.target.value;
    },
    saveData() {
      addOrEditTeacher(this.info)
      .then(res => {
        if (res.data.data.errcode === 200) {
          wx.navigateBack();
        } else {
          failTip(res.data.data.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>