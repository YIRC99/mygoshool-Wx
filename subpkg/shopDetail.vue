<template>
  <view class="page" style="padding-bottom: 30rpx;">
    
    <view class="" style="background-color: #ffffff; width: 100vw; height: 1rpx;"></view>

    <uni-card isShadow >
      <view class="myheaderbox">
        <view class="left">
          <image class="myavatar" src="../static/logo.png" mode=""></image>
        </view>
        <view class="right">
          <view class="name">一见如初</view>
          <view class="sub">濂溪校区</view>
        </view>
      </view>
    </uni-card>

    <uni-card>
      <view class="priceAndbrowse">
        <view class="price">￥15</view>
        <view class="">100浏览</view>
      </view>
      <rich-text :nodes="shopDetail"></rich-text>
      
      <image :src="item" v-for="(item,index) in shopImgList" :key="index" mode=""></image>
    </uni-card>

    <uni-card>
      <view class="WxBox">
        <image src="@/static/weixin.png" class="myicon" mode=""></image>
        <view class="">感兴趣 点击添加微信聊一聊</view>
      </view>
    </uni-card>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        shopDetail: '(关注送马甲)致态 PC005  512g，256g m2  Nvme固态硬盘，Pci-e3.0<br/>通道，高达3500MB/S的顺序读取，长江颗粒，带独立缓存，性能爆炸。<br/><br/>256g，129包邮，关注送马甲<br/>512g，199包邮，关注送马甲<br/>1T        380包邮，关注送马甲<br/><br/>全新没拆封，大量现货，全国包邮，量大可谈。<br/>欢迎同行批发，你有量我有好价，长期合作双赢。<br/><br/>配套散热马甲、导热贴、螺丝、螺丝刀<br/><br/>质量问题支持7天无理由退货，非质量问题不支持退货。<br/><br/>支持五年质保个人送修',
        shopImgList:[
          'https://gw.alicdn.com/bao/uploaded/i4/6000000000782/O1CN01AtGt9i1HeCevakODA_!!6000000000782-0-sm.jpg_220x10000Q75.jpg_.webp',
          'https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/52043928/O1CN01giln0z1et4b5hnR7F_!!52043928.jpg_460x460q90.jpg_.webp',
          'https://gw.alicdn.com/bao/uploaded/i3/6000000007600/O1CN012IkdIv260r2G6yNga_!!6000000007600-0-sm.jpg_220x10000Q75.jpg_.webp'
        ]
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  
  .WxBox{
    display: flex;
    align-items: center;
    font-size: 36rpx;
    .myicon {
      width: 60rpx;
      height: 60rpx;
      margin-right: 30rpx;
    }
  }
  
  
  
  .priceAndbrowse{
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;
    .price{
      font-size: 40rpx;
      font-weight: bold;
      color: #F26666;
    }
  }

 

  .myheaderbox {
    display: flex;
    align-items: center;

    .left {
      margin-right: 30rpx;

      .myavatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }

    .right {
      .name {
        font-size: 36rpx;
        font-weight: bold;
      }

      .sub {
        font-size: 28rpx;
        color: #5f6466;
      }
    }
  }
</style>