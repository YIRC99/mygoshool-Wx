<template>
  <view>
    <uni-card>
      <button ref="avatarButton" class="avaBut" open-type="chooseAvatar" @chooseavatar="chooseimage">
        <view class="item" style="padding: 10rpx 0;">
          <view class="active">
            用户头像
          </view>
          <view class="">
            <image v-if="isloding" :src="avahttp + info.avatar"
              style="width: 130rpx; height: 130rpx; border-radius: 50%;" mode="">
            </image>
          </view>
        </view>
      </button>

      <view class="item">
        <view class="active">
          用户昵称
        </view>
        <view class="">
          <input type="nickname" id="nickname-input" maxlength="20" @blur="myblur" v-model="info.username"
            style="text-align: right;" placeholder="输入用户昵称" />
        </view>
      </view>

      <!--      <view class="item">
        <view class="active">
          手机号码
        </view>
        <view class="">
          <input type="number" v-model="info.userphone"  style="text-align: right;" placeholder="设置手机号码" />
        </view>
      </view> -->

    </uni-card>

    <view class="down-box">
      <button class="btn-grad" @click="saveInfo">保存修改</button>
    </view>



    <zero-loading v-if="!isloding" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>
    <quick-message ref="message"></quick-message>
    <ws-wx-privacy id="privacy-popup" :enableAutoProtocol="true"></ws-wx-privacy>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    data() {
      return {
        info: {
          avatar: '',
          username: '',
        },
        isloding: false,
      };
    },
    mixins: [mixin],
    methods: {
      onShareTimeline(){
        let result = {
          
        }
        return result
      },
      onShareAppMessage(e) {
        let result = {
          title: '栀子花墙小程序', // 分享标题，默认当前页面标题
          path: '/pages/index/index', // 分享路径，默认当前页面路径，需要带上参数，如：/pages/index/index?id=123&name=abc，其中id和name                                        是当前页面参数，123和abc是参数值，需要根据实际情况进行替换。
          imageUrl: this.defaulthhttp + 'logo.jpg'
        }
        return result
      },
      myblur(e) {
        let _this = this
        uni.createSelectorQuery().in(this) // 注意这里要加上 in(this)  
          .select("#nickname-input")
          .fields({
            properties: ["value"],
          })
          .exec((res) => {
            console.log('昵称 createSelectorQuery', res[0].value)
            _this.info.username = res[0].value
            console.log('_this.info.useraname res[0].value', this.info.username);
          })
      },
      saveInfo() {
        this.isloading = true
        console.log('saveInfo', this.info.username);
        this.post({
          url: 'user/update',
          data: this.info
        }).then(res => {
          console.log('修改信息返回值', res);
          console.log('保存的信息为', this.info);
          this.isloading = false
          if (!this.returnCodeHandle(res.code, this.feedFail)) return

          uni.setStorageSync('user', this.info)
          this.$refs.message.show({
            type: 'success',
            msg: '修改成功',
          })

          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }).catch(err => {
          console.log('信息修改错误', err);
          this.returnCodeHandle(err.code)
          this.isloading = false
        })


      },
      chooseimage(e) {
        console.log(e.detail.avatarUrl);
        console.log('this.http + avatar/upload', this.http + 'avatar/upload');
        uni.uploadFile({
          url: this.http + 'common/upload?path=avatar',
          filePath: e.detail.avatarUrl,
          name: 'file',
          header: {
            authorization: uni.getStorageSync("token"),
            'UserId': uni.getStorageSync("user").openid,
          },
          timeout: 10000,
          success: (res) => {
            res = JSON.parse(res.data)
            if (!this.returnCodeHandle(res.code, this.feedFail)) return
            this.info.avatar = this.MyAES.decrypt(res.data)

          },
          fail: (err) => {
            console.log(err);
          }
        })
      }
    },
    onLoad() {
      this.info = uni.getStorageSync('user')
      console.log(this.info);
      this.isloding = true
    }
  }
</script>

<style lang="scss">
  .down-box {
    display: flex;
    justify-content: center;
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


  .avaBut::after {
    border: none;
  }


  /deep/.avaBut {
    width: 100%;
    background-color: white;
    border: none;
    padding: 0;
    outline: none;
    color: #6a6a6a;
  }

  .item {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 34rpx;
    padding: 30rpx 0;
    margin-bottom: 20rpx;
    border-bottom: 1px solid #e8e8e8;
  }
</style>