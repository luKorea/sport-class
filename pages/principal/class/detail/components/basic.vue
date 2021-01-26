<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">课程名称</view>
        <view class="action text-red">{{info.gradeName}}</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">课程名称</view>
        <view class="action text-red">{{info.className}}</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级容量</view>
        <view class="action text-red">{{info.total}}</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">默认授课课时</view>
        <view class="action text-red">{{info.time}}</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">备注</view>
        <view class="action text-right">
          <input type="text" placeholder="(50字以内)" v-model="info.content">
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">授课老师</view>
        <view class="action" @click="showModals">
          <button class="bg-orange cu-btn">添加</button>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom" v-for="(item, index) in info.teacher" :key="index">
        <view class="action">{{item.name}}</view>
        <view class="action" @click="deleteItem(index)">
          <button class="bg-gray cu-btn text-gray">删除</button>
        </view>
      </view>


      <view class="cu-bar bg-white margin-top">
        <view class="action">支持约课</view>
        <view class="action">
          <switch @change="setAbout" />
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">是否公开课 <text class="text-sm text-gray">（设置为公开课，所有用户可见）</text></view>
        <view class="action">
          <switch @change="setPublic" />
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
          <text class="text-sm">开课前 </text>
          <input type="text" class="kaike">
          <text class="text-sm"> 小时，约满 </text>
          <input type="text" class="kaike">
          <text class="text-sm"> 人准时开课</text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action text-sm">
          <text class="text-sm">最多可约</text>
          <input type="text" class="yue">
          <text class="text-sm">人，开课前</text>
          <input type="text" class="yue">
          <text class="text-sm">小时不能取消约课</text>
        </view>
      </view>

    </view>

    <view class="drawer-footer">
      <button class="cu-btn bg-gray lg" style="width: 33.33%;">删除</button>
      <button class="cu-btn bg-orange lg" style="width: 33.33%;">保存</button>
      <button class="cu-btn bg-red lg" style="width: 33.33%;">结业</button>
    </view>

<!--弹框-->
    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <checkbox-group class="block" @change="chooseItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in teacherArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">{{item.name}}</view>
                <checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
              </label>
            </view>
          </view>
        </checkbox-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="addItem">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
name: "basic",
  data() {
    return {
      showModal: false,
      info: {
        className: '课程表测试',
        gradeName: '篮球',
        total: 20,
        time: 1,
        content: '',
        teacher: [
          {
            id: 1,
            name: '陈老师'
          },
          {
            id: 2,
            name: '黄老师'
          },
        ]
      },
      teacherArray: [
        {
          id: 1,
          name: '李老师'
        },
        {
          id: 2,
          name: '张老师'
        },
        {
          id: 3,
          name: '徐老师'
        },
        {
          id: 4,
          name: '卢老师'
        },
      ],
      selectArray: []
    }
  },
  methods: {
    setAbout(e) {
      let {value} = e.detail;
      this.info.about = value === true ? 1 : 0;
    },
    setPublic(e) {
      let {value} = e.detail;
      this.info.public = value === true ? 1 : 0;
    },
    showModals() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    chooseItem(item) {
      let {value} = item.detail,
          data = [];
      value.forEach(item => {
        data.push(JSON.parse(item));
      });
      this.selectArray = data;
    },
    addItem() {
      this.info.teacher = this.info.teacher.concat(this.selectArray);
      console.log(this.info.teacher);
      this.hideModal();
    },
    deleteItem(index) {
      this.info.teacher.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.kaike {
  width: 100rpx;
  margin: 0 10rpx;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
}
.yue {
  width: 90rpx;
  margin: 0 10rpx;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
}
</style>