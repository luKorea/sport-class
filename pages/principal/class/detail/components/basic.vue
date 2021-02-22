<template>
  <view style="padding-bottom: 100rpx">
    <view class="margin">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">课程名称</view>
        <view class="action text-red">{{ info.coursename }}</view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">课程名称</view>
        <view class="action text-right">
          <input type="text" v-model="info.name">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级容量</view>
        <view class="action text-right">
          <input type="text" v-model="info.capacity">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">默认授课课时</view>
        <view class="action text-right">
          <input type="text" v-model="info.duration">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">备注</view>
        <view class="action text-right">
          <input type="text" placeholder="(50字以内)" v-model="info.remark">
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">授课老师</view>
        <view class="action" @click="showModals">
          <button class="bg-orange cu-btn">添加</button>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom"
            v-for="(item, index) in teacher" :key="index">
        <view class="action">{{ item.name }}</view>
        <view class="action" @click="deleteItem(item)">
          <button class="bg-gray cu-btn text-gray">删除</button>
        </view>
      </view>


      <view class="cu-bar bg-white margin-top">
        <view class="action">支持约课</view>
        <view class="action">
          <switch @change="setAbout" :checked="(info.flags%2) === 0"/>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">是否公开课
          <text class="text-sm text-gray">（设置为公开课，所有用户可见）</text>
        </view>
        <view class="action">
          <switch @change="setPublic" :checked="(info.flags%4) === 0 || (info.flags%4) === 2 "/>
        </view>
      </view>

      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
          <text class="text-sm">开课前</text>
          <input type="text" class="kaike" v-model="info.time">
          <text class="text-sm"> 小时，约满</text>
          <input type="text" class="kaike" v-model="info.time2">
          <text class="text-sm"> 人准时开课</text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action text-sm">
          <text class="text-sm">最多可约</text>
          <input type="text" class="yue" v-model="info.amount">
          <text class="text-sm">人，开课前</text>
          <input type="text" class="yue" v-model="info.amount2">
          <text class="text-sm">小时不能取消约课</text>
        </view>
      </view>

    </view>

    <view class="drawer-footer">
      <button class="cu-btn bg-gray lg"
              @click="removeData"
              style="width: 33.33%;border-radius: 0">
        删除
      </button>
      <button class="cu-btn bg-orange lg"
              style="width: 33.33%;border-radius: 0" @click="saveData">保存
      </button>
      <button class="cu-btn bg-red lg"
              style="width: 33.33%;border-radius: 0" @click="overData">
        结业
      </button>
    </view>

    <!--弹框-->
    <view class="cu-modal show" v-if="showModal">
      <view class="cu-dialog">
        <checkbox-group class="block" @change="chooseItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in teacherArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">{{ item.name }}</view>
                <checkbox :value="JSON.stringify(item)"
                          :checked="item.checked"
                          style="transform:scale(0.6)"></checkbox>
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
import {
  addOrEditClass,
  getClassDetails,
  deleteClass,
  deleteTeacherOrStudent,
  classAddTeacher,
  classOver
} from "../../../../../api/principal/class";
import {failTip} from "../../../../../utils/tip";
import {getTeacherList} from "../../../../../api/principal/teacher";

export default {
  name: "basic",
  props: {
    classId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showModal: false,
      info: {
      },
      params: {
        pi: 1,
        ps: 1000,
        enable: 1
      },
      teacher: [],
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
  mounted() {
    this.getDetailInfo(this.classId);
    this.getAllTeacher(this.params);
    this.getSelectTeacher({
      ...this.params,
      classid: this.classId
    });
  },
  methods: {
    getDetailInfo(id) {
      getClassDetails(id)
          .then(res => {
            this.info = res.data.data.info;
            this.info['about'] = (this.info.flags%2) === 0 ? 2 : 0;
            this.info['public'] = ((this.info.flags%4) === 2 || (this.info.flags%4 === 0)) ? 4 : 0;
          }).catch(err => console.log(err))
    },
    // 获取已添加的老师
    getSelectTeacher(params) {
      getTeacherList(params)
          .then(res => {
            if (res.data.code === 0) {
              this.teacher = res.data.data.list;
            } else {
              failTip('出错了')
            }
          }).catch(err => console.log(err))
    },
    // 获取所有老师
    getAllTeacher(params) {
      getTeacherList(params)
          .then(res => {
            if (res.data.code === 0) {
              this.teacherArray = res.data.data.list;
            } else {
              failTip('出错了')
            }
          }).catch(err => console.log(err))
    },
    setAbout(e) {
      let {value} = e.detail;
      this.info['about'] = value === true ? 2 : 0;
    },
    setPublic(e) {
      let {value} = e.detail;
      this.info['public'] = value === true ? 4 : 0;
    },
    showModals() {
      this.teacherArray.forEach(item => {
        item['checked'] = false;
        this.teacher.forEach(child => {
          if (child.id === item.id) {
            item['checked'] = true;
          }
        })
      })
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    chooseItem(item) {
      let {value} = item.detail,
          data = [];
      value.forEach(item => {
        let res = JSON.parse(item);
        res['checked'] = true;
        data.push(res);
      });
      this.selectArray = data;
    },
    addItem() {
      let ids = [];
      this.selectArray.forEach(item => {
        if (item.checked) {
          ids = ids.concat(item.id);
        }
      });
      let data = {
        classId: this.classId,
        ids: ids.toString()
      };
      console.log(data);
      classAddTeacher(data).then(res => {
        if (res.data.data.errcode === 200) {
          this.getSelectTeacher({
            ...this.params,
            classid: this.classId
          })
        } else {
          failTip(res.data.data.errmsg)
        }
      })
      this.hideModal();
    },
    deleteItem(item) {
      deleteTeacherOrStudent({
        type: 2,
        classid: this.classId,
        ids: item.id
      }).then(res => {
        if (res.data.data.errcode === 200) {
          this.getSelectTeacher({
            ...this.params,
            classid: this.classId
          })
        } else {
          failTip(res.data.data.errmsg)
        }
      })
    },
    removeData() {
      let that = this;
      wx.showModal({
        title: '删除班级',
        content: '是否真的删除？删除后不能恢复！',
        confirmText: '删除',
        success: function success(res) {
          if (res.confirm) {
            deleteClass(that.info.id)
                .then(res => {
                  if (res.data.data.errcode === 200) {
                    wx.navigateBack();
                  } else {
                    failTip(res.data.data.errmsg)
                  }
                }).catch(err => {
              console.log(err)
            })
          }
        }
      });
    },
    saveData() {
      this.info['schoolid'] = wx.getStorageSync('venueid');
      this.info['organizeid'] = wx.getStorageSync('organizeid');
      this.info['flags'] = this.info.about + this.info.public;
      let teacherArr = [];
      this.teacher.forEach(item => {
        teacherArr.push(item.id);
      });
      this.info['teacherids'] = teacherArr.toString();
      console.log(this.info);
      addOrEditClass(this.info)
          .then(res => {
            if (res.data.data.errcode === 200) {
              wx.navigateBack();
            } else {
              failTip(res.data.data.errmsg)
            }
          })
    },
    overData() {
      let that = this;
      wx.showModal({
        title: '结业提示',
        content: '确定要结业吗? 结业后无法修改,请确认!',
        confirmText: '结业',
        success: function success(res) {
          if (res.confirm) {
            classOver(that.classId)
                .then(res => {
                  if (res.data.data.errcode === 200) {
                    wx.navigateBack();
                  } else {
                    failTip(res.data.data.errmsg)
                  }
                }).catch(err => {
              console.log(err)
            })
          }
        }
      });
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