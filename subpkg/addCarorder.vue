<template>
  <view>

    <uni-card class="addChose-box" is-shadow>
      <view class="addChose-box-line" @click="choseStartAddress">
        <view class="" style="width: 15rpx; height: 15rpx; border-radius: 50%; background-color: #99F2FF;">
        </view>
        <view class="u-line-1">{{startAddress}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
      </view>
      <u-line color="#f8f8f8"></u-line>
      <view class="addChose-box-line" @click="choseEndAddress">
        <view class="" style="width: 15rpx; height: 15rpx; border-radius: 50%; background-color: #FC770B;">
        </view>
        <view class="u-line-1">{{endAddress}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
      </view>
    </uni-card>

    <uni-card is-shadow style="margin-bottom: 0;">
      <view class="">时间以及其他</view>
     
      <view class="choseTime" @click="choseStartDateTime">
        <image src="../static/lishi1.png" class="myicon" mode=""></image>
        <view class="">{{startDateTime}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; position: absolute; right: 40rpx;"
          mode=""></image>
        <uv-datetime-picker :maxDate="endDate" ref="startDatetimePicker" :minDate="MinStartTimeValue" :formatter="formatter"
          v-model="StartTimeValue" mode="datetime" @confirm="startConfirm">
        </uv-datetime-picker>
      </view>
      
      
      <view class="chosePerson">
        <view class="chosePerson-item" @click="choseCurrentPerson">
          <image src="../static/person.png" class="myicon" mode=""></image>
          <view class="">当前 <text class="my-text-box2-t"> {{currentPerson}}
            </text> 人</view>
          <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; margin-left: 10rpx;" mode=""></image>
        </view>
        <uv-picker ref="CurrentPicker" :columns="columns" @confirm="CurrentConfirm"></uv-picker>
        <view class="chosePerson-item" @click="choseLaskPerson">
          <image src="../static/person_red.png" class="myicon" mode="">
          </image>
          <view class="">还缺 <text class="my-text-box2-t"> {{lackPerson}} </text> 人
          </view>
          <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; margin-left: 10rpx;" mode=""></image>
        </view>
        <uv-picker ref="lackPicker" :columns="columns" @confirm="lackConfirm"></uv-picker>
      </view>



      <myupload @onChange="myonChange" ></myupload>
      
      
      <view class="choseTimeDifference">
        <view class="choseTimeDifference-item">
          <uv-checkbox-group>
            <uv-checkbox @change="tiqianChange" activeColor="#87d7e1" name="tiqian" size="40rpx" labelSize="17"
              labelColor="#584c48" label="能否接受提前出发"></uv-checkbox>
          </uv-checkbox-group>
          <view :class="isBefore == true ? 'truebeforeTime':'flasebeforeTime'" style=""
            @click="openBeforDatetimePicker">
            {{beforeTime}}
          </view>
          <uv-datetime-picker ref="beforDatetimePicker" v-model="beforeTime" mode="time" @confirm="beforConfirm">
          </uv-datetime-picker>
        </view>
        <view class="choseTimeDifference-item">
          <uv-checkbox-group>
            <uv-checkbox @change="yanhoChange" activeColor="#87d7e1" name="tiqian" size="40rpx" labelSize="17"
              labelColor="#584c48" label="能否接受延后出发"></uv-checkbox>
          </uv-checkbox-group>
          <view :class="isAfter == true ? 'truebeforeTime':'flasebeforeTime'" style="" @click="openAfterDatetimePicker">
            {{afterTime}}
          </view>
          <uv-datetime-picker ref="afterDatetimePicker" v-model="afterTime" mode="time" @confirm="afterConfirm">
          </uv-datetime-picker>
        </view>
      </view>

    </uni-card>

    <uni-section title="备注" titleFontSize="36rpx" type="line">
    </uni-section>
    <uni-card is-shadow style="height: 200rpx; margin-top: 0; ">
      <textarea v-model="ideaText" maxlength="80"
        style="width: 100%; height: 200rpx;  margin-top: 20rpx; font-size: 30rpx;" placeholder="请输入备注" />
      <text style="position: absolute; bottom:  20rpx; right: 20rpx;">{{ideaText.length}}/80</text>
    </uni-card>

    <view class="down-box">
      <button class="btn-grad" form-type="submit" @click="clickAddOrder">发布拼车</button>
    </view>

    <quick-message ref="message"></quick-message>
    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>
    <ws-wx-privacy id="privacy-popup" :enableAutoProtocol="true"></ws-wx-privacy>
  </view>
</template>

<script>
import { callWithErrorHandling } from "vue";
  function getYearLastMillisecondTimestamp() {
    var now = new Date();
    var year = now.getFullYear();
    var lastSecond = new Date(year, 11, 31, 23, 59, 59, 999); // 设置时间为年末最后1秒
    // 获取该时刻对应的毫秒级时间戳
    return lastSecond.getTime();
  }
  
  export default {
    data() {
      return {
        endDate: getYearLastMillisecondTimestamp(),
        resWximg: '',
        isUploadWximg: false,
        fileList1: [],
        isLoading: false,
        beforeTime: '00:00',
        isBefore: false,
        afterTime: '00:00',
        isAfter: false,
        ideaText: '',
        columns: [
          ['1', '2', '3']
        ],
        currentPerson: '1',
        lackPerson: '1',
        startDateTime: '点击选择出发时间',
        StartTimeValue: Number(new Date()),
        MinStartTimeValue: Number(new Date()),
        startAddress: '点击选择出发地点1', //这里是地址名称 
        startAddressAll: '', //这是地址全称
        endAddress: '点击选择目的地1',
        endAddressAll: '',
        wechatAccount: '',
        phoneNumber: '',
        wechatError: false,
        phoneError: false,
        phoneErrorMessage: '手机号不能为空或格式不正确',
        wechatErrorMsg: '',
        afterAdd: true, //防止多次点击添加
      };
    },
    computed: {
      isValid() {
        return this.wechatAccount !== '' || this.isValidPhoneNumber
      },
      isTips() {
        // return this.wechatAccount.trim() == '' && this.phoneNumber.trim() == '';
        return this.wechatAccount.trim() == '' && !this.isUploadWximg;
      }
    },
    onLoad() {
      
    },
    watch: {
      phoneNumber(newval, oldval) {
        const regex = /^1[3-9]\d{9}$/;
        if (!this.wechatError && !newval) {
          this.phoneError = false;
        } else if (!regex.test(newval)) {
          this.phoneError = true;
        } else {
          this.phoneError = false;
        }
      },
      wechatAccount(newval, oldval) {
        if (this.phoneNumber.trim() !== '') return
        // 添加对wechatAccount中是否包含中文字符的判断
        const hasChineseChar = /[\u4e00-\u9fa5]/i.test(newval);
        if (hasChineseChar) {
          this.wechatError = true;
          this.wechatErrorMsg = '微信号不能包含中文字符';
        } else {
          this.wechatError = false;
          this.wechatErrorMsg = '';
        }
      }
    },
    methods: {
      myonChange(e){
        console.log('子组件上传的回调',e);
        this.fileList1 = e
      },
      clickUploadImgM() {
        if (this.fileList1.length >= 1) return
        this.$refs.uploadWxImgRef.chooseFile()
      },

      postOrderData() {
        let curUser = uni.getStorageSync('user')
        this.isLoading = true
        console.log(this.fileList1);
        console.log('this.fileList1[0].resWximg',this.fileList1[0].resWximg);
        this.post({
          url: 'carshareorder/add',
          data: {
            createuserid: curUser.openid,
            startaddressall: this.startAddressAll,
            startaddress: this.startAddress,
            endaddressall: this.endAddressAll,
            endaddress: this.endAddress,
            startdatetime: this.startDateTime.split(' ')[0] + 'T' + this
              .startDateTime.split(' ')[
                1],
            currentperson: this.currentPerson,
            lackperson: this.lackPerson,
            phonenumber: this.phoneNumber,
            wechataccount: this.wechatAccount,
            isbefore: this.isBefore == true ? 1 : 0,
            beforetime: this.beforeTime,
            isafter: this.isAfter == true ? 1 : 0,
            aftertime: this.afterTime,
            remark: this.ideaText,
            wechatImg: this.fileList1[0].resWximg,
          }
        }).then(res => {
          this.isLoading = false
          if (res.code !== 200) {
            this.afterAdd = true
            this.$refs.message.show({
              type: 'error',
              msg: '发布拼车失败 请稍候重试吧',
            })
            return
          }
          this.$refs.message.show({
            type: 'success',
            msg: '发布成功!',
          })

          setTimeout(() => {
            uni.$emit('addUpdate')
            uni.navigateBack()
          }, 500)
        }).catch(err => {
          this.afterAdd = true
          this.isLoading = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
        })

      },
      clickAddOrder() {
        const isWriteResult = this.isWrite()
        console.log('isWriteResult', isWriteResult);
        if (!isWriteResult) return
        if(!this.afterAdd) return 
        this.afterAdd = false
        uni.requestSubscribeMessage({
          tmplIds: ['R0HVPNJRywpmvaA5xO6YWFfjLdGqcjWPB0-rqRkmkbk'],
          success: (res) => {
            console.log('用户消息同意情况', res);
            this.postOrderData()
          },
          fail: (err) => {
            console.log(err);
            this.$refs.message.show({
              type: 'warning',
              msg: '同意请求才可以及时收到拼车消息哦',
            })
            this.postOrderData()
          }
        })




      },
      isWrite() {
        if (this.isAfter == true && this.afterTime == '00:00') {
          this.$refs.message.show({
            type: 'warning', //String 默认default
            msg: '请选择能接受的延后时间范围', //String 显示内容 *
            customStyle: { //自定义样式
              color: '#E6A23C', //字体图标色
              backgroundColor: 'rgba(253,246,236)' //背景色
            },
          })
          return false
        }
        if (this.isBefore == true && this.beforeTime == '00:00') {
          this.$refs.message.show({
            type: 'warning', //String 默认default
            msg: '请选择能接受的提前时间范围', //String 显示内容 *
            customStyle: { //自定义样式
              color: '#E6A23C', //字体图标色
              backgroundColor: 'rgba(253,246,236)' //背景色
            },
          })
          return false
        }
        if (this.wechatAccount.trim() == '' && this.fileList1.length == 0) {
          this.$refs.message.show({
            type: 'warning', //String 默认default
            msg: '请输入联系方式', //String 显示内容 *
            customStyle: { //自定义样式
              color: '#E6A23C', //字体图标色
              backgroundColor: 'rgba(253,246,236)' //背景色
            },
          })
          return false
        }
        if (this.startDateTime == '点击选择出发时间') {
          this.$refs.message.show({
            type: 'warning', //String 默认default
            msg: '请选择出发时间', //String 显示内容 *
            customStyle: { //自定义样式
              color: '#E6A23C', //字体图标色
              backgroundColor: 'rgba(253,246,236)' //背景色
            },
          })
          return false
        }
        if (this.endAddress == '点击选择目的地') {
          this.$refs.message.show({
            type: 'warning', //String 默认default
            msg: '请选择目的地', //String 显示内容 *
            customStyle: { //自定义样式
              color: '#E6A23C', //字体图标色
              backgroundColor: 'rgba(253,246,236)' //背景色
            },
          })
          return false
        }
        if (this.startAddress == '点击选择出发地点') {
          this.$refs.message.show({
            type: 'warning', //String 默认default
            msg: '请选择出发地点', //String 显示内容 *
            // icon: true, //Boolean|String 显示icon(false/true/string 默认显示icon)
            // mask: true, //Boolean 遮罩（默认false没有遮罩）
            customStyle: { //自定义样式
              color: '#E6A23C', //字体图标色
              backgroundColor: 'rgba(253,246,236)' //背景色
            },
            iconSize: 16, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
            iconColor: '', //String icon颜色(默认主题颜色 设置后会覆盖自定义样式里的设置优先级最高)
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
            this.endAddress = res.name
            this.endAddressAll = res.address + res.name
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
            this.startAddress = res.name
            this.startAddressAll = res.address + res.name
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
        console.log('开始出发时间', e);
        console.log('开始出发时间', this.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM'));
        this.startDateTime = this.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM')
      },
      choseStartDateTime() {
        this.$refs.startDatetimePicker.open()
      },
      lackConfirm(e) {
        console.log('缺少人数', e.value[0]);
        this.lackPerson = e.value[0]
      },
      CurrentConfirm(e) {
        console.log('当前人数', e.value[0]);
        this.currentPerson = e.value[0]
      },
      choseCurrentPerson() {
        this.$refs.CurrentPicker.open()
      },
      choseLaskPerson() {
        this.$refs.lackPicker.open()
      },
      afterConfirm(e) {
        console.log(e);
        this.afterTime = e.value
      },
      beforConfirm(e) {
        console.log(e);
        this.beforeTime = e.value
      },
      openBeforDatetimePicker() {
        if (this.isBefore)
          this.$refs.beforDatetimePicker.open();
      },
      openAfterDatetimePicker() {
        if (this.isAfter)
          this.$refs.afterDatetimePicker.open();
      },
      tiqianChange(e) {
        console.log("能否接受提前出发：", e);
        this.isBefore = e
      },
      yanhoChange(e) {
        console.log("能否接受延后出发：", e);
        this.isAfter = e
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