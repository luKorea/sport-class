<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <!--搜索区域-->
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入班级名称" v-model="searchGradeInput"/>
        </view>
        <view class="action" @click="searchData">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
          <view class="margin-left" @click="showDrawer">
            <text>筛选</text>
            <text class="cuIcon-triangledownfill text-gray"></text>
          </view>
        </view>
      </view>
      <!--筛选侧边栏-->
      <uni-drawer ref='drawer' mode="right" style="z-index: 99999">
        <!--头部-->
        <view class="solids-bottom flex align-center justify-center">
          <view class="padding">筛选</view>
        </view>
        <!--内容区域-->
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">销售跟进人</view>
          <picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="label">
            <view class="picker">{{gradeArray[gradeIndex].label}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">跟进状态</view>
          <picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray" range-key="label">
            <view class="picker">{{classArray[classIndex].label}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">意向级别</view>
          <picker @change="bindTeacherChange($event, teacherArray)" :value="teacherIndex" :range="teacherArray" range-key="label">
            <view class="picker">{{teacherArray[teacherIndex].label}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">学员来源</view>
          <picker @change="bindPackageChange($event, packageArray)" :value="packageIndex" :range="packageArray" range-key="label">
            <view class="picker">{{packageArray[packageIndex].label}}</view>
          </picker>
        </view>
        <view class="cu-form-group cu-bar bg-white">
          <view class="title">学员标签</view>
          <picker @change="bindLabelChange($event, labelArray)" :value="labelIndex" :range="labelArray" range-key="label">
            <view class="picker">{{labelArray[labelIndex].label}}</view>
          </picker>
        </view>
        <!--底部区域-->
        <view class="drawer-footer">
          <button class="bg-my-red lg cu-btn" style="width: 100%;" @click="searchData">确定</button>
        </view>
      </uni-drawer>

<!--列表-->
      <view class="cu-list menu-avatar margin-top">
        <block v-if="list.length > 0">
          <view class="cu-item solid-bottom margin-bottom" v-for="item in list"
                :key="item.id" @click="goDetail(item)" style="z-index: -999">
            <view class="cu-avatar round lg"
                  :style="{backgroundImage: `url(${item.imgList})`}"
                  style="border-radius: 50%"></view>
            <view class="content">
              <view class="">{{ item.studentsName }}</view>
              <view class="text-gray text-sm flex">
                <text class="text-cut">{{ item.content }}</text>
              </view>
            </view>
            <view class="action">
              <view class="text-red">{{item.type}}</view>
            </view>
          </view>
        </block>
      </view>

    </view>

    <view class="fixed-right" @click="goSalesAllocation">
      <view class="text-sm">销售分配</view>
    </view>

    <view class="drawer-footer" @click="addStudents">
      <button class="add-btn">添加</button>
    </view>

  </view>
</template>

<script>
export default {
  name: "potentialStudent",
  data() {
    return {
      list: [
        {
          id: 1,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进'
        },
        {
          id: 2,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: ''
        },
        {
          id: 3,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进'
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: ''
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进'
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: '待跟进'
        },
        {
          id: 4,
          imgList: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
          studentsName: '李明远',
          content: '待分配跟进人',
          type: ''
        }

      ],
      searchGradeInput: '',
      // 选择课程
      classIndex: 0,
      classArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择课程
      gradeIndex: 0,
      gradeArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择老师
      teacherIndex: 0,
      teacherArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择课程套餐
      packageIndex: 0,
      packageArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
      // 选择标签
      labelIndex: 0,
      labelArray: [
        {
          label: '电话来访',
          id: 111
        },
        {
          label: '运动课',
          id: 222
        },
        {
          label: '门店到访',
          id: 333
        }
      ],
    }
  },
  methods: {
    searchData() {
      console.log(this.form);
    },
    showDrawer() {
      this.$refs['drawer'].open();
    },
    closeDrawer() {
      this.$refs['drawer'].close();
    },
    // 筛选区域
    // 选择课程
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.form.class = data[this.classIndex].id;
    },
    // 选择课程
    bindGradeChange(e, data) {
      const {value} = e.detail;
      this.gradeIndex = value;
      this.form.grade = data[this.gradeIndex].id;
    },
    // 选择课程
    bindTeacherChange(e, data) {
      const {value} = e.detail;
      this.teacherIndex = value;
      this.form.teacher = data[this.teacherIndex].id;
    },
    // 选择课程
    bindPackageChange(e, data) {
      const {value} = e.detail;
      this.packageIndex = value;
      this.form.package = data[this.packageIndex].id;
    },
    // 选择课程
    bindLabelChange(e, data) {
      const {value} = e.detail;
      this.labelIndex = value;
      this.form.label = data[this.labelIndex].id;
    },
    addStudents() {
      console.log(1);
      wx.navigateTo({
        url: '../addStudents/addStudents'
      })
    },
    goSalesAllocation() {
      wx.navigateTo({
        url: '../salesAllocation/salesAllocation'
      })
    },
    goDetail(data) {
      wx.navigateTo({
        url: `../detail/detail?id=${item.id}`
      })
    }
  }
}
</script>

<style scoped>
.fixed-right {
  position: fixed;
  right: 30rpx;
  bottom: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //z-index: 999;
  text-align: center;
  width: 120rpx;
  height: 120rpx;
  color: #ffffff;
  background: #52CDC0;
  border-radius: 50%;
}
</style>