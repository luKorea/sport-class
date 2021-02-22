<template>
  <view>
    <view class="margin">
      <block v-if="student.length > 0">
        <view class="cu-list grid col-4 no-border">
          <view class="cu-item flex justify-center align-center"
                v-for="(item, index) in student"
                :class="{'red':borderArray.indexOf(index)>-1}"
                :key="index" @click="selectBorder(item.id, index)"
          >
            <view class="cu-avatar lg bg-white"
                  :style="{backgroundImage: `url(${item.url ? item.url : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'})`}"
                  style="border-radius: 50%"></view>
            <text class="text-sm">{{ item.name }}</text>
            <text class="text-sm">{{ item.title }}</text>
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
    <view class="drawer-footer">
      <button class="cu-btn bg-orange lg" style="width: 50%; border-radius: 0"
              @click="removeStudents">
        <text class="cuIcon-roundclose margin-right-sm"></text>
        移出学员
      </button>
      <button class="cu-btn bg-red lg" style="width: 50%;border-radius: 0"
              @click="goAddStudents">
        <text class="cuIcon-roundadd margin-right-sm"></text>
        添加学员
      </button>
    </view>
  </view>
</template>

<script>
import {
  deleteTeacherOrStudent,
  getClassStudent
} from "../../../../../api/principal/class";
import {failTip} from "../../../../../utils/tip";

export default {
  name: "students",
  props: {
    classId: {
      type: String,
      default: ''
    },
    courseid: {
      type:String,
      default: ''
    }
},
  data() {
    return {
      borderArray: [],
      student: [],
    }
  },
  mounted() {
    this.getStudent(this.classId)
  },
  methods: {
    getStudent(id) {
      getClassStudent(id)
          .then(res => {
            this.student = res.data.data.list;
          }).catch(err => console.log(err))
    },
    selectBorder(id, key) {
      let arrIndex = this.borderArray.indexOf(key);
      if (arrIndex > -1) {   // 已选中,点击取消
        this.borderArray.splice(arrIndex, 1);
      } else {  // 未选中,点击选中
        this.borderArray.push(key);
      }
    },
    removeStudents() {
      let ids = [];
      this.borderArray.forEach(item => {
        this.student.forEach((child, index) => {
          if (index === item) {
            ids.push(child.id);
          }
        })
      });
      deleteTeacherOrStudent({
        type: 1,
        classid: this.classId,
        ids: ids.toString()
      }).then(res => {
        if (res.data.data.errcode === 200) {
          this.getStudent(this.classId);
          this.borderArray = [];
        } else {
          failTip(res.data.data.errmsg)
        }
      }).catch(err => console.log(err));
      // this.borderArray.forEach(item => {
      //   this.student = this.student.filter((i, index) => item !== index);
      // });
    },
    goAddStudents() {
      wx.navigateTo({
        url: `../addStudents/addStudents?courseid=${this.courseid}&classid=${this.classId}`
      })
    }
  }
}
</script>

<style scoped>
.red {
  border: 1px solid red;
}
</style>