<template>
  <view>
    
    <view class="addicon" @click="toAddPage">
      <image src="/static/add.png" mode=""></image>
    </view>
    
     <quick-message ref="message"></quick-message>
    
  </view>
</template>

<script>
  export default {
    name:"myAdd",
    props:{
      toPagePath:{
        default: '',
        type: String
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      toAddPage() {
        if(this.toPagePath == ''){
          console.error('使用toAdd组件的时候请传入 页面的路径');
          return
        }
        
        let user = uni.getStorageSync('user')
        if (user != null && user != '' && user != undefined) {
          uni.navigateTo({
            url: this.toPagePath
          });
        } else {
          this.$refs.message.show({
            type: 'error',
            msg: '请登录后再发布吧',
            iconSize: 16,
          })
        }
      
      },
    }
  }
</script>

<style lang="scss">
  .addicon {
    position: fixed;
    top: 1000rpx;
    right: 50rpx;
    z-index: 999;
    background-color: #CCCCCC;
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 60rpx;
      height: 60rpx;
    }
  }
</style>