<!--TODO 校长端 学员 基础资料-->
<template>
  <view class="margin">
    <!--学员照片-->
    <view class="cu-bar bg-white margin-top">
      <view class="action">学员照片</view>
      <view class="action" style="width: 100rpx;height: 100rpx; margin: 30rpx 30rpx 10rpx 30rpx">
        <view class="grid col-1 grid-square flex-sub" style="flex-direction: row-reverse;">
          <view class="bg-img" v-if="form.avatar !== ''">
            <image :src='baseUrl + form.avatar' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @click="DelImg">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @click="ChooseImage" v-if="form.avatar === ''">
            <text class="cuIcon-add"></text>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">真实姓名</view>
      <view class="action text-right">
        <input v-model="form.name" placeholder="请输入真实姓名" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">手机号码</view>
      <view class="action text-right">
        <input v-model="form.contact" placeholder="请输入手机号码" type="number" />
        <button class="cu-btn sm bg-orange margin-left-sm" @click="sendPhone">拨打</button>
      </view>
    </view>

    <!--性别-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">性别</view>
      <picker @change="bindSexChange($event, sexArray)" :value="sexIndex" :range="sexArray" range-key="label">
        <view class="picker">{{sexArray[sexIndex].label}}</view>
      </picker>
    </view>
    <!--出生日期-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">出生日期</view>
      <picker mode="date" @change="bindDateChange" :value="date" :start="startDate" :end="endDate">
        <view class="picker">{{date||'请选择'}}</view>
      </picker>
    </view>
    <!--学生来源-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">学生来源</view>
      <picker @change="bindSourceChange($event, sourceArray)" :value="sourceIndex" :range="sourceArray" range-key="name">
        <view class="picker">{{sourceArray[sourceIndex] &&sourceArray[sourceIndex].name}}</view>
      </picker>
    </view>

    <!--学校-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">学校</view>
      <view><input type="text" v-model="form.school" placeholder="请输入学校" /></view>
      <picker @change="bindSchoolChange($event, schoolArray)" :value="schoolIndex" :range="schoolArray" range-key="name">
        <view class="picker">请选择</view>
      </picker>
    </view>
    <!--年级-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">年级</view>
      <view>{{form.grade}}</view>
      <picker @change="bindGradeChange($event, gradeArray)" :value="gradeIndex" :range="gradeArray" range-key="label">
        <view class="picker">请选择</view>
      </picker>
    </view>
    <!--班级-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">班级</view>
      <view><input type="text" v-model="form.myClass" placeholder="请输入班级" /></view>
      <picker @change="bindClassChange($event, classArray)" :value="classIndex" :range="classArray">
        <view class="picker">请选择</view>
      </picker>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">家庭住址</view>
      <view class="action text-right">
        <input v-model="form.address" placeholder="请输入住址" />
      </view>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">备注</view>
      <view class="action text-right">
        <input v-model="form.remark" placeholder="50字符内" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">爸爸姓名</view>
      <view class="action text-right">
        <input v-model="form.ext1" placeholder="请输入学员爸爸姓名" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">爸爸电话</view>
      <view class="action text-right">
        <input v-model="form.ext2" placeholder="请输入学员爸爸联系电话" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">妈妈姓名</view>
      <view class="action text-right">
        <input v-model="form.ext3" placeholder="请输入学员妈妈姓名" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">妈妈电话</view>
      <view class="action text-right">
        <input v-model="form.ext4" placeholder="请输入学员妈妈联系电话" />
      </view>
    </view>
    <view class="flex flex-direction margin-top" @click="sendData">
      <button class="cu-btn bg-my-red margin-tb-sm lg">保存</button>
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
      baseUrl: this.$uploadUrl,
      form: {
        id: 0,
        name:  '',
        avatar: '',
        number: '',
        gender: 1,
        contact: '',
        birthday: '',
        address: '',
        remark: '',
        original: '',
        identitycard:'', 
        standby: '',
        school: '',
        entrydate: '',
        grade: '',
        ext1: '',
        ext2: '',
        ext3: '',
        ext4: '',
        flags: 16,//学生标记（1=根据订单自动生成、2=在读学员、4=数据导入、8=固定成员,16=潜在学员）
        tags: '',
        fielddata: [],
        refer: 0,
        myClass:''
      },
      // 性别
      sexIndex: 0,
      sexArray: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      // 学生来源
      sourceIndex: 0,
      sourceArray: [],
      // 学校
      schoolIndex: 0,
      schoolArray: [],
      // 年级
      gradeIndex: 0,
      gradeArray: [
        { label: '小班', id: 1, grade: '幼儿园' },
        { label: '中班', id: 2, grade: '幼儿园' },
        { label: '大班', id: 3, grade: '幼儿园' },
        { label: '一年级', id: 4, grade: '小学' },
        { label: '二年级', id: 5, grade: '小学' },
        { label: '三年级', id: 6, grade: '小学' },
        { label: '四年级', id: 7, grade: '小学' },
        { label: '五年级', id: 8, grade: '小学' },
        { label: '六年级', id: 9, grade: '小学' },
        { label: '初一', id: 10, grade: '初中' },
        { label: '初二', id: 11, grade: '初中' },
        { label: '初三', id: 12, grade: '初中' },
        { label: '高一', id: 13, grade: '高中' },
        { label: '高二', id: 14, grade: '高中' },
        { label: '高三', id: 15, grade: '高中' },
      ],
      // 班级
      classIndex: 0,
      classArray: [],
      date: '',
      currentSchool: null
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
  onLoad(){
    this.getOriginList();
    this.getSchoolList();
  },
  methods: {
    sendPhone() {
      uni.makePhoneCall({
        phoneNumber: this.form.contact
      })
    },
    // 上传图片
    ChooseImage() {
	  let that = this;
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          // this.form.imgList = res.tempFilePaths[0];
          wx.uploadFile({
            url: that.$upload + '/d/m/file/upload?type=17',
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {},
            header: {
              'Content-Type': 'multipart/form-data'
            },
            success(res) {
              let data = JSON.parse(res.data);
              if(data.code!=0){
                return uni.showToast({
                  title: data.data.message || '上传失败',
                  icon: 'none'
                })
              }
              that.form.avatar = data.data.path + data.data.name
            },
            fail(err){
              console.log('err',err)
            }
          })
        }
      });
    },
    DelImg() {
      this.form.imgList = '';
    },
    // 选择性别
    bindSexChange(e, data) {
      const {value} = e.detail;
      this.sexIndex = value;
      this.form.gender = data[this.sexIndex].value;
    },
    // 选择学生来源
    bindSourceChange(e, data) {
      const {value} = e.detail;
      this.sourceIndex = value;
      this.form.original =  data[this.sourceIndex].name;
    },
    // 选择学校
    bindSchoolChange(e, data) {
      const {value} = e.detail;
      this.schoolIndex = value;
      this.form.school = data[this.schoolIndex].name;
      this.form.refer = data[this.schoolIndex].id
      this.currentSchool = data[this.schoolIndex];
      //更新班级
      this.classArray = [];
      const gradeItem = this.currentSchool.grade.find(a=>a.name==this.gradeArray[this.gradeIndex].grade);
      if(gradeItem){
        this.classArray = gradeItem.class
      }
      
    },
    // 选择年级
    bindGradeChange(e, data) {
      const {value} = e.detail;
      this.gradeIndex = value;
      this.form.grade = data[this.gradeIndex].label;
      //更新班级信息
      this.classArray = [];
      if(this.currentSchool){
        const gradeItem = this.currentSchool.grade.find(a=>a.name==data[this.gradeIndex].grade);
        if(gradeItem){
          this.classArray = gradeItem.class
        }
      }
    },
    // 选择班级
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.form.myClass = data[this.classIndex];
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
    getOriginList(){
      this.$api.student.sourcelist({type:1}).then(res=>{
        this.sourceArray = res.data.data.list;
        this.sourceIndex = 0;
        this.form.original = this.sourceArray[this.sourceIndex].name;
      })
    },
    getSchoolList(){
      this.$api.organize.get430configure().then(res=>{
        if(res.data.data.data){
          var data = JSON.parse(res.data.data.data);
          this.schoolArray = data.school;
        }
      })
    },
    // 保存数据
    sendData() {
      if(!this.form.name){
        return this.showToast({title:'请输入姓名',icon:'none'});
      }
      if(!this.form.contact){
        return this.showToast({title:'请输入手机号',icon:'none'});
      }
      // return console.log('form',this.form);
      this.form.grade += this.form.myClass;
      
      this.$api.student.operatorstudent(this.form).then(res=>{
        if(res.data.data.errcode==200){
          uni.showToast({ title:"添加成功" });
          setTimeout(()=>{
            uni.navigateBack();
          },1000)
        }else{
          uni.showToast({
            title: res.data.data.errmsg || "添加失败，请稍后重试",
            icon: 'none'
          })
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
page{
  background-color: $uni-bg-color-grey;
}
</style>