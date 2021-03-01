<template>
  <view class="container margin">
    <view class="cu-bar bg-white margin-top">
      <view class="action">费用名称</view>
      <view class="action text-right">
        <input v-model="form.name" placeholder="请输入费用名称"/>
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
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">收费方式</view>
      <picker @change="bindChargeChange($event, chargeArray)" :value="chargeIndex" :range="chargeArray">
        <view class="picker"><text class="color-gray" v-if="chargeIndex<0">请选择</text><text v-else>{{chargeArray[chargeIndex].label}}</text></view>
      </picker>
    </view>
    <view class="cu-bar bg-white margin-top" v-if="chargeIndex==0">
      <view class="action">课节数量</view>
      <view class="action text-right">
        <input type="number" v-model="form.count" placeholder="请输入课节数量"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top" v-if="chargeIndex==0">
      <view class="action">赠送课时</view>
      <view class="action text-right">
        <input type="number" v-model="form.bestow" placeholder="请输入赠送课时"/>
      </view>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white">
      <view class="title">有效期方式</view>
      <picker @change="bindPeriodChange($event, periodArray)" :value="periodIndex" :range="periodArray">
        <view class="picker"><text class="color-gray" v-if="periodIndex<0">请选择</text><text v-else>{{periodArray[periodIndex]}}</text></view>
      </picker>
    </view>
    <view class="cu-bar bg-white margin-top" v-if="periodIndex==0">
      <view class="action">有效期（天）</view>
      <view class="action text-right">
        <input type="number" v-model="form.time" placeholder="无限制"/>
      </view>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white" v-if="periodIndex==1">
      <view class="title">开始日期</view>
      <picker mode="date" @change="bindSDateChange" :value="form.begintime" :start="startDate" :end="endDate">
        <view class="picker">{{ form.begintime }}<text v-if="!form.begintime" class="color-gray">无限制</text></view>
      </picker>
    </view>
    <view class="cu-form-group margin-top cu-bar bg-white" v-if="periodIndex==1">
      <view class="title">结束日期</view>
      <picker mode="date" @change="bindEDateChange" :value="form.endtime" :start="startDate" :end="endDate">
        <view class="picker">{{ form.endtime }}<text v-if="!form.endtime" class="color-gray">无限制</text></view>
      </picker>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">价格（元）</view>
      <view class="action text-right">
        <input type="number" v-model="form.price" placeholder="请输入价格"/>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">优惠方式</view>
      <view class="action text-right">
        <view class="radio-button" :class="{active: discountIndex==0}" @click="bindDiscountChange(0)">￥</view><view class="radio-button" :class="{active: discountIndex==1}" @click="bindDiscountChange(1)">%</view>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">优惠/折扣</view>
      <view class="action text-right">
        <block v-if="discountIndex==0">
        <input type="number" v-model="form.discount" placeholder="请输入优惠金额"/><text>￥</text>
        </block>
        <block v-if="discountIndex==1">
        <input type="number" v-model="form.rate" placeholder="请输入折扣比例"/><text>%</text>
        </block>
      </view>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">签约价格（元）</view>
      <view class="action text-right">
        <text>{{signPrice}}</text>
      </view>
    </view>
    
    <view class="flex flex-direction fixed-bottom" @click="confirm">
      <button class="add-btn">确定</button>
    </view>
  </view>
</template>

<script>
  import {getDate} from "@/utils";
  
