<template>
  <view style="padding: 20rpx;">
    <uni-section title="图片上传" type="line" titleFontSize="36rpx">
    </uni-section>
    
    
    <myImgUpload ref="myimgupload" @onChange="myonChange" ImgRequestPath="feedback"
    ImageHeight="215rpx" ImageWidth="215rpx"
    />
    
    <uni-section :title="isReport ? '信息填写': '意见填写'" type="line" titleFontSize="36rpx">
    </uni-section>
    <view class="feed-box">
      <textarea class="feed-box-text" v-model="mt" maxlength="150" :placeholder="placeholderText" />
      <text style="position: absolute; bottom:  20rpx; right: 20rpx;">{{mt.length}}/150</text>
    </view>

    <view class="tips-box">
      <view class="tips-box-line">-----开发者将在七个工作日内为您处理并通知您</view>
      <view class="tips-box-line">1. 遇到程序Bug、反人类设计、好点子都欢迎您来提建议哦</view>
      <view class="tips-box-line">2. 遇到虚假微信或者骚扰请把的信息截图提交，核实会拉黑保护您的权益</view>
    </view>


    <view class="" style="margin-top: 30rpx;">
      <view class="down-box">
        <button class="btn-grad" @click="postFeedback">提交</button>
      </view>
    </view>

    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        action: '',
        fileList1: [],
        imgString: '',
        mt: '',
        placeholderText: '请填写您遇到的问题或建议,配合图片我们可以更快处理~',
        ispost: false,
        isReport: false,
        feedSuccess: '反馈成功,感谢您的意见',
        feedFail: '反馈失败,请稍候重试吧',
        isReportType: 0
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
      myonChange(e){
        console.log('子组件上传的回调',e);
        this.fileList1 = e
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

      postFeedback() {
        if(this.ispost)return 
        this.ispost = true
        
        if (this.mt.length == 0) {
          this.$refs.message.show({
            type: 'warning',
            msg: '请输入意见后重试吧',
          })

          this.ispost = false
          return
        }
        
        // 调用组件内部的判断方法 检查是不是全部上传成功了
        let isupdate  = this.$refs.myimgupload.isAllupdate()
        // console.log('this.$refs.myimgupload',isupdate);
        if(!isupdate){
          this.ispost = false
          return 
        }
        
        let openid = uni.getStorageSync('user').openid
        this.post({
          url: 'feekback/add',
          data: {
            userid: openid,
            remark: this.mt,
            imglist: this.joinImgPath(this.fileList1),
            reportId: this.isReport ? this.reportId : 0,
            reportType: this.isReportType
          }
        }).then(res => {
          // console.log('添加意见反馈的返回',res);
          if(!this.returnCodeHandle(res.code,this.feedFail))return
          
          this.$refs.message.show({
            type: 'success',
            msg: this.feedSuccess,
            iconSize: 16,
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)

        }).catch(err => {
          // console.log('信息修改错误', err);
          this.ispost = false
          this.isloading = false
          this.returnCodeHandle(err.code)
        })


      }
    },
    onLoad(e) {
      console.log(e);
      if(e.reportId != undefined){
        this.isReport = true
        this.isReportType = e.reportType
        this.reportId = e.reportId
        this.feedFail = '举报失败 请稍重试吧~'
        this.feedSuccess = '提交成功 感谢您的反馈'
        this.placeholderText = '请描述举报的具体原因,可上传微信二维码信息,处理后可及时联系您'
        uni.setNavigationBarTitle({
          title: '举报中心'
        })
      }
      
    }
  }
</script>

<style lang="scss">
  .tips-box {
    font-size: 26rpx;
    margin-top: 30rpx;

    .tips-box-line {
      color: #F6A385;
      line-height: 40rpx;
    }
  }


  .down-box {
    display: flex;
    justify-content: center;

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

  .feed-box {
    position: relative;
    border: 1px solid #e2e2e2;
    border-radius: 20rpx;
    padding: 0 10rpx;

    .feed-box-text {
      width: 100%;
      text-indent: 2em;
      margin-top: 20rpx;
    }
  }
</style>