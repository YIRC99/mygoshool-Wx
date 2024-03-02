<template>
  <view class="page">

    <view class="" style="background-color: #fff; padding-bottom: 5rpx;">
      <view class="" class="u-line-2 mynative">
        <text>社区公告</text>
        {{noticeText}}
      </view>
    </view>

    <view class="mytable">
      <u-tabs :list="list" style="background-color: #F6F5F6;" :height="160" :font-size="40" :is-scroll="false"
        bar-height="60" bar-width="400" :current="currentIndex" @change="change">
      </u-tabs>
      <view class="mytable-rili" @click="openCalendars">
        <image class="mytable-rili-img" src="../../static/rili.png" mode=""></image>
        <view class="mytable-rili-text" v-show="currentDate != ''">{{currentDate}}</view>
      </view>
    </view>
   
    <uv-calendars title="选择日期" ref="calendars" @close="cancelCalendars" @confirm="chooseDateConfirm" />

    <scroll-view scroll-y="true" style="height: 75vh; " :refresher-triggered="isRefresh" @scrolltolower="scrollDown"
      @refresherrefresh="scrollPullDown" refresher-enabled>

      <view class="" v-show="currentIndex == 0">
        <u-empty text="暂时没有拼车订单 快快发布一个吧 (๑>؂<๑）" v-if="newSchoolList.length == 0" mode="order"></u-empty>
        <uni-card v-for="(item,index) in newSchoolList" :key="index"
          :title="subYear(item.startdatetime) + ' 出发'" thumbnail='/static/logo.png'
          @click="clickCard(item)">
          <view class="my-car-box">
            <view class="" style="width: 80%;" >
              <view class="car-left">
                <img class="my-icon" src="/static/upCar.png" />
                <text class="u-line-1">{{item.startaddress}}</text>
              </view>
              <view class="car-left">
                <img class="my-icon" src="/static/downCar.png" />
                <text class="u-line-1">{{item.endaddress}}</text>
              </view>
            </view>
            <view class="">
              <view class="car-right">
                <text >提前</text>
                <image v-if="item.isbefore == 1" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
              <view class="car-right">
                <text>延后</text>
                <image v-if="item.isafter == 1" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
            </view>
          </view>

          <text class="u-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
        </uni-card>

      </view>

      <view class="" v-show="currentIndex == 1">
        <u-empty text="暂时没有拼车订单 快快发布一个吧 (๑>؂<๑）" v-if="oldSchoolList.length == 0" mode="order"></u-empty>
        <uni-card v-for="(item,index) in oldSchoolList" :key="index"
          :title="subYear(item.startdatetime) + ' 出发'" thumbnail='/static/logo.png'
          @click="clickCard(item)">
          <view class="my-car-box">
            <view class="" style="width: 80%;">
              <view class="car-left">
                <img class="my-icon"src="/static/upCar.png"/>
                <text class="u-line-1">{{item.startaddress}}</text>
              </view>
              <view class="car-left">
                <img class="my-icon" src="/static/downCar.png"/>
                <text class="u-line-1">{{item.endaddress}}</text>
              </view>
            </view>
            <view class="">
              <view class="car-right">
                <text >提前</text>
                <image v-if="item.isbefore == 1" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
              <view class="car-right">
                <text>延后</text>
                <image v-if="item.isafter == 1" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
            </view>
          </view>
        
          <text class="u-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
        </uni-card>
      </view>
      
      <view class="" v-show="currentIndex == 2">
        <u-empty text="暂时没有拼车订单 快快发布一个吧 (๑>؂<๑）" v-if="otherAddressList.length == 0" mode="order"></u-empty>
        <uni-card v-for="(item,index) in otherAddressList" :key="index"
          :title="subYear(item.startdatetime) + ' 出发'" thumbnail='/static/logo.png'
          @click="clickCard(item)">
          <view class="my-car-box">
            <view class="" style="width: 80%;">
              <view class="car-left">
                <img class="my-icon"src="/static/upCar.png"/>
                <text class="u-line-1">{{item.startaddress}}</text>
              </view>
              <view class="car-left">
                <img class="my-icon" src="/static/downCar.png"/>
                <text class="u-line-1">{{item.endaddress}}</text>
              </view>
            </view>
            <view class="">
              <view class="car-right">
                <text >提前</text>
                <image v-if="item.isbefore == 1" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
              <view class="car-right">
                <text>延后</text>
                <image v-if="item.isafter == 1" src="../../static/true.png" mode=""></image>
                <image v-else src="../../static/false.png" mode=""></image>
              </view>
            </view>
          </view>
        
          <text class="u-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
        </uni-card>
      </view>

    </scroll-view>

    <uv-popup ref="popup" mode="bottom" round="50rpx" @maskClick="closePopup">
      <view class="popup-box">
        <scroll-view scroll-y="true" style="height: 62vh; background-color: #ffffff;" show-scrollbar="true">
          <view class="top-box">
            <view class="left">
              <image src="../../static/logo.png" mode=""></image>
            </view>
            <view class="middle">
              <view class="" style="line-height: 50rpx;">用户名称: {{currentOrder.createUserInfo.username}}</view>
              <view class="" style="line-height: 50rpx;">拼车次数</view>
            </view>
            <view class="right">
            </view>
          </view>
          <view class="my-middle-box">
            <uni-section title="出发地点" type="line" titleFontSize="36rpx">
              <template v-slot:right>
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
                <view class="">当前人数:<text class="my-text-box2-t"> {{currentOrder.currentperson}} </text>人</view>
                <view class="">缺少人数:<text class="my-text-box2-t"> {{currentOrder.lackperson}} </text>人</view>
              </view>
              <view class="right">
                <view class="" v-if="currentOrder.isbefore == 1">最大提前时间:<text class="my-text-box2-t">{{hoursTominute(currentOrder.beforetime) }}</text>分钟</view>
                <view class="" v-if="currentOrder.isbefore != 1">最大提前时间:<text class="my-text-box2-t">0</text>分钟</view>
                <view class="" v-if="currentOrder.isafter == 1">最大延后时间:<text class="my-text-box2-t">{{hoursTominute(currentOrder.aftertime)}}</text>分钟</view>
                <view class="" v-if="currentOrder.isafter != 1">最大延后时间:<text class="my-text-box2-t">0</text>分钟</view>
              </view>
            </view>
            <uni-section title="备注" type="line" titleFontSize="36rpx">
            </uni-section>
            <view class="my-text-box">
              {{currentOrder.remark}}
            </view>
          </view>
          <view class="down-box">
            <button class="btn-grad" @click="receiveOrder">接受拼车</button>
          </view>
        </scroll-view>
      </view>
    </uv-popup>

    <uv-popup ref="receivePopup" mode="center" @maskClick="closeReceivePopup"
      custom-style="height: 200rpx;border-radius: 30rpx; width: 80vw; height: 40vh;">
      <view class="receivePopup-box">
        <view class="" style="display: flex;justify-content: center;align-items: center;">
          <image class="titleImg" src="../../static/succes1.png" mode="widthFix"></image>
        </view>
        <view>友好交流互帮互助</view>
        <view>对方微信: {{currentOrder.userWx}}</view>
        <view>关闭后可在历史拼车中继续查看</view>
        <view class="down-box">
          <button class="btn-grad" @click="copyWx">确定(自动复制联系方式)</button>
        </view>
      </view>
    </uv-popup>

    <view class="addicon" v-show="!popupShow" @click="toAddOrder">
      <image src="/static/add.png" mode=""></image>
    </view>

