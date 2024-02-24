<template>
	<view class="t-radio-container">
		<view :class="['t-radio-item-wrap',{bordered:bordered}]" v-for="(item,index) in items" :key="index"
			@click="itemClick(index)">
			<view class="t-radio-item"
				:style="{'border-radius':((iconSize*1.5)*2)+'rpx',backgroundColor:checkedIdx===index?hexToRgba(iconColor,0.2):'#fff'}">
				<view class="t-radio-icon"
					:style="{width:(iconSize*1.5)+'rpx',height:(iconSize*1.5)+'rpx',border: (checkedIdx===index?(iconSize*1.5/3):'4')+'rpx solid '+iconColor} ">
				</view>
				<view class="t-radio-text" :style="{fontSize:fontSize+'rpx',color:color}">{{item}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "KevyRadio",
		props: {
			//每个radio数据
			items: {
				type: Array,
				default: () => []
			},
			//字体大小，单位rpx
			fontSize: {
				type: [String, Number],
				default: 36
			},
			//字体颜色
			color: {
				type: String,
				default: '#000000'
			},
			//图标大小
			iconSize: {
				type: [String, Number],
				default: 36
			},
			//图标颜色
			iconColor: {
				type: String,
				default: "#4fc08d"
			},
			//下边框
			bordered: {
				type: [Boolean, String],
				default: false
			},
			//默认选中值，仅在第一次生效
			checkIndex:{
				type: Number,
				default: null
			}
			
		},
		data() {
			return {
				checkedIdx: this.checkIndex
			};
		},
		created() {

		},
		computed: {



		},
		methods: {
			//单击事件
			itemClick(idx) {
				this.checkedIdx = idx;
				this.$emit('click', idx);
			},
			//16进制颜色转rgba
			hexToRgba(hex, opacity) {
				if (!hex) hex = '#4fc08d';
				let rgba = 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' +
					parseInt('0x' + hex.slice(3, 5)) + ',' +
					parseInt('0x' + hex.slice(5, 7)) + ',' +
					(opacity || "1") + ')'
				return rgba
			}
		}
	}
</script>

<style lang="scss" scoped>
	.t-radio-container {
		width: 100%;
		box-sizing: border-box;

		.t-radio-item-wrap {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding-bottom: 12rpx;
			padding-top: 12rpx;
			box-sizing: border-box;
			width: 100%;

			&.bordered {
				border-bottom: 1rpx solid #e4e4e4;
			}

			.t-radio-item {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				box-sizing: border-box;
				padding: 12rpx 24rpx 12rpx 12rpx;
				max-width: 100%;

				.t-radio-icon {
					display: flex;
					background-color: #fff;
					border-radius: 50%;
					-webkit-transition: 0.25s ease;
					transition: 0.25s ease;
					margin-right: 14rpx;
					box-sizing: border-box;
				}

				.t-radio-text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					box-sizing: border-box;
					flex: 1;
				}
			}
		}


	}
</style>