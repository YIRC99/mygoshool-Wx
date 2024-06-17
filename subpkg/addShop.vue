<template>
  <view class="page">

    <uni-card isShadow>
      <uv-textarea v-model="shopDetailText" height="250" count maxlength="500" border="bottom"
        placeholder="请讲述一下物品吧~"></uv-textarea>

      <myImgUpload ref="myimgupload" @onChange="myonChange" ImgUploadText="清晰图片更容易出手哦~" ImageHeight="180rpx"
        ImageWidth="180rpx" ImgRequestPath="shop" />

      <uni-section title="自动下架时间" type="line">
      </uni-section>
      <view class="mychooseTimeBox">
        <view class="uv-page__tag-item" v-for="(item, index) in radios" :key="index">
          <uv-tags :text="item.name" :plain="!item.checked" :name="index" shape="circle" @click="radioClick">
          </uv-tags>
        </view>
      </view>
    </uni-card>


    <uni-card isShadow>
      <view class="myitem">
        <view class="left">
          <text>价格</text>
        </view>
        <view class="right">
          <input type="digit" v-model="shopPrice" maxlength="6" placeholder-class="myinputCss" placeholder="价格"
            style="text-align: right; " />
          <p>￥</p>
        </view>
      </view>
      <view class="myitem" @click="showAPicker" style="padding-top: 30rpx; ">
        <view class="left">
          <text>交易地点</text>
        </view>
        <view class="right" style="color: #ababab; font-weight: 500;">
          {{dealAdd}}
        </view>
      </view>

      <view class="myitem" style="padding-top: 30rpx; border: none;">
        <view class="left">
          <text>联系方式</text>
        </view>
      </view>

      <myupload ref="myupload" @onChange="wxUpload" />
    </uni-card>

    <view class="down-box">
      <button class="btn-grad" form-type="submit" @click="clickAddShop">{{isUpdate ? '修改发布' : '发布闲置'}}</button>
    </view>


    <uv-modal ref="modal" width="500rpx" showCancelButton :content='modalText' @confirm="modalConfirm"></uv-modal>
    <uv-picker ref="AddressPicker" :columns="columns" @confirm="confirm"></uv-picker>
    <uv-toast ref="toast"></uv-toast>
    <quick-message ref="message"></quick-message>
    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        radios: [{
          checked: true,
          name: '7天'
        }, {
          checked: false,
          name: '30天'
        }, {
          checked: false,
          name: '永不'
        }],
        dealAdd: '交易地点',
        shopDetailText: '',
        fileList1: [],
        wxFile: [],
        columns: [
          ['濂溪校区', '鹤问湖校区', '其他']
        ],
        shopPrice: '0.00',
        modalText: '',
        isFree: false,
        chooseTimeIndex: 0,
        isLoading: false,
        chooseAddressIndex: 0,
        ispost: false,
        isUpdate: false,
        updateImgs: [],
        updateWechatImg: '',
        updateId: ''
      };
    },
    onLoad(e) {
      console.log(e);
      // 如果是修改进入的 直接加载数据
      if (e.update != null && e.update) {
        uni.setNavigationBarTitle({
          title: '修改信息'
        })
        this.isUpdate = true
        let data = uni.getStorageSync('updateShop')
        data.createAt = this.formatDateTime(data.createAt)
        this.updateId = data.id
        this.shopDetailText = data.detail.replace(/<br\s*\/?>/gi, "\n")
        this.shopPrice = data.price
        this.updateImgs = data.imgs
        this.updateWechatImg = data.wechatimg

        this.confirm({
          value: [this.columns[0][data.address]],
          indexs: [data.address]
        })
        let differenceDays = this.differenceTime(data.cancelTime, data.createAt)
        if (differenceDays <= 7) this.radioClick(0)
        else if (differenceDays <= 30) this.radioClick(1)
        else this.radioClick(2)
      } else {
        uni.setNavigationBarTitle({
          title: '发布闲置'
        })
      }


    },
    mounted() {
      if (this.isUpdate) {
        this.$refs.myimgupload.addImg(this.updateImgs, this.shopPath)
        this.$refs.myupload.addImg(this.updateWechatImg, this.QRPath)
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
      differenceTime(timeString1, timeString2) {
        // console.log('将传入的时间字符串转换为 Date 对象11',timeString1);
        // console.log('将传入的时间字符串转换为 Date 对象22',timeString2);
        // 将传入的时间字符串转换为 Date 对象
        var date1 = new Date(timeString1);
        var date2 = new Date(timeString2);
        // 计算两个日期之间的毫秒数差值
        var timeDifference = Math.abs(date2.getTime() - date1.getTime());
        // 将毫秒数差值转换为天数
        var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        // console.log('计算成功', daysDifference);
        return daysDifference;
      },
      chooseCancelTime(index) {
        let currentDate = new Date();
        // 根据index增加相应的时间
        switch (index) {
          case 0:
            currentDate.setDate(currentDate.getDate() + 7); // 增加一天（即明天）
            currentDate.setHours(0, 0, 0, 0); // 设置时间为0点（即凌晨）
            break;
          case 1:
            currentDate.setDate(currentDate.getDate() + 30); // 增加30天
            currentDate.setHours(0, 0, 0, 0); // 设置时间为0点（即凌晨）
            break;
          case 2:
            currentDate.setFullYear(currentDate.getFullYear() + 100); // 增加100年
            currentDate.setHours(0, 0, 0, 0); // 设置时间为0点（即凌晨）
            break;
          default:
            currentDate.setDate(currentDate.getDate() + 7); // 增加一天（即明天）
            currentDate.setHours(0, 0, 0, 0); // 设置时间为0点（即凌晨）
        }
        currentDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '-') + 'T' + currentDate.toTimeString()
          .split(' ')[0];
        return currentDate
      },
      joinImgPath(arr) {
        let resultPath = ''
        // console.log('for 循环之前', arr);
        arr.forEach(i => {
          console.log(i.resWximg);
          if (resultPath != '') {
            resultPath = resultPath + ',' + i.resWximg
          } else {
            resultPath = i.resWximg
          }
        })
        return resultPath
      },
      postShop() {
        let curUser = uni.getStorageSync('user')
        this.isLoading = true
        let imgs = this.joinImgPath(this.fileList1)
        let resultShopDetail = this.shopDetailText.replace(/\n/g, '<br/>');
        this.post({
          url: this.isUpdate ? 'shop/update' : 'shop/add',
          data: {
            detail: resultShopDetail,
            price: this.shopPrice,
            address: this.chooseAddressIndex,
            imgs: imgs,
            createuserid: curUser.openid,
            wechatimg: this.wxFile[0].resWximg,
            cancelTime: this.chooseCancelTime(this.chooseTimeIndex),
            id: this.isUpdate ? this.updateId : ''
          }
        }).then(res => {
          console.log(res);
          this.isLoading = false

          if (!this.returnCodeHandle(res.code, '发布商品失败了 请稍后重试吧~')) {
            this.ispost = false
            return
          }

          this.$refs.message.show({
            type: 'success',
            msg: this.isUpdate ? '修改成功' : '发布成功',
          })
          this.refreshLocalWxImg(this.wxFile[0].resWximg)

          setTimeout(() => {
            if(this.isUpdate){
              uni.$emit('refreshSendPage')
            }else{
              uni.$emit('refreshTransactionPage')
            }
            uni.navigateBack()
          }, 1500)


        }).catch(err => {
          // console.error('捕获到了错误', err);
          this.isLoading = false
          this.ispost = false
          this.$refs.message.show({
            type: 'error',
            msg: '网络开了点小差,请稍候重试吧',
          })
        })
      },
      wxUpload(e) {
        this.wxFile = e
      },
      modalConfirm() {
        this.isFree = true
        this.ispost = false
        this.$refs.toast.show({
          type: 'success',
          icon: false,
          duration: 4000,
          overlay: false,
          position: 'top',
          message: "感谢您的慷慨和善意，您的行为温暖了人心！"
        })
      },
      isWrite() {
        if (this.shopDetailText.trim() == '') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请描述一下物品吧~',
          })
          return false
        }
        //调用子组件判空方法
        let isenpty = this.$refs.myimgupload.isEnpty()
        // console.log('调用子组件判空方法', isenpty);
        if (!isenpty) {
          return false
        }
        // 调用组件内部的判断方法 检查是不是全部上传成功了
        let isupdate = this.$refs.myimgupload.isAllupdate()
        // console.log('调用子组件判断上传状态', isupdate);
        if (!isupdate) {
          return false
        }



        if (this.dealAdd == '交易地点') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请选择交易地点吧',
          })
          return
        }
        if (this.wxFile.length == 0) {
          this.$refs.message.show({
            type: 'warning',
            msg: '请上传联系方式吧~',
          })
          return false
        }

        const priceRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
        if (!priceRegex.test(this.shopPrice)) {
          this.$refs.message.show({
            type: 'warning',
            msg: '请输入正确的价格哦~',
          })
          return false
        }

        if (this.shopPrice == 0 && this.isFree == false) {
          this.modalText = '请问确定以0元的价格免费送吗'
          this.$refs.modal.open()
          return this.isFree
        }



        return true
      },
      clickAddShop() {
        if (this.ispost) return
        this.ispost = true

        const isWriteResult = this.isWrite()
        console.log('isWriteResult', isWriteResult);
        if (!isWriteResult) {
          this.ispost = false
          return
        }

        this.postShop()
      },
      myonChange(e) {
        this.fileList1 = e
        // console.log('子组件上传的回调', this.fileList1);
      },
      radioClick(name) {
        console.log(name);
        this.radios.map((item, index) => {
          item.checked = index === name ? true : false
        })
        this.chooseTimeIndex = name


      },
      showAPicker() {
        this.$refs.AddressPicker.open();
      },
      confirm(e) {
        // console.log(e);
        this.dealAdd = e.value[0]
        this.chooseAddressIndex = e.indexs[0]
        // console.log('this.chooseAddressIndex', this.chooseAddressIndex);
      },
    }
  }
</script>

<style lang="scss">
  .page {
    height: 100vh;
  }

  .mychooseTimeBox {
    display: flex;
    justify-content: flex-start;
    width: 100%;

    .uv-page__tag-item {
      margin: 0 10rpx;
    }
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



  .myitem {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #efefef;
    padding: 15rpx 0;

    .left {
      font-size: 32rpx;
      font-weight: bold;
      color: black;
    }

    .right {
      display: flex;
      align-items: flex-end;
      color: #f73333;
      font-weight: bold;
      font-size: 30rpx;

      .myinputCss {
        color: #f73333;
      }

      p {
        margin: 0;
        padding: 0;
        line-height: 1.4;
        /* 或者设置为具体的较小值 */
        display: inline-block;
      }
    }
  }
</style>