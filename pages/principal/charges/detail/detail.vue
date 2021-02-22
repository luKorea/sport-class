<template>
  <view class="margin charges-container">
    <view class="cu-bar bg-white">
      <view class="action">名称</view>
      <view class="action">{{ info.title }}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">类型</view>
      <view class="action">
        <text v-if="info.kind === 1">费用</text>
        <text v-else>物品</text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">价格</view>
      <view class="action text-right">
        <input v-model="info.price" placeholder="请填写价格"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">库存</view>
      <view class="action">{{ info.count }}</view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">库存预警值</view>
      <view class="action text-right">
        <input v-model="info.setInventory" placeholder="请填写库存预警值"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">启用状态</view>
      <view class="action text-right">
        <switch :checked="info.status === 1" @change="setStatus"/>
      </view>
    </view>
    <view class="margin-top" @click="saveData">
      <button class="cu-btn lg bg-my-red" style="width: 100%">保存</button>
    </view>

    <view class="margin-top" @click="removeData">
      <button class="cu-btn lg bg-orange plain" style="width: 100%">删除</button>
    </view>

  </view>
</template>

<script>
import {
  addOrEditCharges,
  getChargesDetail,
  removeCharges
} from "../../../../api/principal/charges";
import {failTip} from "../../../../utils/tip";

export default {
  name: "detail",
  data() {
    return {
      info: {}
    }
  },
  onLoad(options) {
    let {id} = options;
    this.getDetailData(id);
  },
  methods: {
    getDetailData(id) {
      getChargesDetail(id)
          .then(res => {
            this.info = res.data.data.info;
          }).catch(err => console.log(err))
    },
    setStatus(e) {
      let {value} = e.detail;
      this.info.status = value === true ? 1 : 0;
      console.log(this.info.status);
    },
    saveData() {
      addOrEditCharges(this.info)
          .then(res => {
            if (res.data.data.errcode === 200) {
              wx.navigateBack();
            } else {
              failTip(res.data.data.errmsg)
            }
          }).catch(err => {
        console.log(err)
      })
    },
    removeData() {
      let that = this;
      wx.showModal({
        title: '删除收费项',
        content: '是否真的删除？删除后不能恢复！',
        confirmText: '删除',
        success: function success(res) {
          if (res.confirm) {
            removeCharges(that.info.id)
                .then(res => {
                  if (res.data.data.errcode === 200) {
                    wx.navigateBack();
                  } else {
                    failTip(res.data.data.errmsg)
                  }
                }).catch(err => {
              console.log(err)
            })
          }
        }
      });
    }
  }
}
</script>

<style scoped>

</style>