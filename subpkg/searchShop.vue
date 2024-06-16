<template>
  <view >

    <scroll-view scroll-y="true" style="height: 100vh; background-color: #f7f7f7; " :refresher-triggered="isRefresh"
      @scrolltolower="scrollDown" :scroll-top="myScrollPosition" scroll-with-animation @scroll="myScroll">
      <view class="">

        <myShopWaterfall :list="list" emptyTest="没有查询到相关的物品哦~ <br>换一个关键词试试吧" @notLoign="notlogin"></myShopWaterfall>
        
         <uv-load-more v-if="isShowListloading" :fontSize="30" :status="status" :marginTop="30" dashed line />
         <view class="" style="height: 100rpx;width: 100%;"></view>
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
        isShowListloading: false,
        pageNum: 1,
        pageSize: 10,
        pagetotal: 0,
        searchTextArr: []
      };
    },
    computed: {
      isShowToTop() {
        return this.myOldScrollPosition >= 150
      }
    },
    onLoad(e) {
      let searchText = e.searchText
      this.searchTextArr = searchText.split(' ').filter(i => i.trim() != '')
      this.searchText()
    },
    methods: {
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
      scrollDown() {
        // TODO 分页后端已经写好了 明天完善下滑分页加载的动画
        if (this.list.length == this.pagetotal) {
          this.isShowListloading = true
          this.status = 'nomore'
        }else{
          this.pageNum++
          this.isShowListloading = true
          this.searchText()
        }
        // console.log('滑动到底部了');
      },
      searchText() {
        this.post({
          url: 'shop/search',
          data:{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            target: this.searchTextArr
          }
        }).then(res => {
          // console.log(res);
          
          this.pagetotal = res.data.total
          res.data.records.forEach(i => {
            i.image = i.imgs.split(",")[0]
          })
          this.list = [...this.list, ...res.data.records]
          this.isRefresh = false
          this.isShowListloading = false
        }).catch(err => {
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
          return
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