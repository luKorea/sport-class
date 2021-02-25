<template>
  <view class="named-page" style="margin-bottom: 150rpx">
<!--学生信息-->
    <view class="margin">
      <view class="cu-bar bg-white">
        <view class='action'>班级名称</view>
        <view class='action'>{{detail.info.classname}}</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class='action'>上课时间</view>
        <view class='action'>{{detail.info.datetime}}  {{detail.info.btime}}:00-{{detail.info.etime}}:00</view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">授课课时</view>
        <view class="action">
          <uni-number-box :step="0.5" :value="detail.info.duration" @change="getStep" />
          <text class="cuIcon-sort text-gray" @click="showModal = !showModal"></text>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class='action'>上课老师</view>
        <view class='action'>{{result.teacher}}</view>
      </view>
      <!--搜索区域-->
      <view class="cu-bar search bg-white margin-top">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入学员姓名" v-model="searchInput"/>
        </view>
        <view class="action">
          <button class="cu-btn shadow-blur text-white bg-red" @click="searchValue">搜索</button>
          <view class="margin-left" v-if="!showModal">
            <text class="cuIcon-square text-gray" style="margin-right: 10rpx"></text>
            <text  @click="selectBorderAll" v-if="!borderClickAll">全选</text>
            <text  @click="noSelectBorderAll" v-else>取消</text>
          </view>
        </view>
      </view>
      <!--点名区域-->
      <view v-if="showModal" class="margin-bottom ">
        <view class="cu-bar bg-white margin-top solid-bottom">
          <view class="action">{{type.name}}</view>
          <view class="action"></view>
          <view class="action">{{type.one}}</view>
          <view class="action">{{type.two}}</view>
          <view class="action">{{type.three}}</view>
          <view class="action">{{type.four}}</view>
        </view>
        <block v-if="result.studentlist.length > 0">
          <view class="cu-bar bg-white padding-bottom-sm padding-top-sm solid-bottom"
                v-for="(item, index) in result.studentlist" :key="index">
            <view class="action flex-due" style="width: 300rpx">
              <view class="text-red" style="margin-bottom: 10rpx">{{item.name}}</view>
              <view class="text-sm text-gray">剩余{{item.course.lessonnum}}课时</view>
            </view>
            <radio-group @change="timeRadioChange($event, item.id,item)" class="radio-group">
              <label v-for="(info, index) in timeRadio" :key="index" class="radio-group-item">
                <view class="action">
                  <radio :value="info.value+''" :checked="info.value == item.timeValue" />
                </view>
              </label>
            </radio-group>
          </view>
        </block>
        <block v-else>
          <view
              class="cu-form-group cu-bar bg-white flex justify-center align-center">
            <view class="title">暂无数据</view>
          </view>
        </block>
      </view>
      <view v-else class="margin-bottom margin-top">
        <block v-if="result.studentlist.length > 0">
          <view class="cu-list grid col-4 gridBorder">
            <view class="cu-item flex justify-center align-center"
                  v-for="(item, index) in result.studentlist"
                  :class="{'red':borderArray.indexOf(index)>-1}"
                  :key="index" @click="selectBorder(item.id, index)">
              <view class="cu-avatar lg bg-white"
                    :style="{backgroundImage: `url(${item.avatar})`}"
                    style="border-radius: 50%"><i class="cuIcon-my" v-if="!item.avatar"></i></view>
              <text class="text-sm">{{ item.name }}</text>
              <text class="text-sm">剩余{{item.course.lessonnum}}课时</text>
            </view>
          </view>
        </block>
        <block v-else>
          <view
              class="cu-form-group cu-bar bg-white flex justify-center align-center">
            <view class="title">暂无数据</view>
          </view>
        </block>
      </view>
    </view>
<!--插班-->
    <view class="fixed-right" v-if="showModal" @click="goShift()">
      <view class="cuIcon-add"></view>
      <view>插班</view>
    </view>
<!--底部固定-->
    <view class="drawer-footer" v-if="showModal">
      <button class="cu-btn bg-white lg" style="width: 30%;border-radius: 0"  @click="selectBorderAll" v-if="!borderClickAll">全选</button>
      <button class="cu-btn bg-white lg" style="width: 30%;border-radius: 0"  @click="noSelectBorderAll" v-else>取消</button>
      <button class="cu-btn bg-red lg" style="width: 70%;border-radius: 0" @click="save">点名</button>
    </view>
    <view class="drawer-footer" v-else>
      <button class="cu-btn bg-orange lg" style="width: 25%;border-radius: 0" @click="dianming(0)">到课</button>
      <button class="cu-btn bg-red lg" style="width: 25%;border-radius: 0" @click="dianming(1)">未到</button>
      <button class="cu-btn bg-cyan lg" style="width: 25%;border-radius: 0" @click="dianming(2)">请假</button>
      <button class="cu-btn bg-blue lg" style="width: 25%;border-radius: 0" @click="dianming(4)">迟到</button>
    </view>
    <view class='cu-tabbar-height'></view>
  </view>
</template>

