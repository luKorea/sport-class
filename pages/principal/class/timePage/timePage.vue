<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <block v-if="timeArray.length > 0">
        <view class="cu-bar bg-white margin-top" v-for="(item, index) in timeArray" :key="item.id">
          <view class="action">
            {{item.startTime}}~{{item.endTime}}
          </view>
          <view class="action">
            <text class="cuIcon-edit text-red margin-right-sm" @click="addOrEditItem('edit', item)"></text>
            <text class="cuIcon-delete text-gray" @click="deleteItem(item.id, index)"></text>
          </view>
        </view>
      </block>
    </view>
    <view class="drawer-footer" @click="addOrEditItem('add')">
      <button class="cu-btm bg-red lg" style="width: 100%">添加</button>
    </view>


    <!--配置时间-->
    <view class="cu-modal show" v-if="showTimeModal">
      <view class="cu-dialog">
        <view class="cu-bar bg-red justify-end solid-bottom">
          <view class="content">请选择时间间隔</view>
          <view class="action" @click="hideModal">
            <text class="cuIcon-close text-white"></text>
          </view>
        </view>

        <view class="cu-form-group cu-bar bg-white">
          <view class="title">上课开始时间</view>
          <picker mode="time" @change="bindStartTimeChange" :value="form.startTime"
                  start="00:00" end="23:59">
            <view class="picker">{{ form.startTime }}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">上课结束时间</view>
          <picker mode="time" @change="bindEndTimeChange" :value="form.endTime"
                  start="00:00" end="23:59">
            <view class="picker">{{ form.endTime }}</view>
          </picker>
        </view>

        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="saveItem">
            <button class="cu-btn bg-white">确定</button>
          </view>
        </view>
      </view>
    </view>


  </view>
</template>

<script>
import {getDate} from "../../../../utils";

export default {
  name: "timePage",
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
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
      form: {
        startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        endTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      }
    }
  },
  methods: {
    bindStartTimeChange(e) {
      this.form.startTime = e.target.value;
    },
    bindEndTimeChange(e) {
      this.form.endTime = e.target.value;
    },
    addOrEditItem(type, item) {
      this.showTimeModal = true;
      if (type === 'edit') {
        this.form = item;
      } else {
        console.log(this.form);
      }
    },
    hideModal() {
      this.showTimeModal = false;
    },
    saveItem(){
      this.timeArray = this.timeArray.concat(this.form);
      this.showTimeModal = false;
    },
    deleteItem(id, index) {
      let that = this;
      wx.showModal({
        title: '删除配置时间',
        content: '是否真的删除？删除后不能恢复！',
        confirmText: '删除',
        success(res) {
          if (res.confirm) {
            that.timeArray.splice(index, 1)
            console.log(id);
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>