<!--TODO 约课记录 -->
<template>
  <view class="margin">
    <view class="cu-bar search bg-white">
      <view class="action">
        <picker mode="date" @change="bindStartDateChange" :value="startDate" :start="startDateFormat" :end="endDateFormat">
          <view class="picker">{{startDate}}</view>
        </picker>
      </view>
      <view class="action">至</view>
      <view class="action">
        <picker mode="date" @change="bindEndDateChange" :value="endDate" :start="endStartDateFormat" :end="endEndDateFormat">
          <view class="picker">{{endDate}}</view>
        </picker>
      </view>
      <!--      <view class="action" @click="showDrawer">-->
      <!--        <button class="cu-btn shadow-blur text-white bg-orange">筛选</button>-->
      <!--      </view>-->
    </view>
  </view>
</template>

<script>
import {getDate} from "../../../../../utils";

export default {
  data() {
    const currentStartDate = getDate({format: true})
    const currentEndDate = getDate({format: true})
    return {
      searchInput: '',
      startDate: currentStartDate,
      endDate: currentEndDate,
      form: {}
    }
  },
  computed: {
    startDateFormat() {
      return getDate('start')
    },
    endDateFormat() {
      return getDate('end');
    },
    endStartDateFormat() {
      return getDate('start')
    },
    endEndDateFormat() {
      return getDate('end');
    },
  },
  onLoad() {
  },
  methods: {
    // 开始时间
    bindStartDateChange(e) {
      this.startDate = e.target.value;
      this.form.startTime = e.target.value;
    },
    // 结束时间
    bindEndDateChange(e) {
      this.endDate = e.target.value;
      this.form.endTime = e.target.value;
    },
  }
}
</script>

<style scoped>

</style>