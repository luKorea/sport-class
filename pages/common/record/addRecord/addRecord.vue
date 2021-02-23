<template>
  <view class="add-follow-container margin">
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">记录对象</view>
      <picker @change="bindStateChange($event, stateArray)" :value="stateIndex"
              :range="stateArray" range-key="name">
        <view class="picker">
          {{stateArray[stateIndex] &&stateArray[stateIndex].name}}
        </view>
      </picker>
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
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title" style="white-space: nowrap;">内容</view>
      <textarea class="text-right" type="text" placeholder="(1024字以内)" maxlength="1024" v-model="form.content"></textarea>
    </view>
    <view class="margin-top bg-white padding-bottom-xs padding-top-xs">
      <view class="record-img-list">
        <view class="item" v-for="(item,index) in extraImages">
          <image class="img" :src="baseUrl + item.imgurl"></image>
          <textarea class="textarea" placeholder="20字以内说明" maxlength="20" v-model="item.explain"></textarea>
        </view>
      </view>
      <view class="btn-upload" @click="toUpload">上传</view>
    </view>

    <!-- <view class="margin-top cu-bar bg-white">
      <view class="action">推送给学员</view>
      <view class="action">
        <switch />
      </view>
    </view> -->

    <view class="flex flex-direction margin-top-xl" @click="sendFollow">
      <button class="cu-btn bg-my-red lg">保存</button>
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
      // 跟进状态
      stateIndex: 0,
      stateArray: [],
      date: currentDate,
      // 意向级别
      levelIndex: 0,
      levelArray: [],
      growthtemplateinfo: {},
      extraImages:[],
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
  onLoad(options) {
    let {id} = options;
    console.log(id);
    this.getClassList();
    this.getTemplateList();
  },
  methods: {
    // 选择下次跟进时间
    bindDateChange(e) {
      this.date = e.target.value;
      this.form.time = e.target.value;
    },
    // 选择摸版
    bindLevelChange(e, data) {
      const {value} = e.detail;
      this.levelIndex = value;
      this.form.sourceid = data[this.levelIndex].id;
      this.getTemplateDetail()
    },
    // 选择记录对象
    bindStateChange(e, data) {
      const {value} = e.detail;
      this.stateIndex = value;
      this.form.target = data[this.stateIndex].name;
      this.form.targetdata = data[this.stateIndex].id;
    },
    // 提交跟进记录
    sendFollow() {
      console.log(this.form);
      var postData = {};
      for(const i in this.form){
        postData[i] = this.form[i]
      }
      postData.fielddata = this.growthtemplateinfo.extendfield.map(item=>{
        return {
          id: postData.sourceid,
          fieldid: item.id,
          value: item.title=='内容'?postData.content:item.title=='图片'?JSON.stringify(this.extraImages):''
        }
      })
      postData.fielddata = JSON.stringify(postData.fielddata)
      postData.images = this.extraImages.map(a=>a.imgurl).join(',');
      // return console.log('postData',postData)
      this.$api.student.operatorgrowth(postData).then(res=>{
        if(res.data.data.errcode==200){
          uni.showToast({
            title:"添加成功"
          })
          uni.navigateBack();
        }else{
          uni.showToast({
            title: res.data.data.errmsg || "添加失败，请稍后重试",
            icon: 'none'
          })
        }
      })
      
    },
    getClassList(){
      this.$api.class.list({paging: false}).then((res)=>{
        this.stateArray = res.data.data
        this.form.target = this.stateArray[0].name;
        this.form.targetdata = this.stateArray[0].id;
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
    toUpload(){
      const that = this;
      wx.chooseImage({
        count: 6, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album','camera'], //从相册选择
        success: (res) => {
          console.log(res);
          // this.info.image = res.tempFilePaths[0];
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
              that.extraImages.push({
                imgurl: data.data.path + data.data.name,
                explain: ''
              })
            },
            fail(err){
              console.log('err',err)
            }
          })
        }
      });
    }
  },
}
</script>

<style scoped lang="scss">
page{
    background: $uni-bg-color-grey;
}
.record-img-list{
  .item{
    position: relative;
    padding: 20rpx 0;
    padding-left: 240rpx;
    min-height: 200rpx;
    .img{
      width: 200rpx;
      height: 200rpx;
      position: absolute;
      left: 20rpx;
      top: 20rpx;
    }
    .textarea{
      height:200rpx;
      width: 100%;
    }
    &:after{
      content: "";
      display: table;
      clear: both;
    }
  }
}
.btn-upload{
  width: 200rpx;
  height: 200rpx;
  margin: 20rpx;
  border: 1px dashed #ddd;
  position: relative;
  text-indent: -9999px;
  overflow: hidden;
  &:before,&:after{
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: #ddd;
    position: absolute;
    top: 50%;
    left: 25%;
  }
  &:after{
    transform: rotate(90deg);
  }
  &:active{
    border-color:$uni-color-primary;
  }
}
</style>