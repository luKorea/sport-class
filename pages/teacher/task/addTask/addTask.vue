<template>
  <view class="margin">
    <view class="cu-bar bg-white arrow-item" @click="toSelectClass">
      <view class="action">班级</view>
      <view class="action text-right">
        <input type="text" v-model="info.classname" placeholder="请选择班级" />
      </view>
      <view class="arrow-right"><i class="cuIcon-right"></i></view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">作业标题</view>
      <view class="action text-right">
        <input type="text" v-model="form.title" placeholder="请选择标题" />
      </view>
    </view>

    <view class="cu-bar bg-white margin-top padding-top-sm">
      <view class="action" style="white-space: nowrap;">内容</view>
      <view class="action text-right">
        <textarea type="text" style="width: 500rpx;" v-model="form.content" placeholder="请输入内容"></textarea>
      </view>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">图片上传</view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item, index) in info.imgList" :key="index">
          <image :src='item' mode='aspectFill'></image>
          <view class="cu-tag bg-red" @click="delImg(index)">
            <text class="cuIcon-close"></text>
          </view>
        </view>
        <view class="solids" @click="chooseImage">
          <text class="cuIcon-cameraadd"></text>
        </view>
      </view>
    </view>


    <view class="cu-bar bg-white margin-top">
      <view class="action">
        <input type="text" v-model="info.url" placeholder="请粘贴地址" />
      </view>
      <view class="action">目前仅支持腾讯视频</view>
    </view>

    <view class="margin-top">
      <button class="cu-btn lg bg-red" style="width: 100%;" @click="save">发布</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "addTask",
  data() {
    return {
      form:{
        id: 0,//int id(添加时默认0)
        schoolid: '',//int notnull 上课点id
        lessontaskid:'',// int 上课记录id
        classid: '',//int notnull 班级id
        title: '',//string notnull length<=128 标题
        content: '',//string notnull 内容
        flags: 1,//int 标记（1=需要提交作业）
        extra: '',//string 额外数据（图片或视频文件路径{"image":["/files/img.o/2017/1030/chf7840m9iq6.jpg"],"video":["/files/img.o/2017/1030/chf7840m9iq6.jpg"]}
        sendmessagetype: 0,//int 消息推送的类型：0：全部,1,签到人员
      },
      info: {
        classname:'',
        imgList: [],
        url:''
      }
    }
  },
  methods: {
    // 上传图片
    chooseImage() {
      wx.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          console.log(res);
          if (this.info.imgList.length !== 0) {
            this.info.imgList = this.info.imgList.concat(res.tempFilePaths)
          } else {
            this.info.imgList = res.tempFilePaths;
          }
        }
      });
    },
    delImg(index) {
      this.info.imgList.splice(index, 1);
    },
    toSelectClass(){
      const url ='/pages/common/record/addRecord/selectClass'
      uni.navigateTo({
        url: url+`?data=${this.form.classid}&single=1`
      })
    },
    setData(data){
      if(data.classList){
        const classdata = data.classList[0];
        this.form.classid = classdata.id;
        this.info.classname = classdata.name
        this.form.schoolid = classdata.schoolid
      }
    },
    save(){
      var extra = {image:[],video:[]};
      if(this.info.imgList.length){
        extra.image = this.info.imgList
      }
      if(this.info.url){
        extra.video = [this.info.url]
      }
      this.form.extra = JSON.stringify(extra)
      this.$api.lessonwork.operatorlessonwork(this.form).then(res=>{
        if(res.data.data.errcode==200){
          uni.showToast({ title:"添加成功" })
          uni.navigateBack();
        }else{
          uni.showToast({
            title: res.data.data.errmsg || "添加失败，请稍后重试",
            icon: 'none'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
page{
  background-color: $uni-bg-color-grey;
}
.arrow-item{
  padding-right: 50rpx;
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
</style>