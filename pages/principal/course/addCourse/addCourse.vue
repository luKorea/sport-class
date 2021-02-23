<template>
  <view class="margin">
    <view class="cu-bar bg-white">
      <view class="action">
        <text class="text-red">*</text>
        <text>课程名称</text>
      </view>
      <view class="action text-right">
        <input type="text" v-model="info.className" placeholder="请输入课程名称">
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>通用课程</text>
      </view>
      <view class="action">
        <switch @change="setClassType"/>
      </view>
    </view>

    <block v-if="classType">
      <view class="cu-bar bg-white margin-top solid-bottom" @click="setTongClassType1">
        <view class="action">
          <text>通用全部课程</text>
        </view>
        <view class="action" v-if="showClass">
          <text class="cuIcon-roundcheckfill text-orange"></text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom" @click="setTongClassType2">
        <view class="action">
          <text>通用部分课程</text>
        </view>
        <view class="action" v-if="!showClass">
          <text class="cuIcon-roundcheckfill text-orange"></text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom" v-if="!showClass">
        <view class="action">
          <text>通用的课程</text>
        </view>
        <view class="action" @click="showGradeModal">
          <text class="text-gray" v-if="selectArray.length === 0">选择课程</text>
          <text class="text-gray" v-if="selectArray.length > 0">{{selectArray.length}} 门课程</text>
        </view>
      </view>
    </block>


    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text class="text-red">*</text>
        <text>课程类型</text>
      </view>
      <view class="action">
        <picker @change="bindTypeChange($event, typeArray)" :value="typeIndex" :range="typeArray" range-key="name">
          <view class="picker">{{typeArray[typeIndex].name}}</view>
        </picker>
        <text class="cuIcon-triangledownfill"></text>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text class="text-red">*</text>
        <text>通用单价</text>
      </view>
      <view class="action text-right">
        <input type="text" v-model="info.money" placeholder="请输入价格">
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>未到是否扣课时</text>
      </view>
      <view class="action">
        <switch @change="setWeiDaoTime"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>请假是否扣课时</text>
      </view>
      <view class="action">
        <switch @change="setLevalTime"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <text>启用状态</text>
      </view>
      <view class="action">
        <switch @change="setState"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top solid-bottom">
      <view class="action">
        <text>课程介绍</text>
      </view>
    </view>
    <view class="cu-form-group align-start cu-bar bg-white">
      <textarea maxlength="-1" v-model="info.content" placeholder="写下对课程的介绍，不超200字"></textarea>
    </view>

    <view class="cu-bar margin-top" @click="saveData">
      <button class="cu-btn lg bg-red" style="width: 100%">保存</button>
    </view>


    <!--弹框-->
    <view class="cu-modal show" v-if="gradeModal">
      <view class="cu-dialog">
        <checkbox-group class="block" @change="chooseGradeItem">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="item in classArray" :key="item.id">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">{{item.title}}</view>
                <checkbox :value="JSON.stringify(item)" style="transform:scale(0.6)"></checkbox>
              </label>
            </view>
          </view>
        </checkbox-group>
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
	import {
		getoperatorcourse,
		getCourseList
	} from "../../../../api/principal/course";
export default {
  name: "addCourse",
  data() {
    return {
      info: {
        type: false
      },
      typeIndex: 0,
      typeArray:[
        {
          id: 1,
          name: '一对一'
        },
        {
          id: 2,
          name: '一对多'
        }
      ],
      classType: false,
      showClass: true,
      gradeModal: false,
      classArray: [],
      selectArray: []
    }
  },
  methods: {
    setClassType(e) {
      let {value} = e.detail;
      this.classType = value;
    },
    setTongClassType1() {
      this.showClass = true;
    },
    setTongClassType2() {
      this.showClass = false;
    },
    showGradeModal() {
      getCourseList({
      	keywords: '',
      	venueid: wx.getStorageSync('userData').venueid,
      	flags: 1024
      }).then((res) => {
      	if (res.data.code === 0) {
      		if (res.data.data.list.length > 0) {
      			this.classArray = res.data.data.list;
      			this.gradeModal = true;
      		}
      	}
      })
    },
    hideGradeModal() {
      this.gradeModal = false;
    },
    setWeiDaoTime(e) {
      let {value} = e.detail;
      this.info.weidao = value ? 1 : 0;
    },
    setLevalTime(e) {
      let {value} = e.detail;
      this.info.leval = value ? 1 : 0;
    },
    setState(e) {
      let {value} = e.detail;
      this.info.state = value ? 1 : 0;
    },
    bindTypeChange(e) {
      const {value} = e.detail;
      this.typeIndex = value;
    },
    chooseGradeItem(e) {
      let {value} = e.detail,
          data = [];
      value.forEach(item => {
        data.push(JSON.parse(item));
      });
      this.selectArray = data;
    },
    saveData() {
    	let arr = []
    	// this.detailsinfo.agreementlist.map((item) => {
    	// 	arr.push(item.id)
    	// })
    	let arr2 = []
    	this.selectArray.map((item) => {
    		arr2.push(item.id)
    	});
		let flags = 0
		let {state,weidao,leval} = this.info;
		if(state){
			if(weidao&&leval){
				flags=1+256+2048
			}
			if(weidao&&!leval){
				flags=1+256
			}
			if(!weidao&&leval){
				flags=1+2048
			}
			if(!weidao&&!leval){
				flags=1
			}
		}else{
			if(weidao&&leval){
				flags=256+2048
			}
			if(weidao&&!leval){
				flags=256
			}
			if(!weidao&&leval){
				flags=2048
			}
			if(!weidao&&!leval){
				flags=0
			}
		}
    	let param = {
    		id: 0, // 课程id，添加时默认为0
    		type: this.typeIndex==0?1:2, // notnull 课程类型(1=1对1，2=1对多)
    		cover: '', // length<=256 课程图片
    		title: this.info.className, // notnull length<=100 课程标题
    		begintime: '', //string 开始时间
    		endtime: '', //string 结束时间
    		classroom: '', //string length<=100 上课教室
    		tel: '', //string 联系方式
    		introduction: this.info.content, // string 课程详情
    		score: 0, //int 积分（兑换所需）
    		coursenum: '', //int 总共多少节课
    		cost: this.info.money, //decimal 总学费
    		flags:flags, //int course.flags（是否体验课，是否扣课时也请在这里处理一次，后期将移除相关2个参数）
    		// childids: this.showClass ? 0 : arr2.join(','), //通用课程时关联的课程,多个以','隔开，全部课程时默认值=0
    		agreementids: '', //string 协议id,多个以','隔开
    		selldata: '', // string 价格列表json,
    		comerextenddata: ''
    	}
    	console.log(param, "param")
    	// this.showClass
		// return
    	getoperatorcourse(param).then((res) => {
    		if (res.data.code === 0) {
    			uni.showToast({
    				title: '新增成功',
    				duration: 1000
    			});
    			let timeout = setTimeout(function() {
    				wx.navigateBack();
    			}, 1000)
    
    		}
    	})
    
    }
  }
}
</script>

<style scoped>

</style>