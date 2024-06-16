<template>
  <view class="uploadWxImgBox">
    <view class="beforeWxImgBox" v-if="showBefor">
      <view class="" style="display: flex; flex: 1;" @click="chooseBeforImg">
        <image src="@/static/huifu.png" class="myicon" mode=""></image>
        <view class="beforeText">选择上次的图片</view>
      </view>
      <view class="" @click="closebeforImg">
        <image class="beforclose" src="../../static/close.png" ></image>
      </view>
      <view class="" @click="shwoBeforImg">
        <image class="beforeImg" :src="QRttp + beforeImg"></image>
      </view>
    </view>
    <view class="uploadWxImg" @click="clickUploadImgM">
      <view class="" style="display: flex; align-items: center;">
        <image src="@/static/weixin.png" class="myicon" mode=""></image>
        <view class="" style="margin-right: 20rpx;">点击上传微信二维码图片</view>
      </view>
      <view class="">
        <uv-upload accept="image"  ref="uploadWxImgRef" :fileList="fileList1" 
        name="1" multiple :maxCount="ImgMaxCount" @afterRead="afterRead"
          @delete="deletePic" @oversize="overSize" :maxSize="ImgMaxSize" 
          :width="ImageWidth" :height="ImageHeight" :previewFullImage="true"></uv-upload>
      </view>
    </view>
    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
     mixins:[mixin],
    name:"myupload",
    data() {
      return {
        showBefor: false,
        beforeImg: '',
        fileList1: [],
      };
    },
    created() {
      this.initWxImg()
    },
    props: {
      ImageWidth: {
        default: '100rpx',
        type: String
      },
      ImageHeight: {
        default: '100rpx',
        type: String
      },
      ImgMaxSize: {
        default: '4,493,897',
        type: String
      },
      ImgMaxCount: {
        default: 1,
        type: Number
      },
      ImgRequestPath:{
        default: 'QRcode',
        type: String,
      },
      ImgUploadText:{
        default: '',
        type: String
      },
      TimeOut:{
        default: 5000,
        type: Number
      }
    },
    watch:{
      fileList1(val){
        this.$emit("onChange", val);
      }
    },
    methods:{
      addImg(imgs,type){
        let arr = imgs.split(",")
        arr.forEach(i => {
          this.fileList1.push({
            message: '',
            resWximg: i,
            size: 0,
            status: 'success',
            thumb: this.http + type + i,
            type: 'image',
            url: 200
          })
        })
        this.showBefor = false
      },
      isAllupdate(){
        for (var i = 0; i < this.fileList1.length; i++) {
          console.log(this.fileList1[i].status);
          if (this.fileList1[i].status != 'success') {
            this.$refs.message.show({
              type: 'error',
              msg: '有未上传成功的图片,请删除或重试吧',
              iconSize: 16,
            })
            return false
          }
        }
        return true
      },
      chooseBeforImg(){
        this.fileList1.push({
          resWximg: this.beforeImg,
          size: 1,
          thumb: this.QRttp + this.beforeImg,
          status: "success",
          type: 'image',
          url: '200'
        })
        this.showBefor = false
      },
      shwoBeforImg(){
        uni.previewImage({
          urls: [this.QRttp + this.beforeImg]
        })
      },
      closebeforImg(){
        this.showBefor = false
      },
      async initWxImg(){
        let user = uni.getStorageSync('user')
        if(user == '' || user == null)return  
        if(user.userWxImg != null && user.userWxImg != ''){
          // 直接设置图片地址
          // console.log('不用请求直接获取上一次的微信图片');
          this.beforeImg = user.userWxImg
          this.showBefor = true
        }else{
          // 尝试请求一下图片地址
          let res = await this.get({url: 'user/wxImg?userid='+ user.userid})
          if(res.code == 200 && res.data != null){
            this.beforeImg = res.data
            this.showBefor = true
          }
          // console.log(res);
        }
      },
      fileList1Empty(){
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
            url: this.http + 'common/upload?path=' + this.ImgRequestPath,
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            header:{
              'Authorization': uni.getStorageSync("token"),
               'UserId': uni.getStorageSync("user").openid,
            },
            timeout: this.TimeOut,
            success: (res) => {
              res = JSON.parse(res.data)
              // console.log('上传成功222', res.statusCode);
              
              if(!this.returnCodeHandle(res.code)){
                // console.log('代码执行到了这里');
                resolve(400)
                return 
              }
              
              this.fileList1[0].resWximg = this.MyAES.decrypt(res.data)
              this.showBefor = false
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
          // console.log('还没有调用上传方法',lists);
          uni.compressImage({
            src: lists[i].url,
            quality: 70,
           success: async res => {
              // console.log(res.tempFilePath)
              // console.log('压缩完成了');
              lists[i].url = res.tempFilePath
              const result = await this.uploadFilePromise(lists[i].url)
              let item = this[`fileList${event.name}`][fileListLen]
              
              if (result == 400) {
                this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
                  status: 'failed',
                  message: '请重试',
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
    }
  }
</script>

<style lang="scss">
  .myicon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 30rpx;
  }
  
  .beforeWxImgBox{
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
    align-items: center;
    position: relative;
    height: 120rpx;
    .beforclose{
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      top: 0;
      right: 10rpx;
    }
    .beforeText{
      flex: 1;
      font-size: 32rpx;
    }
    .beforeImg{
      width: 95rpx;
      height: 95rpx;
      margin-right: 20rpx;
    }
  }
  
  
  .uploadWxImgBox{
    display: flex;
    flex-direction: column;
  }
  
.uploadWxImg {
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    padding-top: 0;
    justify-content: space-between;
    font-size: 32rpx;
  }
</style>