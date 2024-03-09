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
        <view class="mytable-rili-text" v-show="list[currentIndex].time != ''">{{list[currentIndex].time}}
        </view>
      </view>
    </view>

    <uv-calendars title="选择日期" ref="calendars" @close="cancelCalendars" @confirm="chooseDateConfirm" />

    <scroll-view scroll-y="true" style="height: 75vh; " :refresher-triggered="isRefresh" @scrolltolower="scrollDown"
      @refresherrefresh="scrollPullDown" refresher-enabled>

      <view class="" v-show="currentIndex == 0">
        <u-empty text="暂时没有拼车订单 快快发布一个吧 (๑>؂<๑）" v-if="newSchoolList.length == 0" mode="order"></u-empty>
        <uni-card v-for="(item,index) in newSchoolList" :key="index" :title="subYear(item.startdatetime) + ' 出发'"
          :thumbnail='avahttp + item.createUserInfo.avatar' @click="clickCard(item)">
          <view class="my-car-box">
            <view class="" style="width: 80%;">
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
                <text>提前</text>
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
        <uni-card v-for="(item,index) in oldSchoolList" :key="index" :title="subYear(item.startdatetime) + ' 出发'"
          :thumbnail='avahttp + item.createUserInfo.avatar' @click="clickCard(item)">
          <view class="my-car-box">
            <view class="" style="width: 80%;">
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
                <text>提前</text>
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
        <uni-card v-for="(item,index) in otherAddressList" :key="index" :title="subYear(item.startdatetime) + ' 出发'"
          :thumbnail='avahttp + item.createUserInfo.avatar' @click="clickCard(item)">
          <view class="my-car-box">
            <view class="" style="width: 80%;">
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
                <text>提前</text>
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
      <view class="popup-box" >
        <scroll-view scroll-y="true" style="height: 62vh; background-color: #ffffff;" show-scrollbar="true">
          <view class="top-box">
            <view class="left">
              <image :src="avahttp + currentOrder.createUserInfo.avatar" mode=""></image>
            </view>
            <view class="middle">
              <view class="" style="line-height: 50rpx;">用户名称: {{currentOrder.createUserInfo.username}}
              </view>
              <view class="" style="line-height: 50rpx;">拼车次数</view>
            </view>
            <view class="right">
            </view>
          </view>
          <view class="my-middle-box">
            <uni-section title="出发地点" type="line" titleFontSize="36rpx">
              <template v-slot:right v-if="currentOrder.startdatetime != ''">
                出发时间 {{currentOrder.startdatetime | fromStartDateTime}}
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
          <view class="down-box">
            <button class="btn-grad" @click="showUploadWxImg">接受拼车</button>
          </view>
        </scroll-view>
      </view>
    </uv-popup>

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
          <button class="btn-grad" @click="copyWx">自动复制(优先微信)</button>
        </view>
      </view>
    </uv-popup>

    <view class="addicon" v-show="!popupShow" @click="toAddOrder">
      <image src="/static/add.png" mode=""></image>
    </view>

    <quick-message ref="message"></quick-message>

    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>

    <uv-modal ref="modal" title="添加联系方式让对方也可以联系你吧" 
    showCancelButton :closeOnClickOverlay="false" 
     @confirm="confirmWxImg" @cancel="cancelWxImg">

      <view class="uploadWxImg slot-content" @click="clickUploadImgM">
        <view class="" style="display: flex; align-items: center;">
          <image src="@/static/weixin.png" class="myicon" mode=""></image>
          <view class="" style="margin-right: 20rpx;">点击上传微信二维码图片</view>
        </view>
        <view class="">
          <uv-upload accept="image"  ref="uploadWxImgRef" :fileList="fileList1" 
          name="1" multiple :maxCount="1" @afterRead="afterRead"
            @delete="deletePic" @oversize="overSize" maxSize="4,493,897" :useBeforeRead="true" 
            width="100rpx" height="100rpx" :previewFullImage="true"></uv-upload>
        </view>
      </view>
    </uv-modal>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        resWximg: '',
        fileList1: [],
        QRttp: 'http://192.168.192.210:33088/common/download?path=QRcode&name=',
        isLoading: false,
        // avahttp: this.avahttp,
        avahttp: 'http://192.168.192.210:33088/common/download?path=avatar&name=',
        oneRefresh: false, // 页面是否有过第一次刷新
        isRefresh: false,
        popupShow: false,
        noticeText: '编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。编译成功。前端运行日志，请另行在小程序开发工具的控制台查看。',
        list: [{
          name: '濂溪校区',
          time: '',
          pageNum: 1,
          pagetotal: 0
        }, {
          name: '鹤问湖校区',
          time: '',
          pageNum: 1,
          pagetotal: 0
        }, {
          name: '其他',
          time: '',
          pageNum: 1,
          pagetotal: 0
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
      };
    },
    methods: {
      confirmWxImg(){
        if (this.fileList1.length == 0){
          this.$refs.message.show({
            type: 'error',
            msg: '请上传图片后确定',
          })
          return
        }
        if("success" != this.fileList1[0].status){
          this.$refs.message.show({
            type: 'error',
            msg: '请图片上传成功后确定',
          })
          return
        }
        this.fileList1 = []
        this.receiveOrder()
      },
      cancelWxImg(){
        this.fileList1 = []
      },
      clickUploadImgM() {
        if (this.fileList1.length >= 1) return
        this.$refs.uploadWxImgRef.chooseFile()
      },
      // 图片大小超出限制
      overSize(){
        this.$refs.message.show({
          type: 'error', 
          msg: '图片超过3MB大小', 
        })
      },
      //上传图片
      uploadFilePromise(url) {
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: this.http + 'common/upload?path=QRcode',
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            timeout: 5000,
            success: (res) => {
              console.log('上传成功', res.statusCode);
              this.isUploadWximg = true
              let img = JSON.parse(res.data).data
              this.resWximg = img
              resolve(200)
            },
            fail: (err) => {
              console.log('上传失败', err);
              resolve(400)
            }
          });
        })
      },
      // 新增图片
      async afterRead(event) {
        // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        let fileListLen = this[`fileList${event.name}`].length
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中'
          })
        })
        console.log(this.fileList1);
        for (let i = 0; i < lists.length; i++) {
          console.log('还没有调用上传方法',lists);
          uni.compressImage({
            src: lists[i].url,
            quality: 70,
           success: async res => {
              console.log(res.tempFilePath)
              console.log('压缩完成了');
              lists[i].url = res.tempFilePath
              const result = await this.uploadFilePromise(lists[i].url)
              let item = this[`fileList${event.name}`][fileListLen]
              
              if (result == 400) {
                this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
                  status: 'failed',
                  message: '请重新上传',
                  url: result
                }))
              } else {
                this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
                  status: 'success',
                  message: '',
                  url: result
                }))
              }
              fileListLen++
              
            }
          })
          
        }


      },
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
        this.isUploadWximg = false
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
        this.scrollPullDown()
      },
      cancelCalendars() {
        this.list[this.currentIndex].time = ''
        this.scrollPullDown()
      },
      openCalendars() {
        this.$refs.calendars.open();
      },
      copyWx() {
        uni.setClipboardData({
          data: this.currentOrder.wechataccount || this.currentOrder.phonenumber,
          complete: (res) => {
            console.log('点击复制的结果', res);
            this.$refs.receivePopup.close()
            this.closeReceivePopup()
          }
        })
      },
      closeReceivePopup() {
        this.popupShow = false
      },
      showUploadWxImg(){
        this.$refs.modal.open();
      },
      receiveOrder() {
        let user = uni.getStorageSync('user')
        this.isLoading = true
        this.post({
          url: 'carshareorder/receive',
          data: {
            orderid: this.currentOrder.orderid,
            receiveuserid: user.openid,
            createuserid: this.currentOrder.createuserid,
            receiveUserWechatImg: this.resWximg
          }
        }).then(res => {
          console.log(res);
          if (res.code != 200) {
            this.$refs.message.show({
              type: 'error',
              msg: '订单已被接受或失效',
              iconSize: 16,
            })
            this.popupShow = false
            this.isLoading = false
            this.$refs.popup.close()
            this.scrollPullDown()
            return
          }

          this.isLoading = false
          this.scrollPullDown()
          this.$refs.popup.close()
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
          if (res.code != 200) {
            this.isRefresh = false
            this.$refs.message.show({
              type: 'error', //String 默认default
              msg: '网络开了点小差,请稍候重试吧', //String 显示内容 *
              iconSize: 16, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
            })
            return
          }
          this.list[this.currentIndex].pagetotal = res.data.total

          res.data.records.forEach(item => {
            if (item.startaddressall.indexOf('濂溪校区') != -1) {
              item.startaddress = '九职大' + item.startaddress.slice(6, 9999)
            } else if (item.startaddressall.indexOf('鹤问湖校区') != -1) {
              item.startaddress = '九职大' + item.startaddress.slice(6, 9999)
            }
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
        console.log('下拉刷新了');
        if (this.isRefresh == true) return
        this.isRefresh = true
        // 下拉刷新的时候调用获取数据的方法 根据index带上不同的参数
        this.getOrderList()
      },
      scrollDown() {
        console.log('滚动条到了底部 当前的indedx为', this.currentIndex);
        if (this.currentIndex == 0 && this.newSchoolList.length >= this.list[this.currentIndex].pagetotal) {
          this.$refs.message.show({
            type: 'default',
            msg: '已经到底了, 没有更多数据啦',
            iconSize: 16,
          })
          return
        } else if (this.currentIndex == 1 && this.oldSchoolList.length >= this.list[this.currentIndex]
          .pagetotal) {
          this.$refs.message.show({
            type: 'success',
            msg: '已经到底了, 没有更多数据啦',
            iconSize: 16,
          })
          return
        } else if (this.currentIndex == 2 && this.otherAddressList.length >= this.list[this.currentIndex]
          .pagetotal) {
          this.$refs.message.show({
            type: 'success',
            msg: '已经到底了, 没有更多数据啦',
            iconSize: 16,
          })
          return
        }
        this.list[this.currentIndex].pageNum++
        this.getOrderList(false)
      },
      toAddOrder() {
        let user = uni.getStorageSync('user')
        if (user != null && user != '' && user != undefined) {
          uni.navigateTo({
            url: '/subpkg/addCarorder'
          });
        } else {
          this.$refs.message.show({
            type: 'error',
            msg: '请登录后再发布拼车吧',
            iconSize: 16,
          })
        }

      },
      clickCard(order) {
        this.currentOrder = order
        console.log('点击了卡片当前选中改变了',this.currentOrder);
        this.$refs.popup.open()
        this.popupShow = true
      },
      closePopup() {
        this.popupShow = false
      },
      change(e) {
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
          console.log('监听到了 添加之后 返回页面');
          this.scrollPullDown()
        })
        console.log('拼车页面的myonshow方法触发了');
        this.simulateSwipeDown()
      },
      simulateSwipeDown() {

        if (!this.oneRefresh) {
          this.oneRefresh = true
          console.log('首次进入页面 index 0 页面 自动下拉刷新');
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

  .uploadWxImg {
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    justify-content: space-between;
    font-size: 32rpx;
  }

  .receivePopup-box-img {
    border: 1px solid #ebebeb;
    border-radius: 30rpx;
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
    // background-color: red;
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

      text {
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