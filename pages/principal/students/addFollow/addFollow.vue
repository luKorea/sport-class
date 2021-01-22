<template>
  <view class="add-follow-container margin">
    <view class="cu-form-group align-start cu-bar bg-white">
      <view class="title">跟进内容</view>
    </view>
    <view class="cu-form-group align-start cu-bar bg-white">
      <textarea maxlength="-1" v-model="form.content" placeholder="请填写跟进内容，200字以内"></textarea>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">跟进状态</view>
      <picker @change="bindStateChange($event, stateArray)" :value="stateIndex"
              :range="stateArray" range-key="label">
        <view class="picker">
          {{stateArray[stateIndex].label}}
        </view>
      </picker>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">意向级别</view>
      <picker @change="bindLevelChange($event, levelArray)" :value="levelIndex"
              mode='selector'
              :range="levelArray" range-key="label">
        <view class="picker">
          {{levelArray[levelIndex].label}}
        </view>
      </picker>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">下次跟进时间</view>
      <picker mode="date" @change="bindDateChange" :value="date"
              :start="startDate" :end="endDate">
        <view class="picker">{{date}}</view>
      </picker>
    </view>

    <view class="flex flex-direction margin-top-xl" @click="sendFollow">
      <button class="cu-btn bg-my-red lg">提交</button>
    </view>

  </view>
</template>

<script>
import {getDate} from "../../../../utils";

export default {
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      // 跟进状态
      stateIndex: 0,
      stateArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      date: currentDate,
      // 意向级别
      levelIndex: 0,
      levelArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
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
    }
  },
  onLoad(options) {
    let {id} = options;
    console.log(id);
  },
  methods: {
    // 选择下次跟进时间
    bindDateChange(e) {
      this.date = e.target.value;
      this.form.time = e.target.value;
    },
    // 选择意向级别
    bindLevelChange(e, data) {
      const {value} = e.detail;
      this.levelIndex = value;
      this.form.level = data[this.levelIndex].id;
    },
    // 选择跟进状态
    bindStateChange(e, data) {
      const {value} = e.detail;
      this.stateIndex = value;
      this.form.state = data[this.stateIndex].id;
    },
    // 提交跟进记录
    sendFollow() {
      console.log(this.form);
      uni.navigateBack();
    }
  },
}
</script>

<style scoped>

</style>