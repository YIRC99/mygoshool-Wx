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
      onShareTimeline(){
        let result = {
          
        }
        return result
      },
      onShareAppMessage(e){
        let result = {
          title: '栀子花墙小程序', // 分享标题，默认当前页面标题
          path: '/pages/index/index', // 分享路径，默认当前页面路径，需要带上参数，如：/pages/index/index?id=123&name=abc，其中id和name                                        是当前页面参数，123和abc是参数值，需要根据实际情况进行替换。
          imageUrl: this.defaulthhttp + 'logo.jpg'
        }
        return result
      },
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