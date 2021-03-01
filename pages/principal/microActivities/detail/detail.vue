<template>
  <view class="micro-container">
    <image :src="baseUrl + image" alt="" class="img" mode="widthFix"></image>
  </view>
</template>

<script>
export default {
name: "detail",
  data() {
    return {
      baseUrl: this.$imageprefix,
      image: ''
    }
  },
  onLoad(options){
    this.image = options.image.replace('micro_activity','micro_activitytwo');
  }
}
</script>

<style scoped>
  page{
  }
.micro-container {
  width: 100%;
  overflow: hidden;
}
.img {
  width: 100%;
  overflow: hidden;
}
</style>