<script>
import uniNumberBox from '../../../components/uni-number-box/uni-number-box';
export default {
  name: "namedPage",
  components: {
    uniNumberBox
  },
  data() {
    return {
      type: {
        name: '学生姓名',
        one: '到课',
        two: '未到',
        three: '请假',
        four: '迟到'
      },
      showModal: true,
      // 2. 多选框按钮
      showBorder: false,
      borderArray: [],
      borderClickAll: false,    // 是否全选
      searchInput: '',
      result: {
        teacher: '',
        studentlist:[]
      },
      timeCurrent: null,
      timeRadio: [
        {value: 0},
        {value: 1},
        {value: 2},
        {value: 4}
      ],
      array: [],
      params:{},
      detail:{info:{},classstudent:[],classteacher:[],courselist:[],lessonteacher:[],lessonstudent:[]}
    }
  },
  onLoad(options) {
    let {id} = options;
    this.params = options;
    this.getData();
  },
  methods: {
    getData(){
      this.$api.lessontask.info(this.params).then(res=>{
        res.data.data.classstudent.map(item=>{
          item.course=res.data.data.courselist.find(a=>a.studentid==item.id)||{lessonnum:0};
        })
        this.detail = res.data.data;
        this.result.teacher = res.data.data.lessonteacher.length?res.data.data.lessonteacher.map(a=>a.name).join(','):res.data.data.classteacher.map(a=>a.name).join(',')
        this.result.studentlist = res.data.data.classstudent
      })
    },
    searchValue() {
      this.result.studentlist = this.detail.classstudent.filter(a=>a.name.indexOf(this.searchInput)>-1)
    },
    // 获取用户输入的步长值
    getStep(e) {
      this.detail.info.duration = e;
    },
    timeRadioChange(e, id,data) {
      var cur = this.array.find(a=>a.id==id);
      if(cur){
        cur.type = e.detail.value
      }else{
        this.array.push({
          type: e.detail.value,
          id: id
        })
      }
      this.$set(data,'timeValue',e.detail.value)
    },
    setData(data){
      this.detail.classstudent.push(data.student);
      
    },
    // 去插班页面
    goShift() {
      uni.navigateTo({
        url: `/pages/common/shift/shift?courseid=${this.detail.info.courseid}&datetime=${this.detail.info.datetime}`
      })
    },
    // 全选弹框
    selectBorderAll() {
      let len = this.result.studentlist.length;
      this.checkBox = [];
      for (let i = 0; i < len; i++) {
        this.borderArray.push(i);
      }
      this.borderClickAll = true;
      this.result.studentlist.map(item=>{
        this.$set(item,"timeValue",0)
      })
      this.array = this.result.studentlist.map(a=>({
        type: 0,
        id: a.id
      }))
    },
    // 取消全选弹框
    noSelectBorderAll() {
      this.borderArray = [];
      this.borderClickAll = false;
      
      var newList = this.result.studentlist.map(item=>{
        delete item.timeValue;
        return item;
      })
      this.result.studentlist = newList;
      this.array = [];
    },
  //  选中课程弹框
    selectBorder(id, key) {
      // console.log(id);
      let arrIndex = this.borderArray.indexOf(key);
      if(arrIndex>-1){   // 已选中,点击取消
        this.borderArray.splice(arrIndex,1);
      }else{  // 未选中,点击选中
        this.borderArray.push(key);
      }
    },
    save(){
      if(this.array.length<=0){
        return uni.showToast({ title:"学生未点完",icon:'none' });
      }
      var data = {
        lessontaskid: this.params.lessontaskid || 0,
        coursescheduleid: this.params.coursescheduleid,
        datetime: this.detail.info.datetime,
        duration: this.detail.info.duration,
        tdata:JSON.stringify((this.detail.lessonteacher.length?this.detail.lessonteacher:this.detail.classteacher).map(a=>({id:a.id,flags:a.flags}))),
        sdata:JSON.stringify(this.detail.classstudent.map(a=>({id:a.id,courseid:this.detail.info.courseid,flags:this.array.find(sitem=>sitem.id==a.id).type})))
      }
      this.$api.lessontask.rollcall(data).then(res=>{
        if(res.data.data.errcode==200){
          uni.showToast({ title:"点名成功" });
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
    },
    dianming(flag){
      var data = {
        lessontaskid: this.params.lessontaskid || 0,
        coursescheduleid: this.params.coursescheduleid,
        datetime: this.detail.info.datetime,
        duration: this.detail.info.duration,
        tdata:JSON.stringify((this.detail.lessonteacher.length?this.detail.lessonteacher:this.detail.classteacher).map(a=>({id:a.id,flags:a.flags}))),
        sdata:JSON.stringify(this.borderArray.map(a=>this.detail.classstudent[a]).map(a=>({id:a.id,courseid:this.detail.info.courseid,flags:flag})))
      }
      this.$api.lessontask.rollcall(data).then(res=>{
        if(res.data.data.errcode==200){
          uni.showToast({ title:"点名成功" });
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
  .named-page{
    padding-bottom: 100rpx;
  }
.flex-due {
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.fixed-right {
  position: fixed;
  right: 20rpx;
  bottom: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  text-align: center;
  width: 120rpx;
  height: 120rpx;
  color: #ffffff;
  background: #52CDC0;
  border-radius: 50%;
}
.red {
  border: 1px solid red;
}
</style>