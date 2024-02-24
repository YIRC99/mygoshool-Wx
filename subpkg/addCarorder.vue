<template>
  <view>

    <uni-card class="addChose-box" is-shadow>
      <view class="addChose-box-line"@click="choseStartAddress">
        <view class="" style="width: 15rpx; height: 15rpx; border-radius: 50%; background-color: #99F2FF;"></view>
        <view class="u-line-1">{{startAddress}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
      </view>
      <u-line color="#f8f8f8"></u-line>
      <view class="addChose-box-line" @click="choseEndAddress">
        <view class="" style="width: 15rpx; height: 15rpx; border-radius: 50%; background-color: #FC770B;"></view>
        <view class="u-line-1">{{endAddress}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx;" mode=""></image>
      </view>
    </uni-card>

    <uni-card is-shadow style="margin-bottom: 0;">
      <view class="">时间以及其他</view>
      <view class="choseTime">
        <image src="../static/lishi1.png" style="width: 30rpx; height: 30rpx; margin-right: 30rpx;" mode=""></image>
        <view class="" @click="choseStartDateTime">{{startDateTime}}</view>
        <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; position: absolute; right: 40rpx;"
          mode=""></image>
        <uv-datetime-picker ref="startDatetimePicker" v-model="StartTimeValue" mode="datetime" @confirm="startConfirm">
        </uv-datetime-picker>
      </view>
      <view class="chosePerson">
        <view class="chosePerson-item">
          <image src="../static/person.png" style="width: 30rpx; height: 30rpx; margin-right: 30rpx;" mode=""></image>
          <view class="" @click="choseCurrentPerson">当前 <text class="my-text-box2-t"> {{currentPerson}} </text> 人</view>
          <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; margin-left: 10rpx;" mode=""></image>
        </view>
        <uv-picker ref="CurrentPicker" :columns="columns" @confirm="CurrentConfirm"></uv-picker>
        <view class="chosePerson-item">
          <image src="../static/person_red.png" style="width: 30rpx; height: 30rpx; margin-right: 30rpx;" mode=""></image>
          <view class="" @click="choseLaskPerson">还缺 <text class="my-text-box2-t"> {{lackPerson}} </text> 人</view>
          <image src="/static/rihgt_black.png" style="width: 30rpx; height: 30rpx; margin-left: 10rpx;" mode=""></image>
        </view>
        <uv-picker ref="lackPicker" :columns="columns" @confirm="lackConfirm"></uv-picker>
      </view>
      <view class="choseTimeDifference">
        <view class="choseTimeDifference-item">
          <uv-checkbox-group>
            <uv-checkbox @change="tiqianChange" activeColor="#87d7e1" name="tiqian" size="40rpx" labelSize="17"
              labelColor="#584c48" label="能否接受提前出发"></uv-checkbox>
          </uv-checkbox-group>
          <view :class="istiqian == true ? 'truebefortime':'flasebefortime'" style="" @click="openBeforDatetimePicker">
            {{beforTime}}</view>
          <uv-datetime-picker ref="beforDatetimePicker" v-model="beforTime" mode="time" @confirm="beforConfirm">
          </uv-datetime-picker>
        </view>
        <view class="choseTimeDifference-item">
          <uv-checkbox-group>
            <uv-checkbox @change="yanhoChange" activeColor="#87d7e1" name="tiqian" size="40rpx" labelSize="17"
              labelColor="#584c48" label="能否接受延后出发"></uv-checkbox>
          </uv-checkbox-group>
          <view :class="isyanho == true ? 'truebefortime':'flasebefortime'" style="" @click="openAfterDatetimePicker">
            {{afterTime}}</view>
          <uv-datetime-picker ref="afterDatetimePicker" v-model="afterTime" mode="time" @confirm="afterConfirm">
          </uv-datetime-picker>
        </view>
      </view>
    </uni-card>
    
    <uni-section title="备注" titleFontSize="36rpx" type="line">
    </uni-section>
    <uni-card is-shadow style="height: 270rpx; margin-top: 0; ">
      <textarea v-model="ideaText" maxlength="80" style="width: 100%;  margin-top: 20rpx; font-size: 30rpx;"
        placeholder="请输入备注" />
      <text style="position: absolute; bottom:  20rpx; right: 20rpx;">{{ideaText.length}}/80</text>
    </uni-card>

    <view class="down-box">
      <button class="btn-grad">发布拼车</button>
    </view>



  </view>
</template>

<script>
  export default {
    data() {
      return {
        beforTime: '00:00',
        istiqian: false,
        afterTime: '00:00',
        isyanho: false,
        ideaText: '',
        columns: [['1','2','3']],
        currentPerson: '1',
        lackPerson: '1',
        startDateTime: '点击选择出发时间',
        StartTimeValue: Number(new Date()),
        startAddress: '点击选择出发地点', //这里是地址名称 
        startAddressAll: '', //这是地址全称
        endAddress: '点击选择目的地',
        endAddressAll: '',
      };
    },
    methods: {
      choseEndAddress(){
        uni.chooseLocation({
        		success:(res)=> {
              this.endAddress = res.name
        			this.endAddressAll = res.address + res.name
        		},
        		fail:()=>{
        			// 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
        			uni.getSetting({
        				success: (res) => {
        					console.log(res);
        					var status = res.authSetting;
        					if(!status['scope.userLocation']){
        					// 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
        						uni.showModal({
        							title:"是否授权当前位置",
        							content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
        							success:(tip)=>{
        								if(tip.confirm){
        								// 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
        									uni.openSetting({
        										success:(data)=>{
        										// 如果用户授权了地理信息在，则提示授权成功
        											if(data.authSetting['scope.userLocation']===true){
        												uni.showToast({
        													title:"授权成功",
        													icon:"success",
        													duration:1000
        												})
        												// 授权成功后，然后再次chooseLocation获取信息
        												uni.chooseLocation({
        													success: (res) => {
        														console.log("详细地址",res);
        														// this.getRegionFn(res);
        													}
        												})
        											}else{
        												uni.showToast({
        													title:"授权失败",
        													icon:"none",
        													duration:1000
        												})
        											}
        										}
        									})
        								}
        							}
        						})
        					}
        				},
        				fail: (res) => {
        					uni.showToast({
        						title:"调用授权窗口失败",
        						icon:"none",
        						duration:1000
        					})
        				}
        			})
        		}
        	});
      },
      choseStartAddress(){
        uni.chooseLocation({
        		success:(res)=> {
              this.startAddress = res.name
        			this.startAddressAll = res.address + res.name
        		},
        		fail:()=>{
        			// 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
        			uni.getSetting({
        				success: (res) => {
        					console.log(res);
        					var status = res.authSetting;
        					if(!status['scope.userLocation']){
        					// 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
        						uni.showModal({
        							title:"是否授权当前位置",
        							content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
        							success:(tip)=>{
        								if(tip.confirm){
        								// 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
        									uni.openSetting({
        										success:(data)=>{
        										// 如果用户授权了地理信息在，则提示授权成功
        											if(data.authSetting['scope.userLocation']===true){
        												uni.showToast({
        													title:"授权成功",
        													icon:"success",
        													duration:1000
        												})
        												// 授权成功后，然后再次chooseLocation获取信息
        												uni.chooseLocation({
        													success: (res) => {
        														console.log("详细地址",res);
        														// this.getRegionFn(res);
        													}
        												})
        											}else{
        												uni.showToast({
        													title:"授权失败",
        													icon:"none",
        													duration:1000
        												})
        											}
        										}
        									})
        								}
        							}
        						})
        					}
        				},
        				fail: (res) => {
        					uni.showToast({
        						title:"调用授权窗口失败",
        						icon:"none",
        						duration:1000
        					})
        				}
        			})
        		}
        	});
      },
      startConfirm(e){
        console.log('开始出发时间',e);
        console.log('开始出发时间',this.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM'));
        this.startDateTime = this.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM')
      },
      choseStartDateTime(){
        this.$refs.startDatetimePicker.open()
      },
      lackConfirm(e){
        console.log('缺少人数',e.value[0]);
        this.lackPerson = e.value[0]
      },
      CurrentConfirm(e){
        console.log('当前人数',e.value[0]);
        this.currentPerson = e.value[0]
      },
      choseCurrentPerson(){
        this.$refs.CurrentPicker.open()
      },
      choseLaskPerson(){
        this.$refs.lackPicker.open()
      },
      afterConfirm(e) {
        console.log(e);
        this.afterTime = e.value
      },
      beforConfirm(e) {
        console.log(e);
        this.beforTime = e.value
      },
      openBeforDatetimePicker() {
        if (this.istiqian)
          this.$refs.beforDatetimePicker.open();
      },
      openAfterDatetimePicker() {
        if (this.isyanho)
          this.$refs.afterDatetimePicker.open();
      },
      tiqianChange(e) {
        console.log("能否接受提前出发：", e);
        this.istiqian = e
      },
      yanhoChange(e) {
        console.log("能否接受延后出发：", e);
        this.isyanho = e
      }
    }
  }
</script>


<style lang="scss">
  .down-box {
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
      width: 350rpx;
      height: 80rpx;
      line-height: 80rpx;
      position: absolute;
      right: 30rpx;
      margin-bottom: 50rpx;
    }

    .btn-grad:hover {
      background-position: right center;
      /* change the direction of the change here */
      color: #fff;
      text-decoration: none;
    }
  }


  .choseTimeDifference {
    margin-top: 10rpx;

    .choseTimeDifference-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 25rpx 0;

      .truebefortime {
        font-size: 34rpx;
        margin-right: 10rpx;
        font-weight: bold;
      }

      .flasebefortime {
        font-size: 34rpx;
        margin-right: 10rpx;
        font-weight: bold;
        color: #a9a9a9;
        text-decoration: line-through;
      }
    }
  }

  .my-text-box2-t {
    font-weight: bold;
    margin: 0 10rpx;
  }

  .chosePerson {
    padding: 30rpx 0;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;

    .chosePerson-item {
      display: flex;
      align-items: center;
    }
  }

  .choseTime {
    line-height: 80rpx;
    font-size: 40rpx;
    display: flex;
    align-items: center;
  }


  .addChose-box-line {
    line-height: 100rpx;
    font-size: 40rpx;
    display: flex;
    align-items: center;

    view {
      margin-right: 30rpx;
    }

    image {
      position: absolute;
      right: 40rpx;
    }
  }
</style>