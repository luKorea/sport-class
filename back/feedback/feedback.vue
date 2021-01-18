<!-- TODO 意见反馈 -->
<template>
  <view class="margin feedback-container">
    <view class="form-container">
      <view class="cu-form-group">
        <view class="title">标题</view>
        <input placeholder="请填写标题" v-model="form.title"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">内容</view>
        <input placeholder="请填写内容" v-model="form.content"/>
      </view>
      <!--图片上传-->
      <view class="cu-bar bg-white margin-top">
        <view class="action">上传图片</view>
        <view class="action">{{form.imgList.length}}/4</view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item, index) in form.imgList" :key="index">
            <image :src='item' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @click="DelImg(index)">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @click="ChooseImage"
                v-if="form.imgList.length<4">
            <text class="cuIcon-add"></text>
          </view>
        </view>
      </view>

      <view class="flex flex-direction margin-top" @click="setFeedBack">
        <button class="cu-btn bg-my-red margin-tb-sm lg">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        imgList: []
      }
    }
  },
  onLoad() {

  },
  methods: {
    setFeedBack() {
      console.log(this.form);
    },
    // 上传图片
    ChooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.form.imgList.length !== 0) {
            this.form.imgList = this.form.imgList.concat(res.tempFilePaths)
          } else {
            this.form.imgList = res.tempFilePaths
          }
        }
      });
    },
    // ViewImage(url) {
    //   wx.previewImage({
    //     urls: this.form.imgList,
    //     current: url
    //   });
    // },
    DelImg(index) {
      this.form.imgList.splice(index, 1);
      // wx.showModal({
      //   title: '材料删除',
      //   content: '确定要删除该材料内容吗',
      //   cancelText: '再看看',
      //   confirmText: '确定删除',
      //   success: res => {
      //     if (res.confirm) {
      //
      //     }
      //   }
      // })
    },
  }
}
</script>

<style>
</style>
