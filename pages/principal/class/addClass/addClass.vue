<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">课程名称</view>
        <view class="action" @click="showClassModals">
          <text v-if="info.className === ''">请选择课程名称</text>
          <text v-else>{{info.className}}</text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级名称</view>
        <view class="action text-right">
          <input type="text" placeholder="请输入班级名称" v-model="info.gradeName">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级容量</view>
        <view class="action text-right">
          <input type="text" placeholder="请输入班级容量人数" v-model="info.total">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">默认授课课时</view>
        <view class="action text-right">
          <input type="text" placeholder="请输入默认授课课时" v-model="info.time">
        </view>
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
      <button class="cu-btn add-btn bg-red" @click="saveData">保存</button>
    </view>

    <!--课程弹框-->
    <view class="cu-modal show" v-if="showClassModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseClassItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in classArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{item.name}}</text>
                  <text class="text-cyan margin-right text-sm">{{item.money}}元/课时</text>
                  <text class="text-type">{{item.type}}</text>
                </view>
                <radio class="round" :value="item.name"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideClassModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="hideClassModal">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>

    <!--老师弹框-->
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
            <button class="cu-btn bg-white">确定</button>
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
      showClassModal: false,
      showModal: false,
      info: {
        className: '',
        gradeName: '',
        total: '',
        time: '',
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
      classArray: [
        {
          id: 1,
          name: '测试课程1',
          money: 10,
          type: '1v1'
        },
        {
          id: 2,
          name: '测试课程2',
          money: 10,
          type: '1vN'
        },
        {
          id: 3,
          name: '测试课程3',
          money: 10,
          type: '1v1'
        },
        {
          id: 4,
          name: '测试课程4',
          money: 10,
          type: '1vN'
        },
      ],
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
    showClassModals() {
      this.showClassModal = true;
    },
    hideClassModal() {
      this.showClassModal = false;
    },
    chooseClassItem(e) {
      let {value} = e.detail;
      this.info.className = value;
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
    },
    saveData() {
      wx.navigateBack();
      console.log(this.info);
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