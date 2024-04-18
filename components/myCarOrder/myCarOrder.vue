<template>
  <view>
    
    <uni-card v-for="(item,index) in orderList" :key="index" :title="subYear(item.startdatetime) + ' 出发'"
      :thumbnail='isAvaPath(item)' @click="clickCard(item)">
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
      },
      avaImgPath:{
        default: '',
        type: String
      }
    },
    data() {
      return {
        currentOrder: {},
        popupShow: false
      };
    },
    methods:{
      isAvaPath(item){
        if(item.createUserInfo != null){
           return this.avahttp + item.createUserInfo.avatar
        }else{
           return this.avahttp + this.avaImgPath
        }
      
      },
      clickCard(order) {
        console.log('click sun function');
        this.$emit('clickOrderItem',order)
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