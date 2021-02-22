<template>
  <view class="named-page" style="margin-bottom: 100rpx">
<!--学生信息-->
    <view class="margin">
      <view class="cu-bar bg-white">
        <view class='action'>班级名称</view>
        <view class='action'>{{result.className}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class='action'>上课时间</view>
        <view class='action'>{{result.time}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">授课课时</view>
        <view class="action">
          <uni-number-box :step="0.5" @change="getStep" />
          <text class="cuIcon-sort text-gray" @click="this.showModal = !this.showModal"></text>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class='action'>上课老师</view>
        <view class='action'>{{result.teacher}}</view>
      </view>
      <!--搜索区域-->
      <view class="cu-bar search bg-white margin-top">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入学员姓名" v-model="searchInput"/>
        </view>
        <view class="action" @click="searchValue">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
          <view class="margin-left" v-if="!showModal">
            <text class="cuIcon-square text-gray" style="margin-right: 10rpx"></text>
            <text  @click="selectBorderAll" v-if="!borderClickAll">全选</text>
            <text  @click="noSelectBorderAll" v-else>取消</text>
          </view>
        </view>
      </view>
      <!--点名区域-->
      <view v-if="showModal" class="margin-bottom ">
        <view class="cu-bar bg-white margin-top solid-bottom">
          <view class="action">{{type.name}}</view>
          <view class="action"></view>
          <view class="action">{{type.one}}</view>
          <view class="action">{{type.two}}</view>
          <view class="action">{{type.three}}</view>
          <view class="action">{{type.four}}</view>
        </view>
        <block v-if="result.teacherInfo.length > 0">
          <view class="cu-bar bg-white padding-bottom-sm padding-top-sm solid-bottom"
                v-for="(item, index) in result.teacherInfo" :key="index">
            <view class="action flex-due" style="width: 300rpx">
              <view class="text-red" style="margin-bottom: 10rpx">{{item.name}}</view>
              <view class="text-sm text-gray">剩余{{item.time}}课时</view>
            </view>
            <radio-group @change="timeRadioChange($event, item.id)" class="radio-group">
              <label v-for="(info, index) in timeRadio" :key="index" class="radio-group-item">
                <view class="action">
                  <radio :value="info.value" :checked="index === timeCurrent" />
                </view>
              </label>
            </radio-group>
          </view>
        </block>
        <block v-else>
          <view
              class="cu-form-group cu-bar bg-white flex justify-center align-center">
            <view class="title">暂无数据</view>
          </view>
        </block>
      </view>
      <view v-else class="margin-bottom margin-top">
        <block v-if="result.teacherInfo.length > 0">
          <view class="cu-list grid col-4 gridBorder">
            <view class="cu-item flex justify-center align-center"
                  v-for="(item, index) in result.teacherInfo"
                  :class="{'red':borderArray.indexOf(index)>-1}"
                  :key="index" @click="selectBorder(item.id, index)">
              <view class="cu-avatar lg bg-white"
                    :style="{backgroundImage: `url(${item.imgUrl})`}"
                    style="border-radius: 50%"></view>
              <text class="text-sm">{{ item.name }}</text>
              <text class="text-sm">剩余{{item.time}}课时</text>
            </view>
          </view>
        </block>
        <block v-else>
          <view
              class="cu-form-group cu-bar bg-white flex justify-center align-center">
            <view class="title">暂无数据</view>
          </view>
        </block>
      </view>
    </view>
<!--插班-->
    <view class="fixed-right" v-if="showModal" @click="goShift(id)">
      <view class="cuIcon-add"></view>
      <view>插班</view>
    </view>
<!--底部固定-->
    <view class="drawer-footer" v-if="showModal">
      <button class="cu-btn bg-white lg" style="width: 30%;border-radius: 0">全选</button>
      <button class="cu-btn bg-red lg" style="width: 70%;border-radius: 0">点名</button>
    </view>
    <view class="drawer-footer" v-else>
      <button class="cu-btn bg-orange lg" style="width: 25%;border-radius: 0"@click="this.showModal = !this.showModal">到课</button>
      <button class="cu-btn bg-red lg" style="width: 25%;border-radius: 0" @click="this.showModal = !this.showModal">未到</button>
      <button class="cu-btn bg-cyan lg" style="width: 25%;border-radius: 0" @click="this.showModal = !this.showModal">请假</button>
      <button class="cu-btn bg-blue lg" style="width: 25%;border-radius: 0" @click="this.showModal = !this.showModal">迟到</button>
    </view>
    <view class='cu-tabbar-height'></view>
  </view>
</template>

<script>
import uniNumberBox from '../../../components/uni-number-box/uni-number-box';
export default {
  name: "namedPage",
  components: {
    uniNumberBox
  },
  data() {
    return {
      type: {
        name: '学生姓名',
        one: '到课',
        two: '未到',
        three: '请假',
        four: '迟到'
      },
      showModal: true,
      // 2. 多选框按钮
      showBorder: false,
      borderArray: [],
      borderClickAll: false,    // 是否全选
      searchInput: '',
      result: {
        className: '篮球',
        time: '2021-01-14  16:00:41-18:00:14',
        teacher: '谢老师',
        teacherInfo: [
          {
            name: '黄晓明',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
            time: '109',
            className: '二年级2班',
            id: 1,
          },
          {
            name: '黄晓明',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
            time: '109',
            className: '二年级2班',
            id: 2,
          },
          {
            name: '黄晓明',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
            time: '109',
            className: '二年级2班',
            id: 3,
          },
          {
            name: '黄晓明',
            imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
            time: '109',
            className: '二年级2班',
            id: 4,
          }
        ]
      },
      timeCurrent: null,
      timeRadio: [
        {value: 0},
        {value: 1},
        {value: 2},
        {value: 3}
      ],
      stepValue: '',
      array: [],
      id: ''
    }
  },
  onLoad(options) {
    let {id} = options;
    this.id = id;
    console.log(id);
  },
  methods: {
    searchValue() {
      console.log(this.searchInput);
    },
    // 获取用户输入的步长值
    getStep(e) {
      this.stepValue = e;
    },
    timeRadioChange(e, id) {
      this.array = this.array.concat({
        type: e.detail.value,
        id: id
      })
      console.log(this.array);
    },
    // 去插班页面
    goShift(id) {
      uni.navigateTo({
        url: `/pages/common/shift/shift?id=${id}`
      })
    },
    // 全选弹框
    selectBorderAll() {
      let len = this.result.teacherInfo.length;
      this.checkBox = [];
      for (let i = 0; i < len; i++) {
        this.borderArray.push(i);
      }
      this.borderClickAll = true;
    },
    // 取消全选弹框
    noSelectBorderAll() {
      this.borderArray = [];
      this.borderClickAll = false;
    },
  //  选中课程弹框
    selectBorder(id, key) {
      console.log(id);
      let arrIndex = this.borderArray.indexOf(key);
      if(arrIndex>-1){   // 已选中,点击取消
        this.borderArray.splice(arrIndex,1);
      }else{  // 未选中,点击选中
        this.borderArray.push(key);
      }
    }
  },
}
</script>

<style scoped>
.flex-due {
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.fixed-right {
  position: fixed;
  right: 20rpx;
  bottom: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  text-align: center;
  width: 120rpx;
  height: 120rpx;
  color: #ffffff;
  background: #52CDC0;
  border-radius: 50%;
}
.red {
  border: 1px solid red;
}
</style>