<template>
  <view>
    <view class="" v-if="isShow" style="display: flex;flex-direction: column;
    justify-content: center; width: 100vw; align-items: center;">
      <image :src="imgPath" mode="heightFix"></image>
      <rich-text :nodes="Text" style="font-size: 40rpx; color: #A9a9a9; text-align: center;"></rich-text>
    </view> 
  </view>
</template>

<script>
  export default {
    name:"myEmppty",
    props:{
      isShow:{
        default: false,
        type: Boolean,
      },
      Text: {
        default: '暂时没有拼车订单 快快发布一个吧'
      },
      imgPath:{
        default: require('../../static/orderEmpty.png')
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">

</style>