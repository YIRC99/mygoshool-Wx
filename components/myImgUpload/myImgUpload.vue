<template>
  <view>

    <view class="upload-box">
      <uv-upload :fileList="fileList1" name="1" @oversize="overSize" :maxSize="ImgMaxSize" multiple
        :maxCount="ImgMaxCount" @afterRead="afterRead" @delete="deletePic" :width="ImageWidth" :height="ImageHeight"
        :uploadText="ImgUploadText" :previewFullImage="true" ></uv-upload>
    </view>

    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  import {
    promise
  } from '../../uni_modules/uv-ui-tools/libs/function/test';
  export default {
    name: "myImgUpload",
    mixins: [mixin],
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
      ImgRequestPath: {
        default: 'feedback',
        type: String,
      },
      ImgUploadText: {
        default: '',
        type: String
      },
      TimeOut: {
        default: 5000,
        type: Number
      }
    },
    data() {
      return {
        fileList1: [],
        fileIndex: 0
      };
    },
    watch: {
      fileList1(val) {
        this.$emit("onChange", val);
      }
    },
    methods: {
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
        
      },
      isAllupdate() {
        for (var i = 0; i < this.fileList1.length; i++) {
          if (this.fileList1[i].status != 'success') {
            this.$refs.message.show({
              type: 'error',
              msg: '有未上传成功的图片,请删除或重试吧',
            })
            return false
          }
        }
        return true
      },
      isEnpty(){
        if (this.fileList1.length == 0) {
          this.$refs.message.show({
            type: 'warning', 
            msg: '至少一张图片描述一下吧~', 
          })
          return false
        }
        return true
      },
      // 图片大小超出限制
      overSize() {
        this.$refs.message.show({
          type: 'error',
          msg: '图片超过3MB大小',
        })
      },

      uploadFilePromise(url) {
        console.log(url);
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: this.http + 'common/upload?path=' + this.ImgRequestPath,
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            header: {
              'Authorization': uni.getStorageSync("token"),
              'UserId': uni.getStorageSync("user").openid,
            },
            timeout: this.TimeOut,
            success: (res) => {
              res = JSON.parse(res.data)
              console.log('上传成功', res);
              
              if(!this.returnCodeHandle(res.code)){
                console.log('代码执行到了这里');
                resolve(400)
                return 
              }
              
              let img = res.data
              img = this.MyAES.decrypt(img)
              
              if (this.imgString == '') this.imgString = img
              else this.imgString = this.imgString + ',' + img
              this.fileList1[this.fileIndex++].resWximg = img
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
          const res = await uni.compressImage({src: lists[i].url,quality: 70,})
          console.log(res.tempFilePath)
          console.log('压缩完成了');
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


        return
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


      async afterRead2(event) {
        const files = [].concat(event.file);
        files.forEach(file => {
          this.fileList1.push({
            ...file,
            status: 'uploading',
            message: '上传中'
          });
        });
        await Promise.all(files.map(async file => {
          try {
            const res = await this.uploadFilePromise(file.url);
            this.fileList1.splice(index, 1, {
              ...file,
              status: 'success',
              message: '',
              url: res
            });
          } catch (error) {
            console.error('上传失败', error);
            this.fileList1.splice(index, 1, {
              ...file,
              status: 'failed',
              message: '请重新上传',
              url: error
            });
          }
        }));
      },


      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
        this.fileIndex--
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