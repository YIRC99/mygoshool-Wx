<template>
  <view class="page">

      
    <uv-tabs :list="list" @click="change" :lineWidth="40" :lineHeight="6" :current="current"></uv-tabs>
    
    <scroll-view scroll-y="true" style="height: 90vh; ">
     
     <view class="" v-show="current == 0">
       <myEmppty :isShow="orderList.length == 0 && isLoading == false"></myEmppty>
     
       <uni-card is-shadow class="mycard" v-for="(item,index) in orderList" :key="index" @click="clickCard(item)">
         <view class="my-uv-tags">
           <view class="mycard-titile">{{subYear(item.startdatetime) + ' 出发'}}</view>
           <uv-tags :text="item.statusText" plain :type="item.statusTag"></uv-tags>
         </view>
         <view class="my-car-box">
           <view class="aaa">
             <view class="car-left">
               <img class="my-icon" src="/static/upCar.png" />
               <text class="uv-line-1" style="width: 350rpx;">{{item.startaddress}}</text>
             </view>
             <view class="car-left">
               <img class="my-icon" src="/static/downCar.png" />
               <text class="uv-line-1" style="width: 350rpx;">{{item.endaddress}}</text>
             </view>
           </view>
           <view class="aaa" @click.stop="openAppraise(index)">
             <button class="btn-grad" v-if="item.createUserAppriseId == null && item.receiveuserid != null">用户评价</button>
           </view>
         </view>
     
     
       </uni-card>
        <view class="" style="height: 30rpx; width: 100%;"></view>
     </view>
     
     <view class="" v-show="current == 1">
       <myEmppty :isShow="shopList.length == 0 && isLoading == false" Text="您还没有发布任何闲置物品哦~"></myEmppty>
       
       <uni-card is-shadow spacing="0" v-for="(item,index) in shopList" :key="index" @click="ToShopDetail(item)">
         <view class="shopItem">
           <view class="left">
             <image :src="shophttp + item.image" lazy-load></image>
           </view>
           <view class="right">
             <view class="my-targ">
               <uv-tags :text="item.statusText" plain :type="item.statusTag"></uv-tags>
             </view>
             
             <view class="title uv-line-2">{{item.detail | formHtmlStr}}</view>
             <view class="subhead">发布时间: {{item.createAt | fromLocalDateTime}}</view>
             <view class="but-box">
               <button class="btn-grad-update" @click.stop="updateShop(item)">编辑</button>
               <button class="btn-grad-delete"  @click.stop="deleteShop(item)">删除</button>
             </view>
           </view>
         </view>
       </uni-card>
       <view class="" style="height: 30rpx; width: 100%;"></view>
     </view>
      
    </scroll-view>
    
    
    <uv-popup ref="popup" mode="bottom" round="50rpx" @maskClick="closePopup">
      <view class="popup-box" 
        :style="(currentOrder.status == 0 || currentOrder.status == 3) == true ? 'height: 50vh' : ''">
        <scroll-view scroll-y="true" style="height: 62vh; background-color: #ffffff; "  show-scrollbar="true">
          <uni-card isShadow v-if="currentOrder.status != 0 && currentOrder.status != 3" @click="clickReceiveCard">
            <view class="my-tag">
              <text>对方信息</text>
            </view>
            <view class="top-box">
              <view class="left">
                <image :src="avahttp + currentOrder.receiveUserInfo.avatar" mode=""></image>
              </view>
              <view class="middle">
                <view class="" style="line-height: 50rpx;">用户名称: {{currentOrder.receiveUserInfo.username}}</view>
                <view class="" style="line-height: 50rpx; display: flex; align-items: center; ">
                  <view class="" style="margin-right: 20rpx;">微信二维码图片</view>
                </view>
              </view>
              <view class="right" @click.stop="clickReceiveImg">
                <image :src="QRttp + currentOrder.receiveUserWechatImg" :show-menu-by-longpress="true"
                  style="width: 100rpx; height: 100rpx; border: 1px solid #ebebeb;" mode=""></image>
              </view>
            </view>
          </uni-card>

          <view class="my-middle-box" v-if="currentOrder != null">
            <uni-section title="出发地点" type="line" titleFontSize="36rpx">
              <template v-slot:right v-if="currentOrder.startdatetime != ''">
                出发时间 {{currentOrder.startdatetime }}
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

          <view class="updateAndDelete">
            <view class="updateAndDelete-item">
              <button class="btn-grad-update" @click="ToUpdateCarOrder" v-show="currentOrder.status == 0">修改</button>
            </view>
            <view class="updateAndDelete-item">
              <button class="btn-grad-delete" @click="deleteOrder">删除</button>
            </view>
          </view>

        </scroll-view>
      </view>
    </uv-popup>

    <uv-popup ref="appraisePopup" mode="center" round="30rpx" closeable @change="emptyApprise"
      :close-on-click-overlay="false">
      <view class="appraisePopup-box">
        <uni-section title="输入评价" type="line" titleFontSize="36rpx">
        </uni-section>
        <uv-textarea v-model="appriseText" maxlength="50" count placeholder="请输入内容"></uv-textarea>
        <button class="btn-grad" @click="upApprise">提交评价</button>
      </view>
    </uv-popup>
    
    <quick-message ref="message"></quick-message>
    <zero-loading v-if="isLoading" type="circle" ></zero-loading>
    
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        isLoading: false,
        appriseText: '',
        list: [{
          name: '拼车'
        }, {
          name: '闲置'
        }],
        current: 0,
        shopList:[],
        orderList: [],
        popupShow: false,
        userinfo: {},
        currentOrder: {
          createUserInfo: {
            username: '',
            userphone: '',
            userwx: ''
          },
          status: 0,
          phonenumber: '',
          wechataccount: '',
          orderid: '',
          receiveUserWechatImg: '',
        },
        clickAppriseReceiveUserId: '',
        clickCurrentListIndex: '',
        clickUpApprise: false,
        currentShop: {
          id: ''
        }
      }
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
      deleteShopRequest(){
        this.isLoading = true
        uni.showLoading({})
        this.post({
          url: 'shop/delete',
          data: {
            id: this.currentShop.id,
            imgs: this.currentShop.imgs
          }
        }).then(res => {
          uni.hideLoading()
          this.isLoading = false
          if (res.code == 200) {
          this.$refs.message.show({
            type: 'success',
            msg: '删除成功',
          })
          setTimeout(() => {
            this.shopList = this.shopList.filter(item => item.id != this.currentShop.id)
          }, 500)
          }else{
            this.$refs.message.show({
              type: 'error',
              msg: '删除失败, 请稍候再试吧',
            })
            return
          }
         
       
        }).catch(err => {
          uni.hideLoading()
          this.isLoading = false
          this.returnCodeHandle(err.code)
        })
        
        
        
      },
      deleteShop(item){
        this.currentShop = item
        let title = '提示'
        let content = '删除之后将无法再查询到数据,确定删除嘛'
        uni.showModal({
         title,
         content,
         success: res => {
           // console.log(res);
           if(res.confirm){
             this.deleteShopRequest(this.currentShop.id)
           }
         }
        })
      },
      updateShop(item){
        // console.log(item);
        uni.setStorageSync('updateShop',item)
        uni.navigateTo({
          url: '/subpkg/addShop?update=true'
        })
      },
      ToShopDetail(item) {
        uni.setStorageSync('shopdetail', item)
        uni.navigateTo({
          url: '/subpkg/shopDetail'
        })
      },
      getUserShop(){
        this.post({
          url: 'shop/byUserId',
          data: {
            openid: this.userinfo.openid
          }
        }).then(res => {
          // console.log('shoplist',res);
          if(res.code == 200){
            this.shopList = res.data
            let currTime = new Date()
            res.data.forEach(i => {
              i.image = i.imgs.split(",")[0]
              i.cancelTime = this.formatDateTime(i.cancelTime)
              if(!this.compareTime(i.cancelTime,currTime)){
                 i.statusText = '已发布'
                 i.statusTag = 'primary'
              }else{
                i.statusText = '已过期'
                i.statusTag = 'info'
              }
             
            })
          }
        }).catch(err => {
          this.isLoading = false
          this.returnCodeHandle(err.code)
        })
        
        
        
      },
      ToUpdateCarOrder() {
        uni.setStorageSync('updateCarOrderId', this.currentOrder.orderid)
        uni.navigateTo({
          url: '/subpkg/updateCarOrder',
        })
      },
      deleteRequest(){
        this.isLoading = true
        uni.showLoading({})
        this.post({
          url: 'carshareorder/delete',
          data: {
            orderid: this.currentOrder.orderid,
            receiveUserWechatImg: this.currentOrder.receiveUserWechatImg,
            wechatImg: this.currentOrder.wechatImg
          }
        }).then(res => {
          uni.hideLoading()
          this.isLoading = false
          // console.log(res);
          if (res.code == 200) {
           this.$refs.message.show({
             type: 'success',
             msg: '删除成功',
           })
           this.$refs.popup.close()
           setTimeout(() => {
             this.orderList = this.orderList.filter(item => item.orderid != this.currentOrder.orderid)
           }, 500)
          }else{
            this.$refs.message.show({
              type: 'error',
              msg: '删除失败, 请稍候再试吧',
            })
            return
          }
        }).catch(err => {
          uni.hideLoading()
          this.isLoading = false
          this.returnCodeHandle(err.code)
        })
        
      },
      deleteOrder() {
        let title = '提示'
        let content
        if(this.currentOrder.statusText == '已接受') content = '删除之后,发布者和接受者方都无法查看到数据了,确定删除嘛'
        else content = '确定删除嘛'
        uni.showModal({
         title,
         content,
         success: res => {
           console.log(res);
           if(res.confirm){
             this.deleteRequest()
           }
         }
        })
      },
      upApprise() {

        if (this.appriseText == '') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请输入评价后再提交吧',
          })
          return
        }
        if (this.clickUpApprise) return
        this.clickUpApprise = true
        this.isLoading = true
        let user = uni.getStorageSync('user')
        this.post({
          url: 'apprise/add',
          data: {
            createuserid: user.openid,
            receiveuserid: this.orderList[this.clickCurrentListIndex].receiveuserid,
            apprisedata: this.appriseText,
            type: 1,
            postId: this.orderList[this.clickCurrentListIndex].orderid,
            OrderCreateUserId: this.orderList[this.clickCurrentListIndex].createuserid,
          }
        }).then(res => {
          // console.log(res);
          this.isLoading = false
          if (res.code != 200) {
            this.clickUpApprise = false
            this.$refs.message.show({
              type: 'error',
              msg: '评价失败, 请稍候再试吧',
            })
            return
          }
          this.$refs.message.show({
            type: 'success',
            msg: '评价成功',
            iconSize: 16,
          })

          setTimeout(() => {
            this.orderList[this.clickCurrentListIndex].status = 2
            this.orderList[this.clickCurrentListIndex].statusText = '已完成'
            this.orderList[this.clickCurrentListIndex].statusTag = 'success'
            this.orderList[this.clickCurrentListIndex].createUserAppriseId = 'defult' // 这个值是错误的 提前填充一下而已
            this.$refs.appraisePopup.close()
          }, 500)
        }).catch(err => {
          // console.log('home page is', err);
          this.clickUpApprise = false
          this.isRefresh = false
          this.returnCodeHandle(err.code)
        })

      },
      emptyApprise() {
        this.clickUpApprise = false
        this.appriseText = ''
      },
      openAppraise(receiveuserid) {
        this.clickCurrentListIndex = receiveuserid
        this.$refs.appraisePopup.open()
      },
      clickReceiveCard() {
        uni.navigateTo({
          url: '/subpkg/userinfo?userid=' + this.currentOrder.receiveUserInfo.userid
        })
      },
      clickReceiveImg() {
        let img = this.QRttp + this.currentOrder.receiveUserWechatImg
        uni.previewImage({
          urls: [img]
        })
      },
      getUserOrder() {
        this.isLoading = true
        
        this.post({
          url: 'carshareorder/getbyuserid',
          data: {
            openid: this.userinfo.openid
          }
        }).then(res => {
          this.isLoading = false
          console.log('获取用户 拼车订单',res);
          
          if(!this.returnCodeHandle(res.code,'请求错误 请稍候重试吧'))return
         
          this.orderList = res.data
          let currTime = new Date().getTime()
          this.orderList.forEach(item => {
            item.createat = this.formatDateTime(item.createat)
            item.startdatetime = this.formatDateTime(item.startdatetime)
            this.updateCarOrderStatus(currTime,item)
            if (item.status == 3) {
              item.statusText = '已过期'
              item.statusTag = 'info'
            } else if (item.createUserAppriseId == null && item.receiveuserid == null) {
              // 自己没有评价 但是没有接受用户id
              item.statusText = '已发布'
              item.statusTag = 'primary'
            } else if (item.receiveuserid != null && item.createUserAppriseId == null) {
              // 已经有接受用户了
              item.statusText = '已接受'
              item.statusTag = 'warning'
            } else if (item.createUserAppriseId != null && item.receiveuserid != null) {
              item.statusText = '已完成'
              item.statusTag = 'success'
            }
          })

        }).catch(err => {
          this.isLoading = false
          this.returnCodeHandle(err.code)
        })



      },
      clickCard(order) {
        this.currentOrder = order
        this.$refs.popup.open()
        this.popupShow = true
      },
      change(e) {
        this.current = e.index
      },
      closePopup() {
        this.popupShow = false
      }
    },
    onLoad() {
      this.userinfo = uni.getStorageSync('user')
      // #ifdef H5
      this.userinfo = JSON.parse(this.userinfo)
      // #endif
      // console.log(this.userinfo);
      this.getUserOrder()
      this.getUserShop()
    },
    onShow() {
      console.log('发布页面 onshow ');
      uni.$once('refreshSendPage',() => {
        console.log('成功 监听到页面刷新');
        this.getUserOrder()
        this.getUserShop()
      })
    },
    destroyed() {
      // console.log('监听页面销毁');
      this.$off('refreshSendPage')
    }
  }
