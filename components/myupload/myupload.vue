<template>
  <view>
    <uv-upload accept="image"  ref="uploadWxImgRef" :fileList="fileList1"
    name="1" multiple :maxCount="1" @afterRead="afterRead"
      @delete="deletePic" @oversize="overSize" maxSize="4,493,897" :useBeforeRead="true" 
      width="100rpx" height="100rpx" :previewFullImage="true"></uv-upload>
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
    methods:{
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
              this.resWximg = img
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

</style>