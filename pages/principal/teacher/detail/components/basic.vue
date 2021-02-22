<template>
  <view class='margin'>
    <view class="cu-bar bg-white">
      <view class="action">真实姓名</view>
      <view class="action text-right">
        <input v-model="info.name" placeholder="请输入老师姓名"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">手机号码</view>
      <view class="action text-right">
        <input v-model="info.contact" type="number" placeholder="请填写手机号码"/>
      </view>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">性别</view>
      <picker @change="bindSexChange($event, sexArray)" :value="sexIndex"
              :range="sexArray" range-key="label">
        <view class="picker">
          {{info.gender === 1 ? '男' : '女' }}
        </view>
      </picker>
    </view>

    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">出生日期</view>
      <picker mode="date" @change="bindDateChange" :value="info.birthday"
              :start="startDate" :end="endDate">
        <view class="picker">{{ info.birthday !== null ? info.birthday : '暂无' }}</view>
      </picker>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">启用状态</view>
      <view class="action text-right">
        <switch @change="setStatus" :checked="info.isused"/>
      </view>
    </view>
    <view class="margin-top" @click="saveData">
      <button class="add-btn">保存</button>
    </view>
  </view>
</template>

<script>
import {getDate} from "../../../../../utils";
import {
  addOrEditTeacher,
  getTeacherDetail
} from "../../../../../api/principal/teacher";
import {failTip} from "../../../../../utils/tip";

export default {
  name: "basic",
  props: {
    teacherids: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.getDetailInfo(this.teacherids);
  },
  data() {
    return {
      info: {},
      // 性别
      sexIndex: 0,
      sexArray: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ]
    }
  },
  computed: {
    startDate() {
      return getDate('start')
    },
    endDate() {
      return getDate('end');
    }
  },
  methods: {
    getDetailInfo(teacherids) {
      getTeacherDetail(teacherids)
          .then(res => {
            this.info = res.data.data.info;
            let flags = res.data.data.info.flags;
            (flags&8) === 0 ? this.info.isused = true : this.info.isused = false;
          }).catch(err => console.log(err));
    },
    setStatus(e) {
      let {value} = e.detail;
      this.info.isused = value;
    },
    // 选择意向级别
    bindSexChange(e, data) {
      const {value} = e.detail;
      this.sexIndex = value;
      this.info.gender = data[this.sexIndex].value;
    },
    // 选择下次跟进时间
    bindDateChange(e) {
      this.info.birthday = e.target.value;
    },
    saveData() {
      addOrEditTeacher(this.info)
          .then(res => {
            if (res.data.data.errcode === 200) {
              wx.navigateBack();
            } else {
              failTip(res.data.data.errmsg)
            }
          })
    }
  }
}
</script>

<style scoped>

</style>