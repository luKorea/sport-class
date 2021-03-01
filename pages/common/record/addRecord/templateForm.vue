<template>
  <view class="container">
    <view class="template-form">
      <view class="margin-top cu-bar bg-white padding-top-xs padding-bottom-xs" v-for="(item,index) in schema" :key="item.prop" :class="{disabled: item.disabled}">
        <view class="action" v-if="item.label" style="white-space: nowrap;">{{item.label}}</view>
        <view class="action">
          <view v-if="item.prop">
              <input v-if="!item.type || item.type=='input'" :type="item.formtype || 'text'" :placeholder="'请输入'+item.label" :value="form[item.prop]" :data-key="item.prop" :disabled="item.disabled" @input="inputChange">
              <textarea class="textarea" v-if="item.type=='textarea'" :value="form[item.prop]" :data-key="item.prop" @input="inputChange" :placeholder="'请输入'+item.label"></textarea>
              <uni-number-box v-if="item.type=='number'" class="number pull-right" :min="1"  :max="99999" :value="form[item.prop]>99999?99999:form[item.prop]" :isMax="form[item.prop]>=99999?true:false" :isMin="form[item.prop]===1" :index="item.prop" @eventChange="numberChange"></uni-number-box>
              
              
              <view class="record-img-list" v-if="item.type=='images'">
                <view class="item" v-for="(item,index) in extraImages">
                  <image class="img" :src="baseUrl + item.imgurl"></image>
                  <textarea class="textarea" placeholder="20字以内说明" maxlength="20" v-model="item.explain"></textarea>
                  <view class="btn-remove"><i class="curIcon-close"</view>
                </view>
                <view class="btn-upload" @click="toUpload">上传</view>
              </view>
              
              <view class="child-form-list" v-if="item.type=='json'">
                <view class="item" v-for="(child,index) in item.list">
                  <view class="label">{{child.name}}</view>
                  <view class="det">
                    <input class="input" type="number" v-model="child.value" :placeholder="'请输入设置值'+(child.max?(',最大值为'+child.max):'')" placeholder-style="color:#ccc" @input="onChange" />
                  </view>
                </view>
              </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default{
  props:{
    extendfield:{
      type: Array,
      default(){return []}
    },
    info:{
      type: Object,
      default(){return {}}
    },
    extenddata:{
      type: Array,
      default: null
    }
  },
  data(){
    return {
      baseUrl: this.$uploadUrl,
      schema:[],
      form:{},
      extraImages:[]
    }
  },
  watch:{
    extendfield(){
        this.init();
    }
  },
  onLoad(){
    this.init();
  },
  methods:{
    init(){
      this.schema = [];
      var schema = [];
      for(const i in this.extendfield){
        const fieldItem = this.extendfield[i]
        const schemaItem = {label: fieldItem.title,type: '',prop: fieldItem.id};
        switch(fieldItem.flags){
          case 32:
          case 8224:
            schemaItem.type="textarea";break;
          case 1:
            schemaItem.type="input";schemaItem.formtype="number";break;
          case 8200:
            schemaItem.label = '';
            schemaItem.type="images";break;
          case 4:
            schemaItem.label = '';
            schemaItem.type = 'json';
            schemaItem.list = JSON.parse(fieldItem.data);
            schemaItem.list.map(item=>{
              item.value = '';
            })
        }
        schema.push(schemaItem);
      }
      this.initData(schema);
      this.schema = schema;
      console.log('this.schema',this.schema)
      // console.log(this.form)
    },
    initData(schema){
      if(this.extenddata){
        for(const i in this.extenddata){
          const dataitem = this.extenddata[i];
          const fieldItem = this.extendfield.find(a=>a.id==dataitem.fieldid);
          const schemaItem = schema.find(a=>a.prop == fieldItem.id)
          switch(fieldItem.flags){
            case 8224:
            case 1:
            case 32:
              this.$set(this.form,fieldItem.id,dataitem.value);break;
            case 8200:
              this.extraImages = JSON.parse(dataitem.value);break;
            case 4:
              schemaItem.list = JSON.parse(dataitem.value)
          }
        }
      }
    },
    getValue(fieldItem){
      var value="";
      switch(fieldItem.flags){
        case 8224:
        case 1:
        case 32:
          value = this.form[fieldItem.id] || '';break;
        case 8200:
          value = JSON.stringify(this.extraImages);break;
        case 4:
          value = JSON.stringify(this.schema.find(a=>a.prop==fieldItem.id).list);
          console.log('vaue',fieldItem,value,this.schema.find(a=>a.prop==fieldItem.id).list)
          break;
      }
      
      return value
    },
    inputChange(e){
      const key = e.currentTarget.dataset.key;
      this.form[key] = e.detail.value;
      this.onChange();
    },
    numberChange(data){
      this.form[data.index] = data.number;
      this.onChange();
    },
    onChildChange(){
      console.log('scha',this.schema)
    },
    onChange(){
      const data = {fielddata:[],images:[],content:''};
      data.fielddata = this.extendfield.map(item=>{
        if([8224,32].indexOf(item.flags)>-1){
          data.content = this.form[item.id]||'';
        }
        return {
          id: this.info.id,
          fieldid: item.id,
          value: this.getValue(item)
        }
      })
      data.images = this.extraImages
      this.$emit('change',data)
    },
    toUpload(){
      const that = this;
      uni.chooseImage({
        count: 6, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album','camera'], //从相册选择
        success: (res) => {
          console.log(res);
          // this.info.image = res.tempFilePaths[0];
          uni.uploadFile({
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
  }
}
</script>

<style lang="scss">
.template-form{
  .textarea{
    background: $uni-bg-color-grey;
    padding: 20rpx;
  }
}

.record-img-list{
  .item{
    position: relative;
    padding: 20rpx 0;
    padding-left: 200rpx;
    min-height: 160rpx;
    .img{
      width: 160rpx;
      height: 160rpx;
      position: absolute;
      left: 20rpx;
      top: 20rpx;
    }
    .textarea{
      height:160rpx;
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
  width: 160rpx;
  height: 160rpx;
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
.cu-bar .action{width: 100%;display: block;}
.child-form-list{
  .item{
    display: flex;
    border-bottom: 1px solid $uni-border-color;
    line-height: 80rpx;
    .label{
      margin-right: 20rpx;
      white-space: nowrap;
    }
    .det{
      width: 100%;
      text-align: right;
      .input-placeholder{
        color: #ccc;
      }
      .input{
        height: 80rpx;
      }
      
    }
    &:last-child{
      border-bottom: 0;
    }
  }
}

.uni-placeholder{
  color: #aaa;
}
</style>
