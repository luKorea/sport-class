<template>
  <view class="margin">
    <view class="cu-bar bg-white margin-top">
      <view class="action">课程图片</view>
      <view class="action"
            style="width: 100rpx;height: 100rpx; margin: 30rpx 30rpx 10rpx 30rpx">
        <view class="grid col-1 grid-square flex-sub"
              style="flex-direction: row-reverse;">
          <view class="bg-img" v-if="form.cover !== ''">
            <image :src='form.cover' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @click="DelImg">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @click="ChooseImage" v-if="form.cover === ''">
            <text class="cuIcon-add"></text>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">课程名称</view>
      <view class="action text-right">
        <input v-model="form.title" placeholder="请输入课程名称"/>
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">选择课程</view>
      <view class="action" @click="showGradeModals">
        <text class="color-gray" v-if="!result.course.id">请选择课程</text>
        <text v-else>{{ result.course.title }}</text>
        <i class="color-gray cuIcon-right"></i>
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">选择班级</view>
      <view class="action" @click="toSelectClass">
        <text class="color-gray" v-if="!form.classid">请选择班级</text>
        <text v-else>{{ result.classname }}</text>
        <i class="color-gray cuIcon-right"></i>
      </view>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">联系电话</view>
      <view class="action text-right">
        <input v-model="form.telephone" placeholder="请填写联系电话" type="number"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">视频地址</view>
      <view class="action text-right">
        <input v-model="form.link" placeholder="请填写视频网址（选填）"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">课程占用场地</view>
      <view class="action text-right">
        <input v-model="form.place" placeholder="请填写占用场地名称"/>
      </view>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">截至时间</view>
      <picker mode="date" @change="bindDateChange" :value="form.endtime"
              :start="startDate" :end="endDate">
        <view class="picker">{{ form.endtime }}</view>
      </picker>
    </view>
    <!--学校-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">学校</view>
      <picker @change="bindSchoolChange($event, schoolArray)" :value="schoolIndex" :range="schoolArray" range-key="name">
        <view class="picker"><text class="color-gray" v-if="schoolIndex<0">请选择</text><text v-else>{{result.school}}</text></view>
      </picker>
    </view>

    <view class="cu-form-group align-start cu-bar bg-white margin-top">
      <view class="title">课程内容编辑</view>
    </view>
    <view class="cu-form-group align-start cu-bar bg-white">
      <textarea maxlength="-1" v-model="form.explain"
                placeholder="登录机构编辑更容易哦"></textarea>
    </view>


    <view class="cu-bar bg-white margin-top" @click="toPrice">
      <view class="action">报名费用</view>
      <view class="action">
        <text class="text-gray text-sm">请选择</text>
        <text class="text-gray cuIcon-right"></text>
      </view>
    </view>

    <view class="cu-bar margin-top bg-white">
      <view class="action">是否线上展示</view>
      <view class="action">
        <switch @change="bindSwitch"/>
      </view>
    </view>


    <view class="flex flex-direction margin-top" @click="sendData">
      <button class="cu-btn bg-my-red margin-tb-sm lg">保存</button>
    </view>


    <view class="cu-modal show" v-if="showGradeModal">
      <view class="cu-dialog">
        <radio-group class="block" @change="chooseGradeItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in gradeArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">

                  <text class="margin-right">{{ item.title }}</text>
                  <!-- <text class="text-cyan margin-right text-sm">
                    {{ item.money }}元/课时
                  </text> -->
                  <text class="text-type" v-if="item.type==1">一对一</text>
                  <text class="text-type" v-if="item.type==2">一对多</text>
                </view>
                <radio class="round" :value="item.id"></radio>
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
      // 学校
      schoolIndex: -1,
      schoolArray: [],
      gradeArray: [],//课程选择列表
      date: currentDate,
      result:{school:'',imgList:[],selldata:[],course:{}},
      form:{
        _id: Date.now(),
        id: 0,
        schoolid: '',//int notnull 上课点id
        classid: '',//int notnull 班级id
        type: 1,//int 类型（0=未定义、1=课程、2=课程促销套餐<暂未使用>、3=套餐）目前仅支持1,3
        relate: '',//int 引用id
        cover: '',//string length<64 课程图片
        title: '',//string notnull length<128 课程标题
        explain: '',//string notnull 课程详情
        place: '',//string length<128 上课教室
        telephone: '',//string length<32 联系方式
        begintime: '',//string notnull 开始时间
        endtime: currentDate,//string notnull 结束时间
        link: '',//string length<256 链接
        enable: '',//bool 启用状态
        rank: '',//double 排序(降序)
        flags: '',//int 标记2048=私人定制(不展示)
        numberofvirtual: '',//int 虚拟报名人数
        agreementids: '',//string 协议id,多个以','隔开
        selldata: [],//string 价格列表json

      }
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
  onLoad() {
    this.form['schoolid'] = wx.getStorageSync('venueid');
    this.getSchoolList();
    this.getCourseList();
  },
  methods: {
    toSelectClass(){
      const url ='/pages/common/record/addRecord/selectClass'
      uni.navigateTo({
        url: url+'?data='+this.form.classid+'&single=1'
      })
    },
    toPrice(){
      if(!this.result.course.id){
        return uni.showToast({ title:'请先选择课程',icon: 'none' })
      }
      const url ='./selectPrice'
      uni.navigateTo({
        url: url+'?courseid='+this.result.course.id+'&selldata='+JSON.stringify(this.form.selldata)
      })
    },
    setData(data){
      if(data.classList){
        this.form.classid = data.classList[0].id;
        this.result.classname = data.classList[0].name;
      }
      if(data.selldata){
        this.form.selldata = data.selldata;
      }
      
    },
    getSchoolList(){
      this.$api.organize.get430configure().then(res=>{
        if(res.data.data.data){
          var data = JSON.parse(res.data.data.data);
          this.schoolArray = data.school;
        }
      })
    },
    getCourseList(){
      this.$api.course.coursebaselist().then(res=>{
        this.gradeArray = res.data.data;
      })
    },
    showGradeModals() {
      this.showGradeModal = true;
    },
    hideGradeModal() {
      this.showGradeModal = false;
    },
    chooseGradeItem(e) {
      let {value} = e.detail;
      this.result.course = this.gradeArray.find(a=>a.id==value);
    },
    // 上传图片
    ChooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          this.result.imgList = res.tempFilePaths[0];
          console.log(this.result.imgList);
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
      this.result.school = data[this.schoolIndex].name;
      // this.form.schoolIndex = data[this.schoolIndex].id;
      // this.form.school = data[this.schoolIndex].label;
    },
    // 选择出生日期
    bindDateChange(e) {
      this.date = e.target.value;
      this.form.birthday = e.target.value;
    },
    // 是否在读
    bindSwitch(e) {
      const {value} = e.detail;
      value ? this.form.enable = true : this.form.state = false;
    },
    // 保存数据
    sendData() {
      console.log(this.form);
    }
  },
}
</script>

<style scoped lang="scss">
page{
  background-color: $uni-bg-color-grey;
}
.color-gray{
  color: #bbb;
}
</style>