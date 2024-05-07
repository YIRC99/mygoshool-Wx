<template>
  <view>
    
    <uv-popup ref="popup" mode="bottom" round="50rpx" @maskClick="closePopup">
      <view class="popup-box">
        <scroll-view scroll-y="true" style="height: 62vh; background-color: #ffffff;" show-scrollbar="true">
          <view class="top-box" @click="ToUserInfo">
            <view class="left">
              <image :src="avahttp + currentOrder.createUserInfo.avatar" mode=""></image>
            </view>
            <view class="middle">
              <view class="" style="line-height: 50rpx;">用户名称: {{currentOrder.createUserInfo.username}}
              </view>
              <!-- <view class="" style="line-height: 50rpx;">拼车次数</view> -->
            </view>
            <view class="right">
            </view>
          </view>
          <view class="my-middle-box">
            <uni-section title="出发地点" type="line" titleFontSize="36rpx">
              <template v-slot:right v-if="currentOrder.startdatetime != ''">
                出发时间 {{currentOrder.startdatetime}}
              </template>
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.startaddressall}}
            </view>
            <uni-section title="目标地点" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.endaddressall}}
            </view>
            <view class="my-text-box2">
              <view class="left">
                <view class="">当前人数:<text class="my-text-box2-t"> {{currentOrder.currentperson}}
                  </text>人</view>
                <view class="">缺少人数:<text class="my-text-box2-t"> {{currentOrder.lackperson}} </text>人
                </view>
              </view>
              <view class="right">
                <view class="" v-if="currentOrder.isbefore == 1">最大提前时间:<text
                    class="my-text-box2-t">{{hoursTominute(currentOrder.beforetime) }}</text>分钟
                </view>
                <view class="" v-if="currentOrder.isbefore != 1">最大提前时间:<text class="my-text-box2-t">0</text>分钟</view>
                <view class="" v-if="currentOrder.isafter == 1">最大延后时间:<text
                    class="my-text-box2-t">{{hoursTominute(currentOrder.aftertime)}}</text>分钟</view>
                <view class="" v-if="currentOrder.isafter != 1">最大延后时间:<text class="my-text-box2-t">0</text>分钟</view>
              </view>
            </view>
            <uni-section title="备注" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.remark}}
            </view>
          </view>
          <view class="down-box" v-if="user.openid != currentOrder.createUserInfo.openid">
            <button class="btn-grad" @click="showUploadWxImg">接受拼车</button>
          </view>
        </scroll-view>
      </view>
    </uv-popup>
    
    
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    name:"myOrderDetailPopup",
    props:{
      currentOrder:{
        default: {},
        type: Object
      },
      isToUserInfo:{
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        popupShow: false,
        user: {}
      };
    },
    created() {
      this.user = uni.getStorageSync('user')
    },
    methods:{
      // 弹出popup
      clickCard(order,userinfo) {
        console.log('组件 点击了卡片当前选中改变了', this.currentOrder);
        this.$refs.popup.open()
        this.$emit('myPopupShow',true)
        this.popupShow = true
      },
      ToUserInfo() {
        if(this.isToUserInfo)
          uni.navigateTo({
            url: '/subpkg/userinfo?userid=' + this.currentOrder.createUserInfo.userid +
             '&openid=' + this.currentOrder.createUserInfo.openid
          })
      },
      closePopup() {
        this.popupShow = false
        this.$emit('myPopupShow',false)
        this.$refs.popup.close()
      },
      showUploadWxImg(){
        this.$emit('myShowUploadWxImg')
      }
    }
  }
</script>

<style lang="scss">
  .popup-box {
    height: 62vh;
    width: 100%;
    padding-top: 50rpx;
    display: flex;
    flex-direction: column;

    .my-middle-box {
      width: 100%;
      border-radius: 0;

      .my-text-box {
        background-color: #ffffff;
        font-size: 30rpx;
        padding: 20rpx 30rpx;
        line-height: 42rpx;
        color: #3d3d3d;
      }

      .my-text-box2 {
        display: flex;
        align-items: center;
        margin-left: 30rpx;
        justify-content: space-between;
        margin-top: 20rpx;
        line-height: 50rpx;

        .my-text-box2-t {
          font-weight: bold;
          margin: 0 10rpx;
        }

        .right {
          margin-right: 30rpx;
        }
      }


    }

    .down-box {
      height: 130rpx;

      .btn-grad {
        background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
        margin: 10px;
        // padding: 15px 45px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20px #eee;
        border-radius: 10px;
        display: block;
        width: 350rpx;
        height: 80rpx;
        line-height: 80rpx;
        position: absolute;
        right: 30rpx;
        margin-bottom: 50rpx;
      }

      .btn-grad:hover {
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
      }
    }

    .top-box {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      padding: 30rpx;
      padding-bottom: 40rpx;
      // border-bottom: 1px solid #c5c5c5;
      color: black;

      .left {
        image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .middle {
        font-size: 36rpx;
        margin-left: 40rpx;
      }

      .right {
        position: absolute;
        right: 40rpx;

        image {
          width: 30rpx;
          height: 30rpx;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 10rpx;
          margin-top: 10rpx;
        }
      }


    }


  }

</style>