<template>
  <view class="" v-if="isPageLoding">
    <uv-loading-page :loading="isPageLoding" loading-text="Hello 数据加载中" 
    loading-mode="spinner" font-size="40rpx"></uv-loading-page>
  </view>
  
  <view v-else>

    <uni-card class="addChose-box" is-shadow>
      <view class="addChose-box-line" @click="choseStartAddress">
        <view class="" style="width: 15rpx; height: 15rpx; border-radius: 50%; background-color: #99F2FF;">
        </view>
        <view class="uv-line-1">{{currentOrder.startaddress}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
      </view>
      <uv-line color="#f8f8f8"></uv-line>
      <view class="addChose-box-line" @click="choseEndAddress">
        <view class="" style="width: 15rpx; height: 15rpx; border-radius: 50%; background-color: #FC770B;">
        </view>
        <view class="uv-line-1">{{currentOrder.endaddress}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
      </view>
    </uni-card>

    <uni-card is-shadow style="margin-bottom: 0;">
      <view class="">时间以及其他</view>
      <view class="choseTime" @click="choseStartDateTime">
        <image src="../static/lishi1.png" class="myicon" mode=""></image>
        <view class="" v-if="currentOrder.startdatetime != ''">{{currentOrder.startdatetime | fromStartDateTime}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; position: absolute; right: 40rpx;"
          mode=""></image>
        <uv-datetime-picker :itemHeight="88" :maxDate="endDate" ref="startDatetimePicker" :minDate="MinStartTimeValue" :formatter="formatter"
          v-model="StartTimeValue" mode="datetime" @confirm="startConfirm">
        </uv-datetime-picker>
      </view>
      <view class="chosePerson">
        <view class="chosePerson-item" @click="choseCurrentPerson">
          <image src="../static/person.png" class="myicon" mode=""></image>
          <view class="">当前 <text class="my-text-box2-t"> {{currentOrder.currentperson}}
            </text> 人</view>
          <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; margin-left: 10rpx;" mode=""></image>
        </view>
        <uv-picker ref="CurrentPicker" :columns="columns" @confirm="CurrentConfirm"></uv-picker>
        <view class="chosePerson-item" @click="choseLaskPerson">
          <image src="../static/person_red.png" class="myicon" mode="">
          </image>
          <view class="">还缺 <text class="my-text-box2-t"> {{currentOrder.lackperson}} </text> 人
          </view>
          <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; margin-left: 10rpx;" mode=""></image>
        </view>
        <uv-picker ref="lackPicker" :columns="columns" @confirm="lackConfirm"></uv-picker>
      </view>

  <!--    <view class="input-container">
        <image src="../static/weixin.png" class="myicon" mode=""></image>
        <view class="input-container-right">
          <uni-easyinput v-model="currentOrder.wechataccount" maxlength="30" :inputBorder="false" placeholder="输入微信号"
            type="text" placeholderStyle="font-size: 34rpx;" :class="{'error': wechatError}" />
          <text v-if="wechatError" class="error-message">{{wechatErrorMsg}}</text>
        </view>
      </view> -->

      <view class="uploadWxImg" @click="clickUploadImgM">
        <view class="" style="display: flex; align-items: center;">
          <image src="../static/weixin.png" class="myicon" mode=""></image>
          <view class="">点击上传微信二维码图片</view>
        </view>
        <view class="">
          <uv-upload ref="uploadWxImgRef" :fileList="fileList1"
            @oversize="overSize" maxSize="4,493,897"
           name="1" multiple :maxCount="1" @afterRead="afterRead"
            @delete="deletePic" width="100rpx" height="100rpx" :previewFullImage="true"></uv-upload>
        </view>
      </view>

     <!-- <view class="" style="padding-left: 70rpx; color: #F4AB12;" v-if="isTips">
        *微信号和图片只需一个即可</view> -->

      <view class="choseTimeDifference">
        <view class="choseTimeDifference-item">
          <uv-checkbox-group>
            <uv-checkbox @change="tiqianChange" activeColor="#87d7e1" name="tiqian" size="40rpx" labelSize="17"
              labelColor="#584c48" :labelSize="32" :iconSize="26" label="能否接受提前出发" :checked="currentOrder.isbefore == 1"></uv-checkbox>
          </uv-checkbox-group>
          <view :class="currentOrder.isbefore == 1 ? 'truebeforeTime':'flasebeforeTime'"
            @click="openBeforDatetimePicker">
            {{currentOrder.beforetime}}
          </view>
          <uv-datetime-picker :itemHeight="88" ref="beforDatetimePicker" v-model="currentOrder.beforetime" mode="time"
            @confirm="beforConfirm">
          </uv-datetime-picker>
        </view>
        <view class="choseTimeDifference-item">
          <uv-checkbox-group>
            <uv-checkbox @change="yanhoChange" activeColor="#87d7e1" name="tiqian" size="40rpx" labelSize="17"
              labelColor="#584c48" :labelSize="32" :iconSize="26" label="能否接受延后出发" :checked="currentOrder.isafter == 1"></uv-checkbox>
          </uv-checkbox-group>
          <view :class="currentOrder.isafter == 1 ? 'truebeforeTime':'flasebeforeTime'" style=""
            @click="openAfterDatetimePicker">
            {{currentOrder.aftertime}}
          </view>
          <uv-datetime-picker :itemHeight="88" ref="afterDatetimePicker" v-model="currentOrder.aftertime" mode="time"
            @confirm="afterConfirm">
          </uv-datetime-picker>
        </view>
      </view>

    </uni-card>

    <uni-section title="备注" titleFontSize="36rpx" type="line">
    </uni-section>

    <uni-card is-shadow style="height: 200rpx; margin-top: 0; ">
      <textarea v-model="currentOrder.remark" maxlength="80"
        style="width: 100%; height: 200rpx;  margin-top: 20rpx; font-size: 30rpx;" placeholder="请输入备注" />
      <text style="position: absolute; bottom:  20rpx; right: 20rpx;">{{currentOrder.remark.length}}/80</text>
    </uni-card>

    <view class="down-box">
      <button class="btn-grad" form-type="submit" @click="updateOrder">修改信息</button>
    </view>

    <quick-message ref="message"></quick-message>
    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>

  </view>
</template>

<script>
   import mixin from '@/mixins/mixin.js'
  export default {
     mixins:[mixin],
    data() {
      return {
        endDate: this.getYearLastMillisecondTimestamp(),
        isUploadWximg: true,
        isLoading: false,
        isPageLoding: true,
        fileList1: [],
        columns: [
          ['1', '2', '3']
        ],
        StartTimeValue: Number(new Date()),
        MinStartTimeValue: Number(new Date()),
        wechatError: false,
        phoneError: false,
        phoneErrorMessage: '手机号不能为空或格式不正确',
        wechatErrorMsg: '',
        currentOrder: {
          startaddress: '',
          startaddressall: '',
          startdatetime: '',
          endaddress: '',
          endaddressall: '',
          currentperson: '',
          lackperson: '',
          wechataccount: '',
          isafter: '',
          isbefore: '',
          beforetime: '',
          aftertime: '',
          remark: ''
        },
         afterAdd: true, //防止多次点击添加
      };
    },
    computed: {
      isValid() {
        return this.currentOrder.wechataccount !== ''
      },
      isTips() {
        return this.currentOrder.wechataccount.trim() == '' && !this.isUploadWximg;
      }
    },

    watch: {
      'currentOrder.wechataccount': {
        handler(newval, oldval) {
          // 添加对wechatAccount中是否包含中文字符的判断
          const hasChineseChar = /[\u4e00-\u9fa5]/i.test(newval);
          if (hasChineseChar) {
            this.wechatError = true;
            this.wechatErrorMsg = '微信号不能包含中文字符';
          } else {
            this.wechatError = false;
            this.wechatErrorMsg = '';
          }
        },
        deep: true // 深度监听对象属性的变化
      }
    },
    onLoad(e) {
      this.post({
        url: 'carshareorder/getbyorderid',
        data: {
          orderid: uni.getStorageSync('updateCarOrderId')
        }
      }).then(res => {
        this.isPageLoding = false
        if (res.code !== 200) {
          this.$refs.message.show({
            type: 'error',
            msg: '查询订单失败, 请稍候重试吧',
          })
          return
        }
        
        this.currentOrder = res.data
        this.currentOrder.createat = this.formatDateTime(this.currentOrder.createat)
        this.currentOrder.startdatetime = this.formatDateTime(this.currentOrder.startdatetime)
        
        
        this.fileList1.push({
          message: '',
          size: '',
          status: 'success',
          thumb: this.QRttp + this.currentOrder.wechatImg,
          type: 'image',
          url: '200'
        })
        console.log('this.currentOrder',this.currentOrder);
      })
     
    },
    methods: {
      updateOrder(){
        const isWriteResult = this.isWrite()
        console.log('isWriteResult', isWriteResult);
        if (!isWriteResult) return
        if(!this.afterAdd) return
        this.afterAdd = false
        console.log(this.currentOrder);
        
        this.currentOrder.startdatetime = this.fromDataTime2ISO8601(this.currentOrder.startdatetime)
        this.currentOrder.createat = this.fromDataTime2ISO8601(this.currentOrder.createat)
        
        this.isLoading = true
        this.post({
          url: 'carshareorder/update',
          data: this.currentOrder
        }).then(res => {
          this.isLoading = false
          if (res.code !== 200) {
             this.afterAdd = true
            this.$refs.message.show({
              type: 'error',
              msg: '修改订单失败, 请稍候重试吧',
            })
            return
          }
          this.$refs.message.show({
            type: 'success',
            msg: '修改成功',
          })
          setTimeout(()=>{
            uni.navigateBack()
          },1000)
        }).catch(err => {
           this.afterAdd = true
          this.isLoading = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
        })
        
        
      },
      clickUploadImgM() {
        if (this.fileList1.length >= 1) return
        this.$refs.uploadWxImgRef.chooseFile()
      },
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
              this.currentOrder.wechatImg = img
              resolve(200)
            },
            fail: (err) => {
              console.log('上传失败', err);
              resolve(400)
            }
          });
        })
      },
      // 图片大小超出限制
      overSize(){
        this.$refs.message.show({
          type: 'error', 
          msg: '图片超过3MB大小', 
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
      isWrite() {
        if (this.currentOrder.isafter == true && this.currentOrder.aftertime == '00:00') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请选择能接受的延后时间范围',
          })
          return false
        }
        if (this.currentOrder.isbefore == true && this.currentOrder.beforetime == '00:00') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请选择能接受的提前时间范围',
          })
          return false
        }
        if (this.currentOrder.wechataccount.trim() == '' && !this.isUploadWximg) {
          this.$refs.message.show({
            type: 'warning',
            msg: '请输入联系方式',
          })
          return false
        }

        return true
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`
        }
        if (type === 'month') {
          return `${value}月`
        }
        if (type === 'day') {
          return `${value}日`
        }
        if (type === 'hour')
          return `${value}时`
        if (type === 'minute')
          return `${value}分`

        return value
      },
      choseEndAddress() {
        uni.chooseLocation({
          success: (res) => {
            this.currentOrder.endaddress = res.name
            this.currentOrder.endaddressall = res.address + res.name
          },
          fail: () => {
            // 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
            uni.getSetting({
              success: (res) => {
                console.log(res);
                var status = res.authSetting;
                if (!status['scope.userLocation']) {
                  // 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
                  uni.showModal({
                    title: "是否授权当前位置",
                    content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
                    success: (tip) => {
                      if (tip.confirm) {
                        // 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
                        uni.openSetting({
                          success: (data) => {
                            // 如果用户授权了地理信息在，则提示授权成功
                            if (data
                              .authSetting[
                                'scope.userLocation'
                              ] ===
                              true) {
                              uni.showToast({
                                title: "授权成功",
                                icon: "success",
                                duration: 1000
                              })
                              // 授权成功后，然后再次chooseLocation获取信息
                              uni.chooseLocation({
                                success: (
                                  res
                                ) => {
                                  console
                                    .log(
                                      "详细地址",
                                      res
                                    );
                                  // this.getRegionFn(res);
                                }
                              })
                            } else {
                              uni.showToast({
                                title: "授权失败",
                                icon: "none",
                                duration: 1000
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              },
              fail: (res) => {
                uni.showToast({
                  title: "调用授权窗口失败",
                  icon: "none",
                  duration: 1000
                })
              }
            })
          }
        });
      },
      choseStartAddress() {
        uni.chooseLocation({
          success: (res) => {
            this.currentOrder.startaddress = res.name
            this.currentOrder.startaddressall = res.address + res.name
          },
          fail: () => {
            // 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
            uni.getSetting({
              success: (res) => {
                console.log(res);
                var status = res.authSetting;
                if (!status['scope.userLocation']) {
                  // 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
                  uni.showModal({
                    title: "是否授权当前位置",
                    content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
                    success: (tip) => {
                      if (tip.confirm) {
                        // 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
                        uni.openSetting({
                          success: (data) => {
                            // 如果用户授权了地理信息在，则提示授权成功
                            if (data
                              .authSetting[
                                'scope.userLocation'
                              ] ===
                              true) {
                              uni.showToast({
                                title: "授权成功",
                                icon: "success",
                                duration: 1000
                              })
                              // 授权成功后，然后再次chooseLocation获取信息
                              uni.chooseLocation({
                                success: (
                                  res
                                ) => {
                                  console
                                    .log(
                                      "详细地址",
                                      res
                                    );
                                  // this.getRegionFn(res);
                                }
                              })
                            } else {
                              uni.showToast({
                                title: "授权失败",
                                icon: "none",
                                duration: 1000
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              },
              fail: (res) => {
                uni.showToast({
                  title: "调用授权窗口失败",
                  icon: "none",
                  duration: 1000
                })
              }
            })
          }
        });
      },
      startConfirm(e) {
        console.log('开始出发时间', this.$uv.timeFormat(e.value, 'yyyy-mm-dd hh:MM'));
        this.currentOrder.startdatetime = this.$uv.timeFormat(e.value, 'yyyy-mm-ddThh:MM:ss')
        console.log('this.currentOrder.startdatetime',this.currentOrder.startdatetime);
      },
      choseStartDateTime() {
        this.$refs.startDatetimePicker.open()
      },
      lackConfirm(e) {
        this.currentOrder.lackperson = e.value[0]
      },
      CurrentConfirm(e) {
        this.currentOrder.currentperson = e.value[0]
      },
      choseCurrentPerson() {
        this.$refs.CurrentPicker.open()
      },
      choseLaskPerson() {
        this.$refs.lackPicker.open()
      },
      afterConfirm(e) {
        console.log(e);
        this.currentOrder.aftertime = e.value
      },
      beforConfirm(e) {
        console.log(e);
        this.currentOrder.beforetime = e.value
      },
      openBeforDatetimePicker() {
        if (this.currentOrder.isbefore == 1)
          this.$refs.beforDatetimePicker.open();
      },
      openAfterDatetimePicker() {
        if (this.currentOrder.isafter == 1)
          this.$refs.afterDatetimePicker.open();
      },
      tiqianChange(e) {
        console.log("能否接受提前出发：", e);
        this.currentOrder.isbefore = e == true ? 1 : 0
      },
      yanhoChange(e) {
        console.log("能否接受延后出发：", e);
        this.currentOrder.isafter = e == true ? 1 : 0
      }
    }

  }
</script>


<style lang="scss">
  .uploadWxImg {
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    justify-content: space-between;
    font-size: 32rpx;
  }


  /deep/.uni-easyinput__content-input {
    padding-left: 0 !important;
  }

  .myicon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 30rpx;
  }

  .error-message {
    color: red;
  }

  .input-container {
    display: flex;
    align-items: center;
    padding: 15rpx 0;

    .input-container-right {
      display: flex;
      flex-direction: column;
      width: 100%;
      flex: 1;
    }
  }

  .error {
    border-color: red;
  }

  .down-box {
    height: 200rpx;

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


  .choseTimeDifference {
    margin-top: 10rpx;

    .choseTimeDifference-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15rpx 0;

      .truebeforeTime {
        font-size: 34rpx;
        margin-right: 10rpx;
        font-weight: bold;
      }

      .flasebeforeTime {
        font-size: 34rpx;
        margin-right: 10rpx;
        font-weight: bold;
        color: #a9a9a9;
        text-decoration: line-through;
      }
    }
  }

  .my-text-box2-t {
    font-weight: bold;
    margin: 0 10rpx;
  }

  .chosePerson {
    padding: 15rpx 0;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;

    .chosePerson-item {
      display: flex;
      align-items: center;
    }
  }

  .choseTime {
    line-height: 80rpx;
    font-size: 40rpx;
    display: flex;
    align-items: center;
    padding: 15rpx 0;
  }


  .addChose-box-line {
    line-height: 100rpx;
    font-size: 40rpx;
    display: flex;
    align-items: center;

    view {
      margin-right: 30rpx;
    }

    image {
      position: absolute;
      right: 40rpx;
    }
  }
</style>