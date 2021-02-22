<template>
  <view style="padding-bottom: 120rpx">
    <view class="margin">
      <view class="cu-bar bg-white margin-top">
        <view class="action">标题</view>
        <view class="action text-right">
          <input v-model="info.title" placeholder="请填写标题"/>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">简介</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <textarea maxlength="-1" v-model="info.describe"
                    placeholder="请填写简介"></textarea>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">详细内容</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <textarea maxlength="-1" v-model="info.content"
                    placeholder="登陆机构后台编辑更方便哦"></textarea>
        </view>
      </view>

      <view class="cu-bar margin-top bg-white">
        <view class="action">是否只在本上课点展示</view>
        <view class="action">
          <switch @change="setType"/>
        </view>
      </view>
      <view class="cu-bar margin-top bg-white">
        <view class="action">是否启用</view>
        <view class="action">
          <switch @change="setState"/>
        </view>
      </view>
    </view>
    <view class="drawer-footer">
      <button class="add-btn" style="width: 50%; background-color: #FE8530;"
              @click="previewData">预览
      </button>
      <button class="add-btn" style="width: 50%" @click="saveData">发布</button>
    </view>
  </view>
</template>

<script>
import {editOrAddSaleCommon} from "../../../../api/principal/saleCommon";
import {failTip} from "../../../../utils/tip";

export default {
  name: "addTeacherStyles",
  data() {
    return {
      info: {
        id: 0,
        type: 2,
        flags: 1
      }
    }
  },
  methods: {
    setType(e) {
      this.info.type = e ? 1 : 2;
    },
    setState(e) {
      this.info.flags = e ? 1 : 0;
    },
    previewData() {
      let data = JSON.stringify(this.info);
      wx.navigateTo({
        url: `../preview/preview?data=${data}`
      })
    },
    saveData() {
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