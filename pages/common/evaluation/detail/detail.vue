<template>
  <view style="padding-bottom: 120rpx;">

    <view class="margin">
      <view class="cu-bar bg-white">
        <view class="action">
          <text class="margin-right">{{info.className}}</text>
          <text class="text-type">{{info.type}}</text>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          <text class="cuIcon-peoplefill"></text>
          <text class="margin-right">{{info.userName}}</text>
          <view v-if="info.number !== ''">
            <text class="text-red">{{info.number}}朵</text>
            <text class="cuIcon-evaluate_fill text-red"></text>
          </view>
        </view>
        <view class="action" @click="showModals">赠送小红花 ></view>
      </view>
      <view class="cu-form-group margin-top">
        <textarea maxlength="-1" v-model="info.content" placeholder="请输入评价内容"></textarea>
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
        <view class="action">评语标签</view>
        <view class="action" @click="goEditPage">
          <text class="text-type" style="padding: 4rpx 8rpx">编辑</text>
        </view>
      </view>
      <view class="cu-bar bg-white" style="flex-wrap: wrap;">
        <view class="action" v-for="(item, index) in labelList" :key="index">
          <text class="text-sm bg-gray item">{{item.name}}</text>
        </view>
      </view>
    </view>

    <view class="drawer-footer">
      <button class="add-btn" @click="saveData">提交</button>
    </view>

    <!--赠送小红花-->
    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <view class="cu-bar bg-red justify-end">
          <view class="content">赠送小红花</view>
        </view>
        <view class="padding-xl solid-bottom bg-white">
          <view class="margin-bottom flex justify-center align-center">
            <text class="margin-right">小红花: </text>
            <uni-number step="1" @change="setFlower"></uni-number>
          </view>
        </view>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="sendFlower">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniNumber from '../../../../components/uni-number-box/uni-number-box';
export default {
  name: "detail",
  components: {
    uniNumber
  },
  data() {
    return {
      showModal: false,
      info: {
        className: '测试的数据',
        type: '1v1',
        userName: '黄晓明',
        content: '',
        imgList: [],
        number: '',
      },
      labelList: [
        {
          id: 1,
          name: '再接再厉'
        },
        {
          id: 2,
          name: '真棒'
        },
        {
          id: 3,
          name: '你真的很调皮啊'
        },
        {
          id: 3,
          name: '你真的很调皮啊'
        },
        {
          id: 3,
          name: '你真的很调皮啊'
        },
        {
          id: 3,
          name: '你真的很调皮啊'
        },
        {
          id: 3,
          name: '你真的很调皮啊'
        },
      ]
    }
  },
  methods: {
    chooseImage() {
      wx.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.info.imgList.length !== 0) {
            this.info.imgList = this.info.imgList.concat(res.tempFilePaths);
          } else {
            this.info.imgList = res.tempFilePaths
          }
        }
      });
    },
    delImg(index) {
      this.info.imgList.splice(index, 1);
    },
    showModals() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    setFlower(e) {
      this.info.number = e;
    },
    sendFlower() {
      this.hideModal();
    },
    goEditPage() {
      wx.navigateTo({
        url: '../editComments/editComments'
      })
    },
    saveData() {
      wx.navigateBack();
    }
  }
}
</script>

<style scoped>
.item {
  margin: 0 20rpx 10rpx 10rpx;
  padding: 10rpx 10rpx;
  background: #EEEEEE;
  color: #7d7b7b;
  border: 1px solid #7f7d7d;
  border-radius: 10rpx;
}
</style>