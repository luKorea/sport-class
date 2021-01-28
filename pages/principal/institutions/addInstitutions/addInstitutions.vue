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
          <textarea maxlength="-1" v-model="info.content" placeholder="请填写简介"></textarea>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">详细内容</view>
      </view>
      <view class="cu-bar bg-white">
        <view class="action">
          <textarea maxlength="-1" v-model="info.content" placeholder="登陆机构后台编辑更方便哦"></textarea>
        </view>
      </view>

      <view class="cu-bar margin-top bg-white">
        <view class="action">是否只在本上课点展示</view>
        <view class="action"><switch @change="setType"/></view>
      </view>
      <view class="cu-bar margin-top bg-white">
        <view class="action">是否启用</view>
        <view class="action"><switch @change="setState"/></view>
      </view>
    </view>
    <view class="drawer-footer">
      <button class="add-btn" style="width: 50%; background-color: #FE8530;" @click="previewData">预览</button>
      <button class="add-btn" style="width: 50%" @click="saveData">发布</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "addTeacherStyles",
  data() {
    return {
      info: {
        imgList: '',
        type: 1
      }
    }
  },
  methods: {
    // 上传图片
    ChooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          this.info.imgList = res.tempFilePaths[0];
        }
      });
    },
    DelImg() {
      this.info.imgList = '';
    },
    setType(e) {
      this.info.type = e ? 0 : 1;
    },
    setState(e) {
      this.info.state = e ? 0 : 1;
    },
    previewData() {
      let data = JSON.stringify(this.info);
      wx.navigateTo({
        url: `../preview/preview?data=${data}`
      })
    },
    saveData() {
      wx.navigateBack()
    }
  }
}
</script>

<style scoped>

</style>