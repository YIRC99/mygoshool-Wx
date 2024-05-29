<template>
  <view class="page">

    <view class="title">
      {{affiche.title}}
    </view>
    <view class="text">
      {{affiche.createat}}
    </view>
    
    
    <uv-parse :content="affiche.text" :selectable="true" :tagStyle="myStyle" :lazyLoad="true"></uv-parse>


  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        affiche: {
          text: '',
          title: '',
          createat: ''
        },
        title: '我是公告我是公告我是公告我是公告我是公告我是公告',
        dateTime: '',
        text: '我是内容我是内容我是内容我是内容我是内容我是内容',
        myStyle: ''
      };
    },
    computed: {
   
    },
    onLoad() {
      this.affiche = uni.getStorageSync('affiche')
    },
    methods:{
      
    }
  }
</script>

<style lang="scss">
  .page {
    padding: 30rpx;
  }

  .text {
    color: #9E9E9E;
    margin: 20rpx 0;

    image {
      width: 100%;

    }
  }

  .title {
    font-weight: bold;
    font-size: 36rpx;
  }
</style>