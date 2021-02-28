<!--TODO 校长端 学员 基础资料-->
<template>
  <view class="margin">
    <!--学员照片-->
    <view class="cu-bar bg-white">
    	<view class="action">学员照片</view>
    	<view class="action" style="width: 100rpx;height: 100rpx; margin: 30rpx 30rpx 10rpx 30rpx">
    		<view class="grid col-1 grid-square flex-sub" style="flex-direction: row-reverse;">
    			<view class="bg-img" v-if="form.avatar !== ''">
    				<image :src='imgUrl + form.avatar' mode='aspectFill'></image>
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
        <view class="picker">{{date}}</view>
      </picker>
    </view>
    <!--学生来源-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">学生来源</view>
      <picker @change="bindSourceChange($event, sourceArray)" :value="sourceIndex" :range="sourceArray" range-key="label">
        <view class="picker">{{sourceArray[sourceIndex].label}}</view>
      </picker>
    </view>

    <!--学校-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">学校</view>
      <view><input type="text" v-model="form.school" placeholder="请输入学校" /></view>
      <picker @change="bindSchoolChange($event, sourceArray)" :value="schoolIndex" :range="schoolArray" range-key="label">
        <view class="picker">请选择</view>
      </picker>
    </view>
    <!--年级-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">年级</view>
      <view><input type="text" v-model="form.grade" placeholder="请输入年级" /></view>
      <picker @change="bindGradeChange($event, sourceArray)" :value="gradeIndex" :range="gradeArray" range-key="label">
        <view class="picker">请选择</view>
      </picker>
    </view>
    <!--班级-->
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">班级</view>
      <view><input type="text" v-model="form.myClass" placeholder="请输入班级" /></view>
      <picker @change="bindClassChange($event, sourceArray)" :value="classIndex" :range="classArray" range-key="label">
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
        <input v-model="form.ex1" placeholder="请输入学员爸爸姓名" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">爸爸电话</view>
      <view class="action text-right">
        <input v-model="form.ex2" placeholder="请输入学员爸爸联系电话" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">妈妈姓名</view>
      <view class="action text-right">
        <input v-model="form.ex3" placeholder="请输入学员妈妈姓名" />
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">妈妈电话</view>
      <view class="action text-right">
        <input v-model="form.ex4" placeholder="请输入学员妈妈联系电话" />
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
	  imgUrl: this.$uploadUrl,	
      form: {
		id: 0,  
        avatar: ''
      },
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
      ],
      // 学生来源
      sourceIndex: 0,
      sourceArray: [
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
      // 年级
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
      // 班级
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
    sendPhone() {
      uni.makePhoneCall({
        phoneNumber: this.form.phone
      })
    },
   // 上传图片
   ChooseImage() {
   	let that = this;
   	wx.chooseImage({
   		count: 1, //默认9
   		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
   		sourceType: ['album'], //从相册选择
   		success: (res) => {
   			console.log(res);
   			that.form.avatar = res.tempFilePaths[0];
   			wx.uploadFile({
   				url: that.$upload + '/d/m/file/upload?type=28',
   				filePath: res.tempFilePaths[0],
   				name: 'file',
   				formData: res.tempFilePaths,
   				header: {
   					'Content-Type': 'multipart/form-data'
   				},
   				success(res) {
   					let data = JSON.parse(res.data);
   					that.form.avatar = data.data.path + data.data.name;
   				}
   			})
   		}
   	});
   },
   DelImg() {
   	this.form.avatar = '';
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
      this.form.source = data[this.sourceIndex].id;
    },
    // 选择学校
    bindSchoolChange(e, data) {
      const {value} = e.detail;
      this.schoolIndex = value;
      this.form.schoolIndex = data[this.schoolIndex].id;
      this.form.school = data[this.schoolIndex].label;
    },
    // 选择年级
    bindGradeChange(e, data) {
      const {value} = e.detail;
      this.gradeIndex = value;
      this.form.gradeIndex = data[this.gradeIndex].id;
      this.form.grade = data[this.gradeIndex].label;
    },
    // 选择班级
    bindClassChange(e, data) {
      const {value} = e.detail;
      this.classIndex = value;
      this.form.classIndex = data[this.classIndex].id;
      this.form.myClass = data[this.classIndex].label;
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
      } if (this.form.grade !== '') {
        this.form.gradeIndex = undefined;
      } if (this.form.myClass !== '') {
        this.form.classIndex = undefined;
      }
      console.log(this.form);
    }
  },
}
</script>

<style scoped>

</style>