<template>
  <view>
    <view class="margin-top">
      <view class="bg-white cu-bar text-sm solid-bottom">
        <view class="action">规则排课</view>
        <block v-for="(item, index) in dateInfo" :key="index">
          <view class="action">{{item}}</view>
        </block>
      </view>
      <block v-if="list.length > 0">
        <view class="cu-bar bg-white solid-bottom" v-for="(item, index) in list" :key="index">
          <view class="action text-orange flex flex-common" @click="goDetail(item.id)">
            <text class="text-sm">{{item.interval == 0 ? '每周循环' : '隔周循环'}}</text>
            <text class="text-sm">{{item.btime}}~{{item.etime}}</text>
            <text class="text-sm">{{item.begintime | FormatDate}}~{{item.endtime | FormatDate}}</text>
          </view>
          <view class="action" v-for="(child, i) in item.teacher" :key="i" @click="setTeacher(child.id)">
            <text v-if="child.name !== ''" class="text-sm">{{child.name}}</text>
            <text v-else class="cuIcon-emoji text-sm"></text>
          </view>
        </view>
      </block>
    </view>

    <view class="drawer-footer">
      <button class="cu-btn add-btn" style="width: 50%; background-color: rgb(243, 123, 29)" @click="addRules">
        <text class="cuIcon-roundadd margin-right-sm"></text>规则排课
      </button>
      <button class="cu-btn add-btn bg-red" style="width: 50%;" @click="addCalendar">
        <text class="cuIcon-roundadd margin-right-sm"></text>日历排课
      </button>
    </view>

<!--弹框-->
    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseTeacherItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in teacherArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{item.name}}</text>
                  <text class="text-type">{{item.type === 0 ? '主教' : '助教'}}</text>
                </view>
                <radio class="round" :value="item.type"></radio>
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-bar bg-white justify-around">
          <view class="action" @click="hideModal">
            <button class="cu-btn bg-white solid-right">取消</button>
          </view>
          <view class="action" @click="sendTeacher">
            <button class="cu-btn bg-white" >确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getClassCalendar,
  getClassRules
} from "../../../../../api/principal/class";
import {getDate} from "../../../../../utils";

// interval: 0 间隔周期（单位：周，0=表示不间断、1=表示隔周，以开始日期为基准）

export default {
  name: "scheduling",
  props: {
    classId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

      showModal: false,
      dateInfo: ['星期一', '星期二',' 星期三', '星期四', '星期五','星期六', '星期日'],
      list: [],
      teacherArray: [
        //  type 0 主教 1 助教
        {
          id: 1,
          name: '彭老师',
          type: 0
        },
        {
          id: 2,
          name: '彭老师',
          type: 1
        }
      ],
      selectId: 0,
      form: {},
      params: {
        btime: getDate(new Date()),
        etime: '9999-12-31',
        paging: false,
        irregular: true,
      }
    }
  },
  mounted() {
    this.getRulesData(this.classId);
    this.params['classid'] = this.classId;
    this.getCalendar(this.params);
  },
  methods: {
    // 获取规则排课
    getRulesData(id) {
      getClassRules(id)
      .then(res => {
        this.list = res.data.data.schedulelist;
        console.log(res);
      }).catch(err => console.log(err))
    },
    // 获取日历排课
    getCalendar(params) {
      getClassCalendar(params)
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err))
    },
    setTeacher(id) {
      this.showModal = true;
      this.selectId = id;
    },
    hideModal() {
      this.showModal = false;
    },
    chooseTeacherItem(e) {
      let {value} = e.detail;
      this.form.type = value;
    },
    sendTeacher() {
      this.form.selectId = this.selectId;
      console.log(this.form);
      this.showModal = false;
    },
    goDetail(id) {
      wx.navigateTo({
        url: `../addRules/addRules?type=edit&id=${id}`
      })
    },
    addRules() {
      wx.navigateTo({
        url: '../addRules/addRules?type=add'
      })
    },
    addCalendar() {
      wx.navigateTo({
        url: '../addCalendar/addCalendar'
      })
    }
  }
}
</script>

<style scoped>

</style>