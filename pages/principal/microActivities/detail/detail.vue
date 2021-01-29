<template>
  <view class="micro-container">
    <img :src="info.imgUrl" alt="" class="img">
  </view>
</template>

<script>
export default {
name: "detail",
  data() {
    return {
      info: {
        imgUrl: this.$imageurl + 'wei_detail.png'
      }
    }
  },
}
</script>

<style scoped>
.micro-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>