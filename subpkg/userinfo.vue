<template>
  <view class="page">
    <view>
      <view class="">
        <image :src="avahttp + 'back.png'"
          style="width: 100%; height: 450rpx; background-size: 100%;position: absolute; z-index: -1;" mode="">
        </image>
      </view>

      <view class="top-box">
        <view class="left">
          <image class="left-img" :src="avahttp + info.avatar" style="width: 100%; height: 100%;">
          </image>
        </view>
        <view class="middle">
          <view class="" style="font-size: 38rpx;">{{info.username}}</view>
        </view>
      </view>

      <view class="middle-box">
        <uv-tabs :list="list" :scrollable="false" @click="change"></uv-tabs>
        <view class="middle-list" v-show="currentIndex == 0">
          <uv-list >
              <uv-list-item direction="column"v-for="(item,index) in appriseList" :key="index">
                <view class="u-line-3 item-title" slot="header">
                  {{item.apprisedata}}
                </view>
                <view class="" slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
                  <view class="item-subhead">{{item.createat}}</view>
                  <uv-tags :text="'来自的' + item.typeText + '评价'" plain size="mini" shape="circle"></uv-tags>
                </view>
              </uv-list-item>
          </uv-list>
        </view>

      </view>
    </view>

    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>

    <quick-message ref="message"></quick-message>

  </view>
</template>

<script>
  import mylist from '@/components/mylist/mylist.vue'
  import mixin from '@/mixins/mixin.js'
  export default {
    components: {
      mylist
    },
    mixins: [mixin],
    data() {
      return {
        isLogin: false,
        info: {},
        isLoading: false,
        list: [{
          name: '评价',
          badge: {
            value: 0
          }
        }, {
          name: '拼车',
          badge: {
            value: 0
          }
        }, {
          name: '二手',
          badge: {
            value: 0
          }
        },{
          name: '帖子',
          badge: {
            value: 0
          }
        }],
        currentIndex: 0,
        appriseList:[]
      };
    },
    methods: {
      change(e) {
        console.log(e);
        this.currentIndex = e.index
      },
      getAppriseByUserid(){
        this.post({
          url: 'apprise/byuserid',
          data: {
            openid: this.info.openid
          }
        }).then(res => {
          console.log('评价返回的数据',res);
          this.appriseList = res.data
          this.list[0].badge.value = res.data.length
          this.appriseList.forEach(item => {
            item.createat = item.createat.split('T')[0] + ' ' + item.createat.split('T')[1]
            if(item.type = 1)
              item.typeText = '拼车'
            else if(item.type == 2)
              item.typeText = '二手'
            
            
          })
        })
        
      },
      getUserInfoByUserId(userid) {
        this.post({
          url: 'user/byuserid',
          data: {
            userid: userid
          }
        }).then(res => {
          console.log(res);
          if (res.code != 200) {
            this.$refs.message.show({
              type: 'error',
              msg: '获取用户信息失败',
            })
          }
          this.info = res.data
          this.getAppriseByUserid()

        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
          return
        })
      },
    },
    onLoad(e) {
      console.log('userinfo, onload', e.userid);
      this.getUserInfoByUserId(e.userid)
      




    },
    created() {

    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 80rpx;
  }
  
  .middle-list{
    .item-title{
      font-size: 32rpx;
    }
    .item-subhead{
      color: #a9a9a9;
      font-size: 26rpx;
    }
  }

  .middle-box {
    width: 100%;
    background-color: white;
    z-index: 99;
    border-radius: 70rpx 70rpx 0 0;
    padding: 50rpx 0;
    margin-top: 70rpx;
  }

  .top-box {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 200rpx;
    padding-top: 80rpx;
    color: white;

    .left {
      margin-left: 30rpx;
      background-color: #ffffff;
      border-radius: 50%;
      overflow: hidden;
      width: 150rpx;
      height: 150rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #a9a9a9;

      .left-img {
        width: 100rpx;
        height: 100rpx;
      }
    }

    .middle {
      margin-left: 30rpx;
      z-index: 99;
    }

    .right {
      flex: 1;
      text-align: right;

      .right-img {
        margin-right: 20rpx;
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .login-img-a {
    position: absolute;
    width: 100%;
    height: 450rpx;
    background-size: 100%;
    z-index: -1;
  }
</style>

<style lang="scss">
  /deep/ .uni-easyinput__content-input {
    padding-left: 0 !important;
  }

  .txt {
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
  }



  .reg {
    font-size: 28rpx;
    color: #fff;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 50rpx;
    font-weight: bold;
    background: #f5f6fa;
    color: #000000;
    text-align: center;
    margin-top: 30rpx;
  }

  .login-view {
    width: 100%;
    position: relative;
    margin-top: -120rpx;
    background-color: #ffffff;
    border-radius: 8% 8% 0% 0;
  }

  .t-login {
    width: 600rpx;
    margin: 0 auto;
    font-size: 28rpx;
    padding-top: 80rpx;
  }

  .t-login button {
    font-size: 28rpx;
    background: #2796f2;
    color: #fff;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 50rpx;
    font-weight: bold;
  }

  .t-login input {
    height: 90rpx;
    line-height: 90rpx;
    margin-bottom: 50rpx;
    border-bottom: 1px solid #e9e9e9;
    font-size: 28rpx;
  }

  /deep/.uni-input-input {
    font-size: 35rpx !important;
  }

  .my-uni-easyinput {
    height: 90rpx;
    line-height: 90rpx;
    margin-top: 10rpx;
    margin-bottom: 40rpx;
    border-bottom: 1px solid #e9e9e9;
    font-size: 32rpx !important;
    padding: 0;
    padding-left: 0 !important;
  }

  .t-login .t-a {
    position: relative;
  }

  .t-b {
    text-align: left;
    font-size: 42rpx;
    color: #ffffff;
    padding: 130rpx 0 0 70rpx;
    font-weight: bold;
    line-height: 70rpx;
  }

  .t-login .t-c {
    position: absolute;
    right: 22rpx;
    top: 22rpx;
    background: #5677fc;
    color: #fff;
    font-size: 24rpx;
    border-radius: 50rpx;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 25rpx;
  }

  .t-login .t-d {
    text-align: center;
    color: #999;
    margin: 80rpx 0;
  }

  .t-login .t-e {
    text-align: center;
    width: 250rpx;
    margin: 40rpx auto 0;
  }

  .t-login .t-g {
    width: 100%;
  }

  .t-login .t-e image {
    width: 50rpx;
    height: 50rpx;
  }

  .t-login .t-f {
    text-align: center;
    margin: 70rpx 0 0 0;
    color: #666;
  }

  .t-login .t-f text {
    margin-left: 20rpx;
    color: #aaaaaa;
    font-size: 27rpx;
  }

  .t-login .uni-input-placeholder {
    color: #aeaeae;
  }

  .cl {
    zoom: 1;
  }

  .cl:after {
    clear: both;
    display: block;
    visibility: hidden;
    height: 0;
    content: '\20';
  }
</style>