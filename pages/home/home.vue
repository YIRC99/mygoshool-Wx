<template>
  <view class="page">

    <myAffiche></myAffiche>
    
    <view class="mytable">
      
      <uv-tabs :list="list" :lineWidth="40" :lineHeight="6" @click="change" :current="currentIndex" ></uv-tabs>
      
      <view class="mytable-rili" @click="openCalendars">
        <image class="mytable-rili-img" src="../../static/rili.png" mode=""></image>
        <view class="mytable-rili-text" v-show="list[currentIndex].time != ''">{{list[currentIndex].time}}
        </view>
      </view>
    </view>
    
    <uv-calendars title="选择日期" ref="calendars" @close="cancelCalendars" @confirm="chooseDateConfirm" />

    <scroll-view scroll-y="true" style="height: 75vh; " :refresher-triggered="isRefresh" @scrolltolower="scrollDown"
      @refresherrefresh="scrollPullDown" refresher-enabled>

      <view class="" v-show="currentIndex == 0">
        
        <myEmppty :isShow="newSchoolList.length == 0" Text="暂时没有拼车订单 快快发布一个吧"></myEmppty>
        
        <myCarOrder :orderList="newSchoolList" @clickOrderItem="clickCard" @notLoign="notlogin"></myCarOrder>
 
        
        <uv-load-more v-if="list[currentIndex].isShowListloading" :fontSize="30" :status="list[currentIndex].status" :marginTop="10"
          :marginBottom="20" dashed line />
        <view class="" style=" height: 60rpx;"></view>
      </view>

      <view class="" v-show="currentIndex == 1">
        <myEmppty :isShow="oldSchoolList.length == 0" Text="暂时没有拼车订单 快快发布一个吧"></myEmppty>
        
        <myCarOrder :orderList="oldSchoolList" @clickOrderItem="clickCard" @notLoign="notlogin"></myCarOrder>
        
        <uv-load-more v-if="list[currentIndex].isShowListloading" :fontSize="30" :status="list[currentIndex].status" :marginTop="10"
          :marginBottom="20" dashed line />
        <view class="" style=" height: 60rpx;"></view>
      </view>

      <view class="" v-show="currentIndex == 2">
        <myEmppty :isShow="otherAddressList.length == 0" Text="暂时没有拼车订单 快快发布一个吧"></myEmppty>
        
        <myCarOrder :orderList="otherAddressList" @clickOrderItem="clickCard" @notLoign="notlogin"></myCarOrder>
        
        
        <uv-load-more v-if="list[currentIndex].isShowListloading" :fontSize="30" :status="list[currentIndex].status" :marginTop="10"
          :marginBottom="20" dashed line />
        <view class="" style=" height: 60rpx;"></view>
      </view>

    </scroll-view>
    
    <myOrderDetailPopup ref="myorderdetailpopup" :currentOrder="currentOrder" :isToUserInfo="true" @myPopupShow="myPopupShow" @myShowUploadWxImg="showUploadWxImg" ></myOrderDetailPopup>
    

    <uv-popup ref="receivePopup" mode="center" @maskClick="closeReceivePopup"
      custom-style="height: 200rpx;border-radius: 30rpx; width: 80vw; height: 40vh;" :close-on-click-overlay="false">
      <view class="receivePopup-box">
        <view class="" style="display: flex;justify-content: center;align-items: center;">
          <image class="titleImg" src="../../static/succes1.png" mode="widthFix"></image>
        </view>
        <view>长按识别二维码快速加好友</view>
        <view class="receivePopup-box-img" @click="viewWxImg">
          <image v-if="currentOrder.wechatImg != ''" :src="QRttp+ currentOrder.wechatImg" :show-menu-by-longpress="true"
            style="width: 200rpx; height: 200rpx;" mode=""></image>
        </view>
        <view v-if="currentOrder.wechataccount != ''">对方微信: {{currentOrder.wechataccount}}</view>
        <view v-if="currentOrder.phonenumber != ''">对方手机号: {{currentOrder.phonenumber}}</view>
        <view>关闭后可在历史拼车中继续查看</view>
        <view class="down-box">
          <button class="btn-grad" @click="copyWx">确定</button>
        </view>
      </view>
    </uv-popup>

    <myAdd v-show="!popupShow" toPagePath="/subpkg/addCarorder"></myAdd>

    <quick-message ref="message"></quick-message>

    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>

    <uv-modal ref="modal" title="添加联系方式让对方也可以联系你吧" showCancelButton :closeOnClickOverlay="false" @confirm="confirmWxImg"
      @cancel="clearWxImg">

      <myupload ref="myWxUpload" @onChange="myonChange"></myupload>

    </uv-modal>
  
  
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    data() {
      return {
        fileList1: [],
        isLoading: false,
        oneRefresh: false, // 页面是否有过第一次刷新
        isRefresh: false,
        popupShow: false,
        list: [{
          name: '濂溪校区',
          time: '',
          pageNum: 1,
          pagetotal: 0,
          isShowListloading: false,
          status: 'loading'
        }, {
          name: '鹤问湖校区',
          time: '',
          pageNum: 1,
          pagetotal: 0,
          isShowListloading: false,
          status: 'loading'
        }, {
          name: '其他',
          time: '',
          pageNum: 1,
          pagetotal: 0,
          isShowListloading: false,
          status: 'loading'
        }],
        currentIndex: 0,
        orderList: [],
        newSchoolList: [],
        oldSchoolList: [],
        otherAddressList: [],
        currentOrder: {
          createUserInfo: {
            username: '',
            userphone: '',
            userwx: ''
          },
          phonenumber: '',
          wechataccount: '',
          orderid: '',
          wechatImg: '',
          startdatetime: ''
        },
        pageNum: 1,
        pageSize: 5,
        pagetotal: 0,
        info: {}
      };
    },
    created() {
      this.info = uni.getStorageSync('user')
    },
    mixins: [mixin],
    methods: {

      myPopupShow(e){
        this.popupShow = e
      },
      myonChange(e) {
        console.log('子组件上传的回调', e);
        this.fileList1 = e
      },
      ToUserInfo() {
        uni.navigateTo({
          url: '/subpkg/userinfo?userid=' + this.currentOrder.createUserInfo.userid + '&openid=' + this.currentOrder.createUserInfo.openid
        })
      },
      confirmWxImg() {
        if (this.fileList1.length == 0) {
          this.$refs.message.show({
            type: 'error',
            msg: '请上传图片后确定',
          })
          return
        }
        if ("success" != this.fileList1[0].status) {
          this.$refs.message.show({
            type: 'error',
            msg: '请图片上传成功后确定',
          })
          return
        }

        this.receiveOrder()
      },
      clearWxImg() {
        this.fileList1 = []
        this.$refs.myWxUpload.fileList1Empty()
      },
      viewWxImg() {
        let img = this.QRttp + this.currentOrder.wechatImg
        uni.previewImage({
          urls: [img]
        })
      },
      deleteArrById(id) {
        if (this.currentIndex == 0) {
          for (var i = 0; i < this.newSchoolList.length; i++) {
            if (this.newSchoolList[i].orderid == id) {
              this.newSchoolList.splice(i, 1)
              break
            }
          }
        } else if (this.currentIndex == 1) {
          for (var i = 0; i < this.oldSchoolList.length; i++) {
            if (this.oldSchoolList[i].orderid == id) {
              this.oldSchoolList.splice(i, 1)
              break
            }
          }
        } else if (this.currentIndex == 2) {
          for (var i = 0; i < this.otherAddressList.length; i++) {
            if (this.otherAddressList[i].orderid == id) {
              this.otherAddressList.splice(i, 1)
              break
            }
          }
        }
      },
      chooseDateConfirm(e) {
        console.log(e.fulldate);
        this.list[this.currentIndex].time = e.fulldate
        console.log('this.list[this.currentIndex].time', this.list[this.currentIndex].time);
        console.log('点击确定 筛选日期');
        this.scrollPullDown()
      },
      cancelCalendars() {
        console.log('点击取消 清空日期');
        this.list[this.currentIndex].time = ''
        this.scrollPullDown()
      },
      openCalendars() {
        this.$refs.calendars.open();
      },
      copyWx() {
        console.log('不复制了 直接关闭');
        this.$refs.receivePopup.close()
        this.closeReceivePopup()
      },
      closeReceivePopup() {
        this.popupShow = false
      },
      showUploadWxImg() {
        let key = uni.getStorageSync('user')
        if (key == null || key == '') {
          this.$refs.message.show({
            type: 'error',
            msg: '请登录后再接受吧',
          })
          return
        }
        this.$refs.modal.open();
      },
      receiveOrder() {
        let user = uni.getStorageSync('user')
        this.isLoading = true
        console.log(this.fileList1);
        this.post({
          url: 'carshareorder/receive',
          data: {
            orderid: this.currentOrder.orderid,
            receiveuserid: user.openid,
            createuserid: this.currentOrder.createuserid,
            receiveUserWechatImg: this.fileList1[0].resWximg
          }
        }).then(res => {
          console.log(res);
          this.clearWxImg()
          
          if(!this.returnCodeHandle(res.code,'订单已被接受或失效')){
            this.popupShow = false
            this.isLoading = false
            this.$refs.myorderdetailpopup.closePopup()
            this.scrollPullDown()
            return
          }
       
       
          this.isLoading = false
          this.scrollPullDown()
          this.$refs.myorderdetailpopup.closePopup()
          this.$refs.receivePopup.open()
        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
            iconSize: 16,
          })
          return
        })

      },
      getOrderList(isPullDown = true) {
        if (isPullDown) this.list[this.currentIndex].pageNum = 1

        this.post({
          url: 'carshareorder/page',
          data: {
            pageNum: this.list[this.currentIndex].pageNum,
            pageSize: this.pageSize,
            pageDate: this.list[this.currentIndex].time,
            startAddName: this.list[this.currentIndex].name
          }
        }).then(res => {
          console.log(res.data);
          if (!this.returnCodeHandle(res.code)) {
            this.isRefresh = false
            return
          }
          this.list[this.currentIndex].pagetotal = res.data.total

          res.data.records.forEach(item => {
            item.createat = this.formatDateTime(item.createat)
            item.startdatetime = this.formatDateTime(item.startdatetime)
            // 如果目的地是我们的当前的选择地址tab 
            if(item.endaddressall.indexOf(this.list[this.currentIndex].name) != -1){
              item.isReturn = true
            }else{
              item.isReturn = false
            }
            // if (item.startaddressall.indexOf('濂溪校区') != -1) {
            //   item.startaddress = '九职大' + item.startaddress.slice(6, 9999)
            // } else if (item.startaddressall.indexOf('鹤问湖校区') != -1) {
            //   item.startaddress = '九职大' + item.startaddress.slice(6, 9999)
            // }
          })
          // 下拉刷新 跟 触底分页加载时不同的
          if (isPullDown) {
            if (this.currentIndex == 0) {
              this.newSchoolList = []
              this.newSchoolList = res.data.records
            } else if (this.currentIndex == 1) {
              this.oldSchoolList = []
              this.oldSchoolList = res.data.records
            } else if (this.currentIndex == 2) {
              this.otherAddressList = []
              this.otherAddressList = res.data.records
            }
          } else {
            console.log('获取信息是的方式是触底分页加载');
            if (this.currentIndex == 0) {
              this.newSchoolList = [...this.newSchoolList, ...res.data.records]
            } else if (this.currentIndex == 1) {
              this.oldSchoolList = [...this.oldSchoolList, ...res.data.records]
            } else if (this.currentIndex == 2) {
              this.otherAddressList = [...this.otherAddressList, ...res.data.records]
            }
          }


          this.isRefresh = false
          this.list[this.currentIndex].isShowListloading = false
          console.log('下拉刷新结束了');
        }).catch(err => {
          console.log('home page is', err);
          this.isRefresh = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
            iconSize: 16,
          })
          return
        })

      },
      scrollPullDown() {
        // console.log('下拉刷新了');
        if (this.isRefresh == true) return
        this.isRefresh = true
        // 下拉刷新的时候调用获取数据的方法 根据index带上不同的参数
        this.getOrderList()
      },
      scrollDown() {
        console.log('滚动条到了底部 当前的indedx为', this.currentIndex);
        const currentList = this.list[this.currentIndex];
        const ArrObj = {
          0 : 'newSchoolList',
          1 : 'oldSchoolList',
          2 : 'otherAddressList'
        }
        
        if(this[ArrObj[this.currentIndex]].length < this.pageSize) return
        
        if(this[ArrObj[this.currentIndex]].length >= currentList.pagetotal){
          currentList.isShowListloading = true
          currentList.status = 'nomore'
          // this.$refs.message.show({
          //   type: 'default',
          //   msg: '已经到底了, 没有更多数据啦',
          // })
          return
        }

        currentList.isShowListloading = true
        currentList.pageNum++
        this.getOrderList(false)
      },
      clickCard(order) {
        this.currentOrder = order
        console.log('点击了卡片当前选中改变了', this.currentOrder);
        // this.$refs.popup.open() // -----------------
        this.$refs.myorderdetailpopup.clickCard()
        this.popupShow = true
      },
      change(e) {
        console.log(e);
        this.currentIndex = e.index

        if (this.currentIndex == 0) {
          if (this.newSchoolList.length !== 0) return
          this.scrollPullDown()
        } else if (this.currentIndex == 1) {
          if (this.oldSchoolList.length !== 0) return
          this.scrollPullDown()
        } else if (this.currentIndex == 2) {
          if (this.otherAddressList.length !== 0) return
          this.scrollPullDown()
        }
      },
      myonshow() {
        uni.$once('addUpdate', () => {
          // console.log('监听到了 添加之后 返回页面');
          this.scrollPullDown()
        })
        // console.log('拼车页面的myonshow方法触发了');
        this.simulateSwipeDown()
      },
      simulateSwipeDown() {

        if (!this.oneRefresh) {
          this.oneRefresh = true
          console.log('首次进入页面 index 0 页面 自动下拉刷新',this.currentIndex);
          this.change({
            index: 0,
            name: '濂溪校区'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 130rpx;
  }

  .myicon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 30rpx;
  }

  .receivePopup-box-img {
    image {
      border: 1px solid #ebebeb;
      border-radius: 30rpx;
      overflow: hidden;
    }
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

      .mytable-rili-text {
        background-color: #CCCCCC;
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
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;

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


  .my-car-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .car-left {
      display: flex;
      align-items: center;
      margin: 15rpx 0;
      font-size: 32rpx;

      text {
        width: 75%;
      }

      .my-icon {
        width: 50rpx;
        height: 50rpx;
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



</style>