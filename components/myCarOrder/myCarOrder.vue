<template>
  <view>
    
    <uni-card v-for="(item,index) in orderList" :key="index" :title="subYear(item.startdatetime) + ' 出发'"
      :thumbnail='avahttp + item.createUserInfo.avatar' @click="clickCard(item)">
      <view class="my-car-box">
        <view class="" style="width: 80%;">
          <view class="car-left">
            <img class="my-icon" src="@/static/upCar.png" />
            <text class="uv-line-1">{{item.startaddress}}</text>
          </view>
          <view class="car-left">
            <img class="my-icon" src="/static/downCar.png" />
            <text class="uv-line-1">{{item.endaddress}}</text>
          </view>
        </view>
        <view class="">
          <view class="car-right">
            <text>提前</text>
            <image v-if="item.isbefore == 1" src="@/static/true.png" mode=""></image>
            <image v-else src="@/static/false.png" mode=""></image>
          </view>
          <view class="car-right">
            <text>延后</text>
            <image v-if="item.isafter == 1" src="@/static/true.png" mode=""></image>
            <image v-else src="@/static/false.png" mode=""></image>
          </view>
        </view>
      </view>
    
      <text class="uv-line-1 myremark" style="color: #a9a9a9;">备注: {{item.remark}}</text>
    </uni-card>
   
    
    
  </view>
</template>

<script>
   import mixin from '@/mixins/mixin.js'
   
  export default {
    mixins: [mixin],
    name:"myCarOrder",
    props:{
      orderList:{
        default: [],
        type: Array
      }
    },
    data() {
      return {
        currentOrder: {},
        popupShow: false
      };
    },
    methods:{
      clickCard(order) {
        console.log('click sun function');
        this.$emit('clickOrderItem',order)
        return 
        this.currentOrder = order
        console.log('点击了卡片当前选中改变了', this.currentOrder);
        this.$refs.popup.open()
        this.popupShow = true
      },
    }
  }
</script>

<style lang="scss">
  .my-car-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .car-left {
      display: flex;
      align-items: center;
      margin: 15rpx 0;
      font-size: 32rpx;

      text {
        width: 75%;
      }

      .my-icon {
        width: 50rpx;
        height: 50rpx;
      }
    }

    .car-right {
      margin-right: 20rpx;
      margin: 15rpx 0;
      display: flex;
      align-items: center;

      image {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 10rpx;

      }
    }
  }


</style>