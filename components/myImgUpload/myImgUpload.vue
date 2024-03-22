<template>
  <view>

    <view class="upload-box">
      <uv-upload :fileList="fileList1" name="1" @oversize="overSize" 
      :maxSize="ImgMaxSize" multiple :maxCount="ImgMaxCount"
        @afterRead="afterRead" @delete="deletePic" :width="ImageWidth" 
        :height="ImageHeight" :uploadText="ImgUploadText"
        :previewFullImage="true"></uv-upload>
    </view>

<quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  export default {
    name: "myImgUpload",
    props: {
      ImageWidth: {
        default: '200rpx',
        type: String
      },
      ImageHeight: {
        default: '200rpx',
        type: String
      },
      ImgMaxSize: {
        default: '4,493,897',
        type: String
      },
      ImgMaxCount: {
        default: 9,
        type: Number
      },
      ImgRequestPath:{
        default: 'feedback',
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
    data() {
      return {
        fileList1: []
      };
    },
    watch:{
      fileList1(val){
        this.$emit("onChange", val);
      }
    },
    methods: {
      // 图片大小超出限制
      overSize() {
        this.$refs.message.show({
          type: 'error',
          msg: '图片超过3MB大小',
        })
      },

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
              console.log('上传成功', JSON.parse(res.data));
              let img = JSON.parse(res.data).data
              if (this.imgString == '') this.imgString = img
              else this.imgString = this.imgString + ',' + img
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
      },

    }
  }
</script>

<style lang="scss">
  .upload-box {
    margin-top: 30rpx;
    padding-left: 15rpx;
  }
</style>