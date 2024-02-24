<template>
	<view class="uniareascroll" id="mysrcoll">
		<view class="solloNav" id="solloNav">
			<view class="windowTitle" :style="'height:'+CustomBar +'px;background-color:'+backgroundColor+';'" v-if="showNav"></view>
			<view class="navData">
				<slot name="scrollTop"></slot>
			</view>
		</view>
		<scroll-view  id="uniareascrollscroll" :scroll-top="scrollTop" scroll-y="true" :style="'height:' + scorllH+'px;'" @scrolltoupper="upper"
		 @scrolltolower="lower" @scroll="scroll"  :upper-threshold="upperThreshold" :lower-threshold="lowerThreshold"   :scroll-with-animation="scrollWithAnimation" :enable-back-to-top="enableBackToTop" :show-scrollbar="showScrollbar" :refresher-enabled="refresherEnabled" :refresher-threshold="refresherThreshold" @refresherpulling="pulling" @refresherrefresh="fresh" @refresherrestore="restore" @refresherabort="bort">
			<slot></slot>
			<view class="loading" v-show="showLoad">
				<view  class="loadtext" v-show="beginChange && list.length>0">
					<slot name="loading">加载中...</slot>
				</view>
				<view  class="loadtext" v-show="!beginChange && !listIsChange || list.length<1">
					<slot name="loadend">
						已经到底了~
					</slot>
				</view>
			</view>
		</scroll-view>
		<view class="scrollBar">
			<slot name="scrollBar"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
			upperThreshold:{
				type:Number,
				default:50
			},
			scrollTop:{
				type:Number,
				default:0
			},
			scrollIntoView:{
				type:Number,
				default:0
			},
			enableBackToTop:{
				type:Boolean,
				default:false
			},
			refresherEnabled:{
				type:Boolean,
				default:false
			},
			refresherThreshold:{
				type:Number,
				default:45
			},
			scrollWithAnimation:{
				type:Boolean,
				default:false
			},
			showScrollbar:{
				type:Boolean,
				default:false
			},
			lowerThreshold:{
				type:Number,
				default:50
			},
			tabbar_h: {
				type: Number,
				default: 0
			},
			back: {
				type: Boolean,
				default: false
			},
			showNav: {
				type: Boolean,
				default: false
			},
			
			backgroundColor: {
				type: String,
				default: ""
			},
			showLoad: { //是否显示加载更多
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: []
			},
			loadTime:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				scenH:0,//可用区域总高度
				yxscorll:0,//正式使用区域高度
				headerH: 0, //头部自定义区域高度
				barH:0, // 底部自定义区域高度
				scorllH: 0, //滚动区域全屏
				scorll: 1, //状态，暂时无用
				StatusBar: 0, //顶部系统栏高度一般小程序20px
				CustomBar: 0, //系统小程序退出按钮下位置
				Custom: {},
				showLoading: false,
				httpPage:1,//用来发请求的page
				nowPage:1,//未请求的页码
				pageChange:true, //判断页面是否有下页
				listIsChange:true,//内容是否改变
				beginChange:false,//触发下拉请求
			};
		},
		methods: {
			getScroll() {
				uni.getSystemInfo({
					success: (e) => {
						// #ifndef MP
						this.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							this.CustomBar = e.statusBarHeight + 50;
						} else {
							this.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
						// #ifdef MP-WEIXIN
							this.StatusBar = e.statusBarHeight;
							let custom = wx.getMenuButtonBoundingClientRect();
							this.Custom = custom;
							this.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif       
						// #ifdef MP-ALIPAY
							this.StatusBar = e.statusBarHeight;
							this.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
						this.scenH = e.windowHeight
						console.log('CustomBar', this.CustomBar);
						this.getDescBox()

					}
				})

			},
			lower() {
				this.beginChange= true
				setTimeout(()=>{
					this.httpPage = this.nowPage + 1
					this.$emit("lower",{httpPage:this.httpPage,nowPage:this.nowPage,change:this.pageChange})
					this.pageChange = false
					this.listIsChange = false
				},this.loadTime)
			},
			scroll(e) {
				this.$emit("scroll", e)
			},
			pulling(e) { //自定义下拉刷新控件被下拉
				this.$emit("refresherpulling", e)
			},
			fresh(e) { //自定义下拉刷新被触发
				this.$emit("refresherrefresh", e)
			},
			restore(e) {//自定义下拉刷新被复位
				this.$emit("refresherrestore", e)
			},
			bort(e) {//自定义下拉刷新被中止
				this.$emit("refresherabort", e)
			},
			upper() {
				this.$emit("upper")
			},
			getDescBox() {
				uni.createSelectorQuery().in(this).select('#mysrcoll').boundingClientRect(result => {
					if (result) {
						this.yxscorll = result.height
					} 
				}).exec()
				uni.createSelectorQuery().in(this).select('.scrollBar').boundingClientRect(result => {
					if (result) {
						this.barH = result.height
					} 
				}).exec()
				uni.createSelectorQuery().in(this).select('.solloNav').boundingClientRect(result => {
					if (result) {
						this.headerH = result.height
					} 
				}).exec()
				uni.createSelectorQuery().in(this).select('#uniareascrollscroll').boundingClientRect(result => {
					if (result) {
						if(this.showNav) {
							this.scorllH =this.yxscorll - this.barH - this.headerH -this.CustomBar
						}else {
							this.scorllH =this.yxscorll - this.barH - this.headerH
						}
					} 
				}).exec()
			},
		},
		watch: {
			list(newVal, oldVal) {
				this.beginChange= false //改变结束
				if(newVal.length>0)  {
					this.nowPage = this.httpPage
					this.pageChange = true
				}else {
					this.pageChange = false
				}
				if(newVal == oldVal) { //判断是否真的内容变化了
					this.listIsChange = false //内容没改变返回false
				}else {
					this.listIsChange = true
				}
				console.log("listNum",newVal,this.pageChange,this.nowPage);
			},
		},
		mounted() {
			this.$nextTick(function() {
				this.getScroll()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.uniareascroll {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.loading {
			padding: 20rpx 0 100rpx 0;
			text-align: center;
			font-size: 12px;
		}

	}
</style>
