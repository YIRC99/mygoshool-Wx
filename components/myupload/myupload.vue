<template>
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
</template>

<script>
  export default {
    name:"myupload",
    data() {
      return {
         fileList1: [],
      };
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
            timeout: this.TimeOut,
            success: (res) => {
              console.log('上传成功', res.statusCode);
              let img = JSON.parse(res.data).data
              this.fileList1[0].resWximg = img

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
</style>