export default{
  data(){
    return {
      form:{
        id: 0,//int 价格id，添加时默认为0 coursesell.id
        type: 1,//int 类型（0=未定义、1=课程、2=课程促销套餐<暂未使用>、3=套餐）
        relate: "",//int 引用id
        name: "",//string notnull length<32 标题
        rule: 3,//具体查看 Promotion.Rule,3=按次数,5=按期限 
        duration: "",//时长
        time: "",//int 时长（可用天数）
        count: "",//int 次数（课程表示对应的课节数量，其他类型暂时没有用到）
        price: "",//decimal 价格
        subtotal: "",//decimal 签约价格
        discount: 0,//decimal 优惠价格
        rank: "",//int 排序
        begintime: "",//string 开始时间
        endtime: "",//string 结束时间
        rate: 100,//double 折扣比率
        bestow: "",//double 赠送课时
        classid: "",//int 班级id
        flags: 0,//int 标记 coursesell.flags
        limit: "",//int  购买限制（总购买次数，0表示无限制）
        raterrule: 1,//1:按金额，2:按折扣
        timerule: 1,//有效期方式 1:按固定天数，2：固定日期
      },
      result:{
        classname:'',
        courseid:''
      },
      chargeIndex: 0,
      chargeArray:[{label:'按课时',value: 3},{label:'按期限',value: 5}],
      periodIndex: 0,
      periodArray:['固定天数','固定日期'],
      discountIndex: 0,//优惠方式
    }
  },
  computed:{
    signPrice(){
      let result = '';
      if(this.form.price===''){
        return '';
      }
      if(this.discountIndex==0){
        result = this.form.price - this.form.discount
      }
      if(this.discountIndex==1){
        result = this.form.price*this.form.rate/100
      }
      this.form.subtotal = result;
      return result;
    },
    startDate() {
      return getDate('start')
    },
    endDate() {
      return getDate('end');
    }
  },
  onLoad(options){
    this.result.courseid = options.courseid;
    if(options.data){
      this.form = JSON.parse(options.data)
    }
  },
  methods:{
    toSelectClass(){
      const url ='/pages/common/record/addRecord/selectClass';
      var params = {status:0,courseid:this.result.courseid}
      uni.navigateTo({
        url: url+'?data='+this.form.classid+'&single=1&params='+ JSON.stringify(params)
      })
    },
    setData(data){
      if(data.classList){
        this.form.classid = data.classList[0].id;
        this.result.classname = data.classList[0].name;
      }
    },
    // 选择收费方式
    bindChargeChange(e, data) {
      const {value} = e.detail;
      this.chargeIndex = value;
      this.form.rule = data[value].value
    },
    // 选择有效期方式
    bindPeriodChange(e, data) {
      const {value} = e.detail;
      this.periodIndex = value;
      this.form.timerule = value+1;
    },
    // 选择开始时间
    bindSDateChange(e) {
      this.form.begintime = e.target.value;
    },
    // 选择结束时间
    bindEDateChange(e) {
      this.form.endtime = e.target.value;
    },
    //选择优惠方式
    bindDiscountChange(val){
      this.discountIndex = val;
      this.form.rate = 100;
      this.form.discount = 0;
      this.form.raterrule = val+1;
    },
    confirm(){
      if(!this.form.name){
        return uni.showToast({ title:'费用名称不能为空',icon: 'none' })
      }
      if(this.form.price==='' || this.form.price<0){
        return uni.showToast({ title:'金额必须为正数或含两位小数的正数',icon: 'none' })
      }
      //如果是按课时，课节数量大于0
      if(this.chargeIndex==0 && this.form.count<=0){
        return uni.showToast({ title:'调课数量必须大于0',icon: 'none' })
      }
      //如果是按期限，必须选择时间
      if(this.chargeIndex==1){
        if(this.periodIndex==0 && this.form.time<=0){
          return uni.showToast({ title:'有效期必须大于0',icon: 'none' })
        }
        if(this.periodIndex==1){
          if(!this.form.begintime){
            return uni.showToast({ title:'请选择开始日期',icon: 'none' })
          }
          if(!this.form.endtime){
            return uni.showToast({ title:'请选择结束日期',icon: 'none' })
          }
        }
      }
      
      this.prePage().setData({price: this.form});
      uni.navigateBack()
      
      
    }
  }
}
</script>

<style lang="scss">
page{
  background: $uni-bg-color-grey;
}
.container{
  padding-bottom: 130rpx;
}
.radio-button{
  display: inline-block;
  border: 1px solid $uni-color-base;
  line-height: 60rpx;
  padding: 0 30rpx;
  margin-right: -1px;
  &.active{
    background-color: $uni-color-base;
    color: #fff;
  }
}
.color-gray{color: #bbb;}
</style>
