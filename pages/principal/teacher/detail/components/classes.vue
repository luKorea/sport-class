<template>
  <view class="margin">
    <block v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action">
            <view class="flex flex-direction padding-top padding-bottom">
              <view class="margin-bottom-sm">
                <text class="ban-red">班</text>
                <text class="margin-right">{{item.name}}</text>
                <text class="text-type">{{item.type === 1 ? '1v1' : '1vN'}}</text>
              </view>
              <view class="margin-bottom-sm">
                <text class="ke-orange">课</text>
                <text>{{item.title}}</text>
              </view>
              <view>
                <text class="ren-green">人</text>
                <text>学生: {{item.signnum}}/{{item.capacity}} 人</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <block wx:else>
      <view class="cu-form-group cu-bar bg-white flex justify-center align-center margin-top-sm">
        <view class="title text-center">暂无数据</view>
      </view>
    </block>
  </view>
</template>

<script>
import {getClassList} from "../../../../../api/principal/class";
export default {
  name: "classes",
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
    if (this.teacherids !== '') {
      this.getClassData({
        ...this.params,
        teacherid: this.teacherids
      })
    }
  },
  methods: {
    getClassData(params) {
      getClassList(params)
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