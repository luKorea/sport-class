<template>
  <view style="padding-bottom: 120rpx">
    <view class="margin">
      <view class="cu-bar bg-white margin-top">
        <view class="action">标题</view>
        <view class="action text-right">
          <input v-model="info.title" placeholder="请填写标题" />
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">简介</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <textarea maxlength="-1" v-model="info.describe" placeholder="请填写简介"></textarea>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">详情内容</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <rich-text :nodes="info.content"></rich-text>
<!--          <textarea maxlength="-1" v-model="info.content" placeholder="登陆机构后台编辑更方便哦"></textarea>-->
        </view>
      </view>

      <view class="cu-bar margin-top bg-white">
        <view class="action">是否只在本上课点展示</view>
        <view class="action"><switch :checked="info.type === 1" @change="setType"/></view>
      </view>
      <view class="cu-bar margin-top bg-white">
        <view class="action">是否启用</view>
        <view class="action"><switch :checked="info.flags === 1" @change="setState"/></view>
      </view>
    </view>
    <view class="drawer-footer">
      <button class="add-btn" style="width: 50%; background-color: #FE8530;" @click="deleteData">删除</button>
      <button class="add-btn" style="width: 50%" @click="saveData">保存</button>
    </view>
  </view>
</template>

<script>
import {
  deleteSaleCommon, editOrAddSaleCommon,
  getSaleCommonDetail
} from "../../../../api/principal/saleCommon";
import {failTip} from "../../../../utils/tip";

export default {
  name: "addTeacherStyles",
  data() {
    return {
      info: {}
    }
  },
  onLoad(options) {
    let {id} = options;
    this.getDetail(id);
  },
  methods: {
    getDetail(id) {
      getSaleCommonDetail(id)
      .then(res => {
        this.info = res.data.data.info;
      }).catch(err => console.log(err));
    },
    setType(e) {
      let {value} = e.detail;
      this.info.type = value ? 1 : 2;
    },
    setState(e) {
      let {value} = e.detail;
      this.info.flags = value ? 1 : 0;
    },
    deleteData() {
      let that = this;
      wx.showModal({
        title: '删除',
        content: '是否确定要删除？',
        confirmText: '删除',
        success: function success(res) {
          if (res.confirm) {
            deleteSaleCommon(that.info.id)
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
    },
    saveData() {
      console.log(this.info);
      editOrAddSaleCommon(this.info)
      .then(res => {
        if (res.data.data.errcode === 200) {
          wx.navigateBack()
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