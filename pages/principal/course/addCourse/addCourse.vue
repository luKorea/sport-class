<template>
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">
        <text class="text-red">*</text>
        <text>课程名称</text>
      </view>
      <view class="action text-right">
        <input type="text" v-model="info.className" placeholder="请输入课程名称">
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>通用课程</text>
      </view>
      <view class="action">
        <switch @change="setClassType"/>
      </view>
    </view>

    <block v-if="classType">
      <view class="cu-bar bg-white margin-top solid-bottom" @click="setTongClassType1">
        <view class="action">
          <text>通用全部课程</text>
        </view>
        <view class="action" v-if="showClass">
          <text class="cuIcon-roundcheckfill text-orange"></text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom" @click="setTongClassType2">
        <view class="action">
          <text>通用部分课程</text>
        </view>
        <view class="action" v-if="!showClass">
          <text class="cuIcon-roundcheckfill text-orange"></text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom" v-if="!showClass">
        <view class="action">
          <text>通用的课程</text>
        </view>
        <view class="action" @click="showGradeModal">
          <text class="text-gray" v-if="selectArray.length === 0">选择课程</text>
          <text class="text-gray" v-if="selectArray.length > 0">{{selectArray.length}} 门课程</text>
        </view>
      </view>
    </block>


    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text class="text-red">*</text>
        <text>课程类型</text>
      </view>
      <view class="action">
        <picker @change="bindTypeChange($event, typeArray)" :value="typeIndex" :range="typeArray" range-key="name">
          <view class="picker">{{typeArray[typeIndex].name}}</view>
        </picker>
        <text class="cuIcon-triangledownfill"></text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text class="text-red">*</text>
        <text>通用单价</text>
      </view>
      <view class="action text-right">
        <input type="text" v-model="info.money" placeholder="请输入价格">
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>未到是否扣课时</text>
      </view>
      <view class="action">
        <switch @change="setWeiDaoTime"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>请假是否扣课时</text>
      </view>
      <view class="action">
        <switch @change="setLevalTime"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>启用状态</text>
      </view>
      <view class="action">
        <switch @change="setState"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom">
      <view class="action">
        <text>课程介绍</text>
      </view>
    </view>
    <view class="cu-form-group align-start cu-bar bg-white">
      <textarea maxlength="-1" v-model="info.content" placeholder="写下对课程的介绍，不超200字"></textarea>
    </view>

    <view class="cu-bar margin-top" @click="saveData">
      <button class="cu-btn lg bg-red" style="width: 100%">保存</button>
    </view>


    <!--弹框-->
    <view class="cu-modal show" v-if="gradeModal">
      <view class="cu-dialog">
        <checkbox-group class="block" @change="chooseGradeItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in classArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">{{item.name}}</view>
                <checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
              </label>
            </view>
          </view>
        </checkbox-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideGradeModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="hideGradeModal">
            <button class="cu-btn bg-white">确定</button>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: "addCourse",
  data() {
    return {
      info: {
        type: false
      },
      typeIndex: 0,
      typeArray:[
        {
          id: 1,
          name: '一对一'
        },
        {
          id: 2,
          name: '一对多'
        }
      ],
      classType: false,
      showClass: true,
      gradeModal: false,
      classArray: [
        {
          id: 1,
          name: '测试'
        },
        {
          id: 2,
          name: '跆拳道'
        },
        {
          id: 3,
          name: '武术'
        },
        {
          id: 4,
          name: '篮球'
        }
      ],
      selectArray: []
    }
  },
  methods: {
    setClassType(e) {
      let {value} = e.detail;
      this.classType = value;
    },
    setTongClassType1() {
      this.showClass = true;
    },
    setTongClassType2() {
      this.showClass = false;
    },
    showGradeModal() {
      this.gradeModal = true;
    },
    hideGradeModal() {
      this.gradeModal = false;
    },
    setWeiDaoTime(e) {
      let {value} = e.detail;
      this.info.weidao = value ? 1 : 0;
    },
    setLevalTime(e) {
      let {value} = e.detail;
      this.info.leval = value ? 1 : 0;
    },
    setState(e) {
      let {value} = e.detail;
      this.info.state = value ? 1 : 0;
    },
    bindTypeChange(e) {
      const {value} = e.detail;
      this.typeIndex = value;
    },
    chooseGradeItem(e) {
      let {value} = e.detail,
          data = [];
      value.forEach(item => {
        data.push(JSON.parse(item));
      });
      this.selectArray = data;
    },
    saveData() {
      wx.navigateBack();
    }
  }
}
</script>

<style scoped>

</style>