<quick-message ref="message"></quick-message>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        oneRefresh: false, // 页面是否有过第一次刷新
        isRefresh: false,
        popupShow: false,
        noticeText: '编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。',
        list: [{
          name: '濂溪校区'
        }, {
          name: '鹤问湖校区'
        },{
          name: '其他'
        }],
        currentIndex: 0,
        orderList: [],
        newSchoolList: [],
        oldSchoolList: [],
        otherAddressList:[],
        currentOrder: {
          createUserInfo:{
            username: ''
          }
        },
        pageNum: 1,
        pageSize: 10,
        pagetotal: 0,
        currentDate: ''
      };
    },
    methods: {
      chooseDateConfirm(e){
        console.log(e.fulldate);
        this.currentDate = e.fulldate
        this.scrollPullDown()
      },
      cancelCalendars(){
        this.currentDate = ''
        this.scrollPullDown()
      },
      openCalendars(){
        this.$refs.calendars.open();
      },
      copyWx() {
        uni.setClipboardData({
          data: this.currentOrder.userWx,
          complete: (res) => {
            // console.log('点击复制的结果',res);
            this.$refs.receivePopup.close()
            this.closeReceivePopup()
          }
        })
      },
      closeReceivePopup() {
        this.popupShow = false
        console.log(this.popupShow);
      },
      receiveOrder() {
        this.$refs.popup.close()
        this.$refs.receivePopup.open()
      },
      
      getOrderList(){
        this.post({
          url: 'carshareorder/page',
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            pageDate: this.currentDate,
            startAddName: this.list[this.currentIndex].name
          }
        }).then(res => {
          console.log(res);
          if(res.code != 200){
            this.$refs.message.show({
              type: 'error', //String 默认default
              msg: '网络开了点小差,请稍候重试吧', //String 显示内容 *
              iconSize: 16, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
            })
            return
          }
          res.data.records.forEach(item => {
            if(item.startaddressall.indexOf('濂溪校区') != -1){
              item.startaddress = '九职大' + item.startaddress.slice(6,9999)
            }else if(item.startaddressall.indexOf('鹤问湖校区') != -1){
              item.startaddress = '九职大' + item.startaddress.slice(6,9999)
            }
          })
          
          if(this.currentIndex == 0){
            this.newSchoolList = []
            this.newSchoolList = res.data.records
          }else if(this.currentIndex == 1){
            this.oldSchoolList = []
            this.oldSchoolList = res.data.records
          }else if(this.currentIndex == 2){
            this.otherAddressList = []
            this.otherAddressList = res.data.records
          }
            
          
          this.isRefresh = false
          console.log('下拉刷新结束了');
        })
        
      },
      scrollPullDown() {
        console.log('下拉刷新了');
        if (this.isRefresh == true) return
        this.isRefresh = true
        // 下拉刷新的时候调用获取数据的方法 根据index带上不同的参数
        this.getOrderList()
      },
      scrollDown() {
        console.log('滚动条到了底部 当前的indedx为',this.currentIndex);
      },
      toAddOrder() {
        uni.navigateTo({
          url: '/subpkg/addCarorder'
        });
      },
      clickCard(order) {
        this.currentOrder = order
        console.log(this.currentOrder);
        this.$refs.popup.open()
        this.popupShow = true
      },
      closePopup() {
        this.popupShow = false
      },
      change(e) {
        this.currentIndex = e.index
        console.log('首次进入页面 自动下拉刷新,change',e,this.newSchoolList.length);
        if(this.currentIndex == 0){
          if(this.newSchoolList.length !== 0) return 
          this.scrollPullDown()
        }else if(this.currentIndex == 1){
          if(this.oldSchoolList.length !== 0) return 
          this.scrollPullDown()
        }else if(this.currentIndex == 2){
          if(this.otherAddressList.length !== 0) return 
          this.scrollPullDown()
        }
      },
      myonshow() {
        console.log('myonshow');
        this.simulateSwipeDown()
      },
      simulateSwipeDown() {
        console.log('首次进入页面 自动下拉刷新');
        if (!this.oneRefresh) {
          this.oneRefresh = true
          this.change({index: 0,name: '濂溪校区'})
        }
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 130rpx;
  }

  .mytable {
    position: relative;
    height: 90rpx;

    .mytable-rili {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      right: 50rpx;
      top: 20rpx;
      height: 100rpx;
      width: 100rpx;
      
      .mytable-rili-text{
        background-color: #81d9d8;
        height: 30rpx;
        width: 120rpx;
        font-size: 22rpx;
        padding: 5rpx;
        border-radius: 10rpx;
        margin-top: 5rpx;
        
      }

      .mytable-rili-img {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }


  .receivePopup-box {
    background-color: red;
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;

    .down-box {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 20rpx;
      left: 0;
      right: 0;
      margin: 0 auto;

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
        width: 450rpx;
        height: 80rpx;
        line-height: 80rpx;
      }

      .btn-grad:hover {
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
      }
    }

    .titleImg {

      width: 300rpx;
    }
  }

  .addicon {
    position: fixed;
    top: 1000rpx;
    right: 50rpx;
    z-index: 999;
    background-color: #CCCCCC;
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 60rpx;
      height: 60rpx;
    }
  }

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



  /deep/ .u-tabs__wrapper__nav {
    background-color: #ffffff !important;
  }

  .my-car-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .car-left {
      display: flex;
      align-items: center;
      margin: 15rpx 0;
      font-size: 32rpx;
      text{
        width: 75%;
      }
      .my-icon {
        width: 50rpx;
         height: 50rpx;
        // padding-right: 15rpx;
      }
    }

    .car-right {
      margin-right: 20rpx;
       margin: 15rpx 0;
      display: flex;
      align-items: center;

      image {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 10rpx;

      }
    }
  }


  /deep/ .u-tabs__wrapper__nav__item__text {
    font-size: 40rpx !important;
  }

  .mynative {
    background-color: #FFF6D7;
    border-radius: 10rpx;
    margin: 20rpx;
    padding: 5rpx 10rpx;
    font-size: 30rpx;

    text {
      font-weight: bold;
      color: #B07F29;
      font-size: 33rpx;
      padding: 0 10rpx;
      font-style: italic;
    }
  }
</style>