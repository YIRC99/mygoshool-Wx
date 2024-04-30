<template>
  <view>
    <myEmppty :isShow="list.length == 0" :Text="emptyTest" :img-path="require('@/static/shopCar.png')"></myEmppty>
    <uv-waterfall ref="waterfall" v-model="list" :add-time="10" :left-gap="leftGap" :right-gap="rightGap"
      :column-gap="columnGap" @changeList="changeList">
      <!-- 第一列数据 -->
      <template v-slot:list1>
        <!-- 为了磨平部分平台的BUG，必须套一层view -->
        <view>
          
          

          <view v-for="(item, index) in list1" :key="item.id" @click="ToShopDetail(item)" class="waterfall-item">
            
            <view class="mymore" @click.stop="">
              <rudon-rowMenuDotDotDot ref="myRudon" @click.stop=""  :localdata="myoptions" @change="menuAction($event, item)">
              	<image src="../../static/more2.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
              </rudon-rowMenuDotDotDot>
            </view>
            
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
            
            <view class="mymore" @click.stop="">
              <rudon-rowMenuDotDotDot ref="myRudon" @click.stop=""  :localdata="myoptions" @change="menuAction($event, item)">
              	<image src="../../static/more2.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
              </rudon-rowMenuDotDotDot>
            </view>
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


  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    name: "myShopWaterfall",
    props: {
      list: {
        default: [],
        type: Array
      },
      isToUserInfo: {
        default: true,
        type: Boolean
      },
      emptyTest:{
        default: '暂时没有商品出售哦',
        type: String
      }
    },
    data() {
      return {
        list1: [], // 瀑布流第一列数据
        list2: [], // 瀑布流第二列数据
        leftGap: 10,
        rightGap: 10,
        columnGap: 10,
        myoptions:[
            {
            	value: 'update',
            	text: '举报'
            }
        ]
      };
    },
    methods: {
      clearList(){
        this.list1 = []
        this.list2 = []
      },
      menuAction(action, item){
        if (action === '') {
        	return
        }
        console.log(item);
        uni.navigateTo({
          url: '/subpkg/feedback?reportId=' + item.id + '&reportType=' + 2
        })
      },
      ToShopDetail(item) {
        uni.setStorageSync('isToUserInfo',this.isToUserInfo)
        uni.setStorageSync('shopdetail', item)
        uni.navigateTo({
          url: '/subpkg/shopDetail?isToUserInfo' + this.isToUserInfo
        })
      },
      changeList(e) {
        // console.log(e);
        // console.log('这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列', e);
        this[e.name].push(e.value);
      },
    }
  }
</script>

<style lang="scss">
  .mymore {
    -webkit-tap-highlight-color: transparent;
    z-index: 999;
    user-select: none;
    width: 35rpx;
    height: 35rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rpx;
    border-radius: 10rpx;
    background-color: rgba(248,248,248, 0.6);
    image{width: 100%;height: 100%;}
  }
  .waterfall-item {
    position:relative;
    overflow: hidden;
    margin-top: 20rpx;
    border-radius: 20rpx;
    background-color: white;
    background: #ebe6e6;
    box-shadow: 5rpx 5rpx 10rpx #bab6b6,
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