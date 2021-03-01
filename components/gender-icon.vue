<template>
  <text>
    <i class="cuIcon-male color-male" v-if="value==1"></i>
    <i class="cuIcon-female color-female" v-if="value==2"></i>
  </text>
</template>

<script>
export default{
  props:{
    value:{
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
  .color-male{
    color: #00B7EE;
  }
  .color-female{
    color: #DD524D;
  }
</style>
