<template>
  <view class="page">

    <view class="title">
      {{affiche.title}}
    </view>
    <view class="text">
      {{affiche.createat | fromStartDateTime}}
    </view>
    <rich-text :nodes="affiche.text" class="text"></rich-text>




  </view>
</template>

<script>
  export default {
    data() {
      return {
        affiche: {
          text: '',
          title: '',
          createat: ''
        },
        title: '我是公告我是公告我是公告我是公告我是公告我是公告',
        dateTime: '',
        text: '尊敬的腾讯云用户：您好，2024年春节假期临近，提前祝您春节快乐！同时附上腾讯云在春节期间（2月10日至2月17日）的服务安排！请您了解并提前做好相关安排，详细如下：腾讯云春节期间如下渠道继续为您提供7*24小时服务：自助服务：您可通过（https://cloud.tencent.com/document/custom-service)办理；售后支持：获取专业工程师的帮助，快速解决您的问题，点击进入(https://cloud.tencent.com/act/event/Online_service)，服务热线请拨打4009100100或95716；【温馨提示】1、余额和续费：愉快过节的同时请您提前做好财务预算和注意保持账户余额充足（订阅语音提醒（https://console.cloud.tencent.com/message/subscription)，避免假期期间因为账户欠费或未续费影响业务正常使用；2、数据备份：假期期间请务必对重要业务做好数据备份工作，如CVM请开启“自动续费”／“定期快照”，CDB做好备份策略；3、运营变更：请提前做好假期期间活动上线的准备，并预估用户增长量，检查机器负载和容量，并提前做好节前各种运营变更（包括现网改造，变更，升级，发布等）；4、备案审核：春节期间腾讯云备案继续提供审核服务，您可正常提交备案订单；但受法定假日影响，省通信管理局2月10日至2月17日期间暂停审核。您在此期间提交至省通信管理局的备案订单，省通信管理局将于春节'
      };
    },
    onLoad() {
      this.affiche = uni.getStorageSync('affiche')
    }
  }
</script>

<style lang="scss">
  .page {
    padding: 30rpx;
  }
  .text{
    color: #9E9E9E;
    margin: 20rpx 0;
  }

  .title {
    font-weight: bold;
    font-size: 36rpx;
  }
</style>