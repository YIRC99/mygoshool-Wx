<template>
  <view class="page">

    <uni-card isShadow>
      <uv-textarea v-model="shopDetailTest" height="150" count maxlength="500" border="bottom"
        placeholder="请讲述一下物品吧~"></uv-textarea>
        
      <myImgUpload @onChange="myonChange" ImgUploadText="清晰图片更容易出手哦~"
      ImageHeight="180rpx" ImageWidth="180rpx" ImgRequestPath="shop"/>
        
      <uni-section title="未售出自动下架时间" type="line">
      </uni-section>
      <view class="mychooseTimeBox">
        <view class="uv-page__tag-item" v-for="(item, index) in radios" :key="index">
          <uv-tags :text="item.name" :plain="!item.checked" :name="index" shape="circle" @click="radioClick">
          </uv-tags>
        </view>
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
      <myupload/>
    </uni-card>

    <uv-picker ref="AddressPicker" :columns="columns" @confirm="confirm"></uv-picker>
    <quick-message ref="message"></quick-message>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        radios: [{
          checked: true,
          name: '7天'
        }, {
          checked: false,
          name: '30天'
        }, {
          checked: false,
          name: '永不'
        }],
        dealAdd: '交易地点',
        shopDetailTest: '',
        fileList1: [],
        columns: [
          ['濂溪校区', '十里校区', '其他']
        ]
      };
    },
    methods: {
      myonChange(e){
        console.log('子组件上传的回调',e);
        this.fileList1 = e
      },
      radioClick(name) {
        this.radios.map((item, index) => {
          item.checked = index === name ? true : false
        })
      },
      showAPicker() {
        this.$refs.AddressPicker.open();
      },
      confirm(e) {
        console.log(e);
        this.dealAdd = e.value[0]
      },
    }
  }
</script>

<style lang="scss">
  .page {
    height: 100vh;
  }

  .mychooseTimeBox {
    display: flex;
    justify-content: flex-start;
    width: 100%;

    .uv-page__tag-item {
      margin: 0 10rpx;
    }
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


</style>