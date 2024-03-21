<template>
  <view class="page">

    <uni-card isShadow>
      <uv-textarea v-model="shopDetailTest" height="150" count maxlength="500" border="bottom"
        placeholder="请讲述一下物品吧~"></uv-textarea>
      <view class="upload-box">
        <uv-upload :fileList="fileList1" name="1" @oversize="overSize" maxSize="4,493,897" multiple :maxCount="9"
          @afterRead="afterRead" @delete="deletePic" width="180rpx" height="180rpx" uploadText="清晰图片更容易出手哦~"
          :previewFullImage="true"></uv-upload>
      </view>
    </uni-card>


    <uni-card isShadow>
      <view class="myitem">
        <view class="left">
          <text>价格</text>
        </view>
        <view class="right">
          <input type="number" maxlength="6" placeholder-class="myinputCss" placeholder="价格"
            style="text-align: right; " />
          <p>￥</p>
        </view>
      </view>
      <view class="myitem" @click="showAPicker" style="padding-top: 30rpx; border: none;">
        <view class="left">
          <text>交易地点</text>
        </view>
        <view class="right" style="color: #ababab; font-weight: 500;">
          {{dealAdd}}
        </view>
      </view>
    </uni-card>

    <uv-picker ref="AddressPicker" :columns="columns" @confirm="confirm"></uv-picker>
    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        dealAdd: '交易地点',
        shopDetailTest: '',
        fileList1: [],
        columns: [
          ['濂溪校区', '十里校区', '其他']
        ]
      };
    },
    methods: {
      showAPicker() {
        this.$refs.AddressPicker.open();
      },
      confirm(e) {
        console.log(e);
        this.dealAdd = e.value[0]
      },

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
            url: this.http + 'common/upload?path=feedback',
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            timeout: 5000,
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
  .page {
    background-color: #F7F7F7;
    height: 100vh;
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

  .upload-box {
    margin-top: 30rpx;
    padding-left: 15rpx;
  }
</style>