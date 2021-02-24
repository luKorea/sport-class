<template>
  <view class="add-follow-container margin">
    <view class="head-item">
      <view class="head-item-left">
        <view>{{detail.info.templatename}}</view>
        <view>
          <text class="ban-red" v-if="detail.info.type==1">班</text>
          <text class="ke-orange" v-else>学</text>
          <text class="color-gray">{{detail.info.target}}</text>
        </view>
      </view>
      <view class="head-item-right">
        <view>{{detail.info.datetime}}</view>
        <view>{{detail.info.flags !== 0 ? '已推送' : '未推送'}}</view>
      </view>
    </view>
    <template-form :extendfield="detail.extendfield" :info="detail.info" :extenddata="detail.extenddata" @change="onTemplateChange"></template-form>

    <view class="flex flex-direction margin-top-xl fixed-bottom" @click="sendFollow">
      <button class="cu-btn bg-my-red lg">保存</button>
    </view>

  </view>
</template>

<script>
import {getDate} from "../../../../utils";
import TemplateForm from '../addRecord/templateForm.vue';
export default {
  components:{TemplateForm},
  data() {
    const currentDate = getDate({
      format: true
    })
    return {
      id: '',
      detail: {info:{}},
      form:{}
    }
  },
  onLoad(options) {
    let {id,type} = options;
    this.id = id || 0;
    this.getDetail();
  },
  methods: {
    getDetail(){
      this.$api.student.growthinfo({id: this.id}).then(res=>{
        this.detail = res.data.data;
        this.form = this.detail.info;
        this.form.fielddata = JSON.stringify(this.detail.extenddata);
        this.form.targetdata = this.detail.targetlist.map(a=>a.id).join(',')
      })
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
.head-item{
  background:#fff;
  padding: 30rpx;
  marign: 30rpx;
  .head-item-left{
    float: left;
  }
  .head-item-right{
    text-align: right;
    color: #999;
  }
  .color-gray{
    color: #999;
  }
}
</style>