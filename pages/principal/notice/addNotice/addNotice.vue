<template>
  <view>
    <view class="margin">

      <view class="cu-bar bg-white margin-top">
        <view class="action">接受者</view>
        <view class="action text-right" @click="showModal">
          <block v-if="selectArray.length > 0">
<!--            <text class="text-sm text-gray" v-for="(item, index) in selectArray" :key="index">-->
<!--              {{item}},-->
<!--            </text>-->
            <text class="text-gray text-sm">已选择{{selectArray.length}}个人</text>
          </block>
          <text class="text-gray text-sm" v-else>请选择接收者</text>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">标题</view>
        <view class="action text-right">
          <input type="text" v-model="info.title" placeholder="请填写标题">
        </view>
      </view>

      <view class="cu-bar bg-white margin-top solid-bottom">
        <view class="action">内容</view>
      </view>
      <view class="cu-bar bg-white padding-top">
        <view class="action">
          <textarea maxlength="-1" placeholder="请输入内容" v-modal="info.content"></textarea>
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

    </view>
    <view class="drawer-footer">
      <button class="add-btn" @click="saveData">提交</button>
    </view>

    <view class="cu-modal show" v-if="userModal">
      <view class="cu-dialog">
        <checkbox-group class="block" @change="chooseUserItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in userArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{item.name}}</text>
                  <text v-if="item.sex === 0" class="cuIcon-male text-blue margin-right"></text>
                  <text v-else class="cuIcon-female text-pink margin-right"></text>
                  <text class="text-red text-sm margin-right">{{item.phone}}</text>
                  <text v-if="item.time > 0">剩余 <text class="text-red text-sm">{{item.time}}</text> 课时</text>
                  <text v-else class="text-sm">无可用课时</text>
                </view>
                <checkbox :value="item.name" style="transform:scale(0.6)"></checkbox>
              </label>
            </view>
          </view>
        </checkbox-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "addNotice",
  data() {
    return {
      userModal: false,
      userArray: [
        {
          id: 1,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 8
        },
        {
          id: 2,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 1,
          time: 8
        },
        {
          id: 3,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 0
        },
        {
          id: 4,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 1,
          time: 8
        },
        {
          id: 5,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 0
        },
        {
          id: 5,
          name: '陈晓霞',
          phone: '1380138000',
          ke: '篮球',
          sex: 0,
          time: 0
        },
      ],
      selectArray: [],
      info: {
        title: '',
        content: '<div>Hello World!</div>',
        imgList: []
      }
    }
  },
  methods: {
    showModal() {
      this.userModal = true;
    },
    hideModal() {
      this.userModal = false;
    },
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
    chooseUserItem(e) {
      let {value} = e.detail;
      this.selectArray = value;
    },
    saveData() {
      wx.navigateBack();
    }
  }
}
</script>

<style scoped>

</style>