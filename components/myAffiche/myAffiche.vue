<template>
  <view>
    <view class="" style="background-color: #fff; padding-bottom: 5rpx; padding-top: 20rpx;" v-if="tabIndex != 2">
      <view class="" class="uv-line-2 mynative" @click="ClickAff">
        <text>社区公告</text>
        {{affiche.title}}
      </view>
    </view>
  </view>
</template>

<script>
  import mixin from '@/mixins/mixin.js'
  export default {
    mixins: [mixin],
    name: "myAffiche",
    data() {
      return {
        affiche: {
          text: '为共建尊重,互助的拼车社区氛围,请在发布拼车和接受时输入正确的个人信息,拼车过程中守时守约,行程有变及时告知↵',
          title: '欢迎使用栀子花墙软件,高效,简洁,免费,开源,无广告,！祝您使用愉快！'
        },
      };
    },
    mounted() {
      this.getAffiche()
    },
    methods: {
      ClickAff() {
        uni.setStorageSync('affiche', this.affiche)
        if (this.affiche.id == null || this.affiche.id == '') return
        uni.navigateTo({
          url: '/subpkg/affiche'
        })
      },
      getAffiche() {
        this.get({
          url: 'affiche'
        }).then(res => {
          // console.log('公告获取', res);
          if (!this.returnCodeHandle(res.code, '公告失败')) return
          if(res.data == null || res.data.text == null){
            return
             this.affiche.title = this.affiche.text
          } 
          this.affiche = res.data
          this.affiche.createat = this.formatDateTime(this.affiche.createat)
        })
      },
    }
  }
</script>

<style lang="scss">
  .mynative {
    background-color: #FFF6D7;
    border-radius: 10rpx;
    margin: 20rpx;
    padding: 5rpx 10rpx;
    margin-top: 0;
    font-size: 30rpx;

    text {
      font-weight: bold;
      color: #B07F29;
      font-size: 33rpx;
      padding: 0 10rpx;
      font-style: italic;
    }
  }
</style>