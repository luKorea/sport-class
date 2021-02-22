<template>
  <view class="margin">
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action">
            <view class="flex flex-direction padding-top-sm padding-bottom-sm">
              <view class="margin-bottom-sm">
                <text class="margin-right-sm">{{ item.name }}</text>
                <text class="margin-right-sm">
                  <text v-if="item.gender === 1"
                        class="cuIcon-male text-blue"></text>
                  <text v-else class="cuIcon-female text-pink"></text>
                </text>
                <text>{{ item.contact }}</text>
              </view>
              <view class="text-gray text-sm">
                <text v-if="item.lessonnum !== null">剩余
                  <text class="text-red">{{ item.lessonnum }}</text>
                  课时
                </text>
                <text v-else>无可用课时</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <block wx:else>
      <view
          class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title text-center">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
import {getStudentsList} from '../../../../../api/common/students';

export default {
  name: "students",
  props: {
    teacherids: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      params: {
        pi: 1,
        ps: 1000
      }
    }
  },
  mounted() {
    this.getStudentsData({
      ...this.params,
      teacherid: this.teacherids
    })
  },
  methods: {
    getStudentsData(params) {
      getStudentsList(params)
          .then(res => {
            if (res.data.code === 0) {
              this.list = res.data.data.list;
              console.log(this.list);
            }
          }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>