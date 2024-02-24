<template>	
		<view class="page">
      <page-meta>
        <navigation-bar background-color="#fff  " title="首页" front-color="#000000"></navigation-bar>
      </page-meta>
      
      
      <view class="pagebox">
        <my ref="mypage" v-show="tabIndex == 2"></my>
        <order v-show="tabIndex == 1"></order>
        <home v-show="tabIndex == 0"></home>
      </view>
      
			<MagicNavigationBar :items="items" :height="60" :indicatorSize="50"
			@onTabSelect="onTab" indicatorBackgroundColor="#99f2ff">
				<template v-slot:text="{text}">
					{{text}}
				</template>				
			</MagicNavigationBar>
      
      
		</view>		
</template>

<script>
	import MagicNavigationBar from "@/uni_modules/jorbin-MagicNavigationBar/components/jorbin-MagicNavigationBar/jorbin-MagicNavigationBar.vue"
  import my from '@/pages/my/login.vue'
  import order from '@/pages/order/order.vue'
  import home from '@/pages/home/home.vue'
	export default {
		components:{
			MagicNavigationBar,
      my,
      order,
      home
		},
		data() {
			return {
        tabIndex: 2,
				items:[
					{
						icon:{src:require("@/static/home.png"),width:30,height:30},
						text:'拼车广场',
					},
					{
						icon:{src:require("@/static/cart (3).png"),width:30,height:30},
						text:'我的订单',
					},
					{
						icon:{src:require("@/static/notice (3).png"),width:30,height:30},
						text:'个人中心',
					},
				]
			}
		},
	
		methods: {
			onTab(index,item){
        this.tabIndex = index
        if(index == 2 && this.$refs.mypage){
          uni.setNavigationBarTitle({title: '我的'})
          this.$refs.mypage.myonshow()
        }else if( index == 0){
          uni.setNavigationBarTitle({title: '首页'})
        }else if( index == 1){
          uni.setNavigationBarTitle({title: '订单'})
        }
				console.log('tabIndex',index)
			}
		},
    onLoad() {
      this.onTab(0,{})
    }
	}
</script>

<style>
  .pagebox{
    width: 100%;
    height: 500rpx;
  }
/* 	.page{
		height: 100vh;
		width: 100vw;
	} */
</style>
