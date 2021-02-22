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
          <input type="text" placeholder="请输入班级名称" v-model="info.name">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">班级容量</view>
        <view class="action text-right">
          <input type="text" placeholder="请输入班级容量人数" v-model="info.capacity">
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">默认授课课时</view>
        <view class="action text-right">
          <input type="text" placeholder="请输入默认授课课时" v-model="info.duration">
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
      <view class="cu-bar bg-white solid-bottom" v-for="(item, index) in teacher" :key="index">
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
          <input type="text" class="kaike" v-model="info.time">
          <text class="text-sm"> 小时，约满 </text>
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
                  <text class="margin-right">{{item.title}}</text>
                  <text class="text-type">{{item.type === 1 ? '1v1': '1vN'}}</text>
                </view>
                <radio class="round" :value="JSON.stringify(item)"></radio>
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
                <view class="flex-sub">
                  <text class="margin-right">{{item.name}}</text>
                  <text>{{item.contact}}</text>
                </view>
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
import {
  addOrEditClass,
  getCourseBaseList
} from "../../../../api/principal/class";
import {getTeacherList} from '../../../../api/principal/teacher';
import {failTip} from "../../../../utils/tip";

export default {
  name: "basic",
  data() {
    return {
      showClassModal: false,
      showModal: false,
      info: {
        className: '',
        name: '',
        capacity: '',
        duration: '',
        remark: '',
        about: 0,
        public: 0
      },
      teacher: [],
      classArray: [],
      teacherArray: [],
      selectArray: [],
      params: {
        pi: 1,
        ps: 1000,
        enable: 1
      }
    }
  },
  onLoad(){
    this.getAllCourse();
    this.getAllTeacher(this.params);
  },
  methods: {
    getAllCourse() {
      getCourseBaseList()
      .then(res => {
        if (res.data.code === 0) {
          this.classArray = res.data.data;
        } else {
          failTip('出错了')
        }
      }).catch(err => console.log(err))
    },
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
      this.info.about = value === true ? 2 : 0;
    },
    setPublic(e) {
      let {value} = e.detail;
      this.info.public = value === true ? 4 : 0;
    },
    showClassModals() {
      this.showClassModal = true;
    },
    hideClassModal() {
      this.showClassModal = false;
    },
    chooseClassItem(e) {
      let {value} = e.detail,
          data = JSON.parse(value);
      this.info.courseid = data.id;
      this.info.className = data.title;
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
      this.teacher = this.teacher.concat(this.selectArray);
      this.hideModal();
    },
    deleteItem(index) {
      this.teacher.splice(index, 1)
    },
    saveData() {
      this.info['schoolid'] = wx.getStorageSync('venueid');
      this.info['organizeid'] = wx.getStorageSync('organizeid');
      this.info['id'] = 0;
      this.info['flags'] = this.info.about + this.info.public;
      let teacherArr = [];
      this.teacher.forEach(item => {
        teacherArr.push(item.id);
      });
      this.info['teacherids'] = teacherArr.toString();
      addOrEditClass(this.info)
      .then(res => {
        if (res.data.data.errcode === 200) {
          wx.navigateBack();
        } else {
          failTip(res.data.data.errmsg)
        }
      })
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