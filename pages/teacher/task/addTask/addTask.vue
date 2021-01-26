<template>
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">班级</view>
      <view class="action text-right">
        <input type="text" v-model="info.name" placeholder="请选择班级" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">作业标题</view>
      <view class="action text-right">
        <input type="text" v-model="info.title" placeholder="请选择标题" />
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">内容</view>
      <view class="action text-right">
        <input type="text" v-model="info.content" placeholder="请输入内容" />
      </view>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">图片上传</view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item, index) in info.imgList" :key="index">
          <image :src='item' mode='aspectFill'></image>
          <view class="cu-tag bg-red" @click="delImg(index)">
            <text class="cuIcon-close"></text>
          </view>
        </view>
        <view class="solids" @click="chooseImage">
          <text class="cuIcon-cameraadd"></text>
        </view>
      </view>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <input type="text" v-model="info.url" placeholder="请粘贴地址" />
      </view>
      <view class="action">目前仅支持腾讯视频</view>
    </view>

    <view class="margin-top">
      <button class="cu-btn lg bg-red" style="width: 100%;">发布</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "addTask",
  data() {
    return {
      info: {
        imgList: []
      }
    }
  },
  methods: {
    // 上传图片
    chooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          console.log(res);
          if (this.info.imgList.length !== 0) {
            this.info.imgList = this.info.imgList.concat(res.tempFilePaths)
          } else {
            this.info.imgList = res.tempFilePaths;
          }
        }
      });
    },
    delImg(index) {
      this.info.imgList.splice(index, 1);
    },
  }
}
</script>

<style scoped>

</style>