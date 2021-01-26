<template>
  <view>
    <view class="margin">
      <block v-if="student.length > 0">
        <view class="cu-list grid col-4 gridBorder">
          <view class="cu-item flex justify-center align-center"
                v-for="(item, index) in student"
                :class="{'red':borderArray.indexOf(index)>-1}"
                :key="index" @click="selectBorder(item.id, index)"
          >
            <view class="cu-avatar lg bg-white"
                  :style="{backgroundImage: `url(${item.url})`}"
                  style="border-radius: 50%"></view>
            <text>{{ item.name }}</text>
            <text>{{item.className}}</text>
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
    <view class="drawer-footer">
      <button class="cu-btn bg-orange lg" style="width: 50%;" @click="removeStudents">
        <text class="cuIcon-roundclose margin-right-sm"></text>移出学员
      </button>
      <button class="cu-btn bg-red lg" style="width: 50%;" @click="goAddStudents">
        <text class="cuIcon-roundadd margin-right-sm"></text>添加学员
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: "students",
  data() {
    return {
      borderArray: [],
      student: [
        {
          id: 0,
          name: '黎明',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:1,
          name: '郭敬明',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:2,
          name: '郑爽',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:3,
          name: '热吧',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:4,
          name: '周星驰',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:5,
          name: '李小龙',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:6,
          name: '李翠萍',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        },
        {
          id:7,
          name: '小姐',
          className: '篮球测试',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }
      ],
    }
  },
  methods: {
    selectBorder(id, key) {
      let arrIndex = this.borderArray.indexOf(key);
      if(arrIndex>-1){   // 已选中,点击取消
        this.borderArray.splice(arrIndex,1);
      }else{  // 未选中,点击选中
        this.borderArray.push(key);
      }
    },
    removeStudents() {
      this.borderArray.forEach(item =>{
        this.student = this.student.filter((i, index) => item !== index);
      });
      // this.borderArray = [];
    },
    goAddStudents() {
      wx.navigateTo({
        url: '../addStudents/addStudents'
      })
    }
  }
}
</script>

<style scoped>
.red {
  border: 1px solid red;
}
</style>