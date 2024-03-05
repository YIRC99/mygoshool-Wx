<template>
    <view style="padding: 20rpx;">
        <uni-section title="图片上传" type="line" titleFontSize="36rpx"  >
        </uni-section>
        <view class="upload-box">
            <uv-upload :fileList="fileList1" name="1" multiple :maxCount="9" @afterRead="afterRead" @delete="deletePic"
                width="200rpx" height="200rpx" :previewFullImage="true" ></uv-upload>
        </view>

        <uni-section title="意见填写" type="line" titleFontSize="36rpx">
        </uni-section>
        <view class="feed-box">
            <textarea class="feed-box-text" v-model="mt" maxlength="150" :placeholder="placeholderText" />
            <text style="position: absolute; bottom:  20rpx; right: 20rpx;">{{mt.length}}/150</text>
        </view>

        <view class="tips-box">
            <view class="tips-box-line">-----开发者将在七个工作日内为您处理并通知您</view>
            <view class="tips-box-line">1. 遇到程序Bug、反人类设计、好点子都欢迎您来提建议哦</view>
            <view class="tips-box-line">2. 遇到虚假微信或者骚扰请把的信息截图提交，核实会拉黑保护您的权益</view>
            <!-- <view class="tips-box-line">2. 若是有价值建议，可获0.66/6.66/18.8现金奖励</view> -->
        </view>


        <view class="" style="margin-top: 30rpx;">
            <view class="down-box">
                <button class="btn-grad" @click="lgin">提交</button>
            </view>
        </view>

        <quick-message ref="message"></quick-message>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                action: '',
                fileList1: [],
                imgString: '',
                mt: '',
                placeholderText: '请填写您遇到的问题或建议,配合图片我们可以更快处理~'
            }
        },
        methods: {
            uploadFilePromise(url) {
                return new Promise((resolve, reject) => {
                    let a = uni.uploadFile({
                        url: this.http + 'feedback/upload',
                        filePath: url,
                        name: 'file',
                        formData: {
                            user: 'test'
                        },
                        timeout: 5000,
                        success: (res) => {
                            console.log('上传成功', res.statusCode);
                            console.log('res.data.data',res.data.data);
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
                    const result = await this.uploadFilePromise(lists[i].url)
                    let item = this[`fileList${event.name}`][fileListLen]

                    console.log('result', result);
                    console.log('item', item);
                    console.log('this[1]', this[1]);
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


            },
            // 删除图片
            deletePic(event) {
                this[`fileList${event.name}`].splice(event.index, 1)
            },
            lgin() {
                console.log(this.$uv.toast);
                return 
                
                if (this.mt.length == 0) {
                    uni.showToast({
                        title: '请输入意见',
                        icon: 'none'
                    })
                    return
                }
                for (var i = 0; i < this.fileList1.length; i++) {
                    console.log(this.fileList1[i].status);
                    if (this.fileList1[i].status != 'success') {
                        this.$refs.message.show({
                            type: 'error',
                            msg: '有未上传成功的图片,请删除或重试吧',
                            iconSize: 16,
                        })
                        return
                    }
                }

                let openid = uni.getStorageSync('user').openid
                this.post({
                    url: 'feekback/add',
                    data: {
                        userid: openid,
                        remark: this.mt,
                        imglist: this.imgString
                    }
                }).then(res => {
                    console.log(res);
                    if (res.code != 200) {
                        this.$refs.message.show({
                            type: 'error',
                            msg: '反馈失败,请稍候重试吧',
                            iconSize: 16,
                        })
                        return
                    }
                    this.$refs.message.show({
                        type: 'success',
                        msg: '反馈成功,感谢您的意见',
                        iconSize: 16,
                    })
                    setTimeout(() => {
                        uni.navigateBack()
                    }, 1000)

                }).catch(err => {
                    console.log('信息修改错误', err);
                    this.$refs.message.show({
                        type: 'error',
                        msg: '网络开了点小差,请稍候重试吧',
                        iconSize: 16,
                    })
                    this.isloading = false
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

    .upload-box {
        margin-top: 20rpx;
        padding-left: calc((100vw - 660rpx) / 2);
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