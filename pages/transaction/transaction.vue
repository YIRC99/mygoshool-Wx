<template>
  <view>

    <scroll-view scroll-y="true" style="height: 95vh; background-color: #f7f7f7;" :refresher-triggered="isRefresh"
      @scrolltolower="scrollDown" :scroll-top="myScrollPosition" scroll-with-animation
      @refresherrefresh="scrollPullDown" @scroll="myScroll" refresher-enabled>
      <view class="">

        <myAffiche></myAffiche>

        <view style="position: sticky; top: 0; z-index: 9999; background-color: #fff;">
          <view class="">
            <view class="" @click="toSearch">
              <uni-search-bar @confirm="" @input="" radius="30" placeholder="搜索" readonly />
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
          <myEmppty :isShow="list.length == 0" Text="暂时没有商品出售哦~" :img-path="require('@/static/shopCar.png')"></myEmppty>

          <uv-waterfall ref="waterfall" v-model="list" :add-time="10" :left-gap="leftGap" :right-gap="rightGap"
            :column-gap="columnGap" @changeList="changeList">
            <!-- 第一列数据 -->
            <template v-slot:list1>
              <!-- 为了磨平部分平台的BUG，必须套一层view -->
              <view>

                <view v-for="(item, index) in list1" :key="item.id" @click="ToShopDetail(item)" class="waterfall-item">
                  <view class="waterfall-item__image">
                    <image lazy-load :src="shophttp + item.image" mode="widthFix" style="width: 100%;"></image>
                  </view>
                  <view class="waterfall-item__ft">
                    <view class="waterfall-item__ft__title">
                      <text class="value uv-line-2">{{item.detail | formHtmlStr}}</text>
                    </view>
                    <view class="waterfall-item__ft__desc uv-line-2">
                      <text class="value">￥{{item.price}}</text>
                    </view>
                  </view>
                </view>


              </view>
            </template>
            <!-- 第二列数据 -->
            <template v-slot:list2>
              <!-- 为了磨平部分平台的BUG，必须套一层view -->
              <view>
                
                <view v-for="(item, index) in list2" :key="item.id" @click="ToShopDetail(item)" class="waterfall-item">
                  <view class="waterfall-item__image">
                    <image lazy-load :src="shophttp + item.image" mode="widthFix" style="width: 100%;"></image>
                  </view>
                  <view class="waterfall-item__ft">
                    <view class="waterfall-item__ft__title">
                      <text class="value uv-line-2">{{item.detail | formHtmlStr}}</text>
                    </view>
                    <view class="waterfall-item__ft__desc uv-line-2">
                      <text class="value">￥{{item.price}}</text>
                    </view>
                  </view>
                </view>
                
                
              </view>
            </template>
          </uv-waterfall>
        
       <uv-load-more v-if="isShowListloading" :status="status"
         :marginTop="30" dashed line />
        
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
    computed:{
       isShowToTop(){
         return this.myOldScrollPosition >= 150 
       }
    },
    methods: {
      chooseAddArr(){
        let arr = []
        this.radios.forEach((item,index) => {
          if(item.checked) arr.push(index)
        })
        return arr
      },
      ToShopDetail(item){
        uni.setStorageSync('shopdetail',item)
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
        this.$nextTick(()=> {
          this.myScrollPosition = 0
        });
        setTimeout(() => this.scrollPullDown(),500)
        console.log('old  ',this.myOldScrollPosition);
        console.log('new   ',this.myScrollPosition);
      },
      getShopList(){
        if(this.chooseAddArr().length == 0){
          setTimeout(()=>{
            this.isRefresh = false
            this.$refs.message.show({
              type: 'warning',
              msg: '查询不到物品,请选择地区吧',
            })
            },100)
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
          console.log('商品请求返回值',res.data);
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
          
          this.list = [...this.list,...res.data.records]
          this.isRefresh = false
          this.isShowListloading = false
        })
      },
      scrollPullDown() {
        if (this.isRefresh == true) return
        this.isRefresh = true
        this.pageNum = 1
        this.list = []
        this.list1 = []
        this.list2 = []
        this.getShopList()
      },
      scrollDown() {
        // TODO 分页后端已经写好了 明天完善下滑分页加载的动画
        if(this.list.length == this.pagetotal){
          this.isShowListloading = true
          this.status = 'nomore'
        }
        if(this.list.length < this.pagetotal){
          this.pageNum++
          this.isShowListloading = true
          this.getShopList()
        }
        console.log('滑动到底部了');
      },
      myonload() {
        this.getShopList()
      },
      // 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
      changeList(e) {
        console.log(e);
        // console.log('这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列', e);
        this[e.name].push(e.value);

      },
      checkboxClick(index) {
        this.radios[index].checked = !this.radios[index].checked
        this.scrollPullDown()
      },
      toSearch() {
        console.log('点击搜索框');
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

  .waterfall-item {
    overflow: hidden;
    margin-top: 20rpx;
    border-radius: 20rpx;
    background-color: white;
    background: #ebe6e6;
    box-shadow:  5rpx 5rpx 10rpx #bab6b6,
                 -5rpx -5rpx 10rpx #ffffff;
    // display: flex;
    // flex-direction: column;

    .waterfall-item__image {
      padding-bottom: 10rpx;
      background-color: #fff;
    }
  }

  .waterfall-item__ft {
    padding: 20rpx;
    padding-top: 0;
    background: #fff;

    &__title {
      margin-bottom: 10rpx;
      line-height: 48rpx;
      font-weight: 700;

      .value {
        font-size: 32rpx;
        color: #303133;
      }
    }

    &__desc .value {
      font-size: 32rpx;
      font-weight: bold;
      color: #F26666;
    }

    &__btn {
      padding: 10px 0;
    }
  }
</style>