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
          <textarea maxlength="-1" placeholder="请输入内容" v-model="info.content"></textarea>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">图片上传</view>
        <view class="action" style="width: 100rpx;height: 100rpx; margin: 30rpx 30rpx 10rpx 30rpx">
          <view class="grid col-1 grid-square flex-sub" style="flex-direction: row-reverse;">
            <view class="bg-img" v-if="info.images !== ''">
              <image :src='imgUrl + info.images' mode='aspectFill'></image>
              <view class="cu-tag bg-red" @click="DelImg">
                <text class="cuIcon-close"></text>
              </view>
            </view>
            <view class="solids" @click="ChooseImage" v-if="info.images === ''">
              <text class="cuIcon-add"></text>
            </view>
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
                  <text v-if="item.gender === 1" class="cuIcon-male text-blue margin-right"></text>
                  <text v-else class="cuIcon-female text-pink margin-right"></text>
                  <text class="text-red text-sm margin-right">{{item.contact}}</text>
                 <!-- <text v-if="item.time > 0">剩余 <text class="text-red text-sm">{{item.time}}</text> 课时</text>
                  <text v-else class="text-sm">无可用课时</text> -->
                </view>
                <checkbox :value="item.id" style="transform:scale(0.6)"></checkbox>
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
import {getStudentsList} from '../../../../api/common/students';
import {addNotice} from '../../../../api/principal/notice';
import {failTip} from '../../../../utils/tip.js'; 
export default {
  name: "addNotice",
  data() {
    return {
      imgUrl: this.$uploadUrl,
      userModal: false,
      userArray: [],
      selectArray: [],
      info: {
        title: '',
        images: '',
        studentids: '',
        type: 1
      },
      params:{
        pi:1,
        ps: 1000
      }
    }
  },
  onLoad() {
    this.getUserList(this.params);
  },
  methods: {
    getUserList(params) {
      getStudentsList(params)
      .then(res => {
        this.userArray = res.data.data.list;
      }).catch(err => console.log(err));
    },
    showModal() {
      this.userModal = true;
    },
    hideModal() {
      this.userModal = false;
    },
    // 上传图片
    ChooseImage() {
      let that = this;
      wx.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          console.log(res);
          this.info.image = res.tempFilePaths[0];
          wx.uploadFile({
            url: that.$upload + '/d/m/file/upload?type=12',
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: res.tempFilePaths,
            header: {
              'Content-Type': 'multipart/form-data'
            },
            success(res) {
              let data = JSON.parse(res.data);
              that.info.images = data.data.path + data.data.name;
            }
          })
        }
      });
    },
    DelImg() {
      this.info.images = '';
    },
    chooseUserItem(e) {
      let {value} = e.detail;
      this.selectArray = value;
    },
    saveData() {
		this.info.studentids = this.selectArray.toString();
		addNotice(this.info)
		.then(res => {
			if(res.data.data.errcode === 200) {
				wx.navigateBack();
			} else {
				failTip(res.data.data.errmsg)
			}
		}).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>