<template>
  <view class="margin">
    <view class="cu-bar bg-white margin-top">
      <view class="action">课程图片</view>
      <view class="action"
            style="width: 100rpx;height: 100rpx; margin: 30rpx 30rpx 10rpx 30rpx">
        <view class="grid col-1 grid-square flex-sub"
              style="flex-direction: row-reverse;">
          <view class="bg-img" v-if="form.imgList !== ''">
            <image :src='form.imgList' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @click="DelImg">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @click="ChooseImage" v-if="form.imgList === ''">
            <text class="cuIcon-add"></text>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">课程名称</view>
      <view class="action text-right">
        <input v-model="form.name" placeholder="请输入课程名称"/>
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">选择课程</view>
      <view class="action" @click="showGradeModals">
        <text v-if="form.gradeName === ''">请选择课程名称</text>
        <text v-else>{{ form.gradeName }}</text>
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">选择班级</view>
      <view class="action" @click="showClassModals">
        <text v-if="form.className === ''">请选择班级</text>
        <text v-else>{{ form.className }}</text>
      </view>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">联系电话</view>
      <view class="action text-right">
        <input v-model="form.phone" placeholder="请填写联系电话" type="number"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">视频地址</view>
      <view class="action text-right">
        <input v-model="form.phone" placeholder="请填写视频网址（选填）"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">课程占用场地</view>
      <view class="action text-right">
        <input v-model="form.phone" placeholder="请填写占用场地名称"/>
      </view>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">截至时间</view>
      <picker mode="date" @change="bindDateChange" :value="date"
              :start="startDate" :end="endDate">
        <view class="picker">{{ date }}</view>
      </picker>
    </view>
    <!--学校-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">学校</view>
      <picker @change="bindSchoolChange($event, schoolArray)"
              :value="schoolIndex" :range="schoolArray" range-key="label">
        <view class="picker">请选择</view>
      </picker>
    </view>

    <view class="cu-form-group align-start cu-bar bg-white margin-top">
      <view class="title">课程内容编辑</view>
    </view>
    <view class="cu-form-group align-start cu-bar bg-white">
      <textarea maxlength="-1" v-model="form.content"
                placeholder="登录机构编辑更容易哦"></textarea>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">报名费用</view>
      <view class="action">
        <text class="text-gray text-sm">请选择</text>
        <text class="text-gray cuIcon-right"></text>
      </view>
    </view>

    <view class="cu-bar margin-top bg-white">
      <view class="action">是否线上展示</view>
      <view class="action">
        <switch/>
      </view>
    </view>


    <view class="flex flex-direction margin-top" @click="sendData">
      <button class="cu-btn bg-my-red margin-tb-sm lg">保存</button>
    </view>


    <!--班级弹框-->
    <view class="cu-modal show" v-if="showGradeModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseGradeItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in gradeArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">

                  <text class="margin-right">{{ item.name }}</text>
                  <text class="text-cyan margin-right text-sm">
                    {{ item.money }}元/课时
                  </text>
                  <text class="text-type">{{ item.type }}</text>
                </view>
                <radio class="round" :value="item.name"></radio>
              </label>
            </view>
          </view>
        </radio-group>
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
    <!--课程弹框-->
    <view class="cu-modal show" v-if="showClassModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseClassItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in classArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">
                  <text class="margin-right">{{ item.name }}</text>
                  <text class="margin-right">{{ item.teacher }}</text>
                  <text class="text-cyan margin-right text-sm">
                    学生：{{ item.number }}人
                  </text>
                  <text class="text-type">{{ item.type }}</text>
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
            <button class="cu-btn bg-white">确定</button>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import {getDate} from "../../../../utils";

export default {
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      showClassModal: false,
      showGradeModal: false,
      form: {
        name: '',
        phone: '',
        state: 0,
        identitycard: '',
        imgList: '',
        className: '',
        gradeName: ''
      },
      // 学校
      schoolIndex: 0,
      schoolArray: [
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
      classArray: [
        {
          id: 1,
          name: '高一一班',
          teacher: '李老师',
          number: 10,
          type: '1v1'
        },
        {
          id: 2,
          name: '高一二班',
          teacher: '李老师',
          number: 10,
          type: '1vN'
        },
        {
          id: 3,
          name: '高一三班',
          teacher: '李老师',
          number: 10,
          type: '1v1'
        },
        {
          id: 4,
          name: '高一四班',
          teacher: '李老师',
          number: 10,
          type: '1vN'
        },
      ],
      gradeArray: [
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
      date: currentDate
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
    showClassModals() {
      this.showClassModal = true;
    },
    hideClassModal() {
      this.showClassModal = false;
    },
    chooseClassItem(e) {
      let {value} = e.detail;
      this.form.className = value;
    },
    showGradeModals() {
      this.showGradeModal = true;
    },
    hideGradeModal() {
      this.showGradeModal = false;
    },
    chooseGradeItem(e) {
      let {value} = e.detail;
      this.form.gradeName = value;
    },
    // 上传图片
    ChooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          this.form.imgList = res.tempFilePaths[0];
          console.log(this.form.imgList);
        }
      });
    },
    DelImg() {
      this.form.imgList = '';
    },
    // 选择学生来源
    bindSourceChange(e, data) {
      const {value} = e.detail;
      this.sourceIndex = value;
      this.form.source = data[this.sourceIndex].id;
    },
    // 选择学校
    bindSchoolChange(e, data) {
      const {value} = e.detail;
      this.schoolIndex = value;
      this.form.schoolIndex = data[this.schoolIndex].id;
      this.form.school = data[this.schoolIndex].label;
    },
    // 选择出生日期
    bindDateChange(e) {
      this.date = e.target.value;
      this.form.birthday = e.target.value;
    },
    // 是否在读
    bindSwitch(e) {
      const {value} = e.detail;
      value ? this.form.state = 0 : this.form.state = 1;
    },
    // 保存数据
    sendData() {
      if (this.form.school !== '') {
        this.form.schoolIndex = undefined;
      }
      if (this.form.grade !== '') {
        this.form.gradeIndex = undefined;
      }
      if (this.form.myClass !== '') {
        this.form.classIndex = undefined;
      }
      console.log(this.form);
    }
  },
}
</script>

<style scoped>

</style>