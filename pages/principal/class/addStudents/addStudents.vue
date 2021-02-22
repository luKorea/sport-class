<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入学员名字" v-model="params.keywords"/>
        </view>
        <view class="action" @click="search">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
<!--        <view class="action" @click="setType">-->
<!--          <text class="text-red text-sm">{{showAllStudent ? '全部学员' : '非本班学员'}}</text>-->
<!--          <text class="cuIcon-triangledownfill text-gray text-sm"></text>-->
<!--        </view>-->
        <view class="action">
          <checkbox style="transform:scale(0.6)" @click="setTime" />
          <text>只显示有剩余课时</text>
        </view>
      </view>
      <view class="margin-top">
        <block v-if="student.length > 0">
          <view class="cu-list grid col-4 gridBorder">
            <view class="cu-item flex justify-center align-center"
                  v-for="(item, index) in student"
                  :class="{'red':borderArray.indexOf(index)>-1}"
                  :key="index" @click="selectBorder(item.id, index)"
            >
              <view class="cu-avatar lg bg-white"
                    :style="{backgroundImage: `url(${item.url ? item.url : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'})`}"
                    style="border-radius: 50%"></view>
              <text class="text-sm">{{ item.name }}</text>
              <text class="text-sm">{{item.title}}</text>
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

    <view class="drawer-footer">
      <button class="cu-btn add-btn bg-red" style="width: 100%;" @click="saveData">确定</button>
    </view>
  </view>
</template>

<script>
import {
  classAddStudent,
  getBuyClassStudent
} from "../../../../api/principal/class";
import {failTip} from "../../../../utils/tip";
import {getDate} from "../../../../utils";

export default {
name: "assStudents",
  data() {
    return {
      borderArray: [],
      student: [],
      flag: false,
      showAllStudent: true,
      params: {
        studentflags: 2,
        datetime: getDate(new Date()),
        paging: false,
        pi: 1,
        ps: 1000
      }
    }
  },
  onLoad(options) {
    let {courseid, classid} = options;
    this.courseid = courseid;
    this.classid = classid;
    this.params['courseid'] = courseid;
    this.getStudent(this.params);
  },
  methods: {
    getStudent(params) {
      getBuyClassStudent(params)
      .then(res => {
        let list = res.data.data.list,
            courseList = res.data.data.courselist;
        list.forEach(item => {
          courseList.forEach(child => {
            if(child.studentid) {
              if (item.id === child.studentid) {
                this.student = this.student.concat({
                  ...item,
                  courseid: child.courseid,
                  title: child.title
                })
              }
            }
          })
        })
        console.log(this.student);
        // this.student = res.data.data.list;
      }).catch(err => console.log(err));
    },
    search() {
      this.student = [];
      this.getStudent(this.params);
    },
    setType() {
      this.student = [];
      this.showAllStudent = !this.showAllStudent;
      this.getStudent({
        ...this.params,
        sflags: this.showAllStudent ? '' : 2
      })
    },
    setTime() {
      this.student = [];
      this.flag = !this.flag;
      this.params['haslesson'] = this.flag ? true : '';
      this.getStudent(this.params);
    },
    selectBorder(id, key) {
      let arrIndex = this.borderArray.indexOf(key);
      if(arrIndex>-1){   // 已选中,点击取消
        this.borderArray.splice(arrIndex,1);
      }else{  // 未选中,点击选中
        this.borderArray.push(key);
      }
    },
    saveData() {
      let list = [];
      this.borderArray.forEach(item => {
        this.student.forEach((child, index) => {
          if (index === item) {
            console.log(child);
            list.push({
              classid: Number(this.classid),
              courseid: child.courseid,
              studentid: child.id
            })
          }
        })
      });

      classAddStudent({data: JSON.stringify(list)}).then(res => {
        if (res.data.data.errcode === 200) {
          wx.navigateTo({
            url: '/pages/principal/class/index/index'
          })
        } else {
          failTip(res.data.data.errmsg)
        }
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