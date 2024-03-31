<template>
  <view>

    <scroll-view scroll-y="true" style="height: 95vh; background-color: #f7f7f7;" :refresher-triggered="isRefresh"
      @scrolltolower="scrollDown" :scroll-top="myScrollPosition" scroll-with-animation
      @refresherrefresh="scrollPullDown" @scroll="myScroll" refresher-enabled>
      <view class="">

        <myAffiche></myAffiche>

        <view style="position: sticky; top: 0; z-index: 9999; background-color: #fff;">
          <view class="">
            <view class="" @click="clcc">
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

                <view v-for="(item, index) in list1" :key="item.id" @click="ToShopDetail" class="waterfall-item">
                  <view class="waterfall-item__image">
                    <image lazy-load :src="item.image" mode="widthFix" style="width: 100%;"></image>
                  </view>
                  <view class="waterfall-item__ft">
                    <view class="waterfall-item__ft__title">
                      <text class="value uv-line-2">小米t302牙刷刷头全新没有用过小米t302牙刷刷头全新没有用过小米t302牙刷刷头全新没有用过</text>
                    </view>
                    <view class="waterfall-item__ft__desc uv-line-2">
                      <text class="value">￥15</text>
                    </view>
                  </view>
                </view>


              </view>
            </template>
            <!-- 第二列数据 -->
            <template v-slot:list2>
              <!-- 为了磨平部分平台的BUG，必须套一层view -->
              <view>
                <view v-for="(item, index) in list2" :key="item.id" class="waterfall-item">
                  <view class="waterfall-item__image">
                    <image lazy-load :src="item.image" mode="widthFix" style="width: 100%;"></image>
                  </view>
                  <view class="waterfall-item__ft">
                    <view class="waterfall-item__ft__title">
                      <text class="value">{{item.title}}</text>
                    </view>
                    <view class="waterfall-item__ft__desc uv-line-2">
                      <text class="value">{{item.desc}}</text>
                    </view>
                  </view>
                </view>
              </view>
            </template>
          </uv-waterfall>

        </view>

      </view>
    </scroll-view>

    <myAdd toPagePath="/subpkg/addShop"></myAdd>

    <view class="totopBut" v-show="isShowToTop" @click="toTop">
      <image src="/static/toTop.png" mode=""></image>
    </view>
  </view>
</template>

<script>
  import {
    guid
  } from '@/uni_modules/uv-ui-tools/libs/function/index.js'
  export default {
    data() {
      return {
       
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
        columnGap: 10
      };
    },
    computed:{
       isShowToTop(){
         return this.myOldScrollPosition >= 150 
       }
    },
    methods: {
      ToShopDetail(){
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
      scrollPullDown() {
        if (this.isRefresh == true) return
        this.isRefresh = true
        setTimeout(() => {
          console.log('下拉刷新结束了');
          this.isRefresh = false
        }, 1000)
      },
      scrollDown() {
        console.log('滑动到底部了');
      },
      async myonload() {

        const {
          data
        } = await this.getData();
        this.list = data;
        console.log(this.list);
      },

      // 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
      changeList(e) {
        console.log(e);
        // console.log('这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列', e);
        this[e.name].push(e.value);
        // console.log(this.list1);
        // console.log(this.list2);
      },
      checkboxClick(index) {
        this.radios[index].checked = !this.radios[index].checked
      },
      clcc() {
        console.log('aaaaa');
      },
      getData() {
        return new Promise((resolve) => {
          const imgs = [{
              url: 'https://gw.alicdn.com/bao/uploaded/i3/6000000007600/O1CN012IkdIv260r2G6yNga_!!6000000007600-0-sm.jpg_220x10000Q75.jpg_.webp',
            },
            {
              url: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2207895128599/O1CN011GBUo52DOOdhfGVls_!!0-item_pic.jpg_460x460q90.jpg_.webp',
            },
            {
              url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/52043928/O1CN01giln0z1et4b5hnR7F_!!52043928.jpg_460x460q90.jpg_.webp',
            },
            {
              url: 'https://gw.alicdn.com/bao/uploaded/i4/6000000000782/O1CN01AtGt9i1HeCevakODA_!!6000000000782-0-sm.jpg_220x10000Q75.jpg_.webp',
            },
            {
              url: 'https://i2.hdslb.com/bfs/archive/2b8cf3f8a20029ba2b109306b2829661e0e4e609.jpg@672w_378h_1c_!web-home-common-cover.avif',
            },
            {
              url: 'https://gd-hbimg.huaban.com/cff481c8eb5f3d16be10971c043be6d2d18ee6cc201111-66eyS2_fw658webp',
            },
            {
              url: 'https://gd-hbimg.huaban.com/f2d9983597243dca29eff15164ec48ffa9e5f26a1dbd8b-VIFIcg_fw658webp',
            },
            {
              url: 'https://i2.hdslb.com/bfs/archive/231653e9ded606decab8b087636ed857ab0c0f5a.jpg@672w_378h_1c_!web-home-common-cover.avif',
            },
            {
              url: 'https://i2.hdslb.com/bfs/archive/752ffd1d469e40f5b77e81c6e84f768730c0c75e.png@672w_378h_1c_!web-home-common-cover.avif',
            },
            {
              url: 'https://i2.hdslb.com/bfs/archive/3d84f64ec03edaad186865c0f69d737657e5b292.jpg@672w_378h_1c_!web-home-common-cover.avif',
            },
            {
              url: 'https://via.placeholder.com/350x440.png/f56c6c/fff',
            },
            {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }, {
              url: 'https://via.placeholder.com/380x470.png/909399/fff',
            }
          ];
          let list = [];
          const doFn = (i) => {
            const randomIndex = Math.floor(Math.random() * 10);
            return {
              id: guid(),
              allowEdit: i == 0,
              image: imgs[randomIndex].url,
              title: i % 2 == 0 ? `(${this.list.length + i + 1})体验uv-ui框架` :
                `(${this.list.length + i +1})uv-ui支持多平台`,
              desc: i % 2 == 0 ? `(${this.list.length + i + 1})欢迎使用uv-ui，uni-app生态专用的UI框架` :
                `(${this.list.length + i})开发者编写一套代码， 可发布到iOS、Android、H5、以及各种小程序`
            }
          };
          // 模拟异步
          setTimeout(() => {
            for (let i = 0; i < 20; i++) {
              list.push(doFn(i));
            }
            resolve({
              data: list
            });
          }, 200)
        })
      }
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
    padding-bottom: 200rpx;
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
    // display: flex;
    // flex-direction: column;

    .waterfall-item__image {
      margin-bottom: 10rpx;
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