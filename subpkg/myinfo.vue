<template>
  <view>
    <uni-card>
      <button ref="avatarButton" class="avaBut" open-type="chooseAvatar" @chooseavatar="chooseimage">
        <view class="item" style="padding: 10rpx 0;">
          <view class="active">
            用户头像
          </view>
          <view class="">
            <image v-if="isloding" :src="avahttp + info.avatar" style="width: 130rpx; height: 130rpx; border-radius: 50%;" mode="">
            </image>
          </view>
        </view>
      </button>

      <view class="item">
        <view class="active">
          用户昵称
        </view>
        <view class="">
          <input type="nickname" v-model="info.username" style="text-align: right;" placeholder="输入用户昵称" />
        </view>
      </view>

      <view class="item">
        <view class="active">
          手机号码
        </view>
        <view class="">
          <input type="number" v-model="info.userphone"  style="text-align: right;" placeholder="设置手机号码" />
        </view>
      </view>
      
    </uni-card>
    
    <view class="down-box">
      <button class="btn-grad" @click="saveInfo">保存修改</button>
    </view>
    
    
    
        <zero-loading v-if="!isloding" type="circle" :mask="true" maskOpacity="0.1"></zero-loading>
 
  </view>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        isloding: false,
        // avahttp: this.avahttp,
        avahttp: 'http://192.168.151.210:33088/avatar/download/',
      };
    },
    methods: {
      saveInfo(){
        
      },
      chooseimage(e) {
        console.log(e.detail.avatarUrl);
        console.log('this.http + avatar/upload',this.http + 'avatar/upload');
        uni.uploadFile({
          url: this.http + 'avatar/upload',
          filePath: e.detail.avatarUrl,
          name: 'file',
          header:{
          	authorization :uni.getStorageSync("token")
          },
          timeout: 10000,
          success: (res) =>{
            let obj = JSON.parse(res.data)
            console.log(obj);
            this.info.avatar = obj.data
            
          },
          fail: (err) =>{
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

  
  .avaBut::after{
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
    border-bottom: 1px solid #e8e8e8;
  }
</style>