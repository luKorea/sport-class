<template>
  <view class="margin charges-container">
    <view class="cu-bar bg-white">
      <view class="action">名称</view>
      <view class="action text-right">
        <input v-model="info.title" placeholder="请填写名称"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">类型</view>
      <view class="action">
        <picker @change="bindKindChange($event, kindArray)" :value="kindIndex"
                :range="kindArray" range-key="label">
          <view class="picker">
            {{kindArray[kindIndex].label}}
          </view>
        </picker>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">价格</view>
      <view class="action text-right">
        <input v-model="info.price" type="number" placeholder="请填写价格"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">启用状态</view>
      <view class="action text-right">
        <switch  @change="setStatus"/>
      </view>
    </view>
    <view class="margin-top" @click="saveData">
      <button class="cu-btn lg bg-my-red" style="width: 100%">保存</button>
    </view>
  </view>
</template>

<script>
import {addOrEditCharges} from "../../../../api/principal/charges";
import {failTip} from "../../../../utils/tip";

export default {
  name: "detail",
  data() {
    return {
      // 种类
      kindIndex: 0,
      kindArray: [
        {
          label: '费用',
          value: 1
        },
        {
          label: '物品',
          value: 2
        }
      ],
      info: {
        id: 0,
        title: '',
        price: '', // 单价
        count: 0,  //  库存数量
        kind: 1, // 种类（1=费用、2=物品）
        status: 0, // 状态（0=停用、1=启用）
      }
    }
  },
  methods: {
    setStatus(e) {
      let {value} = e.detail;
      this.info.status = value === true ? 1 : 0;
    },
    bindKindChange(e, data) {
      const {value} = e.detail;
      this.kindIndex = value;
      this.info.kind = data[this.kindIndex].value;
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
    }
  }
}
</script>

<style scoped>

</style>