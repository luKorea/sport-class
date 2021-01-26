<template>

  <view>
    <view class="margin">
      <view class="cu-bar search bg-white">
        <view class="search-form">
          <text class="cuIcon-search"></text>
          <input type="text" placeholder="请输入学员名字" v-model="searchInput"/>
        </view>
        <view class="action" @click="searchValue">
          <button class="cu-btn shadow-blur text-white bg-red">搜索</button>
        </view>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">非本班学员</view>
        <view class="action">
          <checkbox style="transform:scale(0.6)" />
          <text>只显示有剩余课时</text>
        </view>
      </view>
      <view class="margin-top">
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
    </view>

    <view class="drawer-footer">
      <button class="cu-btn add-btn bg-red" style="width: 100%;" @click="saveData">确定</button>
    </view>
  </view>
</template>

<script>
export default {
name: "assStudents",
  data() {
    return {
      searchInput: '',
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
    searchValue() {
      console.log(this.searchInput);
    },
    saveData() {
      wx.navigateBack();
    }
  }
}
</script>

<style scoped>
.red {
  border: 1px solid red;
}
</style>