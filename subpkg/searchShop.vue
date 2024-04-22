<template>
  <view>

    <scroll-view scroll-y="true" style="height: 95vh; background-color: #f7f7f7;" :refresher-triggered="isRefresh"
      @scrolltolower="scrollDown" :scroll-top="myScrollPosition" scroll-with-animation @scroll="myScroll">
      <view class="">


        <myShopWaterfall :list="list" emptyTest="没有查询到相关的物品哦~ <br>换一个关键词试试吧"></myShopWaterfall>

      </view>
    </scroll-view>

    <view class="totopBut" v-show="isShowToTop" @click="toTop">
      <image src="/static/toTop.png" mode=""></image>
    </view>

    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        status: 'loading',
        myScrollPosition: 0,
        myOldScrollPosition: 0,
        isRefresh: false,
        list: [], // 瀑布流全部数据
        isShowListloading: false
      };
    },
    computed: {
      isShowToTop() {
        return this.myOldScrollPosition >= 150
      }
    },
    onLoad(e) {
      console.log(e.searchText);
      this.searchText(e.searchText)
    },
    methods: {
      searchText(target) {
        let arr = target.split(' ').filter(i => i.trim() != '')
        console.log(arr);

        this.post({
          url: 'shop/search/' + arr
        }).then(res => {
          console.log(res);
          res.data.forEach(i => {
            i.image = i.imgs.split(",")[0]
          })
          this.list = res.data
        })
      },
      ToShopDetail(item) {
        uni.setStorageSync('shopdetail', item)
        uni.navigateTo({
          url: '/subpkg/shopDetail'
        })
      },
      myScroll(e) {
        this.myOldScrollPosition = e.detail.scrollTop
      },
      toTop() {
        this.myScrollPosition = this.myOldScrollPosition
        this.$nextTick(() => {
          this.myScrollPosition = 0
        });
      },
  
    }
  }
</script>

<style lang="scss">
  .totopBut {
    position: fixed;
    top: 1150rpx;
    right: 50rpx;
    z-index: 999;
    background-color: #fff;
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 100rpx;
      height: 100rpx;
    }
  }

  .waterfall {
    margin: 30rpx 0;
    padding-bottom: 120rpx;
  }

  .tag-box {
    margin-left: 30rpx;
    display: flex;
    align-items: center;
    padding-bottom: 10rpx;

    .page {
      background: #f1f1f1;
    }

    .uv-page__tag-item {
      width: 185rpx;
      display: flex;
    }
  }


  /deep/.uv-tags--info--plain {
    display: flex;
    justify-content: center;
    width: 150rpx !important;
  }

  /deep/.uv-tags--primary {
    display: flex;
    justify-content: center;
    width: 150rpx !important;
  }

  /deep/ .uni-searchbar__box {
    justify-content: center !important;
  }
</style>


<style scoped lang="scss">
  $show-lines: 1;
  @import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';

</style>