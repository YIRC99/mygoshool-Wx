<template>
  <view>

    <scroll-view scroll-y="true" style="height: 95vh; background-color: #FFFFFF;" :refresher-triggered="isRefresh"
      @scrolltolower="scrollDown" :scroll-top="myScrollPosition" scroll-with-animation
      @refresherrefresh="scrollPullDown" @scroll="myScroll" refresher-enabled>
      <view class="">

        <myAffiche></myAffiche>

        <view style="position: sticky; top: 0; z-index: 9999; background-color: #fff;">
          <view class="">
            <view class="" @click="">
              <uni-search-bar ref="mysearch" @focus="updatePlaceholder" @cancel="recoverPlaceholder" @confirm="toSearch" v-model="searchText" radius="30" :placeholder="myplaceholder" />
            </view>

            <view class="tag-box">
              <view class="uv-page__tag-item" v-for="(item,index) in radios" :key="index">
                <uv-tags :text="item.name" :plain="!item.checked" :type="item.checked == true ? 'primary' : 'info'"
                  :name="index" class="item" :closable="item.checked" closePlace="right" @close="checkboxClick"
                  shape="circle" @click="checkboxClick" style="margin: 0 30rpx;">
                </uv-tags>
              </view>
            </view>
          </view>
        </view>

        <view class="waterfall">
          
          <myShopWaterfall ref="myshopwaterfall" :list="list"></myShopWaterfall>

          <uv-load-more v-if="isShowListloading" :fontSize="30" :status="status" :marginTop="30" dashed line />

        </view>
      </view>
    </scroll-view>

    <myAdd toPagePath="/subpkg/addShop"></myAdd>
    <view class="totopBut" v-show="isShowToTop" @click="toTop">
      <image src="/static/toTop.png" mode=""></image>
    </view>

    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  import {
    guid
  } from '@/uni_modules/uv-ui-tools/libs/function/index.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        myplaceholder: '搜索',
        searchText: '',
        status: 'loading',
        myScrollPosition: 0,
        myOldScrollPosition: 0,
        isRefresh: false,
        radios: [{
          checked: true,
          name: '濂溪校区'
        }, {
          checked: true,
          name: '十里校区'
        }, {
          checked: true,
          name: '其他'
        }],
        list: [], // 瀑布流全部数据
        list1: [], // 瀑布流第一列数据
        list2: [], // 瀑布流第二列数据
        leftGap: 10,
        rightGap: 10,
        columnGap: 10,
        pageNum: 1,
        pageSize: 10,
        pagetotal: 0,
        isShowListloading: false
      };
    },
    computed: {
      isShowToTop() {
        return this.myOldScrollPosition >= 150
      }
    },
    watch: {
      searchText(newValue) {
        // 使用正则表达式匹配特殊字符
        if (/[^\u4e00-\u9fa5a-zA-Z0-9\s]/.test(newValue)) {
          // 如果输入包含特殊字符，将搜索文本设置为不包含特殊字符的文本
          this.searchText = newValue.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '');
        }
      }
    },
    methods: {
      recoverPlaceholder(){
        this.myplaceholder = '搜索'
      },
      updatePlaceholder(){
        this.myplaceholder = '多个关键词可空格分开搜索'
      },
      chooseAddArr() {
        let arr = []
        this.radios.forEach((item, index) => {
          if (item.checked) arr.push(index)
        })
        return arr
      },
      ToShopDetail(item) {
        uni.setStorageSync('shopdetail', item)
        uni.navigateTo({
          url: '/subpkg/shopDetail'
        })
      },
      myScroll(e) {
        // console.log('old  ',this.myOldScrollPosition);
        // console.log('new   ',this.myScrollPosition);
        this.myOldScrollPosition = e.detail.scrollTop
      },
      toTop() {
        this.myScrollPosition = this.myOldScrollPosition
        this.$nextTick(() => {
          this.myScrollPosition = 0
        });
        setTimeout(() => this.scrollPullDown(), 500)
        console.log('old  ', this.myOldScrollPosition);
        console.log('new   ', this.myScrollPosition);
      },
      getShopList() {
        if (this.chooseAddArr().length == 0) {
          setTimeout(() => {
            this.isRefresh = false
            this.$refs.message.show({
              type: 'warning',
              msg: '查询不到物品,请选择地区吧',
            })
          }, 100)
          return
        }

        this.post({
          url: 'shop/page',
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            addressCodeArr: this.chooseAddArr()
          }
        }).then(res => {
          console.log('商品请求返回值',res);
          console.log('商品请求返回值', res.data);
          if (res.code != 200) {
            this.isRefresh = false
            this.isShowListloading = false
            this.$refs.message.show({
              type: 'error',
              msg: '网络开了点小差,请稍候重试吧',
            })
            return
          }

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
      scrollPullDown() {
        if (this.isRefresh == true) return
        this.isRefresh = true
        this.pageNum = 1
        //清空数据
        console.log('清空数据');
        this.list = []
        this.$refs.myshopwaterfall.clearList()
        // debugger
        this.getShopList()
      },
      scrollDown() {
        // TODO 分页后端已经写好了 明天完善下滑分页加载的动画
        if (this.list.length == this.pagetotal) {
          this.isShowListloading = true
          this.status = 'nomore'
        }else{
          this.pageNum++
          this.isShowListloading = true
          this.getShopList()
        }
        console.log('滑动到底部了');
      },
      myonload() {
        this.scrollPullDown()
      },
      checkboxClick(index) {
        this.radios[index].checked = !this.radios[index].checked
        this.scrollPullDown()
      },
      toSearch() {
        console.log('点击搜索框');
        if (this.searchText.trim() == '') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请输入搜索内容吧',
          })
          return
        }
        let result = this.searchText
        this.searchText = ''
        this.$refs.mysearch.cancel()
        uni.navigateTo({
          url: '/subpkg/searchShop?searchText=' + result
        })
        
        
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
      background: #FFFFFF;
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