</script>

<style lang="scss">
  .page {
    padding-bottom: 60rpx;
  }
  
  .shopItem{
    display: flex;
    align-items: center;
    align-items: flex-start;
    .left{
      display: flex;
      align-items: center;
      justify-content: center;
      image{
        width: 150rpx;
        height: 150rpx;
        border-radius: 15rpx;
      }
    }
    .right{
      flex: 1;
      margin-left: 20rpx;
      .subhead{
        margin-top: 15rpx ;
      }
      .my-targ{
        position: absolute;
        right: 30rpx;
        top: 20rpx;
      }
      .title{
        width: 70%;
        font-size: 32rpx;
        font-weight: bold;
        color: black;
      }
      .but-box{
        margin-top: 20rpx;
        display: flex;
        justify-content: flex-end;
      }
      .btn-grad-delete {
        background-image: linear-gradient(to right, #FF512F 0%, #DD2476 51%, #FF512F 100%);
        font-size: 25rpx;
        height: 60rpx;
        line-height: 60rpx;
        width: 120rpx;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20rpx #eee;
        border-radius: 15rpx;
        display: block;
        margin: 0;
        margin-left: 30rpx;
      }
      
      .btn-grad-delete:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
      }
      
      
      .btn-grad-update {
        background-image: linear-gradient(to right, #F09819 0%, #EDDE5D 51%, #F09819 100%);
        font-size: 25rpx;
        height: 60rpx;
        line-height: 60rpx;
        width: 120rpx;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20rpx #eee;
        border-radius: 15rpx;
        display: block;
        margin: 0;
      }
      
      .btn-grad-update:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
      }
    }
  }

  .updateAndDelete {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .updateAndDelete-item {
      width: 50%;

      .btn-grad-delete {
        background-image: linear-gradient(to right, #FF512F 0%, #DD2476 51%, #FF512F 100%);
        height: 80rpx;
        line-height: 80rpx;
        width: 300rpx;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20rpx #eee;
        border-radius: 20rpx;
        display: block;
      }

      .btn-grad-delete:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
      }


      .btn-grad-update {
        background-image: linear-gradient(to right, #F09819 0%, #EDDE5D 51%, #F09819 100%);
        height: 80rpx;
        line-height: 80rpx;
        width: 300rpx;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20rpx #eee;
        border-radius: 20rpx;
        display: block;
      }

      .btn-grad-update:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
      }

    }

  }

  .appraisePopup-box {
    width: 70vw;
    // height: 400rpx;
    height: auto;
    background-color: #ffffff;
    padding: 20rpx;

    .btn-grad {
      background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
      margin: 10px auto;
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

  .myicon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 30rpx;
  }

  .mycard {
    .my-uv-tags {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70rpx;
    }

    .mycard-titile {
      font-size: 38rpx;
      color: #3a3a3a;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
      font-weight: 600;
    }

  }

  .my-tag {
    border-radius: 10rpx 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 500rpx;
    height: 50rpx;
    z-index: 99;
    background: rgb(134, 250, 242);
    background: linear-gradient(90deg, rgba(134, 250, 242, 1) 8%, rgba(137, 255, 216, 1) 49%, rgba(0, 212, 255, 0) 100%);
    display: flex;
    align-items: center;

    text {
      margin-left: 20rpx;
      color: #3a3a3a;
    }
  }


  .popup-box {
    height: 62vh;
    width: 100%;
    padding: 50rpx 0;
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

    .top-box {
      display: flex;
      align-items: flex-end;
      width: 100%;
      height: 170rpx;
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
          width: 120rpx;
          height: 120rpx;
          overflow: hidden;
          margin-left: 10rpx;
          margin-top: 10rpx;
        }
      }


    }


  }


  .myrelation {
    font-size: 32rpx;
    margin: 10rpx 0;
  }

  .my-car-box {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .btn-grad {
      background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
      margin-left: 10rpx;
      margin-bottom: 10rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      box-shadow: 0 0 20rpx #eee;
      border-radius: 10rpx;
      display: block;
      font-size: 26rpx;
    }

    .btn-grad:hover {
      background-position: right center;
      color: #fff;
      text-decoration: none;
    }

    .car-left {
      display: flex;
      align-items: center;
      margin: 15rpx 0;
      font-size: 32rpx;

      .my-icon {
        width: 50rpx;
        height: 50rpx;
        margin-right: 15rpx;
      }
    }

    .car-right {
      margin-right: 50rpx;

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


</style>