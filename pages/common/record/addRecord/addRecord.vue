<template>
  <view class="add-follow-container margin">
    <view class="cu-form-group margin-top cu-bar bg-white arrow-item" @click="toTargetSelect">
      <view class="title" style="white-space: nowrap;">记录对象</view>
      <view v-if="form.target">{{form.target}} </view>
      <view v-else class="color-gray">添加{{form.type==1?'班级':'学员'}}</view>
      <view class="arrow-right"><i class="cuIcon-right"></i></view>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">模板类型</view>
      <picker @change="bindLevelChange($event, levelArray)" :value="levelIndex"
              mode='selector'
              :range="levelArray" range-key="name">
        <view class="picker">
          {{levelArray[levelIndex] && levelArray[levelIndex].name}}
        </view>
      </picker>
    </view>
    <!-- <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title" style="white-space: nowrap;">内容</view>
      <textarea class="text-right" type="text" placeholder="(1024字以内)" maxlength="1024" v-model="form.content"></textarea>
    </view>
    <view class="margin-top bg-white padding-bottom-xs padding-top-xs">
      <view class="record-img-list">
        <view class="item" v-for="(item,index) in extraImages">
          <image class="img" :src="baseUrl + item.imgurl"></image>
          <textarea class="textarea" placeholder="20字以内说明" maxlength="20" v-model="item.explain"></textarea>
          <view class="btn-remove"><van-icon name="close" /></view>
        </view>
      </view>
      <view class="btn-upload" @click="toUpload">上传</view>
    </view>
 -->
    <view class="margin-top cu-bar bg-white">
      <view class="action">推送给学员</view>
      <view class="action">
        <switch @change="switchChange" />
      </view>
    </view>
    <template-form v-if="growthtemplateinfo.extendfield" :extendfield="growthtemplateinfo.extendfield" :info="growthtemplateinfo.info" @change="onTemplateChange"></template-form>

    <view class="flex flex-direction margin-top-xl fixed-bottom" @click="sendFollow">
      <button class="cu-btn bg-my-red lg">保存</button>
    </view>

  </view>
</template>

<script>
import {getDate} from "../../../../utils";
import TemplateForm from './templateForm';
export default {
  components:{TemplateForm},
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      // 意向级别
      levelIndex: 0,
      levelArray: [],
      growthtemplateinfo: {},
      form: {
        id: 0,
        sourceid: '',//模板id
        type: 1,//类型 （1=班级、2=学生）
        target: '',//目标对象名称
        title: '',
        content: '',
        images: '',
        targetdata:'',//目标对象id
        fielddata:[]
      },
      switchFlag: false
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
  onLoad(options) {
    let {id,type} = options;
    this.form.type = type || 1;
    this.form.id = id || 0;
    this.getTemplateList();
  },
  methods: {
    // 选择摸版
    bindLevelChange(e, data) {
      const {value} = e.detail;
      this.levelIndex = value;
      this.form.sourceid = data[this.levelIndex].id;
      this.getTemplateDetail()
    },
    onTemplateChange(data){
      this.form.fielddata = JSON.stringify(data.fielddata);
      this.form.images = data.images&&data.images.map(a=>a.imgurl).join(',')||'';
      this.form.content = data.content;
    },
    // 提交跟进记录
    sendFollow() {
      // console.log(this.form);
      if(!this.form.target){
        return uni.showToast({title:'请添加记录对象',icon: 'none'})
      }
      var postData = {};
      for(const i in this.form){
        postData[i] = this.form[i]
      }
      // return console.log('postData',postData)
      this.$api.student.operatorgrowth(postData).then(res=>{
        if(res.data.data.errcode==200){
          uni.showToast({ title:"添加成功" })
          //如果需要推送，则调用推送接口
          if(this.switchFlag){
            this.$api.wechatmessage.growthmessage({ids: [res.data.data.data]}).finally(res=>{
              uni.navigateBack();
            })
          }else{
            uni.navigateBack();
          }
        }else{
          uni.showToast({
            title: res.data.data.errmsg || "添加失败，请稍后重试",
            icon: 'none'
          })
        }
      })
      
    },
    getTemplateList(){
      this.$api.student.sourcelist({type: 3}).then((res)=>{
        this.levelArray = res.data.data.list;
        this.form.sourceid = this.levelArray[0].id;
        this.getTemplateDetail()
      })
    },
    getTemplateDetail(){
      this.$api.student.growthtemplateinfo({id: this.form.sourceid}).then((res)=>{
        this.growthtemplateinfo = res.data.data
      })
    },
    toTargetSelect(){
      const url = this.form.type==1?'/pages/common/record/addRecord/selectClass':'/pages/common/record/addRecord/selectStudent'
      uni.navigateTo({
        url: url+'?data='+this.form.targetdata
      })
    },
    setData(data){
      if(data.classList){
        this.form.target = data.classList.map(a=>a.name).join(',');
        this.form.targetdata = data.classList.map(a=>a.id).join(',');
      }
      if(data.studentList){
        this.form.target = data.studentList.map(a=>a.name).join(',');
        this.form.targetdata = data.studentList.map(a=>a.id).join(',');
      }
      
    },
    switchChange(e){
      this.switchFlag = e.target.value
    }
    
  },
}
</script>

<style lang="scss">
page{
    background: $uni-bg-color-grey;
}
.add-follow-container{
  .cu-form-group{
    &.arrow-item{
      padding-right: 50rpx;
    }
    .arrow-right{
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
    }
    .color-gray{
      color: #aaa;
    }
  }
}
</style>