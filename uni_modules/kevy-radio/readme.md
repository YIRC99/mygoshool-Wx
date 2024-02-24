# kevy-radio（单选框）

#### 介绍
这是一个**全端通用的单选框组件**，采用友好动画方式是对选中效果的整体优化，使用简单节省效率必备，插件含全部源码及详细注释，方便您更个性的自由发挥。
祝您使用愉快，本插件会长期维护更新，开源不易，如果本插件对您有帮助的话请及时点个好评吧或者赞赏一下，总之谢谢您的鼓励啦。


#### 方法和属性

|   名称     |    类型 |     默认值    |    字段说明    |
| -------  | -------    |------    |------
|  items    |      Array   |     []   |  选项内容数字，内部为String类型 |
|  fontSize    |      Number   |     36   |  字体大小，单位rpx |
|  color |      String   |     '#000000'   |  字体颜色，支持css颜色值  |
|  iconSize  |      Number  |     36   |  图标大小，单位rpx |
|  iconColor    |      String   |     #4fc08d   |  图标主题颜色，支持16进制色值 |
|  bordered    |      Boolean   |     false   | 是否显示下边框，默认不显示 |
|  checkIndex    |      Number   |        |  默认选中值，仅在第一次设置生效 |
|  click    |      Event   |        |  单选框点击事件，返回当前点击选项的下标 |


#### 使用方式
插件详情页点击导入hbuilder即可。插件符合uni_modules和easycom规范，导入后可直接在页面通过标签引用。

#### 代码使用示例
```html
<template>
	<view>
		<view class="t-demo">
			<view class="t-demo-title">示例1：有边框+无默认选中</view>
			<kevy-radio :items="items" :fontSize="36" color="#272727" :iconSize="36" iconColor="#4fc08d" :bordered="true" @click="myClick"></kevy-radio>
		</view>
		<view class="t-demo">
			<view class="t-demo-title">示例2：无边框+默认选中</view>
			<kevy-radio :items="items" :fontSize="36" color="#272727" :iconSize="36" iconColor="#4fc08d" :bordered="false" @click="myClick" :checkIndex="1"></kevy-radio>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:["选项选项选项选项选项选项选项选项选项选项1","选项2","选项3","选项4"]
			}
		},
		methods: {
			//点击事件
			myClick(idx){
				console.log("点击的下标为："+idx);
			}
		}
	}
</script>

<style>
	.t-demo{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
	}
	.t-demo-title{
		width: 100%;
		box-sizing: border-box;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 36rpx;
		font-weight: bold;
	}
</style>
```