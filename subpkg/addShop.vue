<template>
  <view class="page">

    <uni-card isShadow>
      <uv-textarea v-model="shopDetailTest" height="150" count maxlength="500" border="bottom"
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

      <myupload @onChange="wxUpload" />
    </uni-card>

    <view class="down-box">
      <button class="btn-grad" form-type="submit" @click="clickAddShop">发布闲置</button>
    </view>


    <uv-modal ref="modal" width="500rpx" showCancelButton :content='modalText' @confirm="modalConfirm"></uv-modal>
    <uv-picker ref="AddressPicker" :columns="columns" @confirm="confirm"></uv-picker>
    <uv-toast ref="toast"></uv-toast>
    <quick-message ref="message"></quick-message>
    <zero-loading v-if="isLoading" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>
  </view>
</template>

<script>
  export default {
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
        shopDetailTest: '',
        fileList1: [],
        wxFile: [],
        columns: [
          ['濂溪校区', '鹤问湖校区', '其他']
        ],
        shopPrice: '',
        modalText: '',
        isFree: false,
        chooseTimeIndex: 0,
        isLoading: false,
        chooseAddressIndex: 0,
        ispost: false
      };
    },
    methods: {
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
        currentDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '-') + 'T' + currentDate.toTimeString().split(' ')[0];
        return currentDate
      },
      joinImgPath(arr) {
        let resultPath = ''
        console.log('for 循环之前', arr);
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
        let resultShopDetail = this.shopDetailTest.replace(/\n/g, '<br/>');
        this.post({
          url: 'shop/add',
          data: {
            detail: resultShopDetail,
            price: this.shopPrice,
            address: this.chooseAddressIndex,
            imgs: imgs,
            createuserid: curUser.openid,
            wechatimg: this.wxFile[0].resWximg,
            cancelTime :this.chooseCancelTime(this.chooseTimeIndex)
          }
        }).then(res => {
          console.log(res);
          this.isLoading = false
          if (res.code != 200) {
            this.ispost = false
            this.$refs.message.show({
              type: 'error',
              msg: '网络开了点小差,请稍候重试吧',
            })
          }

          this.$refs.message.show({
            type: 'success',
            msg: '发布成功',
          })


        }).catch(err => {
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
        console.log('微信上传组件的回调this.wxFile', this.wxFile);
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
        if (this.shopDetailTest.trim() == '') {
          this.$refs.message.show({
            type: 'warning',
            msg: '请描述一下物品吧~',
          })
          return false
        }
        //调用子组件判空方法
        let isenpty = this.$refs.myimgupload.isEnpty()
        console.log('调用子组件判空方法', isenpty);
        if (!isenpty) {
          return false
        }
        // 调用组件内部的判断方法 检查是不是全部上传成功了
        let isupdate = this.$refs.myimgupload.isAllupdate()
        console.log('调用子组件判断上传状态', isupdate);
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
        console.log('子组件上传的回调', this.fileList1);
      },
      radioClick(name) {
        this.radios.map((item, index) => {
          item.checked = index === name ? true : false
        })
        this.chooseTimeIndex = name
        
        
      },
      showAPicker() {
        this.$refs.AddressPicker.open();
      },
      confirm(e) {
        console.log(e);
        this.dealAdd = e.value[0]
        this.chooseAddressIndex = e.indexs[0]
        console.log('this.chooseAddressIndex', this.chooseAddressIndex);
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